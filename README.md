# Portfolio

**English** · [Türkçe](README.tr.md)

My personal site: the projects I have built, the tools I use, a short introduction and a way to get in touch, in Turkish and English. It also hosts a CV builder that runs entirely in the browser.

[![CI](https://github.com/Beratoguzhan620/portfolio/actions/workflows/ci.yml/badge.svg)](https://github.com/Beratoguzhan620/portfolio/actions/workflows/ci.yml)
![Astro 5](https://img.shields.io/badge/Astro-5-1F2A37)
![Lighthouse 95+](https://img.shields.io/badge/Lighthouse-95%2B-2F7D4F)
![License: MIT](https://img.shields.io/badge/license-MIT-green)

**Live site:** [beratoguzhan620.github.io/portfolio](https://beratoguzhan620.github.io/portfolio/)

![Home page](docs/screenshots/home.png)

## Try it

```bash
pnpm install
pnpm dev        # http://localhost:4321/portfolio/
```

## Features

- **Home page:**
  - An introduction, then the projects, skills, about and contact sections.
  - Each project card has a screenshot, the tech stack, a link to the code, and a live demo or a recorded walkthrough.
  - The project list can be filtered by web, mobile or tool; without JavaScript every project stays visible.
- **Turkish and English:** Turkish lives at `/` and English at `/en/`. The language switch keeps you on the same page, and each page declares its alternate with `hreflang`.
- **CV builder** (`/cv-builder/`):
  - **Live preview:** the A4 page updates as you type.
  - **Templates:** two templates, classic and sidebar, with six accent colours or your own, two typefaces and an optional photo.
  - **Entries:** add and remove experience, education and languages; skills are typed as a comma-separated list.
  - **Saving:** your data is saved in the browser automatically, and can be downloaded or loaded back as JSON. Nothing is sent anywhere.
  - **PDF:** "Download as PDF" uses the browser's print dialog with a print stylesheet, so the PDF has real, selectable text on an A4 page.
  - **Safety:** clearing or replacing your data asks first, and what you type is never turned into HTML.
  - **Small screens:** edit and preview become two tabs.
- **Design:** IBM Plex, a light and a dark theme that follow the system, and the shared design system with an ink accent.
- **Fast and accessible:** static pages, self-hosted fonts and resized WebP screenshots. Lighthouse checks every page in CI and fails below 95 for performance or accessibility.

## Screenshots

| Projects | CV builder |
|---|---|
| ![Projects](docs/screenshots/projects.png) | ![CV builder](docs/screenshots/cv-builder.png) |

| Phone, dark | CV builder on a phone | Sidebar template |
|---|---|---|
| ![Phone](docs/screenshots/home-mobile-dark.png) | ![CV on a phone](docs/screenshots/cv-mobile.png) | ![Sidebar template](docs/screenshots/cv-sidebar.png) |

## Publishing

The `Deploy to GitHub Pages` workflow builds the site and publishes it on every push to `main`. To turn it on:

1. Make the repository public (Pages on a private repository needs a paid plan).
2. Go to **Settings → Pages → Build and deployment → Source** and choose **GitHub Actions**.
3. Push to `main`, or run the workflow by hand from the **Actions** tab. The site appears at `https://beratoguzhan620.github.io/portfolio/`.

For a custom domain or Netlify, build with `SITE_BASE=/` (and `SITE_URL=https://your-domain`) so links start at the root.

## Adding a project

1. Put a screenshot in `src/assets/projects/<slug>.png`.
2. Add an entry to `src/data/projects.ts` with a summary in both languages, the stack and the links.

The tests check that every project has a screenshot, both summaries and a repository link.

## Tech stack

- Astro 5 (static output) with its built-in i18n routing, TypeScript in strict mode
- Plain CSS with the design tokens from [docs/DESIGN.md](docs/DESIGN.md); IBM Plex through Fontsource
- Astro's image pipeline (sharp) for the screenshots
- Vitest for the content and the CV data, Playwright for the end-to-end flows, Lighthouse for the scores
- GitHub Actions for checks and for publishing to GitHub Pages

## How it is built

```text
src/
  pages/             index.astro, en/index.astro, cv-builder/, en/cv-builder/, 404.astro
  components/        Hero, Projects, ProjectCard, Skills, About, Contact; cv/CvBuilder
  data/              projects.ts, skills.ts
  i18n/              ui.ts (site strings), cv.ts (CV builder strings)
  lib/               cv.ts (data, defaults, validation), cv-render.ts (the page), cv-app.ts (the form)
  styles/            global.css, cv.css (including the print rules)
```

- The CV builder keeps one `Cv` object. Every change goes through `normalizeCv` when loading from storage or a file, so broken or hand-edited data falls back to safe defaults.
- The preview is built with DOM nodes and `textContent` only.
- The A4 page is 794 px wide and scaled to fit the column. When printing, everything else is hidden and the page is printed at its real size.

## Scripts

| Command | What it does |
|---|---|
| `pnpm dev` | Development server |
| `pnpm build` | Static build in `dist/` |
| `pnpm preview` | Serve the build on port 4321 |
| `pnpm check` | `astro check` (types and templates) |
| `pnpm test` | Unit tests |
| `pnpm test:e2e` | End-to-end flows against the preview |
| `pnpm lighthouse` | Lighthouse on every page; fails below 95 |
| `pnpm media:readme` | Take the README screenshots |

## Tests

- **Unit tests:**
  - Both languages have the same keys and no empty strings.
  - Every project has a screenshot, two summaries and a repository link.
  - For the CV data: loading from storage or a file repairs broken input, lists and long text are capped, skills are parsed and file names are built from the person's name.
- **End-to-end, site:**
  - Every section in both languages, and the project filter.
  - Card links, the language switch, the 404 page, and every internal link and image returning 200.
  - No sideways scrolling on phones.
- **End-to-end, CV builder:**
  - Live preview; adding and removing entries; skills; templates, colours and the photo.
  - Autosave across reloads; JSON download and upload, including a broken file.
  - The confirmation dialogs; text that looks like HTML staying text.
  - The print view containing only the page and the example fitting on one A4 sheet.
  - The phone tabs.

## Roadmap and known gaps

- Live demos for the .NET projects, which need a server. Until then their cards link to a recorded walkthrough; the Expo apps link to their web demos.

## Background

This project started as a bootcamp project and was later rebuilt from the ground up. The original was a CV builder: a single page with colour pickers and a fixed number of fields. It now lives inside this site. What this version adds:

- **The site around it:** a bilingual portfolio with the projects, skills, about and contact sections.
- **CV builder:** two templates, as many entries as a CV needs (up to six jobs), a photo, autosave, JSON export and import, and a real PDF through the print stylesheet.
- **Design:** the shared design system, a dark theme and a layout that works on phones.
- **Quality:** unit tests, end-to-end tests, Lighthouse 95+ and CI on every pull request.

## License

[MIT](LICENSE) · Berat Oğuzhan Turğut · [GitHub](https://github.com/Beratoguzhan620)
