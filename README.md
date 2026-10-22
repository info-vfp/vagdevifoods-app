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
| Check style rules (opacity steps, RTL-safe classes) | `npm run lint:styles` |
| Check the built site's SEO (after a build) | `npm run check:seo` |
| Build for production | `npm run build` |
| Preview the production build | `npm run preview` |
| Optimize newly added images | `npm run images` |
| Measure images + emit responsive variants | `npm run manifest` |
| Rebuild sitemap only | `npm run sitemap` |
| Rebuild llms.txt / llms-full.txt only | `npm run llms` |
| Everything CI runs: typecheck → styles → build → SEO | `npm run check` |
| Publish manually (fallback) | `npm run deploy` |

---

## Getting started

Requires **Node 22+** — the exact major is in `.nvmrc`, which CI reads too, so `nvm use` gives
you the same Node the site is built with.

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
pages/        One component per route (Home, About, Mill, Products, Exports, Contact, Surya, NotFound)
components/   Shared UI — Navbar, Footer, Carousel, MobileActionBar, SEO, Img, …
content/      Page copy and data, separated from layout (translations, mill journey, gallery)
context/      LanguageContext — the EN/HI/TE/TA/KN/UR switcher
constants.ts  Company details, contact numbers, certifications, product data, Surya prices
scripts/      Maintenance tooling (image optimization, image manifest, prerender, sitemap)
public/       Static assets served as-is: images/, og/ (share cards), icons/, CNAME
```

### Routing and pre-rendering

Routes are real paths (`vagdevifoods.com/mill`), and **every route is pre-rendered to static
HTML at build time**. `npm run build` runs six steps:

1. `manifest` — measures `public/images/` and writes `content/imageSizes.ts` (see below)
2. `build:client` — the browser bundle
3. `build:ssr` — a server bundle of the same app
4. `prerender` — renders each route in `content/seo.ts` and writes `dist/mill.html` *and*
   `dist/mill/index.html`, so extensionless URLs resolve at HTTP 200 on any static host
5. `sitemap` — regenerates `sitemap.xml` from the same route list, with each page's images
6. `llms` — writes `llms.txt` and `llms-full.txt` from the site's own data (see below)

This exists because the site was previously client-rendered only: crawlers that don't run
JavaScript received ~495 characters of empty shell, identical for every page. They now get the
real content and per-page metadata. **Adding a route means adding it to `content/seo.ts`** —
the router, the pre-renderer, the sitemap, the structured data and llms.txt all read from there.

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

## Search and AI visibility (SEO / GEO)

Everything a search engine or an AI assistant reads about the site is generated from the
same data the pages render, so it cannot drift from what visitors see.

**Per page** (`components/SEO.tsx`, fed by `content/seo.ts`): a complete `<title>` of about
60 characters, topic first and brand last; a 120–160 character description; canonical URL;
robots directives allowing large image previews and full snippets; Open Graph and X cards
with a 1200×630 JPEG; and the `geo.*` / `ICBM` tags for the mill's location. There is
deliberately **no `keywords` meta** — Google ignores it and Bing reads a long one as spam.

**When you change what a page says, bump its `lastModified` in `content/seo.ts`.** It becomes
the sitemap's `<lastmod>` and the page's `dateModified`. Do not set it on every build — the
old sitemap stamped every URL with the build date, which teaches crawlers to ignore it.

**Structured data** (`content/structuredData.ts`) is one connected JSON-LD graph per page,
with stable `@id`s so every page describes the same entities:

| On | Entities |
|---|---|
| Every page | WebSite · Organization + LocalBusiness (legal name, address, geo, hours, Maps listing, certificates with issuers, contact points, areas served) · the Surya and Dwaraka Brands · the page (WebPage / AboutPage / ContactPage / CollectionPage) · BreadcrumbList |
| Home | FAQPage — from `content/faq.ts`, the same array the FAQ section renders |
| Products | a Product per rice variety |
| Exports | a Product per export grade, with the specification table as properties |
| Surya | a ProductGroup per pack with 26 kg and 30 kg variants and their prices (from `SURYA_PRICES`) · a HowTo per cooking method |

The rule that keeps it trustworthy: **nothing goes in structured data that a visitor cannot
read on that page.** That is why the FAQ answers and the Surya offers are built from the same
data as the visible content. Check changes with Google's
[Rich Results Test](https://search.google.com/test/rich-results) and the
[Schema.org validator](https://validator.schema.org/).

**These rules are enforced.** `npm run check:seo` (part of `npm run check`, so it runs on every
pull request and deploy) reads the built HTML the way a crawler does and fails on: a missing or
duplicate title, a title over 65 characters, a description outside 110–165, a wrong canonical,
a page marked noindex, a returning `keywords` meta, missing Open Graph or geo tags, a JSON-LD
reference to an entity the page does not define, a Surya variant without a price, an
indexable 404, or a sitemap / robots.txt / llms.txt that lost a route.

**Tabbed content is all in the HTML.** The mill stages, export-spec grades and Surya cooking
methods render every panel and hide the inactive ones (`hidden` on a plain wrapper — a
`grid` class on the same element would override it). Rendering only the selected panel meant
seven of the eight mill stages never reached a crawler.

**For AI assistants** — ChatGPT, Perplexity, Gemini, Claude, Copilot — the build writes
`llms.txt` (a summary and page index in the llmstxt.org format) and `llms-full.txt` (every
product, specification, mill stage, cooking guide and FAQ as one Markdown file), both from
`scripts/generate-llms.mjs`. Don't hand-edit them in `dist/`; change the data. `robots.txt`
allows every crawler and names the main AI crawlers explicitly.

The FAQ answers in `content/faq.ts` are written to stand alone — each names the company, the
place and the figure — because that is the shape answer engines quote.

**IndexNow.** After each deploy the workflow pings IndexNow with the sitemap's URLs, so Bing
(whose index also feeds ChatGPT search and Copilot), Yandex, Seznam and Naver recrawl changed
pages promptly. The key is the file `public/c8156be615d309b75df79a1af708abd4.txt` — public by
design — and is repeated in `.github/workflows/deploy.yml`; keep the two in step. Google does
not use IndexNow; it reads the sitemap.

**Outside the code** (account work, not commits): verify the site in Bing Webmaster Tools
(it can import the Google Search Console property), submit `sitemap.xml` in both, and keep the
Google Business Profile's name, address, phone and hours identical to the footer.

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

### How a change reaches the site

```
pull request ──► Check (ci.yml): typecheck · styles · build · SEO       must pass to merge
      │
