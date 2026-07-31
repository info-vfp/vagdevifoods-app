import React from 'react';
import { Helmet } from 'react-helmet-async';
import { SEO_KEYWORDS } from '../constants'; // Import centralized keywords

interface SEOProps {
    title: string;
    description: string;
    keywords?: string;
    image?: string;
    url?: string;
    type?: string;
    structuredData?: object;
}

const SEO: React.FC<SEOProps> = ({
    title,
    description,
    keywords,
    image = '/images/ui/logo-bg-removed.png', // Default image
    url = window.location.href,
    type = 'website',
    structuredData,
}) => {
    const siteTitle = 'Vagdevi Food Products';
    const fullTitle = title === siteTitle ? title : `${title} | ${siteTitle}`;

    // Combine page-specific keywords with global high-value B2B keywords
    const effectiveKeywords = keywords
        ? `${keywords}, ${SEO_KEYWORDS}`
        : SEO_KEYWORDS;

    return (
        <Helmet>
            {/* Standard Metadata */}
            <title>{fullTitle}</title>
            <meta name="description" content={description} />
            <meta name="keywords" content={effectiveKeywords} />
            <link rel="canonical" href={url} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={type} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />
            <meta property="og:url" content={url} />
            <meta property="og:site_name" content={siteTitle} />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image} />

            {/* Structured Data (JSON-LD) for GEO */}
            {structuredData && (
                <script type="application/ld+json">
                    {JSON.stringify(structuredData)}
                </script>
            )}
        </Helmet>
    );
};

export default SEO;
