#!/usr/bin/env node
/**
 * Writes a real static HTML file for every route.
 *
 * Before this existed the deployed site was a client-rendered shell: crawlers that do not
 * execute JavaScript received ~495 characters of markup and one generic <title>, identical
 * for all seven pages. That is fatal for AI/generative engines and weak even for Google.
 *
 * Each route is rendered to dist/<route>/index.html, which GitHub Pages serves directly at
 * HTTP 200 with the page's real text and its own metadata. The client bundle then hydrates
 * that markup, so behaviour in the browser is unchanged.
 *
 * Runs after both `vite build` and `vite build --ssr`.
 */
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DIST = path.join(ROOT, 'dist');
const SSR_ENTRY = path.join(ROOT, 'dist-ssr', 'entry-server.js');

const { render, ROUTES } = await import(pathToFileURL(SSR_ENTRY).href);

const template = await readFile(path.join(DIST, 'index.html'), 'utf8');

if (!template.includes('<div id="root"></div>')) {
  console.error('prerender: could not find the #root placeholder in dist/index.html');
  process.exit(1);
}

const results = [];

for (const route of ROUTES) {
  const html = await render(route.path);

  // React 19 hoists <title>, <meta> and <link> into <head> on the client, but
  // renderToString leaves them inline in the body. Left there they would (a) not be seen
  // by crawlers that only read <head>, and (b) cause a hydration mismatch, because the
  // server and client DOM trees would differ. Lifting them here makes both correct — and
  // means preloads are discovered early enough to actually help.
  const hoisted = [];
  const body = html.replace(/<(title|meta|link)\b[^>]*?(?:\/>|>(?:[\s\S]*?<\/\1>)?)/g, (tag, name) => {
    // Marked so index.tsx can drop them the moment React takes over. React hoists its own
    // copies into <head> but only dedupes against tags it rendered itself — these were moved
    // here by this script, so without the marker every client-side navigation would leave the
    // previous page's canonical and description sitting alongside the new one.
    hoisted.push(tag.replace(new RegExp(`^<${name}\\b`), `<${name} data-prerendered-meta`));
    return '';
  });

  // The template ships a static placeholder title; the route's own title replaces it.
  const hasTitle = hoisted.some((t) => t.startsWith('<title'));

  const page = template
    .replace('<div id="root"></div>', `<div id="root">${body}</div>`)
    .replace(hasTitle ? /<title>[\s\S]*?<\/title>\s*/ : /(?!)/, '')
    .replace('</head>', `  ${hoisted.join('\n    ')}\n  </head>`);

  if (route.path === '/') {
    await writeFile(path.join(DIST, 'index.html'), page);
  } else {
    const slug = route.path.replace(/^\//, '');
    // Written twice on purpose, because static hosts disagree about extensionless URLs:
    //   dist/mill.html        -> GitHub Pages serves this for /mill at HTTP 200
    //   dist/mill/index.html  -> directory-index hosts serve this for /mill/
    // Emitting both means /mill resolves at 200 without a redirect, so the served URL
    // matches the canonical exactly. The duplication costs ~25KB per route.
    await writeFile(path.join(DIST, `${slug}.html`), page);
    await mkdir(path.join(DIST, slug), { recursive: true });
    await writeFile(path.join(DIST, slug, 'index.html'), page);
  }

  const textChars = page
    .replace(/<script[\s\S]*?<\/script>/g, '')
    .replace(/<style[\s\S]*?<\/style>/g, '')
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim().length;

  results.push({ route: route.path, kb: Math.round(page.length / 1024), textChars });
}

// GitHub Pages serves 404.html for any unmatched path. Handing it the app shell means a
// mistyped URL still boots the site (which then redirects) rather than showing GitHub's
// own 404 page.
await writeFile(path.join(DIST, '404.html'), template);

console.log('\nPre-rendered routes:');
console.log('  ' + 'route'.padEnd(14) + 'size'.padStart(7) + 'readable text'.padStart(16));
for (const r of results) {
  console.log(`  ${r.route.padEnd(14)}${(r.kb + 'KB').padStart(7)}${(r.textChars + ' chars').padStart(16)}`);
}

const thin = results.filter((r) => r.textChars < 1000);
if (thin.length) {
  console.warn(
    `\n::warning::${thin.length} route(s) rendered with under 1000 characters of text — ` +
      'check that content is not being hidden during server render.'
  );
} else {
  console.log(`\nAll ${results.length} routes carry real content. Plus 404.html.`);
}