merge to main ─► Build & Deploy (deploy.yml):
                   EmailJS key check → npm run check → publish gh-pages
                   → confirm the live site serves the new build, every page 200
                   → ping IndexNow
```

**Open a pull request; merging it to `main` deploys.** The **Check** workflow
([`ci.yml`](.github/workflows/ci.yml)) runs `npm run check` on every pull request — the same
pre-flight you can run locally — so a type error, a style-rule break, a failed pre-render or
an SEO regression shows up on the PR, not on the live site. Before this, nothing ran until
after a merge, and the deploy itself never type-checked.

**Build & Deploy** ([`deploy.yml`](.github/workflows/deploy.yml)) repeats the check (main can
change without a PR), pushes `dist/` to the `gh-pages` branch that GitHub Pages serves, and
then **confirms the site is live**: it waits until vagdevifoods.com serves the new bundle and
checks every page in the sitemap answers 200 with its own title. A wrong page turns the run
red; Pages merely being slow is a warning. Deploys queue rather than cancel each other, so a
publish is never cut off halfway.

Watch it under the repository's **Actions** tab. A run takes one to two minutes.

**Recommended (one-time, in GitHub settings):** protect `main` under **Settings → Rules →
Rulesets** — require a pull request and the **Check / check** status. Then nothing reaches the
live site without passing the pre-flight.

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
The `gh-pages` publisher is fetched on demand with `npx` rather than installed: it is only
needed in this emergency path, and as a dependency it pulled four high-severity advisories
into every install. A manual deploy skips the EmailJS check, the live-site confirmation and
IndexNow — prefer **Actions → Build & Deploy → Run workflow** whenever Actions is up.

### Custom domain

`public/CNAME` binds **vagdevifoods.com**. For **www.vagdevifoods.com** to open securely and
redirect to it, two things must be true at once:

1. At the DNS provider, `www` is a **CNAME** to `info-vfp.github.io` (no other record on
   `www`), and the apex has GitHub's four A records: `185.199.108.153`, `185.199.109.153`,
   `185.199.110.153`, `185.199.111.153`. A CAA record, if any, must allow `letsencrypt.org`.
2. GitHub has issued a certificate that covers `www`. It only does that when `www` already
   points at it — so after fixing DNS, go to **Settings → Pages**, remove the custom domain,
   save, add `vagdevifoods.com` back, and tick **Enforce HTTPS** once the check passes.

Every deploy checks `www` and leaves a **warning** on the run until it redirects to the apex
over valid HTTPS.

### Dependencies

**Dependabot** ([`.github/dependabot.yml`](.github/dependabot.yml)) opens a pull request each
month with grouped minor and patch updates for npm packages and for the workflows' actions,
and every one of those PRs runs the Check workflow. Majors arrive one at a time.

**Held on purpose** (and excluded from Dependabot's major updates):

- **Tailwind CSS 3.** `npm audit` reports advisories in its file-watching and glob libraries
  (`braces`, `micromatch`, `chokidar`). They run only at build time over this repository's own
  files, so there is no untrusted input to exploit. The fix is Tailwind 4 — a rewrite of the
  config and of several utilities this design leans on — which deserves its own change with a
  visual review, not a dependency bump.
- **React Router 6** (`react-router-dom`, kept on the latest patched 6.30.x). The two
  advisories fixed only in v7 do not apply here: one needs links built from untrusted input
  (every link on this site is a fixed path), the other affects the data-router hydration mode
  this site does not use. v7 also adds about 6KB gzipped to every page. Revisit if links ever
  take user input, or when v6 stops receiving security fixes.

### Share cards and icons

Every route has a **1200×630 JPEG share card** in `public/og/`, set as its `og:image` in
`content/seo.ts`. WhatsApp is how most links to this site get passed around, and it previews
JPEG reliably where it does not WebP — the previous cards were a portrait packshot and a
transparent logo, which rendered as a sliver or a blank square.

`public/icons/` holds the favicon PNG, the iOS home-screen icon and the web-manifest icons,
cut from the V-chevron in the logo.

Both folders sit **outside `public/images/` on purpose**: `npm run images` converts every PNG
and JPEG in there to WebP and deletes the original, which would break both. The cards are
static artwork — if a page's headline changes materially, regenerate its card (same layout:
brand-navy scrim over a mill photograph, logo top-left, the page's headline in Playfair with
the second line in the logo orange).

### Notes

- `dist/` is generated output and is **not** committed. Never edit it by hand.
- `public/CNAME` is what binds the custom domain. Vite copies it into `dist/` on every build,
  and the deploy fails if it is missing — without it GitHub Pages drops vagdevifoods.com.

---

## Tech stack

React 19 · TypeScript · Vite 6 · Tailwind CSS 3 · React Router 6 · EmailJS

Tailwind is compiled at build time via PostCSS. It is deliberately **not** loaded from the CDN:
the CDN build compiles styles in the browser, which costs an extra download and shows a flash
of unstyled content on slow mobile connections.

**framer-motion has been removed.** It was ~60KB gzipped for a handful of transitions:
`ScrollReveal` and the mobile menu were rebuilt on IntersectionObserver and CSS first, and the
contact form's fade was the last use. Dropping it took the contact page's JavaScript from 45KB
to 4.5KB gzipped. Prefer a CSS transition or keyframe (see `vf-fade-in` in `index.css`) over
adding an animation library back.

The EmailJS client is also loaded only when the contact form is submitted, not with the page —
most visitors use WhatsApp and never need it.

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
value. `npm run lint:styles` catches it, and runs on every pull request and deploy.

**The accent is the logo's orange, in three strengths.** `brand-secondary` is `#F07F1A`,
sampled from the V-chevron in the logo — the site previously used a royal gold that appeared
nowhere in the identity. At full strength it is for fills, rules and text on navy (6.8:1);
on cream it measures only 2.6:1, so orange **text** on a light background uses
**`brand-orange-ink`** (`#B05309`, 4.9:1), and small orange labels on navy or on scrimmed
photographs use **`brand-orange-soft`** (`#FFB878`). Navy on the orange fill reads 6.8:1, but
at `/70` drops to 4.2:1 — use `/80` or stronger for small text sitting on orange. The WhatsApp
green is **`brand-whatsapp`** (the original measured 3.45:1 under white labels). All of these
exist to clear AA — see `tailwind.config.js`. The Surya microsite keeps its own pink and gold:
that is the Surya pack's palette, not the company's.

