import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { AppRoutes } from './App';

// Re-exported so the build scripts read routes from the same registry the app renders
// from, rather than keeping their own copy that could drift.
export { ROUTES, SITE_URL } from './content/seo';

/**
 * Renders one route to static HTML at build time.
 *
 * Called by scripts/prerender.mjs once per route. The point is that crawlers — and in
 * particular AI crawlers, most of which do not execute JavaScript — receive the real page
 * text and metadata instead of an empty shell.
 *
 * Metadata tags come back embedded in this markup rather than as a separate head string:
 * React 19 hoists <title>/<meta>/<link> to <head> on the client, but renderToString leaves
 * them inline. The prerender script lifts them into <head> so the two agree.
 */
export function render(url: string): string {
  return renderToString(
    <StaticRouter location={url}>
      <AppRoutes />
    </StaticRouter>
  );
}
