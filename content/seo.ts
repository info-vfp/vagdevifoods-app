/**
 * Single source of truth for per-route SEO metadata.
 *
 * Consumed by places that must never disagree:
 *   - components/SEO.tsx           (what the browser and crawlers read)
 *   - content/structuredData.ts    (each page's WebPage and breadcrumb entities)
 *   - scripts/prerender.mjs        (which routes get static HTML written)
 *   - scripts/generate-sitemap.mjs (URLs and <lastmod>)
 *   - scripts/generate-llms-full.mjs
 *
 * The previous hand-maintained sitemap.xml drifted out of sync — it still listed a
 * deleted /markets route and was missing /mill and /surya. Deriving all three from
 * this one list is what prevents that recurring.
 */

import { SURYA_PRICES, inr } from '../constants';

export const SITE_URL = 'https://vagdevifoods.com';
export const SITE_NAME = 'Vagdevi Food Products';
/** Locale of the pre-rendered pages: Indian English. */
export const SITE_LOCALE = 'en-IN';
export const DEFAULT_SHARE_IMAGE = '/og/home.jpg';

export interface RouteMeta {
  /** Canonical path, always with a leading slash and no trailing slash (except root). */
  path: string;
  /**
   * The complete <title>, used as-is — no suffix is appended. Keep it near 60 characters:
   * the page's own topic first, the brand last (the home page leads with the brand). Longer
   * titles get cut off in results, and Google rewrites ones that bury the topic.
   */
  title: string;
  /** Short name for breadcrumbs and structured data, e.g. "The Mill". */
  label: string;
  /** 120–160 characters: what the page answers, with the facts a searcher is checking for. */
  description: string;
  /** schema.org page type — WebPage or a subtype (AboutPage, ContactPage, CollectionPage). */
  type: 'WebPage' | 'AboutPage' | 'ContactPage' | 'CollectionPage';
  /**
   * When the page's content last changed meaningfully (ISO date). Feeds the sitemap's
   * <lastmod> and the page's dateModified. Update it when you change what a page says —
   * not on every build: search engines stop trusting a lastmod that changes with no
   * content change, which is what the old build-date stamp did.
   */
  lastModified: string;
  /**
   * Site-relative path to the route's 1200×630 share card in public/og/; converted to an
   * absolute URL for og:image. Kept outside public/images/ on purpose — `npm run images`
   * converts everything in there to WebP, which WhatsApp does not reliably preview.
   */
  image: string;
  /** Describes the share card for screen readers on the platforms that support it. */
  imageAlt: string;
}

/** Turn a site-relative path into the absolute URL crawlers and social scrapers require. */
export const absoluteUrl = (path: string): string => {
  if (/^https?:\/\//.test(path)) return path;
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
};

export const ROUTES: RouteMeta[] = [
  {
    path: '/',
    title: 'Vagdevi Food Products | Rice Mill & Exporter, Telangana',
    label: 'Home',
    description:
      'ISO 22000:2018 rice mill in Miryalaguda, Telangana. JSR, HMT and RNR rice, steam or double boiled, for bulk, private label and export. Quotes on WhatsApp.',
    type: 'WebPage',
    lastModified: '2026-10-21',
    image: '/og/home.jpg',
    imageAlt: 'The Vagdevi Food Products mill and silos at Yadgarpally — “Milled where the paddy is grown.”',
  },
  {
    path: '/about',
    title: 'About: Nalgonda Rice Millers Since 2017 | Vagdevi Foods',
    label: 'About',
    description:
      'Rice millers since 2017, run by promoters with 30+ years in the paddy trade. Paddy bought direct from Nalgonda farmers and milled on one certified site.',
    type: 'AboutPage',
    lastModified: '2026-10-21',
    image: '/og/about.jpg',
    imageAlt: 'Farmers at the paddy procurement counter of the Vagdevi mill',
  },
  {
    path: '/mill',
    title: 'Our Rice Mill: Paddy to Pack in 8 Stages | Vagdevi Foods',
    label: 'The Mill',
    description:
      'Inside our rice mill at Yadgarpally: weighbridge, gate sampling, lab, drying, SATAKE milling, colour sorting and dispatch, photographed during a real shift.',
    type: 'WebPage',
    lastModified: '2026-10-21',
    image: '/og/mill.jpg',
    imageAlt: 'The main gate of the Vagdevi Food Products mill at Yadgarpally',
  },
  {
    path: '/products',
    title: 'JSR, HMT & RNR Rice — 10, 26, 30 kg Packs | Vagdevi Foods',
    label: 'Products',
    description:
      'JSR Lachkari Kolam, HMT Sona Masoori and RNR Telangana Sona rice, steam or double boiled, in 10, 26 and 30 kg packs. Plus rice bran, broken rice and husk.',
    type: 'CollectionPage',
    lastModified: '2026-10-21',
    image: '/og/products.jpg',
    imageAlt: 'Milled JSR rice — JSR, HMT and RNR, steam or double boiled',
  },
  {
    path: '/business',
    title: 'Sona Masoori Rice Exporter, APEDA Registered | Vagdevi Foods',
    label: 'Exports',
    description:
      'APEDA-registered rice exporter (RCMC 221976). Sona Masoori and steam rice export specifications, private label bags and a signed lab report with every lot.',
    type: 'WebPage',
    lastModified: '2026-10-21',
    image: '/og/business.jpg',
    imageAlt: 'Warehouse and loading yard at the Vagdevi mill — rice exports',
  },
  {
    path: '/contact',
    title: 'Contact the Rice Mill in Miryalaguda | Vagdevi Foods',
    label: 'Contact',
    description:
      'WhatsApp or call +91 90004 16808, Mon–Sat 9 am–6 pm IST. Rice mill on Vijayawada Road, Yadgarpally, Miryalaguda, Telangana 508207. Buyer visits welcome.',
    type: 'ContactPage',
    lastModified: '2026-10-21',
    image: '/og/contact.jpg',
    imageAlt: 'The Vagdevi mill at Yadgarpally — talk to the mill directly',
  },
  {
    path: '/surya',
    title: 'Surya Rice — Pink JSR & Black HMT Bags | Vagdevi Foods',
    label: 'Surya Rice',
    // Prices come from SURYA_PRICES so the snippet can never quote an old price.
    description:
      `Surya rice: pink JSR Lachkari Kolam and black HMT boiled. ${inr(SURYA_PRICES.bag26)} per 26 kg bag, ` +
      `${inr(SURYA_PRICES.bag30)} per 30 kg. Milled in Miryalaguda, Telangana.`,
    type: 'CollectionPage',
    lastModified: '2026-10-21',
    image: '/og/surya.jpg',
    imageAlt: 'Surya rice — pink JSR and black HMT packs. Love in every bite.',
  },
];

/** All canonical paths, used by the prerender and sitemap scripts. */
export const ROUTE_PATHS = ROUTES.map((r) => r.path);

export const getRouteMeta = (path: string): RouteMeta | undefined =>
  ROUTES.find((r) => r.path === path);