**Phones get every language shown at once, not a dropdown.** A large share of this audience
runs a rice shop in rural Telangana and reads Telugu or Hindi rather than English, so language
is a primary control rather than a setting to tuck away. A `<select>` labelled "EN" failed them
three ways: the label is meaningless if you cannot read Latin script, the other five are hidden
until you know to tap it, and it assumes familiarity with a native dropdown.

`components/LanguageStrip.tsx` shows all six as chips, so choosing is recognition — you see
your own script and press it. It sits *below* the sticky header (unmissable on arrival, then
scrolls away rather than costing 44px on every scroll), and the mobile menu carries a second
copy for anyone already scrolled down. The standalone strip hides while the menu is open, or
a visitor at the top sees two identical rows.

Desktop keeps the compact `<select>` in the nav, where space is scarce and context is richer.

**The chrome follows the language too.** Nav links (header, mobile menu, footer), the footer
headings and hours, the sticky bar's Call button and the skip link all read from
`MAIN_TRANSLATIONS` — `NAV_LINKS` carries a `labelKey`, not a label. Switching to Telugu used
to translate the headline and leave every control a visitor navigates by in English. The
longest set (Tamil) still fits the desktop nav at 1024px; re-check that if you add a link.

The rule if you touch it: **no language may be hidden behind a scroll** — an option a visitor
has to find by scrolling sideways is the problem this replaced. Six chips fit one row down to
320px; if a language is added and they stop fitting, the strip wraps to a second row rather
than scrolling. English stays abbreviated to `EN` because it is the one label a Latin-script
reader decodes instantly, which buys width for the five endonyms.

