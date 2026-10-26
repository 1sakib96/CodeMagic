# CodeMagic — Learn. Practice. Build.

CodeMagic is a responsive, browser-based programming learning platform designed to help beginners learn programming step by step. It combines guided lessons, code examples, quizzes, practice challenges, and small projects in one learning workspace.

> **Project status:** Front-end features are included. Supabase authentication and cloud progress syncing require configuration and testing with your own Supabase project.

## Features

- **Five learning tracks:** HTML, CSS, JavaScript, Python, and C++
- **Guided lessons:** structured explanations, examples, learning goals, and quizzes
- **Learning progress:** mark lessons complete and track quiz results
- **Code playground:** experiment with code examples in the browser
- **Practice and quizzes:** reinforce concepts with interactive questions and challenges
- **Projects:** use project checklists to guide practical work
- **Personal workspace:** notes, bookmarks, and a study planner
- **Search:** find lessons and topics
- **Theme toggle:** switch the appearance of the interface
- **Local persistence:** save supported learning data in the browser
- **Optional account system:** email/password authentication and cloud progress sync through Supabase
- **Responsive interface:** designed for desktop and smaller screens

## Tech Stack

| Technology | Purpose |
| --- | --- |
| HTML5 | Page structure and application shell |
| CSS3 | Layout, responsive styling, and themes |
| JavaScript (vanilla) | Interactive interface, lessons, quizzes, and local state |
| Supabase | Optional authentication and cloud progress storage |
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

The learning interface can be explored locally. Supabase account features will work only after Supabase is configured.

## Configure Supabase (Optional)

Supabase is used for email/password accounts and cloud syncing of supported learning progress.

### 1. Set your project credentials

1. Create or open a project in the [Supabase Dashboard](https://supabase.com/dashboard).
2. Find your **Project URL** and **publishable key** (or legacy `anon` public key) in the project's API/connection settings.
3. Open `supabase-config.js` and set the values:

```javascript
window.CODEMAGIC_SUPABASE_URL = 'https://YOUR_PROJECT_ID.supabase.co';
window.CODEMAGIC_SUPABASE_ANON_KEY = 'YOUR_SUPABASE_PUBLISHABLE_OR_ANON_KEY';
```

Use your own values. The publishable/anon key is designed for use in browser applications; **never put a `service_role` key or any secret key in client-side code or a public repository**.

### 2. Create the progress table

1. Open **SQL Editor** in your Supabase project.
2. Run the complete contents of `supabase_schema.sql`.
3. Confirm that `public.codemagic_progress` exists and that Row Level Security (RLS) is enabled.

The supplied policies restrict authenticated users to their own progress row.

### 3. Enable email authentication

1. In Supabase, open **Authentication** and enable the Email provider.
2. Configure email confirmation and delivery according to your needs.
3. Add your local development URL and deployed site URL to the allowed redirect URLs.
4. Set the production site URL to your GitHub Pages address when deploying there.

Supabase dashboard labels may change over time.

### What syncs?

The current implementation is designed to sync supported learning progress, including lesson completion, quiz scores, completed challenges, and study minutes for signed-in users. Notes, bookmarks, study tasks, theme preference, and playground content remain stored locally in this version.

**Important:** The included source files do not prove that the supplied Supabase project is configured correctly or that sign-in and cloud sync have been tested. Verify these flows with your own test account before relying on them.

## Deploy to GitHub Pages

1. Push the project files to a GitHub repository.
2. Ensure `index.html`, `styles.css`, `app.js`, `supabase-config.js`, and `supabase_schema.sql` are in the intended published directory.
3. Open the repository's **Settings → Pages**.
4. Select deployment from the branch and folder containing `index.html` (commonly `main` and `/root`).
5. Save and wait for GitHub Pages to publish the site.
6. Open the published HTTPS URL and test navigation, lessons, quizzes, and mobile layout.
7. If using Supabase, add the deployed URL to Supabase's allowed redirect URLs and set it as the site URL.

## Testing Checklist

- [ ] The home/overview page loads without console errors.
- [ ] All five learning tracks open.
- [ ] Lessons and quizzes work as expected.
- [ ] Lesson completion and supported local data remain after a reload.
- [ ] Search, notes, bookmarks, planner, projects, and theme toggle work.
- [ ] Account creation, sign-in, sign-out, and password reset work after Supabase setup.
- [ ] Signed-in progress syncs after reload and across devices.
- [ ] A separate test account cannot access another user's cloud progress.
- [ ] The deployed site works on desktop and mobile.

## Security and Privacy Notes

- Never commit Supabase `service_role` keys, database passwords, or other secrets.
- Keep RLS enabled on `codemagic_progress`.
- The browser-facing publishable/anon key is not a secret; database access must be protected by appropriate RLS policies.
- Avoid storing sensitive personal information in the progress data.
- Review and test authentication redirect settings before publishing.

## Learning Resources

- [MDN Web Docs — Learn web development](https://developer.mozilla.org/en-US/docs/Learn)
- [W3Schools](https://www.w3schools.com/)
- [Supabase Documentation](https://supabase.com/docs)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)

## Contributing

Contributions and suggestions are welcome.

1. Fork the repository.
2. Create a feature branch.
3. Make and test your changes.
4. Open a pull request describing the improvement.

## License

No license is specified in the supplied project files. Add a `LICENSE` file before presenting this project as open source, and choose a license that matches how you want others to use it.
