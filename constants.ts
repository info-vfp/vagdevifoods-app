
import type { NavLink, RiceVarietyInfo, RiceBrandInfo, MarketInfo, CompanyHighlight } from './types';
import { GlobeAltIcon, LightBulbIcon, ShieldCheckIcon, TruckIcon, UsersIcon, StarIcon, BeakerIcon, ChatBubbleBottomCenterTextIcon, HeartIcon, CubeTransparentIcon } from '@heroicons/react/24/outline';
import React from 'react';

export const COMPANY_NAME = "Vagdevi Food Products Private Limited";
export const SHORT_COMPANY_NAME = "Vagdevi Foods";
export const COMPANY_TAGLINE = "Elevating Taste, Enriching Lives";
export const COMPANY_ADDRESS = "Yadgarpalle, Telangana 508207";
export const COMPANY_CONTACT_EMAIL = "info@vagdevifoods.com";
export const COMPANY_CONTACT_PHONE = "+91 90004 16808";
export const COMPANY_CONTACT_PHONE_FORMATTED = "+91 90004-16808";

export const NAV_LOGO_URL = "images/logos/vagdevi_nav_logo.webp";
export const FOOTER_LOGO_URL = "images/logos/vagdevi_footer_logo.webp";

export const HERO_BG_URL = "images/hero/hero_bg.webp";
export const HERO_PRODUCT_BAG_1_URL = "images/hero/hero_product_bag_dwaraka.webp";
export const HERO_PRODUCT_BAG_2_URL = "images/hero/hero_product_bag_surya.webp";

export const ABOUT_PROMOTER_IMAGE_URL = "images/illustrations/about_promoter.webp";
export const ABOUT_PAGE_BG_ILLUSTRATION_URL = "images/illustrations/about_page_bg.webp";
export const WHY_CHOOSE_US_BG_URL = "images/illustrations/why_choose_us_bg.webp";
export const CONTACT_MAP_PLACEHOLDER_URL = "images/general/contact_map.webp";

export const FARMER_MASCOT_URL = "images/illustrations/farmer_mascot.webp";
export const WOMAN_FARMER_MASCOT_URL = "images/illustrations/woman_farmer_mascot.webp";


export const NAV_LINKS: NavLink[] = [
  { label: "Home", path: "/" },
  { label: "About Us", path: "/about" },
  { label: "Products", path: "/products" },
  { label: "Contact Us", path: "/contact" },
];

export const RICE_VARIETIES_DATA: RiceVarietyInfo[] = [
  {
    name: "JSR",
    types: ["Steam Rice", "Double Boiled Rice"],
    imageUrl: "images/products/varieties/jsr_rice.webp",
    description: "A popular choice known for its excellent cooking quality and taste, suitable for various culinary preparations."
  },
  {
    name: "HMT",
    types: ["Steam Rice", "Double Boiled Rice"],
    imageUrl: "images/products/varieties/hmt_rice.webp",
    description: "Fine grain rice cherished for its aromatic fragrance and fluffy texture upon cooking."
  },
  {
    name: "RNR (Telangana Sona)",
    types: ["Steam Rice", "Double Boiled Rice"],
    imageUrl: "images/products/varieties/rnr_rice.webp",
    description: "A healthy variety with a low glycemic index, known for its distinct taste and nutritional benefits."
  },
];

export const RICE_BRANDS_DATA: RiceBrandInfo[] = [
  {
    name: "Surya",
    logoUrl: "images/logos/surya_brand_logo.webp",
    tagline: "Nourishing Homes, Energizing Lives.",
    description: "Surya brand offers wholesome and nutritious rice, a testament to our focus on Quality and consistent Supply. It's the Trusted choice for health-conscious consumers seeking reliability in every meal.",
    packagingImageUrls: [
      "images/products/brands/surya_pack_1.webp",
      "images/products/brands/surya_pack_2.webp",
    ]
  },
  {
    name: "Dwaraka",
    logoUrl: "images/logos/dwaraka_brand_logo.webp",
    tagline: "The Taste of Tradition, The Promise of Quality.",
    description: "Dwaraka brand rice embodies our commitment to premium Quality and enduring Trust. Processed with utmost care and reliably Supplied, it delivers exceptional taste and texture, perfect for families who seek the best.",
    packagingImageUrls: [
      "images/products/brands/dwaraka_pack_1.webp",
      "images/products/brands/dwaraka_pack_2.webp",
    ]
  },
];