**Odia has been withdrawn.** It was offered for a while and removed; anyone who had chosen it
still has `or` saved in their browser, which `LanguageContext` no longer recognises, so they
fall back to English rather than to a broken state.

### Urdu is right-to-left

`LanguageContext` sets `document.documentElement.dir` from `RTL_LANGUAGES`, and the layout is
built from **logical** CSS properties so it mirrors on its own. That only works if you keep it
that way:

| Don't | Do |
|---|---|
| `ml-*` / `mr-*` | `ms-*` / `me-*` |
| `pl-*` / `pr-*` | `ps-*` / `pe-*` |
| `text-left` / `text-right` | `text-start` / `text-end` |
| `border-l` / `border-r` | `border-s` / `border-e` |
| `left-[…]` / `right-[…]` | `start-[…]` / `end-[…]` |
| `scroll-pl-*` | `scroll-ps-*` |

A physical property does not flip, so it silently breaks Urdu while looking fine in English.
`npm run lint:styles` flags them, with the file and line, on every pull request and deploy.

Directional glyphs need help too: a literal arrow keeps pointing the same way under RTL and
ends up aimed back at the text it should lead away from. Use `components/Arrow.tsx`, which
carries `rtl:-scale-x-100`.

### The Urdu copy is machine-translated

It was produced with Gemini and **has not been checked by a native speaker**. The same goes
for the short chrome labels (Call, Explore, Skip to content…) in all five non-English
languages, which were added later and are marked as such in the file. The blocks are
commented as such in `content/mainTranslations.ts` and `content/suryaTranslations.ts`. Treat
them as a working draft: they are structurally correct and preserve brand, certification and
place names, but wording nobody has reviewed is a real risk on a page carrying compliance
claims. The rest of the Hindi, Telugu, Tamil and Kannada copy predates this.

**Every interactive element gets at least 44px.** Where a link must stay visually small, give
the anchor `inline-flex items-center min-h-[44px]` and put the decoration on an inner `<span>`
so the underline still hugs the text. Small icon buttons need `min-w-[44px]` too — and if that
widens a row past the viewport, let it wrap rather than overflow.

**Keyboard and screen-reader basics are wired in, keep them that way:** a skip link is the
first tab stop on every page; nav links carry `aria-current="page"`; the pill toggles (export
spec tabs, mill stages, Surya pack and cooking method, contact-form topics) carry
`aria-pressed`; contact-form errors are tied to their fields with `aria-invalid` /
`aria-describedby` and the first one receives focus; the mill carousel answers the arrow keys.

### Unknown URLs get a real 404 page

GitHub Pages serves `404.html` with an HTTP 404 status for any path it does not have, and the
pre-render writes the app's own not-found page into it (`pages/NotFoundPage.tsx`, `noindex`).
A stale link — the site used hash URLs, and once had a `/markets` page — now shows every page
and the WhatsApp desk one tap away, instead of silently dropping the visitor on the home page.

Text sitting on photography is the one thing an automated check cannot judge: the contrast
tooling sees the section background, not the image. Those cases are scrimmed with a gradient
and were verified against the lightest pixel actually behind the text.
