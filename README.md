# Portfolio — Yash Kumar Singh

Personal portfolio of **Yash Kumar Singh, AI & Backend Engineer** — production GenAI systems, retrieval,
multi-agent workflows and Python backends.

**Live:** [yash-kumar-singh.vercel.app](https://yash-kumar-singh.vercel.app) · **GitHub:** [yash6388](https://github.com/yash6388) ·
**LinkedIn:** [yash-kumarsingh](https://www.linkedin.com/in/yash-kumarsingh/)

## Highlights
- **Editorial design** — warm paper tones with a single accent colour, serif headlines, monospace labels;
  light and dark mode follow the visitor's system setting.
- **Animated system diagram** in the hero — the shape of the AI systems I build (guard → route → retrieve or
  act, with evals and tracing underneath), drawn in pure SVG.
- **Fully static and fast** — no client-side data fetching; scroll reveals respect reduced-motion settings.
- **Responsive** — tested on desktop and phone widths.
- **SEO and sharing** — metadata plus a generated favicon and Open Graph image for LinkedIn/X previews.

## Tech stack
Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS 4 · `next/font` (Instrument Serif, Geist) ·
`next/og` · Lucide icons · deployed on Vercel.

## Project structure
```
src/
├── app/
│   ├── layout.tsx            fonts, metadata, theme colours
│   ├── page.tsx              all sections (hero, about, experience, projects, skills, education, contact)
│   ├── globals.css           design tokens (light/dark), animations
│   ├── icon.tsx              generated favicon
│   └── opengraph-image.tsx   generated link-preview image
├── components/
│   ├── SystemDiagram.tsx     animated hero figure
│   ├── Nav.tsx               sticky navigation + mobile menu
│   ├── Reveal.tsx            scroll reveal
│   └── icons.tsx             GitHub / LinkedIn marks
└── data/
    └── profile.ts            ALL content lives here
public/
├── avatar.jpg                profile photo (square)
├── resume.pdf                résumé linked from the site
└── projects/                 project screenshots
```

## Run locally
```bash
npm install
npm run dev          # http://localhost:3005
npm run build        # production build
npm run lint
```

## Update content
Everything — bio, experience, projects, skills, education, links — lives in **`src/data/profile.ts`**.

- **New project:** add an entry to `projects`. Optional `image` (put the file in `public/projects/`)
  and `demo` (live link). Projects appear in the order listed.
- **Photo:** replace `public/avatar.jpg` with a **square** image (≈ 640×640, face centred). It is shown in a
  small circle, so crop close to the face.
- **Résumé:** replace `public/resume.pdf`.

If no photo exists, initials are shown; if no résumé exists, the Résumé buttons are hidden.

### Updating after deployment
Every push to `main` redeploys automatically on Vercel (about a minute). Without a terminal: on github.com
open `public/` → *Add file → Upload files* → upload the new `avatar.jpg` / `resume.pdf` with the same name →
*Commit changes*.

Alternatively, `avatar` and `resume` in `profile.ts` also accept full URLs:
- `avatar: "https://avatars.githubusercontent.com/u/104134149?v=4"` — follows the GitHub profile photo.
- `resume: "<Google Drive share link>"` — replace the file in Drive via *Manage versions → Upload new
  version*; the link stays the same, so no redeploy is needed.

## Deploy on Vercel
1. Push this folder to its own GitHub repo (public or private — both work with Vercel).
2. On vercel.com → **Add New… → Project** → import the repo → **Deploy** (Next.js is detected automatically).
3. Link previews (LinkedIn/X) use Vercel's production domain automatically. If you add a custom domain, set
   `NEXT_PUBLIC_SITE_URL` (e.g. `https://yourdomain.dev`) in Vercel → Settings → Environment Variables and redeploy.

## Content
The text, photo and résumé are © Yash Kumar Singh — please don't reuse them.
