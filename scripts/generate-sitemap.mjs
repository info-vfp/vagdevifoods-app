#!/usr/bin/env node
/**
 * Generates dist/sitemap.xml from the route registry in content/seo.ts.
 *
 * The previous sitemap was maintained by hand and had drifted: it listed hash URLs
 * (https://vagdevifoods.com/#/about), still advertised a /markets page that no longer
 * exists, and omitted /mill and /surya entirely. Generating it from the same list the
 * router and pre-renderer use is what stops that happening again.
 *
 * Two things follow current search-engine guidance:
 *
 * - **<lastmod> is each route's `lastModified`**, not the build date. Stamping every URL with
 *   today on every deploy told crawlers everything changed every time, and Google stops
 *   trusting a site's lastmod once it learns it is noise. <priority> and <changefreq> are
 *   gone: Google ignores both.
 * - **Each URL lists the photographs on that page** (an image sitemap), read from the
 *   pre-rendered HTML so it always matches what the page actually shows. The mill's own
 *   photography is a real asset in image search; logos and UI chrome are left out.
 *
 * Runs after prerender, which it depends on for the HTML.
 */
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DIST = path.join(ROOT, 'dist');
const SSR_ENTRY = path.join(ROOT, 'dist-ssr', 'entry-server.js');

const { ROUTES, SITE_URL } = await import(pathToFileURL(SSR_ENTRY).href);

const escapeXml = (s) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** Unique content images on a pre-rendered page, as absolute URLs. */
async function imagesOn(route) {
  const file = route.path === '/' ? 'index.html' : `${route.path.slice(1)}.html`;
  const html = await readFile(path.join(DIST, file), 'utf8');
  const found = new Set();
  for (const [, src] of html.matchAll(/<img\b[^>]*?\ssrc="([^"]+)"/g)) {
    if (!src.startsWith('/images/') || /^\/images\/(logos|ui)\//.test(src)) continue;
    found.add(`${SITE_URL}${src}`);
  }
  return [...found];
}

let imageCount = 0;
const urls = [];
for (const r of ROUTES) {
  const loc = `${SITE_URL}${r.path === '/' ? '/' : r.path}`;
  const images = await imagesOn(r);
  imageCount += images.length;
  urls.push(
    [
      '  <url>',
      `    <loc>${escapeXml(loc)}</loc>`,
      `    <lastmod>${r.lastModified}</lastmod>`,
      ...images.map((src) => `    <image:image><image:loc>${escapeXml(src)}</image:loc></image:image>`),
      '  </url>',
    ].join('\n')
  );
}

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls.join('\n')}
</urlset>
`;

await writeFile(path.join(DIST, 'sitemap.xml'), xml);
console.log(`sitemap.xml written with ${ROUTES.length} URLs and ${imageCount} images.`);
