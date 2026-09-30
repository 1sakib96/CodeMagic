const $ = id => document.getElementById(id);
const store = { get: (k, d) => { try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch { return d; } },
                set: (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} } };
let current = COURSES[0];
let done = store.get("codemagic-done", {});   // { "python-0": true, ... }
let passed = store.get("codemagic-quiz", {}); // { python: true }

/* ---------- Navigation ---------- */
const COLORS = { c: "#4f8cff", cpp: "#8b7bff", python: "#f2b705", html: "#ff7a45", css: "#20b8e0", js: "#f0c000" };
const LABEL = { c: "C", cpp: "C+", python: "Py", html: "</>", css: "{ }", js: "JS" };
const FILE = { c: "main.c", cpp: "main.cpp", python: "main.py", html: "index.html", css: "index.html", js: "script.js" };
const DESC = { c: "Fast, low-level, and the base of many languages.", cpp: "C with classes, vectors, and powerful libraries.", python: "Readable and beginner friendly.", html: "The structure of every web page.", css: "Colors, spacing, and layout for the web.", js: "Make web pages interactive." };
let step = 0;
function buildNav() {
  let html = "", group = "";
  COURSES.forEach(c => {
    if (c.group !== group) { group = c.group; html += `<h4>${group}</h4>`; }
    const n = c.lessons.filter((_, i) => done[c.id + "-" + i]).length;
    html += `<button data-id="${c.id}" class="${c.id === current.id ? "on" : ""}"><span class="dot" style="--c:${COLORS[c.id]}"></span>${c.name}<small>${n}/${c.lessons.length}</small></button>`;
  });
  $("nav").innerHTML = html;
  $("nav").querySelectorAll("button").forEach(b => b.onclick = () => select(b.dataset.id));
}
function select(id) {
  current = COURSES.find(c => c.id === id); step = 0;
  document.documentElement.style.setProperty("--lc", COLORS[id]);
  $("chip").textContent = LABEL[id]; $("ctitle").textContent = current.name; $("cdesc").textContent = DESC[id];
  $("lang").value = id; $("fname").textContent = FILE[id];
  buildNav(); renderLessons(); renderQuiz(); loadCode(current.lessons[0].c);
}
$("lang").innerHTML = COURSES.map(c => `<option value="${c.id}">${c.name}</option>`).join("");
$("lang").onchange = e => select(e.target.value);

/* ---------- Lessons (one at a time) ---------- */
const esc = s => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");
function renderLessons() {
  const l = current.lessons[step], k = current.id + "-" + step, last = step === current.lessons.length - 1;
  $("steps").innerHTML = current.lessons.map((_, i) => `<button data-s="${i}" class="${i === step ? "on" : ""} ${done[current.id + "-" + i] ? "ok" : ""}" aria-label="Lesson ${i + 1}">${i + 1}</button>`).join("");
  $("steps").querySelectorAll("button").forEach(b => b.onclick = () => { step = +b.dataset.s; renderLessons(); loadCode(current.lessons[step].c); });
  $("lessons").innerHTML = `<div class="lesson"><p class="meta">Lesson ${step + 1} of ${current.lessons.length}</p><h2>${l.t}</h2><p>${esc(l.p)}</p>
    <div class="cb"><div class="bar"><span class="dots"><i></i><i></i><i></i></span><b>${FILE[current.id]}</b><button class="cp">Copy</button></div><pre>${highlight(l.c, current.ext)}</pre></div>
    <div class="task"><b>Your turn:</b> ${TASKS[current.id][step]}</div>
    <div class="nav2"><button class="ghost" id="try">Open in editor</button><button class="done ${done[k] ? "ok" : "ghost"}" id="mark">${done[k] ? "✓ Completed" : "Mark complete"}</button>
    ${step > 0 ? '<button class="ghost" id="prev">← Back</button>' : ""}${!last ? '<button id="next">Next lesson →</button>' : ""}</div></div>`;
  $("try").onclick = () => { loadCode(l.c); $("code").focus(); };
  $("lessons").querySelector(".cp").onclick = e => { navigator.clipboard?.writeText(l.c); e.target.textContent = "Copied"; };
  $("mark").onclick = () => { done[k] = !done[k]; store.set("codemagic-done", done); buildNav(); renderLessons(); progress(); };
  if ($("prev")) $("prev").onclick = () => { step--; renderLessons(); loadCode(current.lessons[step].c); };
  if ($("next")) $("next").onclick = () => { step++; renderLessons(); loadCode(current.lessons[step].c); };
  progress();
}
function progress() {
  const total = COURSES.reduce((n, c) => n + c.lessons.length, 0);
  const p = Math.round(Object.values(done).filter(Boolean).length / total * 100);
  $("bar").style.width = p + "%"; $("pct").textContent = p + "%";
}

