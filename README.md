# Resume Builder (React + Redux)

A multi-page resume builder built for the AccioJob "Resume Builder" assignment
(MERN Stack course, Hard, 50 points).

## Run it

```bash
npm install
npm start        # http://localhost:8080
```

`npm run dev` also works if you don't need port 8080 specifically.
`npm test` runs a smoke test that walks every page end-to-end.

## How it's structured

- **Redux Toolkit** slices, one per section: `profile`, `education`, `skills`,
  `projects`, `social`, plus a `navigation` slice that tracks the current step
  (1–6) and save status.
- **`src/store/persistence.js`** is the mock "database" — it reads/writes a
  single JSON blob to `localStorage`. Swap its two functions for real `fetch`
  calls to your API and nothing else in the app changes.
- **`src/store/resumeThunks.js`** has `loadResume()` (runs on mount, rehydrates
  Redux from the "database") and `saveAndContinue()` (used by the Save &
  Continue button — saves everything, then advances to the preview page).
- Each section's Add button doubles as an Update button: clicking an existing
  entry loads it back into the form (tracked via `editingIndex` in that
  slice), so editing doesn't need separate selectors.

## Selector coverage

| Area | Selectors used |
|---|---|
| Navigation | `#next` (pages 1–4), `#back` (pages 2–6), `#save_continue` (page 5) |
| Profile | `name="fname"`, `name="lname"`, `name="phone"`, `name="address"`, `name="url"` |
| Education | `name="courseName"`, `name="completionYear"`, `name="college"`, `name="percentage"`, `#add_education`, `#delete` |
| Skills | `name="skill"`, `#add_skill`, `#delete_skill` |
| Projects | `name="projectName"`, `name="techStack"`, `name="description"`, `#add_project`, `#delete` |
| Social Media | `name="Social"`, `#add_social` |

## Assumptions worth double-checking against your actual Cypress spec

The brief didn't include the test file itself, so a few calls were made from
the selector table alone — worth a quick check before you submit:

- **`name="url"` on the Profile page** is used as a profile image URL (the
  table lists it under "personal details **and image**"), not a portfolio
  link. If your tests expect it to hold something else, that's a one-line
  change in `src/pages/ProfilePage.jsx`.
- **`#save_continue` only appears on the Social Media page** (page 5), and is
  what saves to the database and moves to the Final Resume Output. `#next`
  is used on pages 1–4. If your tests expect `#save_continue` on every page
  instead of `#next`, swap the button `id`s in `src/components/NavButtons.jsx`.
- **`#delete` is reused on both the Education and Projects pages** (as the
  table specifies the same id for both) — each page only has one on screen
  at a time if your test scopes the query to a row/container.
- **Social Media entries** are a single free-text field (e.g.
  `"GitHub - https://github.com/you"`) rather than separate platform/URL
  inputs, since only one `name="Social"` selector was given.
