/**
 * Single source of truth for per-route SEO metadata.
 *
 * Consumed by three places that must never disagree:
 *   - components/SEO.tsx        (what the browser and crawlers read)
 *   - scripts/prerender.mjs     (which routes get static HTML written)
 *   - scripts/generate-sitemap.mjs
 *
 * The previous hand-maintained sitemap.xml drifted out of sync — it still listed a
 * deleted /markets route and was missing /mill and /surya. Deriving all three from
 * this one list is what prevents that recurring.
 */

export const SITE_URL = 'https://vagdevifoods.com';
export const SITE_NAME = 'Vagdevi Food Products';

export interface RouteMeta {
  /** Canonical path, always with a leading slash and no trailing slash (except root). */
  path: string;
  title: string;
  description: string;
  /** Site-relative image path; converted to an absolute URL for og:image. */
  image: string;
  /** Sitemap hints. */
  priority: number;
  changefreq: 'daily' | 'weekly' | 'monthly' | 'yearly';
}

/** Turn a site-relative path into the absolute URL crawlers and social scrapers require. */
export const absoluteUrl = (path: string): string => {
  if (/^https?:\/\//.test(path)) return path;
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
};

export const ROUTES: RouteMeta[] = [
  {
    path: '/',
    title: 'Bulk Rice Millers & Exporters in Miryalaguda, Telangana',
    description:
      'ISO 22000:2018 certified rice mill at Yadgarpally, Miryalaguda. Bulk supply, private label and export of JSR, HMT and RNR steam and double-boiled rice. FSSAI 13618008000475.',
    image: '/images/products/surya/pack_pink_jsr.webp',
    priority: 1.0,
    changefreq: 'monthly',
  },
  {
    path: '/about',
    title: 'About Us — Rice Millers in Nalgonda District Since 2017',
    description:
      'Incorporated 15 September 2017 and run by promoters with over thirty years in the paddy trade. Vagdevi Food Products mills, packs and exports rice from a single site in Nalgonda district, Telangana.',
    image: '/images/mill/procurement_hall.webp',
    priority: 0.8,
    changefreq: 'yearly',
  },
  {
    path: '/mill',
    title: 'The Mill — Inside Our Rice Plant at Yadgarpally',
    description:
      'Eight stages from a farmer’s truck to a stitched bag: weighbridge, sampling, lab, drying, SATAKE milling, colour sorting and dispatch. Every photograph shot inside our own mill.',
    image: '/images/mill/gate_sign.webp',
    priority: 0.9,
    changefreq: 'monthly',
  },
  {
    path: '/products',
    title: 'Rice Varieties — JSR, HMT & RNR in 10, 26 and 30 kg Packs',
    description:
      'JSR Lachkari Kolam, HMT Sona Masoori and RNR Telangana Sona, each available steam or double boiled in 10, 26 and 30 kg packs, plus rice bran, broken rice and husk by-products.',
    image: '/images/products/varieties/jsr_rice.webp',
    priority: 0.9,
    changefreq: 'monthly',
  },
  {
    path: '/business',
    title: 'Rice Exports — APEDA Registered Manufacturer Exporter',
    description:
      'A supply partner for importers, wholesalers and private-label brands. APEDA RCMC 221976, IEC AAGCV1018C. Export specifications for Sona Masoori and steam rice, with a lab report per lot.',
    image: '/images/mill/warehouse_yard.webp',
    priority: 0.9,
    changefreq: 'monthly',
  },
  {
    path: '/contact',
    title: 'Contact — Talk to the Mill Directly',
    description:
      'WhatsApp or call the sales desk on +91 90004 16808, Monday to Saturday 9 am to 6 pm IST. Mill at Sy. Nos. 328–333, Vijayawada Road, Yadgarpally, Miryalaguda, Telangana 508207.',
    image: '/images/mill/plant_silos.webp',
    priority: 0.8,
    changefreq: 'yearly',
  },
  {
    path: '/surya',
    title: "Vagdevi's Surya Rice — Love in Every Bite",
    description:
      'Surya rice by Vagdevi Food Products. Pink for JSR Lachkari Kolam, black for HMT boiled, in 10, 26 and 30 kg packs. Eight pack colours, milled in Miryalaguda, Telangana.',
    image: '/images/products/surya/pack_pink_jsr.webp',
    priority: 0.8,
    changefreq: 'monthly',
  },
];

/** All canonical paths, used by the prerender and sitemap scripts. */
export const ROUTE_PATHS = ROUTES.map((r) => r.path);

export const getRouteMeta = (path: string): RouteMeta | undefined =>
  ROUTES.find((r) => r.path === path);
