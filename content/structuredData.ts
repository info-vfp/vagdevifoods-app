/**
 * JSON-LD builders.
 *
 * Every value here is sourced from constants.ts and content/ — i.e. from facts already
 * published on the site. Nothing is invented, and no claim appears in schema that a visitor
 * cannot also read on the page.
 *
 * The output is one connected graph per page. Every node that is referred to elsewhere has a
 * stable `@id`, so the organization, the website, each page, its breadcrumb and its products
 * resolve as the same real-world entities on every page — which is what both Google's
 * structured-data parser and AI answer engines need to attribute a fact to this company.
 *
 * components/SEO.tsx assembles the graph: website, organization, the page and its breadcrumb
 * on every route, plus whatever extra nodes the page passes in (products, FAQ, how-tos).
 */
import {
  COMPANY_NAME,
  SHORT_COMPANY_NAME,
  COMPANY_CONTACT_EMAIL,
  COMPANY_CONTACT_PHONE,
  COMPANY_WHATSAPP_NUMBER,
  FARMER_PAYMENTS_PHONE_FORMATTED,
  GEO_COORDINATES,
  GOOGLE_MAPS_PLACE_URL,
  IEC_NUMBER,
  CERTIFICATIONS,
  RICE_VARIETIES_DATA,
  RICE_BRANDS_DATA,
  PACK_SIZES,
  STATES_SERVED,
  EXPORT_SPECS,
  NAV_LOGO_URL,
  SURYA_PRICES,
} from '../constants';
import { SITE_URL, SITE_NAME, SITE_LOCALE, absoluteUrl, getRouteMeta } from './seo';
import type { FaqItem } from './faq';
import type { CookMethod, SuryaSku } from './suryaContent';

/** Stable identifiers, so separate nodes are understood as the same real-world entity. */
export const ORGANISATION_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;
const LOGO_ID = `${SITE_URL}/#logo`;
const brandId = (name: string) => `${SITE_URL}/#brand-${name.toLowerCase()}`;
const pageId = (path: string) => `${absoluteUrl(path)}#webpage`;
const breadcrumbId = (path: string) => `${absoluteUrl(path)}#breadcrumb`;

const POSTAL_ADDRESS = {
  '@type': 'PostalAddress',
  streetAddress: 'Sy. Nos. 328–333, Vijayawada Road, Yadgarpally',
  addressLocality: 'Miryalaguda',
  addressRegion: 'Telangana',
  postalCode: '508207',
  addressCountry: 'IN',
};

/** Mon–Sat, 9am–6pm IST — the hours stated on the contact page and in the footer. */
const OPENING_HOURS = {
  '@type': 'OpeningHoursSpecification',
  dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  opens: '09:00',
  closes: '18:00',
};

const LANGUAGES = ['English', 'Hindi', 'Telugu', 'Tamil', 'Kannada', 'Urdu'];

/** The company's two house brands, as entities products can point at. */
export const brandSchemas = () =>
  RICE_BRANDS_DATA.map((b) => ({
    '@type': 'Brand',
    '@id': brandId(b.name),
    name: b.name,
    slogan: b.tagline,
    description: b.description,
    logo: absoluteUrl(`/${b.logoUrl}`),
    url: absoluteUrl(b.name === 'Surya' ? '/surya' : '/products#brands'),
  }));

