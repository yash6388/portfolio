# Portfolio — Yash Kumar Singh

Personal portfolio: AI Engineer · Python Backend. Next.js 15 (App Router) + Tailwind CSS 4, fully static.

## Run locally
```bash
npm install
npm run dev          # http://localhost:3005
```

## Update content
Everything (bio, experience, projects, skills, education, links) lives in **`src/data/profile.ts`**.

- **New project:** add an entry to `projects`. Optional `image` (put the file in `public/projects/`)
  and `demo` (live link).

### Photo and resume — two ways to update them after deploying
**A. Replace the file on GitHub (no code):** in the repo on github.com open `public/` →
*Add file → Upload files* → upload `avatar.jpg` or `resume.pdf` with the same name → *Commit*.
Vercel redeploys automatically; the live site updates in about a minute.

**B. Use links that update themselves** — set them once in `src/data/profile.ts`:
- `avatar: "https://avatars.githubusercontent.com/u/104134149?v=4"` → the site always shows your current
  GitHub profile photo.
- `resume: "<Google Drive share link>"` → in Drive use *Manage versions → Upload new version* to replace the
  PDF; the link stays the same, so the site always serves the latest resume (no redeploy needed).

If no photo is available, your initials are shown; if no resume is set, the Résumé buttons are hidden.

## Deploy on Vercel
1. Push this folder to its own GitHub repo.
2. On vercel.com → **Add New… → Project** → import the repo → **Deploy** (framework is detected automatically).
3. After the first deploy, set the environment variable `NEXT_PUBLIC_SITE_URL` to the site URL
   (e.g. `https://yash-kumar-singh.vercel.app`) and redeploy — it makes link previews on LinkedIn/X use the right address.
