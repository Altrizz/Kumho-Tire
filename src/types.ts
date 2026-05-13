import { LucideIcon } from 'lucide-react';

export interface Feature {
  icon: LucideIcon;
  title: string;
  text: string;
}

export interface CatalogueProductSize {
  tireSize: string;
  loadIndex?: string;
  extraLoad?: boolean;
  recommendedRimWidth?: string;
  approvedRimWidth?: string;
  maxAirPressureBar?: string;
  maxAirPressurePsi?: string;
  maxLoadKg?: string;
  maxLoadLbs?: string;
  sectionWidthMm?: string;
  sectionWidthInch?: string;
  overallDiameterMm?: string;
  overallDiameterInch?: string;
  treadDepthMm?: string;
  treadDepthX32?: string;
  utqg?: string;
  rimProtector?: string;
}

export interface CatalogueProduct {
  id: string;
  patternCode: string;
  displayName: string;
  vehicleType: string;
  category: string;
  season: string[];
  performanceTags: string[];
  description: {
    es: string;
    en: string;
  };
  image: string;
  rimSizes: string[];
  usage: string[];
  sizes: CatalogueProductSize[];
  featured?: boolean;
  recommendedFor?: string;
}

export interface Product {
  id: string;
  name: string;
  type: string;
  price: string;
  image: string;
  description: string;
  longDescription: string;
  features: Feature[];
  specs: {
    rodado: string;
    velocidad: string;
    terreno: string;
    garantia: string;
  };
}
