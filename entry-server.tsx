import { prerenderToNodeStream } from 'react-dom/static';
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
 * Uses `prerenderToNodeStream` rather than `renderToString` because the route components are
 * loaded with React.lazy (see App.tsx). renderToString cannot wait for a lazy chunk: it would
 * emit the Suspense fallback and every pre-rendered page would ship an empty shell again,
 * undoing the whole point of this file. The static prerender API resolves the tree completely
 * before handing back the markup.
 *
 * Metadata tags come back embedded in this markup rather than as a separate head string:
 * React hoists <title>/<meta>/<link> into <head> on the client, but a server render leaves
 * them in the stream. The prerender script lifts them into <head> so the two agree.
 */
export async function render(url: string): Promise<string> {
  const { prelude } = await prerenderToNodeStream(
    <StaticRouter location={url}>
      <AppRoutes />
    </StaticRouter>
  );

  const chunks: Buffer[] = [];
  for await (const chunk of prelude) chunks.push(Buffer.from(chunk));
  return Buffer.concat(chunks).toString('utf8');
}
