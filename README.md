# CodeMagic — Learn. Practice. Build.

CodeMagic is a responsive, browser-based programming learning platform designed to help beginners learn programming step by step. It combines guided lessons, code examples, quizzes, practice challenges, and small projects in one learning workspace.

> **Project status:** Visitors first see the public CodeMagic homepage. Students can create their own account with any valid email address and password, or use one of the three exhibition demo accounts. Registration and login work locally in the current browser and do not call Supabase. Each account has separate progress. This is an exhibition/demo authentication system, not secure production authentication.

## Student dashboard edition

The public homepage introduces CodeMagic, previews original courses, explains the learning tools, and provides working sign-up/sign-in entry points. Visitors do not see a sample student name, avatar, XP, rank, or dashboard. Students can choose one of the ready-made demo profiles from the sign-in dialog. Each demo profile has its own saved progress and appears only after that account signs in. New students can register directly from the sign-up form. Their account is stored in this browser; it will not automatically sync to another device or browser.

The student dashboard has been rebuilt around the supplied white, orange, and yellow reference. Signed-in students can edit their display name from **My account → Display name → Save name**. The dashboard course-progress feature now rotates between started courses, supports previous/next controls and swipe gestures, and lets students jump directly back into the selected course. The carousel advances automatically when more than one course has been started. The dashboard includes: student profile sidebar, XP/level/streak/rank tiles, course progress, monthly activity calendar, leaderboard-style panel, daily challenge, and learning-efficiency chart. The dashboard adapts to lesson and quiz activity. The leaderboard does not invent classmates or rankings. A real class leaderboard requires a shared class membership and ranking backend, which is not included in this static edition.

The playground includes HTML, CSS, JavaScript, Python 3, C, C++, and Java. HTML/CSS/JavaScript run in the browser preview. Python runs with Pyodide. C/C++/Java request the available runtime list from the Piston online compiler service before running, so the latest supported runtime version is selected automatically. Internet access and compiler-service availability are required for Python and compiled languages. Both the in-page Back button and the browser Back/Forward controls navigate through the student workspace and lesson history. The Practice & quizzes area includes 350 multiple-choice questions: 50 each for HTML, CSS, JavaScript, Python, C, C++, and Java. Each language has Beginner (15), Intermediate (15), Advanced (15), and Pro (5) levels, with answer explanations, plus the original short-answer practice set. Each language has its own saved code. Use **Save code** or continue typing to keep your work in this browser. Project checklist selections are also saved locally.

## Features

- **Ten original CodeMagic courses:** HTML, CSS, JavaScript, Python, C++, Python Essentials, JavaScript Interactive Web, SQL & Database Basics, React UI Development, and Git & GitHub Workflow (plus the existing five tracks; see the course catalogue for the complete list)
- **Original learning content:** authored explanations, learning goals, code examples, expected outputs, tips, and knowledge-check quizzes stored in the project itself; students learn inside CodeMagic rather than being sent to another tutorial website
- **Guided lessons:** structured explanations, examples, learning goals, and quizzes
- **Learning progress:** mark lessons complete and track quiz results, with a separate progress record for each course
- **Editable student profile:** change the display name after account creation from the signed-in My account dialog
- **Featured course carousel:** automatically rotate through started courses, swipe on touch screens, or use the previous/next controls
- **Multi-language code playground:** choose HTML, CSS, JavaScript, Python, C, C++, or Java; run code and view preview/output
- **Practice and quizzes:** 20 answer-checking practice questions across HTML, CSS, JavaScript, Python, and C++; each includes hints and explanations
- **Projects:** use project checklists to guide practical work
- **Personal workspace:** notes, bookmarks, and a study planner
- **Search:** find lessons and topics
- **Theme toggle:** switch the appearance of the interface
- **Local persistence:** save supported learning data in the browser
- **Account-gated student area:** visitors see a public homepage; student profile and dashboard are revealed only after sign-in
- **Exhibition demo accounts:** Ayesha Rahman, Karan Mehra, and Rafi Ahmed; all use the demo password `Learn123!`
- **Separate demo progress:** each demo account has its own browser-local progress record and session; signing out returns to the public homepage
- **Local student accounts:** any student can register with a name, email, and password; separate progress is saved in browser storage
- **Responsive interface:** designed for desktop and smaller screens

