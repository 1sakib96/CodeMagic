-- CodeMagic: cloud progress for authenticated users.
-- Run this entire script in Supabase Dashboard > SQL Editor.
-- The browser app uses the public publishable/anon key; RLS protects user rows.

create table if not exists public.codemagic_progress (
  user_id uuid primary key references auth.users(id) on delete cascade,
  progress jsonb not null default '{}'::jsonb check (jsonb_typeof(progress) = 'object'),
  updated_at timestamptz not null default now()
);

alter table public.codemagic_progress enable row level security;

-- Remove only these policy names before recreating them.
drop policy if exists "Users can read own CodeMagic progress" on public.codemagic_progress;
drop policy if exists "Users can insert own CodeMagic progress" on public.codemagic_progress;
drop policy if exists "Users can update own CodeMagic progress" on public.codemagic_progress;

create policy "Users can read own CodeMagic progress"
  on public.codemagic_progress
  for select to authenticated
  using ((select auth.uid()) = user_id);

create policy "Users can insert own CodeMagic progress"
  on public.codemagic_progress
  for insert to authenticated
  with check ((select auth.uid()) = user_id);

create policy "Users can update own CodeMagic progress"
  on public.codemagic_progress
  for update to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

-- No anonymous table access. Authenticated users can only operate within RLS policies.
revoke all on table public.codemagic_progress from anon;
grant select, insert, update on table public.codemagic_progress to authenticated;
