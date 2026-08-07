#!/usr/bin/env node
/**
 * Generates dist/sitemap.xml from the route registry in content/seo.ts.
 *
 * The previous sitemap was maintained by hand and had drifted: it listed hash URLs
 * (https://vagdevifoods.com/#/about), still advertised a /markets page that no longer
 * exists, and omitted /mill and /surya entirely. Generating it from the same list the
 * router and pre-renderer use is what stops that happening again.
 */
import { writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SSR_ENTRY = path.join(ROOT, 'dist-ssr', 'entry-server.js');

const { ROUTES, SITE_URL } = await import(pathToFileURL(SSR_ENTRY).href);

const lastmod = new Date().toISOString().split('T')[0];

const urls = ROUTES.map((r) => {
  const loc = `${SITE_URL}${r.path === '/' ? '/' : r.path}`;
  return [
    '  <url>',
    `    <loc>${loc}</loc>`,
    `    <lastmod>${lastmod}</lastmod>`,
    `    <changefreq>${r.changefreq}</changefreq>`,
    `    <priority>${r.priority.toFixed(1)}</priority>`,
    '  </url>',
  ].join('\n');
}).join('\n');

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

await writeFile(path.join(ROOT, 'dist', 'sitemap.xml'), xml);
console.log(`sitemap.xml written with ${ROUTES.length} URLs (lastmod ${lastmod}).`);
