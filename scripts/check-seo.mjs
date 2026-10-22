#!/usr/bin/env node
/**
 * Checks the built site the way a search engine reads it, and fails the build on a regression.
 *
 * Runs after `npm run build` (as `npm run check:seo`, and inside `npm run check`). It reads the
 * pre-rendered HTML in dist/ — what crawlers actually receive — rather than the React source,
 * so it catches problems introduced anywhere: a page that lost its canonical, a title that grew
 * past the point Google cuts it off, a structured-data reference to an entity that no longer
 * exists, or the 404 page becoming indexable.
 *
 * The rules mirror the "Search and AI visibility" section of the README.
 */
import { readFile, access } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DIST = path.join(ROOT, 'dist');
const { ROUTES, SITE_URL } = await import(pathToFileURL(path.join(ROOT, 'dist-ssr', 'entry-server.js')).href);

const TITLE_MAX = 65;
const DESCRIPTION_RANGE = [110, 165];
const REQUIRED_META = [
  'og:title', 'og:description', 'og:image', 'og:image:width', 'og:image:height', 'og:url', 'og:locale',
  'twitter:card', 'twitter:image', 'geo.region', 'geo.position', 'ICBM',
];

const problems = [];
const fail = (where, msg) => problems.push(`${where}: ${msg}`);

const decode = (s) =>
  s.replace(/&amp;/g, '&').replace(/&#x27;|&#39;/g, "'").replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>');

const headOf = (html) => html.slice(0, html.indexOf('</head>'));
const count = (s, re) => (s.match(re) || []).length;

/** Every `{"@id": …}` reference in the graph must point at a node defined in the same graph. */
function checkGraph(where, graph) {
  const defined = new Set();
  const referenced = [];
  const walk = (o) => {
    if (Array.isArray(o)) return o.forEach(walk);
    if (!o || typeof o !== 'object') return;
    const keys = Object.keys(o);
    if (o['@id'] && keys.length > 1) defined.add(o['@id']);
    if (o['@id'] && keys.length === 1) referenced.push(o['@id']);
    keys.forEach((k) => walk(o[k]));
  };
  walk(graph);
  for (const id of referenced) if (!defined.has(id)) fail(where, `structured data references ${id}, which is not defined on the page`);

  for (const node of graph) {
    const types = [].concat(node['@type']);
    if (types.includes('ProductGroup')) {
      for (const v of node.hasVariant ?? []) {
        if (!v.offers?.price || !v.offers?.priceCurrency) fail(where, `product variant ${v.name} has no price — every Offer must match a price shown on the page`);
      }
    }
    if (types.includes('FAQPage') && !node.mainEntity?.length) fail(where, 'FAQPage has no questions');
  }
}

for (const route of ROUTES) {
  const file = route.path === '/' ? 'index.html' : `${route.path.slice(1)}.html`;
  const where = route.path;
  const html = await readFile(path.join(DIST, file), 'utf8');
  const head = headOf(html);

  const titles = [...head.matchAll(/<title[^>]*>([^<]*)<\/title>/g)].map((m) => decode(m[1]));
  if (titles.length !== 1) fail(where, `expected one <title>, found ${titles.length}`);
  else if (titles[0].length > TITLE_MAX) fail(where, `title is ${titles[0].length} characters (max ${TITLE_MAX}): "${titles[0]}"`);

  const description = decode((head.match(/<meta[^>]*name="description" content="([^"]*)"/) || [])[1] ?? '');
  if (description.length < DESCRIPTION_RANGE[0] || description.length > DESCRIPTION_RANGE[1]) {
    fail(where, `description is ${description.length} characters (want ${DESCRIPTION_RANGE.join('–')})`);
  }

  const canonicals = [...head.matchAll(/rel="canonical" href="([^"]*)"/g)].map((m) => m[1]);
  const expected = `${SITE_URL}${route.path === '/' ? '/' : route.path}`;
  if (canonicals.length !== 1 || canonicals[0] !== expected) fail(where, `canonical should be exactly one ${expected}, found ${JSON.stringify(canonicals)}`);

  if (/noindex/.test(head)) fail(where, 'page is marked noindex');
  if (/name="keywords"/.test(html)) fail(where, 'keywords meta is back — Google ignores it and Bing reads it as spam');
  for (const key of REQUIRED_META) if (!head.includes(`"${key}"`)) fail(where, `missing ${key} meta`);

  const blocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  if (blocks.length !== 1) fail(where, `expected one JSON-LD block, found ${blocks.length}`);
  for (const [, json] of blocks) {
    try {
      checkGraph(where, JSON.parse(json)['@graph'] ?? []);
    } catch (e) {
      fail(where, `JSON-LD does not parse: ${e.message}`);
    }
  }

  const image = (head.match(/property="og:image" content="([^"]*)"/) || [])[1] ?? '';
  const imagePath = image.replace(SITE_URL, '');
  try {
    await access(path.join(DIST, imagePath));
  } catch {
    fail(where, `og:image ${imagePath} is not in the build`);
  }
}

// The 404 page must stay out of the index and carry no structured data.
const notFound = await readFile(path.join(DIST, '404.html'), 'utf8');
if (!/name="robots" content="noindex/.test(headOf(notFound))) fail('404.html', 'is not noindex');
if (/application\/ld\+json/.test(notFound)) fail('404.html', 'carries structured data');

// Files crawlers and AI assistants fetch directly.
const sitemap = await readFile(path.join(DIST, 'sitemap.xml'), 'utf8');
for (const route of ROUTES) {
  const loc = `<loc>${SITE_URL}${route.path === '/' ? '/' : route.path}</loc>`;
  if (!sitemap.includes(loc)) fail('sitemap.xml', `missing ${route.path}`);
}
if (/<lastmod>\d{4}-\d{2}-\d{2}<\/lastmod>/.test(sitemap) === false) fail('sitemap.xml', 'has no lastmod dates');
const robots = await readFile(path.join(DIST, 'robots.txt'), 'utf8');
if (!robots.includes(`Sitemap: ${SITE_URL}/sitemap.xml`)) fail('robots.txt', 'does not point to the sitemap');
if (/^Disallow:\s*\/\s*$/m.test(robots)) fail('robots.txt', 'disallows the whole site');
for (const f of ['llms.txt', 'llms-full.txt', 'CNAME']) {
  try {
    await access(path.join(DIST, f));
  } catch {
    fail(f, 'missing from the build');
  }
}

if (problems.length) {
  for (const p of problems) console.log(`::error::${p}`);
  console.error(`\n${problems.length} SEO problem(s). See "Search and AI visibility" in the README.`);
  process.exit(1);
}
console.log(`SEO OK — ${ROUTES.length} routes, 404, sitemap, robots and llms files all check out.`);