export const organizationSchema = () => ({
  // LocalBusiness so the mill is eligible as a place (address, hours, map); Organization so the
  // company is understood as the entity behind the brands, certificates and products.
  '@type': ['Organization', 'LocalBusiness'],
  '@id': ORGANISATION_ID,
  name: SITE_NAME,
  legalName: COMPANY_NAME,
  alternateName: [SHORT_COMPANY_NAME, 'Vagdevi Rice Mill'],
  url: SITE_URL,
  logo: {
    '@type': 'ImageObject',
    '@id': LOGO_ID,
    url: absoluteUrl(`/${NAV_LOGO_URL}`),
    contentUrl: absoluteUrl(`/${NAV_LOGO_URL}`),
    width: 600,
    height: 177,
    caption: SITE_NAME,
  },
  image: [absoluteUrl('/images/mill/gate_sign.webp'), absoluteUrl('/images/mill/plant_silos.webp')],
  description:
    'ISO 22000:2018 certified rice mill and APEDA-registered exporter at Yadgarpally, Miryalaguda, Telangana. Mills, packs and exports JSR, HMT and RNR rice — steam and double boiled — for bulk, private-label and export buyers, and under its own Surya and Dwaraka brands.',
  slogan: 'Milled where the paddy is grown.',
  foundingDate: '2017-09-15',
  address: POSTAL_ADDRESS,
  geo: {
    '@type': 'GeoCoordinates',
    latitude: GEO_COORDINATES.lat,
    longitude: GEO_COORDINATES.lng,
  },
  hasMap: GOOGLE_MAPS_PLACE_URL,
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
    'Parboiled rice',
    'JSR Lachkari Kolam rice',
    'HMT Sona Masoori rice',
    'RNR Telangana Sona rice',
    'Steam rice',
    'Double boiled rice',
    'Private label rice packing',
    'Rice export',
  ],
  brand: RICE_BRANDS_DATA.map((b) => ({ '@id': brandId(b.name) })),
  // Certifications, with the numbers, issuers and expiry dates published on the home page.
  hasCredential: CERTIFICATIONS.map((c) => ({
    '@type': 'EducationalOccupationalCredential',
    credentialCategory: 'certification',
    name: c.name,
    identifier: c.number,
    validUntil: c.validToISO,
    recognizedBy: { '@type': 'Organization', name: c.issuer },
  })),
  identifier: [
    { '@type': 'PropertyValue', propertyID: 'IEC', name: 'Import Export Code', value: IEC_NUMBER },
    { '@type': 'PropertyValue', propertyID: 'FSSAI', name: 'FSSAI State Licence', value: CERTIFICATIONS[1].number },
    { '@type': 'PropertyValue', propertyID: 'APEDA RCMC', name: 'APEDA Registration', value: CERTIFICATIONS[2].number },
  ],
  contactPoint: [
    {
      '@type': 'ContactPoint',
      contactType: 'sales',
      telephone: COMPANY_CONTACT_PHONE,
      email: COMPANY_CONTACT_EMAIL,
      url: `https://wa.me/${COMPANY_WHATSAPP_NUMBER}`,
      areaServed: 'IN',
      availableLanguage: LANGUAGES,
      hoursAvailable: OPENING_HOURS,
    },
    {
      '@type': 'ContactPoint',
      contactType: 'farmer paddy payments',
      telephone: `+91 ${FARMER_PAYMENTS_PHONE_FORMATTED}`,
      areaServed: 'IN',
      availableLanguage: ['Telugu', 'Hindi', 'English'],
    },
  ],
  // The mill's own Google Maps listing — the one profile of this entity that exists today.
  // Add social and directory profiles here as they are created.
  sameAs: [GOOGLE_MAPS_PLACE_URL],
});

export const websiteSchema = () => ({
  '@type': 'WebSite',
  '@id': WEBSITE_ID,
  url: SITE_URL,
  name: SITE_NAME,
  alternateName: SHORT_COMPANY_NAME,
  publisher: { '@id': ORGANISATION_ID },
  inLanguage: SITE_LOCALE,
});

/** The page itself: its type, title, summary, freshness and place in the site. */
export const webPageSchema = (path: string) => {
  const meta = getRouteMeta(path);
  if (!meta) return null;
  const url = absoluteUrl(path);
  return {
    '@type': meta.type,
    '@id': pageId(path),
    url,
    name: meta.title,
    description: meta.description,
    inLanguage: SITE_LOCALE,
    isPartOf: { '@id': WEBSITE_ID },
    about: { '@id': ORGANISATION_ID },
    publisher: { '@id': ORGANISATION_ID },
    ...(path === '/' || meta.type === 'AboutPage' || meta.type === 'ContactPage'
      ? { mainEntity: { '@id': ORGANISATION_ID } }
      : {}),
    primaryImageOfPage: {
      '@type': 'ImageObject',
      url: absoluteUrl(meta.image),
      width: 1200,
      height: 630,
      caption: meta.imageAlt,
    },
    dateModified: meta.lastModified,
    breadcrumb: { '@id': breadcrumbId(path) },
  };
};

/** Trail from Home to the current page — drives breadcrumb display and states hierarchy. */
export const breadcrumbSchema = (path: string) => {
  const items = [{ name: 'Home', path: '/' }];
  if (path !== '/') items.push({ name: getRouteMeta(path)?.label ?? path, path });
  return {
    '@type': 'BreadcrumbList',
    '@id': breadcrumbId(path),
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
    '@id': `${absoluteUrl('/products')}#${v.name.toLowerCase()}`,
    name: `${v.name} rice (${v.altName})`,
    description: v.description,
    image: absoluteUrl(`/${v.imageUrl}`),
    url: absoluteUrl('/products'),
    category: 'Rice',
    manufacturer: { '@id': ORGANISATION_ID },
    countryOfOrigin: { '@type': 'Country', name: 'India' },
    additionalProperty: [
      { '@type': 'PropertyValue', name: 'Processing', value: v.types.join(', ') },
      { '@type': 'PropertyValue', name: 'Pack sizes', value: PACK_SIZES.map((p) => p.kg).join(', ') },
    ],
  }));

