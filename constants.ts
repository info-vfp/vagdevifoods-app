import type {
  NavLink, RiceVarietyInfo, RiceBrandInfo, PillarInfo, StrengthInfo,
  CertificationInfo, ExportSpecRow, PackSizeInfo, ByProductInfo, ColourSwatch, HeroStat,
} from './types';

export const COMPANY_NAME = "Vagdevi Food Products Private Limited";
export const SHORT_COMPANY_NAME = "Vagdevi Foods";
export const COMPANY_TAGLINE = "Elevating Taste, Enriching Lives";
export const COMPANY_ADDRESS = "Yadgarpalle, Telangana 508207";
export const COMPANY_CONTACT_EMAIL = "info@vagdevifoods.com";
export const COMPANY_CONTACT_PHONE = "+91 90004 16808";
export const COMPANY_CONTACT_PHONE_FORMATTED = "+91 90004-16808";
export const COMPANY_WHATSAPP_NUMBER = "919000416808";

export const FARMER_PAYMENTS_PHONE_FORMATTED = "95504 16809";
export const FARMER_PAYMENTS_WHATSAPP_NUMBER = "919550416809";

export const INCORPORATION_DATE = "15 September 2017";
export const IEC_NUMBER = "AAGCV1018C";
export const GEO_COORDINATES = { lat: 16.8769, lng: 79.5974 };

export const MILL_ADDRESS_LINES = ["Sy. Nos. 328–333, Vijayawada Road,", "Yadgarpally, Miryalaguda,", "Nalgonda District, Telangana 508207"];
export const REGISTERED_OFFICE_LINES = ["1-98/1/JSIC/6F/604-B, 6th Floor,", "Jain Sadguru Capital Park, Madhapur,", "Hyderabad, Telangana 500082"];

export const GOOGLE_MAPS_EMBED_URL = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3817.9789240473942!2d79.59740769999999!3d16.876937100000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a35250429b5232d%3A0x97c88d0bd3e943fd!2sVagdevi%20Food%20Products%20Private%20Limited!5e0!3m2!1sen!2sin!4v1756100292717!5m2!1sen!2sin";

export const SEO_KEYWORDS = [
  "Premium Rice Manufacturers Telangana",
  "Export Quality Sona Masoori Rice",
  "Bulk Rice Suppliers India",
  "Rice Mill Private Label Services",
  "Horeca Rice Suppliers",
  "Steam Rice Wholesale",
  "Double Boiled Rice Exporters",
  "Vagdevi Food Products",
  "Indian Rice Brands for Export"
].join(", ");

