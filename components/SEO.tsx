import React from 'react';
import { useLocation } from 'react-router-dom';
import { SEO_KEYWORDS } from '../constants';
import { SITE_NAME, absoluteUrl, getRouteMeta } from '../content/seo';

interface SEOProps {
    /** Overrides the title from the route registry. Usually omit and let the registry win. */
    title?: string;
    description?: string;
    keywords?: string;
    image?: string;
    type?: string;
    structuredData?: object;
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
 * Defaults come from content/seo.ts so the page, the pre-rendered HTML and the sitemap all
 * describe a route identically. Everything resolves to an absolute URL, because relative
 * og:image paths are ignored by WhatsApp and LinkedIn — and WhatsApp is this business's
 * primary channel.
 */
const SEO: React.FC<SEOProps> = ({
    title,
    description,
    keywords,
    image,
    type = 'website',
    structuredData,
}) => {
    const { pathname } = useLocation();
    // Normalise "/mill/" -> "/mill" so the canonical never varies by trailing slash.
    const path = pathname !== '/' ? pathname.replace(/\/+$/, '') : '/';
    const meta = getRouteMeta(path);

    const resolvedTitle = title ?? meta?.title ?? SITE_NAME;
    const resolvedDescription = description ?? meta?.description ?? '';
    const resolvedImage = absoluteUrl(image ?? meta?.image ?? '/images/logos/vagdevi_nav_logo.webp');
    const canonical = absoluteUrl(path);

    const fullTitle = resolvedTitle === SITE_NAME ? resolvedTitle : `${resolvedTitle} | ${SITE_NAME}`;
    const effectiveKeywords = keywords ? `${keywords}, ${SEO_KEYWORDS}` : SEO_KEYWORDS;

    return (
        <>
            <title>{fullTitle}</title>
            <meta name="description" content={resolvedDescription} />
            <meta name="keywords" content={effectiveKeywords} />
            <link rel="canonical" href={canonical} />
            <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />

            {/* Geographic signals for local search */}
            <meta name="geo.region" content="IN-TG" />
            <meta name="geo.placename" content="Miryalaguda, Nalgonda, Telangana" />
            <meta name="geo.position" content="16.8769;79.5974" />
            <meta name="ICBM" content="16.8769, 79.5974" />

            {/* Open Graph */}
            <meta property="og:type" content={type} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={resolvedDescription} />
            <meta property="og:image" content={resolvedImage} />
            <meta property="og:url" content={canonical} />
            <meta property="og:site_name" content={SITE_NAME} />
            <meta property="og:locale" content="en_IN" />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={resolvedDescription} />
            <meta name="twitter:image" content={resolvedImage} />

            {/* JSON-LD is valid in the body, so it does not need hoisting. */}
            {structuredData && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
                />
            )}
        </>
    );
};

export default SEO;
