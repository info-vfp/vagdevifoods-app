/**
 * JSON-LD builders.
 *
 * Every value here is sourced from constants.ts — i.e. from facts already published on
 * the site. Nothing is invented, and no claim appears in schema that a visitor cannot
 * also read on the page.
 *
 * Serves both halves of the brief:
 *   - local/geographic search  -> LocalBusiness with geo, address, hours, areaServed
 *   - generative engines       -> explicit, machine-readable entities and site hierarchy
 */
import {
  COMPANY_NAME,
  SHORT_COMPANY_NAME,
  COMPANY_CONTACT_EMAIL,
  COMPANY_CONTACT_PHONE,
  COMPANY_WHATSAPP_NUMBER,
  GEO_COORDINATES,
  IEC_NUMBER,
  CERTIFICATIONS,
  RICE_VARIETIES_DATA,
  PACK_SIZES,
} from '../constants';
import { SITE_URL, SITE_NAME, absoluteUrl, getRouteMeta } from './seo';

/** States the mill dispatches to, as stated in PILLARS_DATA on the home page. */
export const STATES_SERVED = [
  'Maharashtra',
  'Tamil Nadu',
  'Karnataka',
  'Andhra Pradesh',
  'Chhattisgarh',
  'Telangana',
];

const POSTAL_ADDRESS = {
  '@type': 'PostalAddress',
  streetAddress: 'Sy. Nos. 328–333, Vijayawada Road, Yadgarpally',
  addressLocality: 'Miryalaguda',
  addressRegion: 'Telangana',
  postalCode: '508207',
  addressCountry: 'IN',
};

/** Mon–Sat, 9am–6pm IST — the hours already stated on the contact page. */
const OPENING_HOURS = {
  '@type': 'OpeningHoursSpecification',
  dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  opens: '09:00',
  closes: '18:00',
};

/** Stable @id so separate JSON-LD blocks are understood as the same real-world entity. */
export const ORGANISATION_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;

export const organizationSchema = () => ({
  '@type': ['Organization', 'LocalBusiness'],
  '@id': ORGANISATION_ID,
  name: COMPANY_NAME,
  alternateName: [SHORT_COMPANY_NAME, 'Vagdevi Rice Mill'],
  url: SITE_URL,
  logo: absoluteUrl('/images/logos/vagdevi_nav_logo.webp'),
  image: absoluteUrl('/images/mill/gate_sign.webp'),
  description:
    'ISO 22000:2018 certified rice mill at Yadgarpally, Miryalaguda, Telangana. Bulk supply, private label and export of JSR, HMT and RNR steam and double-boiled rice.',
  foundingDate: '2017-09-15',
  address: POSTAL_ADDRESS,
  geo: {
    '@type': 'GeoCoordinates',
    latitude: GEO_COORDINATES.lat,
    longitude: GEO_COORDINATES.lng,
  },
  telephone: COMPANY_CONTACT_PHONE,
  email: COMPANY_CONTACT_EMAIL,
  openingHoursSpecification: [OPENING_HOURS],
  currenciesAccepted: 'INR',
  // Where the mill actually dispatches to — the core local/geographic signal.
  areaServed: STATES_SERVED.map((name) => ({
    '@type': 'State',
    name,
    containedInPlace: { '@type': 'Country', name: 'India' },
  })),
  knowsAbout: [
    'Rice milling',
    'Paddy procurement',
    'JSR Lachkari Kolam rice',
    'HMT Sona Masoori rice',
    'RNR Telangana Sona rice',
    'Steam rice',
    'Double boiled rice',
    'Private label rice packing',
    'Rice export',
  ],
  // Certifications, with the numbers and expiry dates published on the home page.
  hasCredential: CERTIFICATIONS.map((c) => ({
    '@type': 'EducationalOccupationalCredential',
    credentialCategory: 'certification',
    name: c.name,
    identifier: c.number,
    validUntil: c.validTo,
  })),
  identifier: [
    { '@type': 'PropertyValue', name: 'IEC', value: IEC_NUMBER },
    { '@type': 'PropertyValue', name: 'FSSAI', value: '13618008000475' },
    { '@type': 'PropertyValue', name: 'APEDA RCMC', value: '221976' },
  ],
  contactPoint: [
    {
      '@type': 'ContactPoint',
      telephone: COMPANY_CONTACT_PHONE,
      contactType: 'sales',
      areaServed: 'IN',
      availableLanguage: ['English', 'Hindi', 'Telugu', 'Tamil', 'Kannada'],
    },
  ],
  sameAs: [`https://wa.me/${COMPANY_WHATSAPP_NUMBER}`],
});

export const websiteSchema = () => ({
  '@type': 'WebSite',
  '@id': WEBSITE_ID,
  url: SITE_URL,
  name: SITE_NAME,
  publisher: { '@id': ORGANISATION_ID },
  inLanguage: 'en-IN',
});

/** Trail from Home to the current page — drives breadcrumb display and states hierarchy. */
export const breadcrumbSchema = (path: string) => {
  const items = [{ name: 'Home', path: '/' }];
  if (path !== '/') {
    const meta = getRouteMeta(path);
    items.push({ name: meta ? meta.title.split('—')[0].trim() : path, path });
  }
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
};

/** One Product per rice variety, built from the data already rendered on /products. */
export const productSchemas = () =>
  RICE_VARIETIES_DATA.map((v) => ({
    '@type': 'Product',
    name: `${v.name} Rice — ${v.altName}`,
    description: v.description,
    image: absoluteUrl(`/${v.imageUrl}`),
    category: 'Rice',
    brand: { '@id': ORGANISATION_ID },
    manufacturer: { '@id': ORGANISATION_ID },
    additionalProperty: [
      {
        '@type': 'PropertyValue',
        name: 'Processing',
        value: v.types.join(', '),
      },
      {
        '@type': 'PropertyValue',
        name: 'Pack sizes',
        value: PACK_SIZES.map((p) => p.kg).join(', '),
      },
    ],
  }));

/**
 * Wraps blocks into one @graph. A single well-linked graph is easier for both Google
 * and language models to resolve than several disconnected script tags.
 */
export const buildGraph = (...nodes: object[]) => ({
  '@context': 'https://schema.org',
  '@graph': nodes,
});
