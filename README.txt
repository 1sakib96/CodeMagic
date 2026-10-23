CODEMAGIC — PROGRAMMING LEARNING WEBSITE + SUPABASE AUTHENTICATION

WHAT IS INCLUDED
- index.html: CodeMagic website shell and email account dialog
- styles.css: responsive layout, course UI, dark theme, and account dialog
- app.js: five learning tracks (HTML, CSS, JavaScript, Python, C++), 20 authored lessons, lesson completion, quizzes, search, code playground, challenges, project checklists, notes, bookmarks, study planner, and local saving
- supabase-config.js: your public Supabase URL and publishable/anon key (you must configure these)
- supabase_schema.sql: cloud progress table and row-level security (RLS) policies

BACKEND FEATURES
- Email/password sign-up and sign-in
- Sign out
- Password reset email request and password update form for recovery links
- Cloud sync for lesson completion, quiz scores, completed challenges, and study minutes
- Local browser saving remains enabled
- Notes, bookmarks, study tasks, theme preference, and playground content remain local in this version; they do not sync to the cloud

IMPORTANT LIMITATION
The website source and SQL are included, but this package is not connected to your Supabase project until you add your own project URL and public key and run the SQL. Live sign-up, cloud sync, and GitHub Pages deployment have not been tested against your account from this package.

STEP 1 — CONFIGURE THE SUPABASE PROJECT
1. Open https://supabase.com/dashboard and choose your existing project named CodeMagic.
2. Find the Project URL and the Publishable key (or legacy anon/public key) under the project connection/API settings.
3. Open supabase-config.js in this folder.
4. Replace the two placeholder values with your actual Project URL and public key. Keep the surrounding quotes.
5. Do not place a database password, service_role key, or secret key in this file. The file is public when hosted on GitHub Pages.

Example shape only — do not use these placeholders as real credentials:
window.CODEMAGIC_SUPABASE_URL = 'https://YOUR_PROJECT_ID.supabase.co';
window.CODEMAGIC_SUPABASE_ANON_KEY = 'YOUR_SUPABASE_PUBLISHABLE_OR_ANON_KEY';

STEP 2 — CREATE THE DATABASE TABLE AND SECURITY POLICIES
1. In the CodeMagic Supabase dashboard, open SQL Editor.
2. Create a new query.
3. Copy all of supabase_schema.sql into the editor and click Run.
4. Check that public.codemagic_progress appears in Table Editor.
5. Keep Row Level Security enabled. Policies permit an authenticated user to read/insert/update only the row whose user_id equals auth.uid(). Anonymous users have no table privileges.

STEP 3 — ENABLE EMAIL AUTHENTICATION
1. Open Authentication > Sign In / Providers (the label may vary).
2. Enable Email authentication.
3. For a production website, keep email confirmation enabled and configure email delivery as needed. A new user may need to click the confirmation link before signing in.
4. Under Authentication URL Configuration, set Site URL to the final GitHub Pages address.
5. Add the exact GitHub Pages address to the allowed Redirect URLs. Add your local development URL only if you will use it for local testing.

STEP 4 — PUBLISH TO GITHUB PAGES
1. Extract this ZIP.
2. Upload the CONTENTS of the CodeMagic folder to the root of your GitHub repository. Keep index.html, app.js, styles.css, supabase-config.js and supabase_schema.sql together.
3. Commit the files.
4. In the GitHub repository, open Settings > Pages and enable deployment from the branch/folder containing index.html.
5. Wait for GitHub Pages to publish, then open the HTTPS URL and check the browser console for errors.
6. If you change the URL later, update Supabase Site URL and Redirect URLs too.

STEP 5 — TEST IT PROPERLY
1. Open the deployed website and click Sign in > Create account.
2. Register with an email address you can access and a strong password.
3. If email confirmation is enabled, confirm the email, then return and sign in.
4. Complete a lesson or answer a quiz. Wait a moment for the debounced cloud save.
5. Reload the page and check that progress remains.
6. Sign in with the same account in a second browser/device and verify that the same lesson/quiz progress appears.
7. For account isolation, use a second test account and verify it cannot see the first account's cloud progress.
8. If sync fails, check the browser console, that the SQL ran successfully, the table has RLS enabled, the URL/key are correct, and the confirmation flow is complete.

SECURITY NOTES
- The publishable/anon key is intended to be exposed in browser code; RLS is essential.
- NEVER use a service_role or secret key in this website.
- The SQL grants table access to authenticated users only and policies restrict each operation to the matching auth.uid().
- Do not store highly sensitive personal information in this progress JSON.

LOCAL TESTING
Use a local web server (for example, VS Code Live Server) rather than opening index.html using file://. Add the local URL to Supabase's allowed Redirect URLs if you test confirmation or password-reset flows locally.

LEARNING REFERENCES
- MDN Web Docs: https://developer.mozilla.org/en-US/docs/Learn_web_development
- W3Schools: https://www.w3schools.com/
