# Vagdevi Food Products

Marketing site for **Vagdevi Food Products Private Limited** — a rice mill and exporter at
Yadgarpally, Miryalaguda, Telangana.

Live at **[vagdevifoods.com](https://vagdevifoods.com)**.

---

## Quick reference

| I want to… | Command |
|---|---|
| Run the site locally | `npm run dev` |
| Check types | `npm run typecheck` |
| Build for production | `npm run build` |
| Preview the production build | `npm run preview` |
| Optimize newly added images | `npm run images` |
| Rebuild sitemap only | `npm run sitemap` |
| Type-check **and** build (pre-flight) | `npm run check` |
| Publish manually (fallback) | `npm run deploy` |

---

## Getting started

Requires **Node 22+**.

```bash
npm install
npm run dev
```

The dev server runs at `http://localhost:5173`.

### Environment variables

The contact form posts through [EmailJS](https://www.emailjs.com/). Create a `.env` in the
project root:

```
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

These are read at **build time** and baked into the bundle. Without them the form renders but
cannot send — so they must also exist as GitHub Actions **variables** for deployed builds
(see below).

> They are stored as *variables*, not secrets, on purpose: all three end up inside the client
> bundle and are readable in the browser, so there is nothing to hide. EmailJS is designed this
> way — the public key is meant to be public.

---

## Project structure

```
pages/        One component per route (Home, About, Mill, Products, Exports, Contact, Surya)
components/   Shared UI — Navbar, Footer, Carousel, MobileActionBar, SEO, …
content/      Page copy and data, separated from layout (translations, mill journey, gallery)
context/      LanguageContext — the EN/HI/TE/TA/KN switcher
constants.ts  Company details, contact numbers, certifications, product data
scripts/      Maintenance tooling (image optimization)
public/       Static assets served as-is, including images/ and CNAME
```

### Routing and pre-rendering

Routes are real paths (`vagdevifoods.com/mill`), and **every route is pre-rendered to static
HTML at build time**. `npm run build` runs four steps:

1. `build:client` — the browser bundle
2. `build:ssr` — a server bundle of the same app
3. `prerender` — renders each route in `content/seo.ts` and writes `dist/mill.html` *and*
   `dist/mill/index.html`, so extensionless URLs resolve at HTTP 200 on any static host
4. `sitemap` — regenerates `sitemap.xml` from the same route list

This exists because the site was previously client-rendered only: crawlers that don't run
JavaScript received ~495 characters of empty shell, identical for every page. They now get the
real content and per-page metadata. **Adding a route means adding it to `content/seo.ts`** —
the router, the pre-renderer and the sitemap all read from there.

Metadata uses React 19's built-in `<title>`/`<meta>` hoisting rather than a helmet library;
see the note in `components/SEO.tsx` for why.

---

## Working with images

Source photography comes off a DSLR at multiple megabytes per frame. Most visitors are on
mobile data, so **every image must be optimized before it ships**.

After dropping new photos into `public/images/`:

```bash
npm run images
```

This converts PNG/JPG to WebP, caps dimensions per folder, and deletes the originals. It is
safe to re-run — already-optimized files are skipped.

```bash
npm run images -- --dry    # preview what would change
npm run images -- --keep   # convert but keep the originals
```

Then reference the file with a `.webp` extension. Add `loading="lazy"` and `decoding="async"`
to anything below the fold; leave hero images eager so they are not delayed.

For reference, the initial pass took the image payload from **64 MB to 7.9 MB**.

---

## Deployment

### Automatic (normal path)

**Pushing to `main` deploys the site.** GitHub Actions
([`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)) builds the project and pushes
the result to the `gh-pages` branch, which GitHub Pages serves at vagdevifoods.com.

```bash
git checkout main
git merge your-branch
git push origin main          # deploy starts automatically
```

Watch it under the repository's **Actions** tab. A run takes roughly a minute.

You can also trigger a deploy without pushing code: **Actions → Build & Deploy → Run workflow**.

#### One-time setup

Add the EmailJS values under **Settings → Secrets and variables → Actions → Variables tab**,
as **repository** variables (not environment-scoped, and not secrets):

- `VITE_EMAILJS_SERVICE_ID`
- `VITE_EMAILJS_TEMPLATE_ID`
- `VITE_EMAILJS_PUBLIC_KEY`

Repository scope matters: variables attached to a GitHub *Environment* are only visible to
jobs that declare that environment, and this workflow deliberately does not use one.

If any are missing the deploy still succeeds — the site is fine, only the contact form stops
sending — so the workflow prints a **warning** on the run rather than failing it. Check the
Actions summary after the first deploy.

### Manual (fallback)

If Actions is unavailable, publish from your machine. This uses your local `.env`:

```bash
npm run deploy
```

`predeploy` runs `npm run check` first, so a type error or failed build blocks the release.

### Notes

- `dist/` is generated output and is **not** committed. Never edit it by hand.
- `public/CNAME` is what binds the custom domain. Vite copies it into `dist/` on every build,
  and CI fails the run if it is missing — without it GitHub Pages drops vagdevifoods.com.

---

## Tech stack

React 19 · TypeScript · Vite 6 · Tailwind CSS 3 · React Router 6 · Framer Motion · EmailJS

Tailwind is compiled at build time via PostCSS. It is deliberately **not** loaded from the CDN:
the CDN build compiles styles in the browser, which costs an extra download and shows a flash
of unstyled content on slow mobile connections.
