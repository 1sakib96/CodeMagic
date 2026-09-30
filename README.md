# CodeMagic

A programming-language learning platform with an Intelligent Code Analyzer.
Project-Based Learning platform by **UGVcoders** "Sayma, Sakib, Sanoy, Arfa".

## Features (v0.1)
- Redesigned dashboard: colored language sidebar, one lesson at a time, step tracker, and a "Your turn" task per lesson
- Syntax-highlighted code in lessons and in the editor (line numbers, colors for keywords, strings, tags, CSS properties)
- Language sections: **C, C++, Python** (programming) and **HTML, CSS, JavaScript** (web development)
- 3 short basic lessons per language, each with an example you can load into the editor
- Online code editor
  - JavaScript runs in the browser
  - HTML/CSS shows a live preview
  - C, C++ and Python can be analyzed (running them needs a server, see roadmap)
- **Intelligent Code Analyzer** (rule-based): unclosed brackets, missing semicolons/colons, `=` vs `==`, unsafe `gets()`, missing `#include`, unclosed HTML tags, missing `alt`, `var`/`==` in JS, infinite loops, and style hints
- One quiz per language with an achievement badge
- Progress bar saved in the browser (`localStorage`)



## Project structure
```
index.html      page layout
css/style.css   styles
js/data.js      lessons and quizzes (add a language here)
js/highlight.js syntax highlighter
js/app.js       navigation, editor, quiz, progress, analyzer
```

## Roadmap (maps to the SRS)
- Login, roles and instructor/admin panels (FR-1 to FR-3, FR-18, FR-19) need a backend such as Node.js + a database
- Compile and run C, C++ and Python through a sandboxed execution API (FR-9)
- Test-case evaluation, submission history and reports (FR-13, FR-14, FR-16)
- More lessons, search and notifications (FR-20, FR-21)
