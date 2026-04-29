import { 
  Gauge, Droplets, Wind, Fan, ShieldCheck, Settings 
} from 'lucide-react';
import { Product } from './types';

export const PRODUCTS: Product[] = [
  {
    id: 'ps71',
    name: 'Ecsta PS71',
    type: 'Extreme Performance',
    price: '$145.000',
    image: 'https://images.unsplash.com/photo-1546200231-da0c29ec444a?q=95&w=1200&auto=format,compress&fit=crop&sat=-10',
    description: 'Neumático de ultra alto rendimiento diseñado para proporcionar un manejo ágil y una frenada superior en superficies mojadas. Su tecnología de vanguardia garantiza estabilidad absoluta incluso a altas velocidades.',
    features: [
      { icon: Gauge, title: 'Control Dinámico', text: 'Diseño de banda de rodamiento optimizado para una respuesta inmediata.' },
      { icon: Droplets, title: 'Micro-Silica', text: 'Compuesto de última generación que maximiza el agarre en asfalto mojado.' },
      { icon: Wind, title: 'Alta Velocidad', text: 'Cinturones de acero reforzados que mantienen la forma bajo presión extrema.' }
    ],
    specs: {
      rodado: '17" - 20"',
      velocidad: 'W/Y (Hasta 300km/h)',
      terreno: '100% Asfalto',
      garantia: '5 Años'
    },
    longDescription: 'El Ecsta PS71 es el buque insignia de Kumho para vehículos deportivos. Utiliza una red de polímeros híbridos que se adaptan a la temperatura del asfalto, proporcionando una tracción consistente. Sus cuatro surcos principales aseguran que el agua sea evacuada instantáneamente, eliminando el riesgo de aquaplaning.'
  },
  {
    id: 'ta71',
    name: 'Solus TA71',
    type: 'Touring Comfort',
    price: '$112.500',
    image: 'https://images.unsplash.com/photo-1551270275-68f4477ee5b1?q=95&w=1200&auto=format,compress&fit=crop&contrast=110',
    description: 'Diseñado para ofrecer una experiencia de conducción silenciosa y refinada. Su compuesto especial para todas las estaciones garantiza un rendimiento confiable durante todo el año.',
    features: [
      { icon: Fan, title: 'Silent Ride', text: 'Tecnología de paso variable que cancela las frecuencias de ruido.' },
      { icon: ShieldCheck, title: 'Desgaste Parejo', text: 'Bloques laterales rígidos que aseguran una presión de contacto uniforme.' },
      { icon: Wind, title: 'Eficiencia', text: 'Baja resistencia a la rodadura para un menor consumo de combustible.' }
    ],
    specs: {
      rodado: '15" - 18"',
      velocidad: 'V (Hasta 240km/h)',
      terreno: '90% Asfalto / 10% Urbano',
      garantia: '5 Años'
    },
    longDescription: 'Con el Solus TA71, la ingeniería coreana se enfoca en el confort del pasajero. Los hombros del neumático están diseñados para absorber los impactos de baches y juntas de dilatación comunes en las ciudades argentinas. Es el compañero ideal para viajes largos en familia, donde el silencio es prioridad.'
  },
  {
    id: 'hp71',
    name: 'Crugen HP71',
    type: 'SUV Premium',
    price: '$189.000',
    image: 'https://images.unsplash.com/photo-1549434764-da209774659f?q=95&w=1200&auto=format,compress&fit=crop',
    description: 'El neumático premium para SUVs que combina elegancia con robustez. Ofrece una tracción excepcional en mojado y una durabilidad superior para vehículos pesados.',
    features: [
      { icon: ShieldCheck, title: 'Carcasa Reforzada', text: 'Estructura interna diseñada para soportar el torque de SUVs modernos.' },
      { icon: Gauge, title: 'Estabilidad SUV', text: 'Centro de banda rígido que previene el balanceo en curvas.' },
      { icon: Droplets, title: 'Evacuación de Agua', text: 'Canales longitudinales profundos que mejoran la seguridad en lluvia.' }
    ],
    specs: {
      rodado: '18" - 22"',
      velocidad: 'H/V (Hasta 240km/h)',
      terreno: '95% Asfalto / 5% Rural',
      garantia: '5 Años'
    },
    longDescription: 'Equipado con tecnología de holograma en el flanco para un acabado estético superior, el Crugen HP71 no solo rinde, sino que luce. Su diseño asimétrico permite una rotación versátil y un desgaste equilibrado, extendiendo la vida útil del neumático un 20% más que la competencia.'
  },
  {
    id: 'at51',
    name: 'Venture AT51',
    type: 'All Terrain',
    price: '$210.000',
    image: 'https://images.unsplash.com/photo-1578844251758-2f71daeb0133?q=95&w=1200&auto=format,compress&fit=crop&bri=-10',
    description: 'Potencia todoterreno agresiva. Excelente tracción en nieve, barro y ripio, manteniendo un comportamiento civilizado en autopista.',
    features: [
      { icon: Settings, title: 'Tacos Auto-Limpieza', text: 'Diseño en zigzag que desprende piedras y autolimpia el barro.' },
      { icon: ShieldCheck, title: 'Paredes Blindadas', text: 'Compuesto resistente a cortes y perforaciones en terrenos difíciles.' },
      { icon: Gauge, title: 'Bite Edges', text: 'Bordes de agarre masivos para tracción instantánea en arena/nieve.' }
    ],
    specs: {
      rodado: '15" - 20"',
      velocidad: 'R/S (Hasta 180km/h)',
      terreno: '40% Asfalto / 60% Off-Road',
      garantia: '5 Años'
    },
    longDescription: 'El Road Venture AT51 es la solución para los que no tienen límites. Su compuesto de sílice dual está formulado para operar en temperaturas extremas, desde la Patagonia hasta el Norte Argentino. Los hombros anchos proporcionan una estabilidad sorprendente incluso en maniobras de emergencia en tierra suelta.'
  }
];