## Tech Stack

| Technology | Purpose |
| --- | --- |
| HTML5 | Page structure and application shell |
| CSS3 | Layout, responsive styling, and themes |
| JavaScript (vanilla) | Interactive interface, lessons, quizzes, and local state |
| Local account authentication | Exhibition-only accounts and browser storage |
| GitHub Pages | Static website hosting |

This project does **not** require React or Python to run.

## Project Structure

```text
CodeMagic-main/
├── index.html          # Main application shell
├── styles.css          # Styling and responsive layout
├── app.js              # Lessons, quizzes, navigation, and app logic
├── supabase-config.js  # Supabase project URL and public key
├── supabase_schema.sql # Database table and row-level security policies
├── assets/              # Original CodeMagic mascot illustration
└── README.md           # Project documentation
```

## Getting Started

### 1. Download or clone the repository

```bash
git clone https://github.com/YOUR-USERNAME/YOUR-REPOSITORY.git
cd YOUR-REPOSITORY
```

Replace the URL with your repository's actual clone URL.

### 2. Run locally

Because the app uses browser scripts and may use Supabase authentication redirects, run it through a local web server instead of opening `index.html` directly with `file://`.

For example, in Visual Studio Code:

1. Open the project folder.
2. Install the **Live Server** extension if needed.
3. Right-click `index.html`.
4. Select **Open with Live Server**.

The learning interface, custom student registration, and demo accounts work locally without Supabase. New students can choose **Create account**, enter their name, any valid email address, and a password of at least six characters, then sign in with those credentials on the same browser. Progress is stored separately for each account in local browser storage. These accounts do not sync between devices or browsers.

## Exhibition account mode

This edition intentionally disables Supabase authentication and makes no authentication network requests. Students may register their own local account or use one of the three built-in demo accounts shown in the sign-in dialog. Local credentials are stored in browser storage for exhibition use only. Do not use real passwords or sensitive personal information. Password recovery is not available in offline account mode.

## Code playground runtimes

- HTML: runs in the sandboxed preview iframe.
- CSS: applies to a sample preview page.
- JavaScript: runs in the preview iframe and captures console output.
- Python 3: runs using Pyodide, loaded from a CDN on first use.
- C, C++, and Java: run through the Piston online compiler API.

Internet access is needed to load Python and to compile C/C++/Java. Runtime services can occasionally be unavailable; HTML/CSS/JavaScript continue to work locally.

## Deploy to GitHub Pages

1. Push the project files to a GitHub repository.
2. Ensure `index.html`, `styles.css`, `app.js`, `supabase-config.js`, and `supabase_schema.sql` are in the intended published directory.
3. Open the repository's **Settings → Pages**.
4. Select deployment from the branch and folder containing `index.html` (commonly `main` and `/root`).
5. Save and wait for GitHub Pages to publish the site.
6. Open the published HTTPS URL and test navigation, lessons, quizzes, and mobile layout.
7. Test custom registration, sign-in, language selection, code execution, quizzes, and progress on the published HTTPS URL. The local accounts are specific to each browser.

## Testing Checklist

- [ ] The home/overview page loads without console errors.
- [ ] All ten learning tracks open.
- [ ] Lessons and quizzes work as expected.
- [ ] Lesson completion and supported local data remain after a reload.
- [ ] Search, notes, bookmarks, planner, projects, and theme toggle work.
- [ ] A student can create a local account with their own name and email.
- [ ] Students can sign in and sign out; progress stays separate by account.
- [ ] Python, C, C++, and Java run with internet access; HTML/CSS/JavaScript preview locally.
- [ ] The deployed site works on desktop and mobile.

## Security and Privacy Notes

- Local account passwords are stored in browser localStorage in this exhibition build. This is not secure authentication.
- Do not use personal, reused, or important passwords in the exhibition.
- Do not store sensitive personal information in this project.
- Use a secure server-side authentication provider and database before opening the platform to public users.

