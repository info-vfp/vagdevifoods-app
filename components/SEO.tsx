import React from 'react';
import { useLocation } from 'react-router-dom';
import { GEO_COORDINATES } from '../constants';
import { SITE_NAME, DEFAULT_SHARE_IMAGE, absoluteUrl, getRouteMeta } from '../content/seo';
import {
    buildGraph, websiteSchema, organizationSchema, brandSchemas, webPageSchema, breadcrumbSchema,
} from '../content/structuredData';

interface SEOProps {
    /** Overrides the title from the route registry. Usually omit and let the registry win. */
    title?: string;
    description?: string;
    image?: string;
    type?: string;
    /** Extra JSON-LD nodes for this page — products, FAQ, how-tos — added to the shared graph. */
    schema?: (object | null)[];
    /** Keep this page out of search results (the 404 page). */
    noindex?: boolean;
}

/**
 * Emits per-page metadata.
 *
 * Uses React 19's built-in document metadata support: <title>, <meta> and <link> rendered
 * anywhere in the tree are hoisted into <head> automatically, on both the server and the
 * client, and are swapped correctly on navigation.
 *
 * This deliberately does not use react-helmet-async. That library's latest release (2.0.5)
 * predates React 19 — it declares React 18 as its peer maximum — and under React 19 it
 * stops updating the head after hydration, so the title and canonical stayed frozen on the
 * first page for the whole session.
 *
 * Defaults come from content/seo.ts so the page, the pre-rendered HTML, the sitemap and the
 * structured data all describe a route identically. Everything resolves to an absolute URL,
 * because relative og:image paths are ignored by WhatsApp and LinkedIn — and WhatsApp is this
 * business's primary channel.
 *
 * There is no `keywords` meta: Google has ignored it for over a decade, and Bing treats a long
 * one as a spam signal. Relevance comes from titles, headings, body copy and structured data.
 */
const SEO: React.FC<SEOProps> = ({
    title,
    description,
    image,
    type = 'website',
    schema = [],
    noindex = false,
}) => {
    const { pathname } = useLocation();
    // Normalise "/mill/" -> "/mill" so the canonical never varies by trailing slash.
    const path = pathname !== '/' ? pathname.replace(/\/+$/, '') : '/';
    const meta = getRouteMeta(path);

    const fullTitle = title ? `${title} | ${SITE_NAME}` : meta?.title ?? SITE_NAME;
    const resolvedDescription = description ?? meta?.description ?? '';
    // Every route has its own 1200×630 JPEG share card in public/og/. JPEG rather than WebP
    // because WhatsApp — this business's main channel — does not reliably preview WebP.
    const resolvedImage = absoluteUrl(image ?? meta?.image ?? DEFAULT_SHARE_IMAGE);
    const imageAlt = meta?.imageAlt ?? `${SITE_NAME} — rice mill at Yadgarpally, Miryalaguda, Telangana`;
    const canonical = absoluteUrl(path);

    // One connected graph per page: who publishes the site, the company, this page and where
    // it sits, then whatever the page itself is about. A noindexed page gets none of it.
    const graph = noindex
        ? null
        : buildGraph(
            websiteSchema(),
            organizationSchema(),
            ...brandSchemas(),
            webPageSchema(path),
            breadcrumbSchema(path),
            ...schema,
        );

    return (
        <>
            <title>{fullTitle}</title>
            <meta name="description" content={resolvedDescription} />
            {!noindex && <link rel="canonical" href={canonical} />}
            <meta
                name="robots"
                content={noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'}
            />

            {/* Geographic meta for regional engines and directories. Google reads location from
                the LocalBusiness structured data instead; these are kept because they cost
                nothing and some crawlers still use them. */}
            <meta name="geo.region" content="IN-TG" />
            <meta name="geo.placename" content="Miryalaguda, Nalgonda, Telangana, India" />
            <meta name="geo.position" content={`${GEO_COORDINATES.lat};${GEO_COORDINATES.lng}`} />
            <meta name="ICBM" content={`${GEO_COORDINATES.lat}, ${GEO_COORDINATES.lng}`} />

            {/* Open Graph */}
            <meta property="og:type" content={type} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={resolvedDescription} />
            <meta property="og:image" content={resolvedImage} />
            <meta property="og:image:type" content="image/jpeg" />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />
            <meta property="og:image:alt" content={imageAlt} />
            <meta property="og:url" content={canonical} />
            <meta property="og:site_name" content={SITE_NAME} />
            <meta property="og:locale" content="en_IN" />
            {meta && <meta property="og:updated_time" content={`${meta.lastModified}T00:00:00+05:30`} />}

            {/* Twitter / X */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={resolvedDescription} />
            <meta name="twitter:image" content={resolvedImage} />
            <meta name="twitter:image:alt" content={imageAlt} />

            {/* JSON-LD is valid in the body, so it does not need hoisting. */}
            {graph && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
                />
            )}
        </>
    );
};

export default SEO;
