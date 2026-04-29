import { LucideIcon } from 'lucide-react';

export interface Feature {
  icon: LucideIcon;
  title: string;
  text: string;
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
