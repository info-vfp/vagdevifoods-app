
import type { ReactNode } from 'react';

export interface NavLink {
  label: string;
  path: string;
}

export interface RiceVarietyInfo {
  name: string;
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

export interface MarketInfo {
  name: string;
  description: string;
  icon?: ReactNode;
}

export interface CompanyHighlight {
  title: string;
  description: string;
  icon?: ReactNode;
}