## Learning Content

Course lessons, examples, outputs, and quizzes are included in `app.js` and run locally inside CodeMagic. The external reference websites are not used as the course delivery experience.

- [GitHub Pages Documentation](https://docs.github.com/en/pages)

## Contributing

Contributions and suggestions are welcome.

1. Fork the repository.
2. Create a feature branch.
3. Make and test your changes.
4. Open a pull request describing the improvement.

## License

No license is specified in the supplied project files. Add a `LICENSE` file before presenting this project as open source, and choose a license that matches how you want others to use it.


## Exhibition demo accounts

| Student | Email | Password |
| --- | --- | --- |
| Ayesha Rahman | `ayesha@codemagic.demo` | `Learn123!` |
| Karan Mehra | `karan@codemagic.demo` | `Learn123!` |
| Rafi Ahmed | `rafi@codemagic.demo` | `Learn123!` |

These are local demonstration profiles, not real email accounts. Their learning progress is stored separately in the browser using local storage. Clearing browser data will remove demo progress. Do not use this demo-only authentication approach for a public production website.


## Code playground execution notes

- HTML opens in a sandboxed browser preview.
- CSS is applied to a sample page so selectors and layout changes are visible.
- JavaScript runs in a sandboxed page; DOM changes appear in the preview and console messages/errors appear below it.
- Python runs with Pyodide. Use the Program input box for `input()`.
- C, C++ and Java run through the Piston online compiler. Use the Program input box for `scanf`, `cin`, or `Scanner`.
- Python and compiled languages require internet access and availability of their external runtime/compiler service.


## Enable C, C++ and Java execution (required for GitHub Pages users)

The old public Piston execution endpoint stopped accepting unrestricted public execution in February 2026. A static GitHub Pages site cannot safely store a compiler API key in browser JavaScript. This project therefore includes a small Cloudflare Pages Function at `functions/api/run-code.js`; it keeps the provider key on the server and forwards only C, C++ and Java source code plus optional standard input.

To enable these three languages:

1. Create an account with a Piston-compatible execution provider and obtain its API key. The included function is configured for the OnlineCompiler.io Piston-compatible endpoint.
2. Deploy this repository as a **Cloudflare Pages** project (connect the GitHub repository; do not deploy only the `CodeMagic-main` folder contents without the `functions` directory).
3. In Cloudflare Pages, open **Settings → Variables and Secrets**, add a secret named `ONLINECOMPILER_API_KEY`, and paste the API key as its value. Never put this key in `app.js`, `supabase-config.js`, or any public file.
4. Redeploy the Pages project. The frontend calls `/api/run-code`; Cloudflare routes that request to `functions/api/run-code.js`.
5. If you keep hosting only on GitHub Pages, HTML, CSS, JavaScript and Python can run in the browser, but C, C++ and Java need a separately deployed secure backend. The playground now shows a clear setup error instead of pretending that the compiler ran.

The API provider may have its own quotas, account requirements and availability limits. The function intentionally limits source and input size and only permits C, C++ and Java.

## Expanded course paths and personal progress

The learning library now contains 12 courses and 120 guided lessons. Each course has 10 lessons arranged across Beginner, Intermediate, Advanced, and Pro levels. The paths cover HTML, CSS, JavaScript, Python, C, C++, Java, SQL, React, and Git/GitHub.

Students can:

- Start any course in any order.
- See a separate completion percentage and lesson count for every course they have started.
- Switch to another course from the lesson screen using the course selector, or use **Browse / change course** to open the course library.
- Return to the last lesson they visited in each course.
- Track completed lessons independently for every course.

Course progress is stored with the student's existing local progress data. If cloud progress syncing is configured, the started-course list and last-visited lesson map are included in the progress JSON as well.


### Your profile in the sidebar
After signing in, the left sidebar shows a prominent **Your profile** shortcut directly below the student avatar and name. Select it to upload/change/remove a profile photo and edit the display name. If you do not see the shortcut after deployment, replace the deployed `index.html`, `styles.css`, and `app.js` with the versions in this package, then commit and push the changes.