/* ---------- Quiz ---------- */
function renderQuiz() {
  const q = current.quiz;
  $("quiz").innerHTML = `<h2>Quick quiz</h2><p>${q.q}</p>` +
    q.o.map((o, i) => `<button class="opt" data-i="${i}">${esc(o)}</button>`).join("") +
    `<div id="qres">${passed[current.id] ? `<span class="badge">${current.name} badge earned</span>` : ""}</div>`;
  $("quiz").querySelectorAll(".opt").forEach(b => b.onclick = () => {
    const ok = +b.dataset.i === q.a;
    b.classList.add(ok ? "right" : "wrong");
    $("qres").innerHTML = ok ? `<span class="badge">${current.name} badge earned</span>` : "Not quite. Try again.";
    if (ok) { passed[current.id] = true; store.set("codemagic-quiz", passed); }
  });
}

/* ---------- Editor with syntax highlighting ---------- */
function paint() {
  const v = $("code").value;
  $("hl").innerHTML = highlight(v, current.ext) + "\n";
  $("ln").textContent = v.split("\n").map((_, i) => i + 1).join("\n");
}
function loadCode(text) {
  $("code").value = text; paint();
  $("output").textContent = "Press Run."; $("preview").style.display = "none";
  $("feedback").innerHTML = "<li>Press “Analyze” to get suggestions.</li>";
}
$("code").addEventListener("input", paint);
$("code").addEventListener("scroll", () => { $("hl").scrollTop = $("code").scrollTop; $("hl").scrollLeft = $("code").scrollLeft; $("ln").scrollTop = $("code").scrollTop; });
$("code").addEventListener("keydown", e => {
  if (e.key === "Tab") { e.preventDefault(); const t = e.target; t.setRangeText("    ", t.selectionStart, t.selectionEnd, "end"); paint(); }
});

$("run").onclick = () => {
  const code = $("code").value, out = $("output"), pv = $("preview");
  pv.style.display = "none";
  if (current.ext === "html") {
    pv.style.display = "block"; pv.srcdoc = code; out.textContent = "Live preview below.";
  } else if (current.ext === "js") {
    const lines = [];
    const fake = { log: (...a) => lines.push(a.map(x => typeof x === "object" ? JSON.stringify(x) : String(x)).join(" ")) };
    try { new Function("console", code)(fake); out.textContent = lines.join("\n") || "(no output)"; }
    catch (err) { out.textContent = lines.join("\n") + "\nError: " + err.message; }
  } else {
    out.textContent = `Running ${current.name} needs a compiler on a server, which this prototype does not include yet.\nUse "Analyze code" for feedback now. See README for how to add a code-execution API.`;
  }
};

