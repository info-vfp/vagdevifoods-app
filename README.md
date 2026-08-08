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
| Measure images + emit responsive variants | `npm run manifest` |
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

**A failed send must never be a dead end.** When EmailJS rejects a submission the form does not
say "try again later" — retrying cannot help if the account is misconfigured, and the enquiry
is simply lost. It shows WhatsApp, phone and email instead, which is how most of this audience
would rather get in touch anyway. Keep that fallback if you touch the error branch, and keep
provider detail in `console.error` rather than on screen: visitors cannot act on ".env".

---

## Project structure

```
pages/        One component per route (Home, About, Mill, Products, Exports, Contact, Surya)
components/   Shared UI — Navbar, Footer, Carousel, MobileActionBar, SEO, Img, …
content/      Page copy and data, separated from layout (translations, mill journey, gallery)
context/      LanguageContext — the EN/HI/TE/TA/KN switcher
constants.ts  Company details, contact numbers, certifications, product data
scripts/      Maintenance tooling (image optimization, image manifest, prerender, sitemap)
public/       Static assets served as-is, including images/ and CNAME
```

### Routing and pre-rendering

Routes are real paths (`vagdevifoods.com/mill`), and **every route is pre-rendered to static
HTML at build time**. `npm run build` runs five steps:

1. `manifest` — measures `public/images/` and writes `content/imageSizes.ts` (see below)
2. `build:client` — the browser bundle
3. `build:ssr` — a server bundle of the same app
4. `prerender` — renders each route in `content/seo.ts` and writes `dist/mill.html` *and*
   `dist/mill/index.html`, so extensionless URLs resolve at HTTP 200 on any static host
5. `sitemap` — regenerates `sitemap.xml` from the same route list

This exists because the site was previously client-rendered only: crawlers that don't run
JavaScript received ~495 characters of empty shell, identical for every page. They now get the
real content and per-page metadata. **Adding a route means adding it to `content/seo.ts`** —
the router, the pre-renderer and the sitemap all read from there.

Each route is a separate chunk (`React.lazy` in `App.tsx`), so the home page no longer ships
the contact form's EmailJS client or the Surya microsite. That is also why `entry-server.tsx`
uses React's `prerenderToNodeStream` rather than `renderToString` — `renderToString` cannot
wait for a lazy chunk and would emit an empty Suspense fallback into every static page.

Metadata uses React 19's built-in `<title>`/`<meta>` hoisting rather than a helmet library;
see the note in `components/SEO.tsx` for why. `index.tsx` deletes the pre-rendered copies on
boot so React owns exactly one of each — without that, navigating in the app would leave two
canonicals on the page.

#### Checking the pre-rendered output

**`npm run preview` is the wrong tool for this.** Vite's preview server falls back to
`index.html` for any path it does not recognise, so every route answers with the home page's
title and the per-route files look broken when they are fine. Serve `dist/` the way GitHub
Pages does instead — extensionless paths resolving to `<route>.html` at HTTP 200:

```bash
npx serve dist
```

Then confirm each route returns its own `<title>` and canonical, and that the body carries real
text rather than an empty shell. The `prerender` step already prints a readable-character count
per route on every build and warns below 1,000 characters, so a regression usually shows up
there first.

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

For reference, the initial pass took the image payload from **64 MB to 7.9 MB**.

### Always render images with `<Img>`, not `<img>`

`components/Img.tsx` reads `content/imageSizes.ts` — generated from the files on disk by
`npm run manifest` — and fills in three things you would otherwise have to remember:

- **`width`/`height`**, so the browser reserves the right box and nothing shifts as the page
  loads
- **`srcset`**, pointing at the 400px and 800px variants the manifest script generates for any
  source wider than 900px, so a phone does not download a 1600px photograph for a 300px card
- **`loading="lazy"` and `decoding="async"`** by default

Two things are on you:

- Pass **`sizes`** describing how wide the image actually renders — the CSS width, not the
  file's, e.g. `sizes="(min-width: 640px) 33vw, 78vw"`. Leave it out and the browser assumes
  the image fills the viewport and fetches a larger file than it needs.
- Add **`loading="eager"`** (and usually `fetchPriority="high"`) to anything above the fold.
  Lazy-loading the LCP image delays it, which is the opposite of what we want.