/** The two export grades on /business, with the specification table as product properties. */
export const exportSpecSchemas = () =>
  ([
    ['sona', 'Sona Masoori rice — export grade'],
    ['steam', 'Steam rice — export grade'],
  ] as const).map(([key, name]) => ({
    '@type': 'Product',
    '@id': `${absoluteUrl('/business')}#${key}`,
    name,
    description: `Indicative export specification for ${name.split(' —')[0].toLowerCase()} milled at Yadgarpally, Miryalaguda. A signed lab report accompanies every shipment; custom specifications are quoted on request.`,
    url: absoluteUrl('/business'),
    category: 'Rice',
    manufacturer: { '@id': ORGANISATION_ID },
    countryOfOrigin: { '@type': 'Country', name: 'India' },
    additionalProperty: EXPORT_SPECS[key].map((row) => ({ '@type': 'PropertyValue', name: row.p, value: row.v })),
  }));

/**
 * The Surya packs with their published prices. One ProductGroup per pack colour (the grain
 * differs), each varying by bag size — Google's format for the same product sold in sizes.
 * Only sizes with a price on the page are listed, so every Offer matches visible content.
 */
export const suryaProductSchemas = (skus: SuryaSku[]) =>
  skus.map((sku) => {
    const groupId = `${absoluteUrl('/surya')}#${sku.key}`;
    return {
      '@type': 'ProductGroup',
      '@id': groupId,
      productGroupID: `surya-${sku.key}`,
      name: `${sku.name} — ${sku.variety}`,
      description: sku.pitch,
      url: absoluteUrl('/surya'),
      image: absoluteUrl(`/${sku.img}`),
      brand: { '@id': brandId('Surya') },
      manufacturer: { '@id': ORGANISATION_ID },
      category: 'Rice',
      countryOfOrigin: { '@type': 'Country', name: 'India' },
      variesBy: ['https://schema.org/size'],
      hasVariant: ([[26, SURYA_PRICES.bag26], [30, SURYA_PRICES.bag30]] as const).map(([kg, price]) => ({
        '@type': 'Product',
        '@id': `${groupId}-${kg}kg`,
        sku: `surya-${sku.key}-${kg}kg`,
        name: `${sku.name} ${sku.variety}, ${kg} kg bag`,
        image: absoluteUrl(`/${sku.img}`),
        size: `${kg} kg`,
        weight: { '@type': 'QuantitativeValue', value: kg, unitCode: 'KGM' },
        isVariantOf: { '@id': groupId },
        offers: {
          '@type': 'Offer',
          price: price.toFixed(2),
          priceCurrency: 'INR',
          availability: 'https://schema.org/InStock',
          itemCondition: 'https://schema.org/NewCondition',
          url: absoluteUrl('/surya'),
          seller: { '@id': ORGANISATION_ID },
        },
      })),
    };
  });

/** The Surya cooking guides, step by step. */
export const cookingHowToSchemas = (methods: CookMethod[]) =>
  methods.map((m) => ({
    '@type': 'HowTo',
    '@id': `${absoluteUrl('/surya')}#cook-${m.key}`,
    name: `How to cook Surya rice — ${m.title.toLowerCase()}`,
    description: `${m.blurb} ${m.dials.map((d) => `${d.k}: ${d.v}`).join('; ')}. Suits ${m.pack}.`,
    supply: [{ '@type': 'HowToSupply', name: `Surya rice (${m.pack})` }, { '@type': 'HowToSupply', name: 'Water' }],
    step: m.steps.map((st, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: st.t,
      text: st.d,
    })),
  }));

/** Questions and answers rendered on the home page. */
export const faqSchema = (items: FaqItem[], path: string) => ({
  '@type': 'FAQPage',
  '@id': `${absoluteUrl(path)}#faq`,
  isPartOf: { '@id': pageId(path) },
  mainEntity: items.map((item) => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: { '@type': 'Answer', text: item.a },
  })),
});

/**
 * Wraps nodes into one @graph. A single well-linked graph is easier for both Google and
 * language models to resolve than several disconnected script tags.
 */
export const buildGraph = (...nodes: (object | null)[]) => ({
  '@context': 'https://schema.org',
  '@graph': nodes.filter(Boolean),
});