/* ---------- Intelligent Code Analyzer (rule-based) ---------- */
function analyze(code, ext) {
  const res = [], lines = code.split("\n");
  const add = (type, msg, n) => res.push({ type, msg: (n ? `Line ${n}: ` : "") + msg });
  if (!code.trim()) return [{ type: "bad", msg: "The editor is empty." }];

  // Bracket balance (ignores strings crudely)
  const stack = [], pairs = { ")": "(", "]": "[", "}": "{" };
  lines.forEach((ln, i) => {
    ln.replace(/(["'`]).*?\1/g, "").replace(/\/\/.*|#(?!include).*/g, ext === "py" ? "" : "$&").split("").forEach(ch => {
      if ("([{".includes(ch)) stack.push([ch, i + 1]);
      else if (pairs[ch]) { const top = stack.pop(); if (!top || top[0] !== pairs[ch]) add("bad", `Unexpected "${ch}".`, i + 1); }
    });
  });
  stack.forEach(([ch, n]) => add("bad", `"${ch}" is never closed.`, n));

  lines.forEach((raw, i) => {
    const ln = raw.trim(), n = i + 1;
    if (!ln) return;
    if (raw.length > 100) add("hint", "Long line. Split it to make it easier to read.", n);
    if (ext === "py") {
      if (/^(if|elif|else|for|while|def|class|try|except|with)\b.*[^:]$/.test(ln) && !ln.endsWith(",") && !ln.endsWith("(")) add("bad", "Missing colon at the end of this statement.", n);
      if (/^print\s+[^(]/.test(ln)) add("bad", "print needs parentheses in Python 3: print(...).", n);
      if (/\t/.test(raw) && /^ +/.test(raw)) add("bad", "Tabs and spaces are mixed in indentation.", n);
      if (/\bif\b[^=!<>]*[^=!<>]=[^=]/.test(ln) && ln.startsWith("if")) add("bad", "Use == to compare; = assigns a value.", n);
    } else if (["c", "cpp", "js"].includes(ext)) {
      if (/^(int|float|double|char|let|const|var|return|printf|cout|cin|console|string)\b/.test(ln) && !/[;{},(:]$/.test(ln))
        add("bad", "This statement may be missing a semicolon.", n);
      if (/\bif\s*\([^=!<>]*[^=!<>]=[^=][^)]*\)/.test(ln)) add("bad", "Assignment (=) inside if. Did you mean ==?", n);
    }
    if (ext === "c" && /\bgets\s*\(/.test(ln)) add("bad", "gets() is unsafe. Use fgets() instead.", n);
    if (ext === "c" && /scanf\s*\([^)]*,\s*[a-zA-Z_]\w*\s*\)/.test(ln) && !/&/.test(ln) && !/%s/.test(ln)) add("bad", "scanf needs &variable for numbers and characters.", n);
    if (ext === "js" && /\bvar\s/.test(ln)) add("hint", "Prefer let or const over var.", n);
    if (ext === "js" && /[^=!]==[^=]/.test(ln)) add("hint", "Prefer === over == to avoid surprising conversions.", n);
    if (ext === "cpp" && /using namespace std/.test(ln)) add("hint", "Fine for learning; larger projects use std:: instead.", n);
    if (/^\s*(for|while)\s*\(.*\)\s*;$/.test(ln)) add("bad", "Semicolon right after the loop header makes the loop body empty.", n);
  });

  if (ext === "c" && !/int\s+main/.test(code)) add("bad", "No main() function found.");
  if (ext === "c" && /printf|scanf/.test(code) && !/#include\s*<stdio\.h>/.test(code)) add("bad", "Add #include <stdio.h> to use printf/scanf.");
  if (ext === "cpp" && /cout|cin/.test(code) && !/#include\s*<iostream>/.test(code)) add("bad", "Add #include <iostream> to use cout/cin.");
  if (ext === "html" && !/<html|<body|<h1|<p|<div|<style/i.test(code)) add("hint", "No common HTML tags found.");
  if (ext === "html") (code.match(/<(div|p|span|ul|li|h[1-6]|a|button|form|style)\b[^>]*>/gi) || []).forEach(t => {
    const name = t.match(/<(\w+)/)[1].toLowerCase(); if (!new RegExp("</" + name + ">", "i").test(code)) add("bad", `<${name}> has no closing tag.`); });
  if (ext === "html" && /<img(?![^>]*alt=)/i.test(code)) add("hint", "Add an alt attribute to images for accessibility.");
  if (ext === "js" && /while\s*\(\s*true\s*\)/.test(code) && !/break/.test(code)) add("bad", "Infinite loop: while(true) with no break.");
  if (lines.length > 4 && !/\/\/|#|\/\*|<!--/.test(code)) add("hint", "Add a few comments to explain your thinking.");
  return res;
}
$("analyze").onclick = () => {
  const r = analyze($("code").value, current.ext);
  const seen = new Set(), uniq = r.filter(x => !seen.has(x.msg) && seen.add(x.msg));
  const bad = uniq.filter(x => x.type === "bad").length;
  $("feedback").innerHTML = uniq.length ? `<li class="${bad ? "bad" : "hint"}"><b>${bad} error${bad === 1 ? "" : "s"}, ${uniq.length - bad} hint${uniq.length - bad === 1 ? "" : "s"}</b></li>` + uniq.map(x => `<li class="${x.type}">${esc(x.msg)}</li>`).join("")
    : `<li class="good">No problems found. Nice work!</li>`;
};

select(current.id);