After dropping in new photos, run `npm run images` then `npm run manifest`. Both are
idempotent, and `manifest` runs as part of every build.

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

The workflow also asks EmailJS whether it recognises the public key, because *present but
wrong* is the failure that actually bites: a stale key once shipped for weeks and every
enquiry was silently lost, while a check for "are the variables non-empty" passed happily.
A `404 Account not found` in the browser console means exactly that — copy the current value
from **EmailJS → Account → General → Public Key** into the repository variable and re-run the
workflow. The values are inlined at build time, so changing a variable does nothing until the
site is rebuilt.

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

React 19 · TypeScript · Vite 6 · Tailwind CSS 3 · React Router 6 · EmailJS

Tailwind is compiled at build time via PostCSS. It is deliberately **not** loaded from the CDN:
the CDN build compiles styles in the browser, which costs an extra download and shows a flash
of unstyled content on slow mobile connections.

**framer-motion is still installed but is no longer part of the shell.** It was ~60KB gzipped
carried on every page for two transitions, so `ScrollReveal` and the mobile menu were rebuilt
on IntersectionObserver and CSS. Only `ContactPage` still imports it, which puts it in that
route's chunk. Reaching for it in a component that loads on every page pulls the whole library
back into the main bundle — prefer a CSS transition.

### Decorative animation is disabled on phones

`index.css` ends with a **motion budget**: a `@media (max-width: 768px)` block that switches
off the marquees, blob loops, spinner and packshot drift. They composite large blurred layers
every frame, which costs battery and causes scroll jank on the mid-range Androids most visitors
use. The static blurs are cheap and are deliberately kept — only the animation is dropped.

That block lists animations **by class name**, so a new `animate-[…]` utility is not covered
until you add it there. A `prefers-reduced-motion` block follows it for anyone who has asked
the OS to calm things down.

### Fonts load late, so the fallbacks are metric-matched

The webfonts are non-blocking, which means text first paints in a locally installed face and
swaps when the download lands. Left alone that reflows the page: Playfair Display is wider than
Times, so the home page headline wrapped onto two lines before the swap and three after — a
72px jump that scored **CLS 0.221 on desktop**.

`index.css` therefore defines `Playfair Fallback`, `Cormorant Fallback` and
`Montserrat Fallback`, each re-scaling a local face to the webfont's metrics with
`size-adjust` and the `*-override` descriptors. `tailwind.config.js` lists each one directly
after its webfont.

**If you change display copy, re-check these.** The values are not "roughly the average width"
— they are tuned so headings break onto the *same number of lines* either way, and the window
is narrow: Playfair's `110%` is the only value that holds for both the home page `h1` and the
"From the weighbridge…" `h2`. Measure by rendering the heading at its real width and font size
in both faces and comparing height, rather than adjusting by eye.

---

## Accessibility

The site holds **WCAG AA** and Lighthouse scores 100. Three rules keep it there.

**Tailwind's opacity scale only has multiples of five.** `text-white/82` silently produces no
CSS at all, and the element quietly inherits its parent's colour — on a dark panel that means
invisible text, which is exactly how a paragraph of the Surya footer went unreadable for
months. Use `/80`, or bracket syntax (`text-white/[0.82]`) if you really need the in-between
value. Worth grepping for after a batch of styling changes:

```bash
grep -rnoE '\b[a-z-]+-(white|black|brand-[a-z]+|gray-[0-9]+)/[0-9]+\b' pages components | awk -F/ '$NF % 5 != 0'
```

**Gold is only legible on the dark sections.** The royal `brand-secondary` measures 2.0:1 on
cream — it fails even the large-text threshold. Gold text on a light background uses
**`brand-gold-ink`**; the WhatsApp green is **`brand-whatsapp`** (the original measured 3.45:1
under white labels). Both exist purely to clear AA — see `tailwind.config.js`.

**Every interactive element gets at least 44px.** Where a link must stay visually small, give
the anchor `inline-flex items-center min-h-[44px]` and put the decoration on an inner `<span>`
so the underline still hugs the text. Small icon buttons need `min-w-[44px]` too — and if that
widens a row past the viewport, let it wrap rather than overflow.

Text sitting on photography is the one thing an automated check cannot judge: the contrast
tooling sees the section background, not the image. Those cases are scrimmed with a gradient
and were verified against the lightest pixel actually behind the text.
