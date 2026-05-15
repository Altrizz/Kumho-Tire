import { 
  Gauge, Droplets, Wind, Fan, ShieldCheck, Settings 
} from 'lucide-react';
import { Product } from './types';

export const WHATSAPP_PHONE = "541159678314";

import { CATALOGUE_DATA } from './data/catalogueData';

const genericImages = [
  'https://images.unsplash.com/photo-1546200231-da0c29ec444a?q=95&w=1200&auto=format,compress&fit=crop&sat=-10',
  'https://images.unsplash.com/photo-1551270275-68f4477ee5b1?q=95&w=1200&auto=format,compress&fit=crop&contrast=110',
  'https://images.unsplash.com/photo-1549434764-da209774659f?q=95&w=1200&auto=format,compress&fit=crop',
  'https://images.unsplash.com/photo-1578844251758-2f71daeb0133?q=95&w=1200&auto=format,compress&fit=crop&bri=-10'
];

export const PRODUCTS: Product[] = [];

CATALOGUE_DATA.products.forEach((model, mIdx) => {
  model.sizes.forEach((size, sIdx) => {
    // Generate a unique ID based on model and size for routing
    const id = `${model.id}-${size.tireSize.replace(/[^a-zA-Z0-9]/g, '')}`.toLowerCase();
    
    const rodadoMatch = size.tireSize.match(/R(\d+(\.\d+)?)/);
    const rodado = rodadoMatch ? `${rodadoMatch[1]}"` : (model.rimSizes[0] ? `${model.rimSizes[0]}"` : '15"');
    
    const velocidadMatch = size.loadIndex ? size.loadIndex.match(/[A-Z]/) : null;
    const velocidad = velocidadMatch ? velocidadMatch[0] : 'Consultar';

    PRODUCTS.push({
      id,
      name: `${size.tireSize} ${size.loadIndex || ''}`.trim(),
      type: model.displayName,
      price: 'Consultar Precio',
      image: model.image || genericImages[mIdx % genericImages.length],
      description: model.description?.es || `Neumático ${model.displayName} para ${model.vehicleType.toLowerCase()}.`,
      longDescription: model.description?.es || `Excelente neumático con patrón ${model.patternCode}. Ideal para ${model.usage.join(', ')}.`,
      features: [
         { icon: ShieldCheck, title: 'Durabilidad', text: 'Resistencia probada en diversas condiciones.' },
         { icon: Gauge, title: 'Rendimiento', text: 'Diseñado para ofrecer máxima eficiencia.' },
         { icon: Settings, title: 'Tecnología', text: model.performanceTags ? model.performanceTags.slice(0, 3).join(', ') : 'Alta tecnología aplicada.' }
      ],
      specs: {
        rodado,
        velocidad,
        terreno: model.category,
        garantia: '5 Años'
      }
    });
  });
});