export const buildWhatsAppLink = (message: string): string =>
  `https://wa.me/${COMPANY_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

export const buildVarietyQuoteLink = (varietyName: string): string =>
  buildWhatsAppLink(`Hello Vagdevi Food Products, I would like a quote for ${varietyName}.\n• Steam / Double boiled: \n• Quantity: \n• Delivery city: `);

export const WHATSAPP_BULK_QUOTE_LINK = buildWhatsAppLink(
  "Hello Vagdevi Food Products, I'd like a bulk rice quote for:\n• Variety: \n• Quantity: \n• Delivery city: "
);

export const WHATSAPP_MILL_VISIT_LINK = buildWhatsAppLink(
  "Hello Vagdevi Food Products, I would like to visit the mill at Yadgarpally.\n• Company: \n• Preferred date: \n• What I want to see: "
);

export const NAV_LOGO_URL = "images/logos/vagdevi_nav_logo.webp";
export const FOOTER_LOGO_URL = "images/logos/vagdevi_footer_logo.webp";

export const SURYA_PACK_PINK_URL = "images/products/surya/pack_pink_jsr.webp";
export const SURYA_PACK_BLACK_URL = "images/products/surya/pack_black_hmt.webp";

export const ABOUT_PROMOTER_IMAGE_URL = "images/illustrations/about_promoter.webp";

export const NAV_LINKS: NavLink[] = [
  { label: "Home", path: "/" },
  { label: "About Us", path: "/about" },
  { label: "The Mill", path: "/mill" },
  { label: "Products", path: "/products" },
  { label: "Exports", path: "/business" },
  { label: "Contact Us", path: "/contact" },
];

export const RICE_VARIETIES_DATA: RiceVarietyInfo[] = [
  {
    name: "JSR",
    altName: "Lachkari Kolam",
    types: ["Steam Rice", "Double Boiled Rice"],
    imageUrl: "images/products/varieties/jsr_rice.webp",
    description: "Our largest-selling grain and the rice inside the pink Surya pack. Cooks fluffy and separate, and holds its shape in pulao and everyday meals."
  },
  {
    name: "HMT",
    altName: "Sona Masoori · Ponni type",
    types: ["Steam Rice", "Double Boiled Rice"],
    imageUrl: "images/products/varieties/hmt_rice.webp",
    description: "Fine, light and easily digestible. Sold as the black Surya pack and preferred wherever boiled rice is the daily staple."
  },
  {
    name: "RNR",
    altName: "Telangana Sona",
    types: ["Steam Rice", "Double Boiled Rice"],
    imageUrl: "images/products/varieties/rnr_rice.webp",
    description: "A short-duration variety with a low glycaemic index, increasingly asked for by health-conscious households and institutional buyers."
  },
];

export const RICE_BRANDS_DATA: RiceBrandInfo[] = [
  {
    name: "Surya",
    logoUrl: "images/logos/surya_brand_logo.webp",
    tagline: "Love in every bite.",
    description: "Pink for the north, black for the south. JSR Lachkari Kolam and HMT boiled, in 10, 26 and 30 kg packs — the rice that shows up on lakhs of plates across six states.",
    packagingImageUrls: [
      "images/products/brands/surya_pack_1.webp",
      "images/products/brands/surya_blue_jsr.webp",
      "images/products/brands/surya_darkGreen_jsr.webp",
      "images/products/brands/surya_orange_jsr.webp",
      "images/products/brands/surya_parrotGreen_jsr.webp",
      "images/products/brands/surya_pink_jsr.webp",
      "images/products/brands/surya_red_jsr.webp",
      "images/products/brands/surya_silver_jsr.webp",
    ]
  },
  {
    name: "Dwaraka",
    logoUrl: "images/logos/dwaraka_brand_logo.webp",
    tagline: "The Taste of Tradition, The Promise of Quality.",
    description: "Short, thick grain built for fermentation — idli and dosa batter that behaves the same way every single time.",
    packagingImageUrls: [
      "images/products/brands/dwaraka_pack_1.webp",
    ]
  },
];

export const BYPRODUCTS_DATA: ByProductInfo[] = [
  { n: "Rice Bran", d: "Drawn off at the polishing stage and sold on for oil extraction and cattle feed." },
  { n: "Broken Rice", d: "Graded fine and coarse, for food processing, brewing and feed applications." },
  { n: "Husk", d: "Used as boiler fuel, in board manufacture and as a soil conditioner." },
];

export const PACK_SIZES: PackSizeInfo[] = [
  { kg: "10 kg", use: "Retail shelf" },
  { kg: "26 kg", use: "Household staple" },
  { kg: "30 kg", use: "Kitchens & HoReCa" },
];

export const SURYA_SWATCHES: ColourSwatch[] = [
  { n: "Pink · JSR", c: "#D6197B" },
  { n: "Black · HMT", c: "#141414" },
  { n: "Dark Green", c: "#12603A" },
  { n: "Parrot Green", c: "#3FA935" },
  { n: "Orange", c: "#EE7A1E" },
  { n: "Red", c: "#C81E28" },
  { n: "Blue", c: "#1B4F9C" },
  { n: "Silver", c: "#B9BEC4" },
];

export const HERO_STATS: HeroStat[] = [
  { n: "2017", l: "Incorporated" },
  { n: "30+", l: "Years promoter experience" },
  { n: "6", l: "States supplied" },
  { n: "3", l: "Certifications" },
];

export const TICKER_ITEMS = [
  "JSR / Lachkari Kolam", "HMT Sona Masoori", "RNR Telangana Sona", "Steam Rice",
  "Double Boiled Rice", "Rice Bran", "Broken Rice", "Husk", "Private Label", "Bulk Export",
];

export const PILLARS_DATA: PillarInfo[] = [
  { i: "I", t: "Same-day paddy", d: "Farmers from the surrounding mandals deliver straight to our gate. Nothing sits in a trader’s godown losing moisture and character before it reaches us." },
  { i: "II", t: "One roof, one lot", d: "Drying, milling, grading, colour sorting and packing all happen on the same premises, so a lot number stays intact from weighbridge to warehouse." },
  { i: "III", t: "Dispatch to six states", d: "Maharashtra, Tamil Nadu, Karnataka, Andhra Pradesh, Chhattisgarh and Telangana — with the Vijayawada highway and the Miryalaguda railhead at the door." },
];

export const STRENGTHS_DATA: StrengthInfo[] = [
  { n: "30+", t: "Promoter experience", d: "Three decades in paddy procurement and milling, carried into every purchase decision." },
  { n: "01", t: "Single-site control", d: "Nothing is job-worked out. What we sell, we milled." },
  { n: "06", t: "States served", d: "A distribution network that has grown outward from Telangana year on year." },
  { n: "03", t: "Live certifications", d: "FSSAI, ISO 22000:2018 and APEDA — all current, all verifiable." },
];

export const CERTIFICATIONS: CertificationInfo[] = [
  { name: "ISO 22000:2018", src: "images/certs/iso_22000_2018.webp", numberLabel: "Certificate", number: "HYM/UAS/FMS/9186414/001", validTo: "19 Jan 2027", description: "Food safety management covering processing, milling and export of rice and by-products. Certified since January 2018." },
  { name: "FSSAI State Licence", src: "images/certs/fssai_licence.webp", numberLabel: "Licence no.", number: "13618008000475", validTo: "30 Dec 2028", description: "Issued by the Government of Telangana for the authorised premises at Yadgarpally, Miryalaguda." },
  { name: "APEDA RCMC", src: "images/certs/apeda_rcmc.webp", numberLabel: "Registration", number: "221976", validTo: "31 Mar 2029", description: "Registered as a Manufacturer Exporter of rice under the Foreign Trade Policy. IEC AAGCV1018C." },
];

export const EXPORT_PROPS: PillarInfo[] = [
  { i: "I", t: "Export-ready quality", d: "Moisture, whiteness, broken ratio and average length checked in-house, with a signed report per lot." },
  { i: "II", t: "Private labelling", d: "Your artwork on 10, 26, 30 and 50 kg bags — the same lines that print Surya and Dwaraka." },
  { i: "III", t: "Logistics from Miryalaguda", d: "On the Vijayawada highway with rail access, and reachable dry ports for container movement." },
];

export const EXPORT_SPECS: Record<'sona' | 'steam', ExportSpecRow[]> = {
  sona: [
    { p: "Moisture content", v: "13% max" },
    { p: "Average grain length", v: "5.0 – 5.2 mm" },
    { p: "Broken ratio", v: "under 2%" },
    { p: "Whiteness (KETT)", v: "38 – 42" },
    { p: "Purity", v: "99%" },
    { p: "Crop year", v: "Current or old" },
  ],
  steam: [
    { p: "Moisture content", v: "13.5% max" },
    { p: "Average grain length", v: "4.8 – 5.0 mm" },
    { p: "Broken ratio", v: "under 5%" },
    { p: "Whiteness (KETT)", v: "35 – 38" },
    { p: "Purity", v: "98%" },
    { p: "Crop year", v: "Current" },
  ],
};

export const SOCIAL_LINKS = [
  { name: 'YouTube', url: '#', icon: 'YT' },
  { name: 'Facebook', url: '#', icon: 'FB' },
  { name: 'X', url: '#', icon: 'X' },
  { name: 'Instagram', url: '#', icon: 'IG' },
];
