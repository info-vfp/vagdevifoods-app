
export interface NavLink {
  label: string;
  path: string;
}

export interface RiceVarietyInfo {
  name: string;
  altName: string;
  types: string[];
  imageUrl: string;
  description: string;
}

export interface RiceBrandInfo {
  name: string;
  logoUrl: string;
  tagline: string;
  description: string;
  packagingImageUrls: string[];
}

export interface PillarInfo {
  i: string;
  t: string;
  d: string;
}

export interface StrengthInfo {
  n: string;
  t: string;
  d: string;
}

export interface CertificationInfo {
  name: string;
  src: string;
  numberLabel: string;
  number: string;
  validTo: string;
  description: string;
}

export interface ExportSpecRow {
  p: string;
  v: string;
}

export interface PackSizeInfo {
  kg: string;
  use: string;
}

export interface ByProductInfo {
  n: string;
  d: string;
}

export interface ColourSwatch {
  n: string;
  c: string;
}

export interface HeroStat {
  n: string;
  l: string;
}