export const OTHER_PRODUCTS_DATA = [
  { name: "Rice Bran", description: "Nutrient-rich byproduct, reflecting our commitment to quality in every part of the milling process. Ideal for animal feed and oil extraction.", imageUrl: "images/products/other/rice_bran.webp" },
  { name: "Broken Rice", description: "Versatile broken grains, maintaining our quality standards, suitable for various food preparations and animal feed.", imageUrl: "images/products/other/broken_rice.webp" },
  { name: "Husk", description: "Eco-friendly byproduct used as fuel, in construction, and for agricultural purposes, part of our sustainable supply chain.", imageUrl: "images/products/other/husk.webp" },
];


export const MARKETS_DATA: MarketInfo[] = [
  { name: "Maharashtra", description: "Serving a vast network of wholesalers and retailers across Maharashtra with consistent Quality and reliable Supply." },
  { name: "Tamil Nadu", description: "Strong presence in Tamil Nadu, meeting diverse regional rice preferences with Trusted products." },
  { name: "Karnataka", description: "Delivering Quality rice products to key markets in Karnataka, ensuring dependable Supply." },
  { name: "Andhra Pradesh", description: "Catering to the demands of the Andhra Pradesh rice market with reliability and Trusted Quality." },
  { name: "Telangana", description: "Our home state, with deep market penetration and strong local Trust, backed by consistent Supply." },
  { name: "Chhattisgarh", description: "Expanding our reach and serving the growing market in Chhattisgarh with our Quality rice." },
];

export const CORE_VALUES_DATA: CompanyHighlight[] = [
  {
    title: "Uncompromising Quality",
    description: "From paddy selection to milling, we ensure every grain meets the highest standards of purity and taste.",
    icon: React.createElement(ShieldCheckIcon, { className: "h-10 w-10 text-brand-orange" })
  },
  {
    title: "Enduring Trust",
    description: "Building lasting relationships through transparency, integrity, and consistent delivery on our promises.",
    icon: React.createElement(HeartIcon, { className: "h-10 w-10 text-brand-orange" })
  },
  {
    title: "Dependable Supply",
    description: "Our robust infrastructure and efficient logistics ensure a timely and reliable supply to meet market demands.",
    icon: React.createElement(TruckIcon, { className: "h-10 w-10 text-brand-orange" })
  },
  {
    title: "Rich Varieties",
    description: "Offering a diverse range of rice varieties, including JSR, HMT, BPT, and RNR, in both Steam and Double Boiled forms.",
    icon: React.createElement(BeakerIcon, { className: "h-10 w-10 text-brand-orange" })
  },
];

export const COMPANY_STRENGTHS_DATA: CompanyHighlight[] = [
  {
    title: "Decades of Promoter Experience",
    description: "Leveraging over 30 years of industry expertise to ensure Quality, build Trust, and maintain reliable Supply chains.",
    icon: React.createElement(UsersIcon, { className: "h-8 w-8 text-brand-orange" })
  },
  {
    title: "Ongoing Quality Enhancement",
    description: "Dedicated to excellence, we constantly innovate to deliver rice of unmatched Quality, reinforcing the Trust our customers place in us.",
    icon: React.createElement(ShieldCheckIcon, { className: "h-8 w-8 text-brand-orange" })
  },
  {
    title: "Openness and Integrity",
    description: "We uphold transparency in all operations, ensuring honesty and building enduring Trust with all stakeholders.",
    icon: React.createElement(HeartIcon, { className: "h-8 w-8 text-brand-orange" })
  },
  {
    title: "Modern Infrastructure",
    description: "Equipped with advanced milling technology and storage for efficient product integrity and dependable Supply.",
    icon: React.createElement(TruckIcon, { className: "h-8 w-8 text-brand-orange" })
  },
];

export const SOCIAL_LINKS = [
  { name: 'YouTube', url: '#', icon: 'YT' },
  { name: 'Facebook', url: '#', icon: 'FB' },
  { name: 'X', url: '#', icon: 'X' },
  { name: 'Instagram', url: '#', icon: 'IG' },
];
