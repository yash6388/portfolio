# Portfolio — Yash Kumar Singh

Personal portfolio: AI Engineer · Python Backend. Next.js 15 (App Router) + Tailwind CSS 4, fully static.

## Run locally
```bash
npm install
npm run dev          # http://localhost:3005
```

## Update content
Everything (bio, experience, projects, skills, education, links) lives in **`src/data/profile.ts`**.

- **Photo:** add `public/avatar.jpg` (square, at least 400×400). Until then, initials are shown in the circle.
- **Resume:** add `public/resume.pdf` — a "Resume" button appears automatically.
- **New project:** add an entry to `projects`. Optional `image` (put the file in `public/projects/`),
  `demo` (live link) and `featured: true` (large card with screenshot).

## Deploy on Vercel
1. Push this folder to its own GitHub repo.
2. On vercel.com → **Add New… → Project** → import the repo → **Deploy** (framework is detected automatically).
3. After the first deploy, set the environment variable `NEXT_PUBLIC_SITE_URL` to the site URL
   (e.g. `https://yash-kumar-singh.vercel.app`) and redeploy — it makes link previews on LinkedIn/X use the right address.
