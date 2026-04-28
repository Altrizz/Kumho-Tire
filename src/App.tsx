import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import React, { useRef, useEffect } from 'react';
import { cn } from '@/src/lib/utils';
import { 
  Search, ChevronRight, Menu, MapPin, Phone, ArrowRight, Fan, 
  ShieldCheck, Gauge, ArrowLeft, Info, Settings, Wind, Droplets 
} from 'lucide-react';
import { BrowserRouter as Router, Routes, Route, Link, useParams, useNavigate, useLocation } from 'react-router-dom';

// --- Data ---

interface Feature {
  icon: any;
  title: string;
  text: string;
}

interface Product {
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

const PRODUCTS: Product[] = [
  {
    id: 'ps71',
    name: 'Ecsta PS71',
    type: 'Extreme Performance',
    price: '$145.000',
    image: 'https://images.unsplash.com/photo-1549434764-da209774659f?q=80&w=1000&auto=format&fit=crop',
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
    image: 'https://images.unsplash.com/photo-1620860475510-749e7b257545?q=80&w=1000&auto=format&fit=crop',
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
    image: 'https://images.unsplash.com/photo-1594611593361-92570773d2a7?q=80&w=1000&auto=format&fit=crop',
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
    image: 'https://images.unsplash.com/photo-1486006391864-1dd2949de30a?q=80&w=1000&auto=format&fit=crop',
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

// --- Components ---

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const ImageWithFallback = ({ src, alt, className, ...props }: React.ImgHTMLAttributes<HTMLImageElement> & { whileHover?: any, transition?: any }) => {
  const [error, setError] = React.useState(false);
  
  if (error) {
    return (
      <div className={cn("flex items-center justify-center bg-zinc-100 rounded-3xl", className)}>
        <motion.div 
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="w-2/3 h-2/3 fill-slate-300"
        >
          <svg viewBox="0 0 100 100">
            <path d="M50 0C22.4 0 0 22.4 0 50s22.4 50 50 50 50-22.4 50-50S77.6 0 50 0zm0 15c19.3 0 35 15.7 35 35S69.3 85 50 85 15 69.3 15 50 30.7 15 50 15z" />
            <circle cx="50" cy="50" r="10" />
            {[...Array(8)].map((_, i) => (
              <rect key={i} x="48" y="5" width="4" height="15" transform={`rotate(${i * 45}, 50, 50)`} />
            ))}
          </svg>
        </motion.div>
      </div>
    );
  }

  const Component = props.whileHover ? motion.img : 'img';

  return (
    <Component
      src={src}
      alt={alt}
      className={className}
      onError={() => setError(true)}
      referrerPolicy="no-referrer"
      {...props}
    />
  );
};

const Navbar = () => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-3rem)] max-w-7xl border border-white/20 bg-white/60 backdrop-blur-2xl rounded-3xl shadow-[0_20px_40px_-20px_rgba(0,0,0,0.1)] transition-all duration-300">
      <div className="px-8 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-kumho-red flex items-center justify-center rounded-sm transform -skew-x-12">
            <span className="text-white font-black text-xl italic font-display">K</span>
          </div>
          <span className="font-display font-black text-2xl tracking-tighter uppercase text-slate-800">
            Kumho Tire <span className="text-kumho-red">Argentina</span>
          </span>
        </Link>
        
        <div className="hidden md:flex items-center gap-10 text-[11px] font-bold tracking-[0.2em] uppercase text-slate-500">
          <Link to="/" className="hover:text-kumho-red transition-colors">Inicio</Link>
          <button onClick={() => scrollTo('catalog')} className="hover:text-kumho-red transition-colors">Catálogo</button>
          <button onClick={() => scrollTo('features')} className="hover:text-kumho-red transition-colors">Tecnología</button>
          <button onClick={() => scrollTo('selector')} className="hover:text-kumho-red transition-colors">Sucursales</button>
        </div>

        <a 
          href="https://wa.me/541100000000" 
          target="_blank" 
          rel="noreferrer"
          className="bg-slate-900 border-2 border-slate-900 hover:bg-kumho-red hover:border-kumho-red text-white px-6 h-11 flex items-center justify-center rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all active:scale-95 shadow-lg"
        >
          WhatsApp Ventas
        </a>
      </div>
    </nav>
  );
};

const ContinuousTireTrack = () => {
  const { scrollYProgress } = useScroll();
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360 * 8]);
  const tireY = useTransform(scrollYProgress, [0, 1], ["0vh", "80vh"]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <svg className="absolute inset-0 w-full h-full opacity-[0.03]" viewBox="0 0 1024 768" preserveAspectRatio="none">
        <path d="M-100 150 C 200 150, 400 600, 700 450 S 1100 200, 1200 300" stroke="black" strokeWidth="120" strokeLinecap="round" fill="none" />
      </svg>
      
      <motion.div
        style={{ rotate, top: tireY }}
        className="absolute -left-20 w-64 h-64 opacity-10 filter grayscale contrast-150"
      >
         <svg viewBox="0 0 100 100" className="w-full h-full fill-slate-900">
            <path d="M50 0C22.4 0 0 22.4 0 50s22.4 50 50 50 50-22.4 50-50S77.6 0 50 0zm0 15c19.3 0 35 15.7 35 35S69.3 85 50 85 15 69.3 15 50 30.7 15 50 15z" />
            <path d="M50 25c-13.8 0-25 11.2-25 25s11.2 25 25 25 25-11.2 25-25-11.2-25-25-25zm0 10c8.3 0 15 6.7 15 15s-6.7 15-15 15-15-6.7-15-15 6.7-15 15-15z" />
            {[...Array(18)].map((_, i) => (
              <rect key={i} x="47" y="2" width="6" height="8" transform={`rotate(${i * 20}, 50, 50)`} />
            ))}
         </svg>
      </motion.div>
    </div>
  );
};

const Hero = () => (
  <section id="hero" className="relative min-h-screen flex items-center pt-24 overflow-hidden industrial-grid bg-white">
    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-white via-transparent to-zinc-50 pointer-events-none" />
    <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-10 w-full">
      <div className="space-y-12">
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="inline-flex items-center gap-3 px-5 py-2 bg-kumho-red ring-1 ring-white/20 rounded-full shadow-[0_10px_20px_-5px_rgba(230,0,18,0.3)]"
          >
            <div className="w-2 h-2 bg-white rounded-full animate-pulse shadow-[0_0_8px_white]" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white">Distribuidor Directo Argentina</span>
        </motion.div>

        <div className="space-y-6">
          <motion.h1 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-[6rem] lg:text-[7rem] xl:text-[8rem] font-black uppercase leading-[1.1] text-slate-900 italic font-display tracking-tighter"
          >
            Control <span className="inline-block px-2 pt-4 pb-2 text-transparent bg-clip-text bg-gradient-to-br from-kumho-red via-red-900 to-slate-900 drop-shadow-2xl">Total</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="max-w-lg text-xl text-slate-500 font-medium leading-relaxed"
          >
            Más que un neumático, es ingeniería de precisión coreana adaptada a cada kilómetro de las rutas argentinas. Elevá tu experiencia de manejo hoy.
          </motion.p>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap gap-6"
        >
          <button className="group relative bg-slate-900 text-white h-20 px-12 rounded-[1.5rem] font-black uppercase tracking-widest text-sm overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_20px_40px_-10px_rgba(30,41,59,0.3)]">
            <div className="absolute inset-0 bg-gradient-to-r from-kumho-red to-red-600 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500" />
            <span className="relative z-10 flex items-center gap-3">
              Cotizar Medida <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </span>
          </button>
          <button 
            onClick={() => document.getElementById('selector')?.scrollIntoView({behavior: 'smooth'})} 
            className="group bg-white/50 backdrop-blur-md border border-zinc-200 text-slate-800 h-20 px-10 rounded-[1.5rem] font-black uppercase tracking-widest text-sm hover:border-slate-900 transition-all active:scale-95 flex items-center gap-3"
          >
            Ubicación de Sucursales
          </button>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="pt-12 flex items-center gap-10 border-t border-zinc-200/50"
        >
          <div className="space-y-1 group cursor-default">
            <p className="text-4xl font-black text-slate-900 italic font-display group-hover:text-kumho-red transition-colors">6</p>
            <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest">Cuotas Sin Interés</p>
          </div>
          <div className="h-10 w-[1px] bg-zinc-200/50" />
          <div className="space-y-1 group cursor-default">
            <p className="text-4xl font-black text-kumho-red italic font-display">24h</p>
            <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest">Despacho Nacional</p>
          </div>
          <div className="h-10 w-[1px] bg-zinc-200/50" />
          <div className="space-y-1 group cursor-default">
            <p className="text-4xl font-black text-slate-900 italic font-display">100%</p>
            <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest">Garantía Oficial</p>
          </div>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0, x: 40, rotate: 10, scale: 0.8 }}
        animate={{ opacity: 1, x: 0, rotate: -2, scale: 1 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="relative perspective-[2000px]"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 w-[140%] h-[140%] bg-[radial-gradient(circle_at_center,_var(--color-kumho-red)_0%,_transparent_70%)] opacity-10 blur-[100px]" />
        <div className="bg-white p-12 rounded-[4rem] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)] border border-slate-100 relative w-full max-w-sm group hover:scale-[1.02] transition-transform duration-500">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 bg-slate-900 text-white px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.2em] italic shadow-lg">
              <Fan size={10} className="animate-spin-slow" /> Serie Deportiva
            </div>
            <h2 className="text-5xl font-black italic uppercase leading-none text-slate-900 tracking-tighter">Ecsta PS71</h2>
            <p className="text-sm text-slate-500 leading-relaxed font-semibold">Máxima performance para vehículos de alta gama. Respuesta instantánea y seguridad extrema.</p>
            <div className="pt-8 flex items-end justify-between border-t border-zinc-100">
              <div>
                <span className="block text-[10px] text-zinc-400 font-black uppercase tracking-[0.2em] mb-1">Precio Online</span>
                <span className="text-4xl font-black text-slate-900 font-mono">$185.400</span>
              </div>
              <Link to="/product/ps71" className="w-16 h-16 bg-kumho-red group-hover:bg-slate-900 rounded-[1.2rem] flex items-center justify-center text-white transition-all hover:scale-110 active:scale-95 shadow-[0_15px_30px_-10px_rgba(230,0,18,0.5)]">
                <ArrowRight size={24} />
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);

const FeatureCard: React.FC<{ icon: any, title: string, desc: string, delay?: number }> = ({ icon: Icon, title, desc, delay = 0 }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    className="p-12 border border-zinc-100 bg-white hover:border-kumho-red transition-all group sleek-shadow rounded-[3rem] relative overflow-hidden"
  >
    <div className="absolute top-0 right-0 w-24 h-24 bg-zinc-50 rounded-bl-full -translate-y-2 translate-x-2 group-hover:bg-kumho-red/5 transition-colors" />
    <div className="w-16 h-16 bg-zinc-50 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-kumho-red group-hover:text-white transition-all transform group-hover:scale-110 shadow-sm relative z-10">
      <Icon size={32} />
    </div>
    <h3 className="text-2xl font-black uppercase italic mb-4 text-slate-800 tracking-tighter relative z-10">{title}</h3>
    <p className="text-slate-500 text-base leading-relaxed font-semibold relative z-10">{desc}</p>
  </motion.div>
);

const FeaturesSection = () => (
  <section id="features" className="py-32 bg-white relative overflow-hidden">
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-[radial-gradient(circle_at_center,_var(--color-kumho-red)_0%,_transparent_70%)] opacity-[0.03] -z-10" />
    <div className="max-w-7xl mx-auto px-6 text-center mb-24">
       <motion.span 
         initial={{ opacity: 0 }}
         whileInView={{ opacity: 1 }}
         className="text-kumho-red font-black uppercase text-xs tracking-[0.4em] italic block mb-4"
       >
         Ingeniería Coreana
       </motion.span>
       <motion.h2 
         initial={{ opacity: 0, y: 20 }}
         whileInView={{ opacity: 1, y: 0 }}
         className="text-6xl md:text-8xl font-black uppercase italic tracking-tighter text-slate-900 font-display"
       >
         ADN de <span className="text-transparent bg-clip-text bg-gradient-to-r from-kumho-red to-red-800">Competición</span>
       </motion.h2>
    </div>
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        <FeatureCard 
          icon={ShieldCheck}
          title="Seguridad"
          desc="Diseño asimétrico que garantiza una tracción lateral superior y distancias de frenado ultra-cortas."
          delay={0}
        />
        <FeatureCard 
          icon={Fan}
          title="Resistencia"
          desc="Compuestos de sílice de última generación que mantienen la flexibilidad y el agarre bajo presión extrema."
          delay={0.1}
        />
        <FeatureCard 
          icon={Gauge}
          title="Control"
          desc="Respuesta de dirección milimétrica para conductores que exigen el máximo de su vehículo en cada curva."
          delay={0.2}
        />
      </div>
    </div>
  </section>
);

const ProductCard: React.FC<{ product: Product }> = ({ product }) => (
  <Link to={`/product/${product.id}`} className="block space-y-6 group p-6 bg-white rounded-[2.5rem] border border-zinc-100 shadow-[0_20px_40px_-20px_rgba(0,0,0,0.05)] hover:shadow-[0_40px_60px_-20px_rgba(0,0,0,0.1)] hover:-translate-y-3 transition-all duration-500 relative overflow-hidden">
    <div className="absolute top-0 right-0 w-32 h-32 bg-kumho-red opacity-[0.02] rounded-bl-full translate-x-10 -translate-y-10 group-hover:scale-150 transition-transform duration-700" />
    
    <div className="aspect-square bg-zinc-50 rounded-3xl overflow-hidden relative flex items-center justify-center p-4">
      <ImageWithFallback 
        whileHover={{ rotate: 360 }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        src={product.image} 
        alt={product.name} 
        className="w-4/5 h-4/5 object-contain z-10 filter drop-shadow-[0_20px_30px_rgba(0,0,0,0.1)] group-hover:drop-shadow-[0_30px_40px_rgba(230,0,18,0.2)] transition-all" 
      />
      <div className="absolute top-4 right-4 bg-slate-900 text-white text-[8px] font-black uppercase px-4 py-1.5 rounded-full italic tracking-widest z-20 shadow-xl">Premium</div>
    </div>
    
    <div className="space-y-3 px-2">
      <div className="flex items-center gap-2">
        <div className="w-1.5 h-1.5 bg-kumho-red rounded-full" />
        <span className="text-zinc-400 text-[10px] uppercase font-black tracking-[0.2em]">{product.type}</span>
      </div>
      <h3 className="text-2xl font-black uppercase italic text-slate-800 tracking-tighter group-hover:text-kumho-red transition-colors">{product.name}</h3>
      <div className="flex items-center justify-between pt-4 border-t border-zinc-50 group-hover:border-zinc-100 transition-colors">
        <div className="space-y-0.5">
          <p className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest">Desde</p>
          <p className="text-slate-900 font-black text-2xl font-mono tracking-tighter group-hover:text-kumho-red transition-colors">{product.price}</p>
        </div>
        <div className="scale-0 group-hover:scale-100 opacity-0 group-hover:opacity-100 p-4 bg-slate-900 text-white rounded-2xl transition-all duration-300 shadow-xl shadow-slate-900/20">
          <ArrowRight size={20} />
        </div>
      </div>
    </div>
  </Link>
);

const CatalogSection = () => (
  <section id="catalog" className="py-32 bg-zinc-50 industrial-grid relative">
    <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white to-transparent pointer-events-none" />
    <div className="max-w-7xl mx-auto px-6">
      <div className="flex flex-col md:flex-row justify-between items-end gap-10 mb-20">
        <div className="space-y-5">
           <motion.div 
             initial={{ opacity: 0, x: -10 }}
             whileInView={{ opacity: 1, x: 0 }}
             className="flex items-center gap-3"
           >
             <div className="w-8 h-1 bg-kumho-red" />
             <span className="text-kumho-red font-black uppercase text-xs tracking-[0.4em] italic">Gama Premium</span>
           </motion.div>
           <h2 className="text-6xl md:text-8xl font-black uppercase italic tracking-tighter text-slate-900 font-display">Catálogo <span className="inline-block px-6 pt-4 pb-4 text-transparent bg-clip-text bg-gradient-to-br from-slate-900 to-slate-400">2026</span></h2>
        </div>
        <motion.button 
          whileHover={{ x: 5 }}
          className="flex items-center gap-4 bg-white/80 backdrop-blur-md border border-zinc-200 px-10 h-16 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] text-slate-900 shadow-xl hover:bg-slate-900 hover:text-white transition-all group"
        >
          Explorar Toda la Línea <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </motion.button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {PRODUCTS.map(p => <ProductCard key={p.id} product={p} />)}
      </div>
    </div>
  </section>
);

const TireSelector = () => {
  const [width, setWidth] = React.useState('');
  const [profile, setProfile] = React.useState('');
  const [rim, setRim] = React.useState('');
  const [activeType, setActiveType] = React.useState('Auto');

  const widths = ['155', '165', '175', '185', '195', '205', '215', '225', '235', '245', '255', '265'];
  const profiles = ['35', '40', '45', '50', '55', '60', '65', '70', '75', '80'];
  const rims = ['13', '14', '15', '16', '17', '18', '19', '20', '21', '22'];

  const handleSearch = () => {
    if (!width || !profile || !rim) {
      alert('Por favor completa todas las dimensiones');
      return;
    }
    const el = document.getElementById('catalog');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="selector" className="py-24 bg-zinc-50 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-zinc-200 to-transparent" />
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row gap-12 items-end mb-16">
          <div className="flex-1 space-y-4">
            <span className="text-kumho-red font-black uppercase text-xs tracking-[0.4em] italic">Buscador Oficial</span>
            <h2 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter text-slate-900 font-display">Encontrá tu <span className="text-transparent bg-clip-text bg-gradient-to-b from-slate-900 to-slate-400">medida</span></h2>
          </div>
          <div className="flex p-1.5 bg-zinc-200/50 rounded-2xl border border-zinc-200">
            {['Auto', 'Camioneta', 'SUV'].map((type) => (
              <button 
                key={type} 
                onClick={() => setActiveType(type)}
                className={cn(
                  "px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all active:scale-95",
                  activeType === type 
                    ? "bg-white text-slate-900 shadow-sm border border-zinc-200" 
                    : "text-slate-500 hover:text-slate-900"
                )}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          <div className="lg:col-span-4 bg-white p-10 rounded-[3rem] border border-zinc-100 sleek-shadow space-y-8 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-kumho-red/5 rounded-bl-[100px] -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700" />
            <h3 className="text-2xl font-black uppercase italic text-slate-800 relative z-10">Configuración</h3>
            <div className="space-y-4 relative z-10">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <span className="text-[10px] font-bold uppercase text-slate-400 pl-1">Ancho</span>
                  <select 
                    value={width}
                    onChange={(e) => setWidth(e.target.value)}
                    className="w-full bg-zinc-50 border border-zinc-100 rounded-2xl p-5 text-sm outline-none focus:border-kumho-red focus:bg-white transition-all appearance-none cursor-pointer"
                  >
                    <option value="">---</option>
                    {widths.map(w => <option key={w} value={w}>{w}</option>)}
                  </select>
                </div>
                <div className="space-y-1.5">
                  <span className="text-[10px] font-bold uppercase text-slate-400 pl-1">Perfil</span>
                  <select 
                    value={profile}
                    onChange={(e) => setProfile(e.target.value)}
                    className="w-full bg-zinc-50 border border-zinc-100 rounded-2xl p-5 text-sm outline-none focus:border-kumho-red focus:bg-white transition-all appearance-none cursor-pointer"
                  >
                    <option value="">---</option>
                    {profiles.map(p => <option key={p} value={p}>{p}</option>)}
                  </select>
                </div>
              </div>
              <div className="space-y-1.5">
                <span className="text-[10px] font-bold uppercase text-slate-400 pl-1">Rodado</span>
                <select 
                  value={rim}
                  onChange={(e) => setRim(e.target.value)}
                  className="w-full bg-zinc-50 border border-zinc-100 rounded-2xl p-5 text-sm outline-none focus:border-kumho-red focus:bg-white transition-all appearance-none cursor-pointer"
                >
                  <option value="">Seleccionar Rodado</option>
                  {rims.map(r => <option key={r} value={r}>R{r}</option>)}
                </select>
              </div>
            </div>
            <button 
              onClick={handleSearch}
              className="w-full bg-slate-900 text-white h-20 rounded-2xl font-black uppercase tracking-[0.2em] text-xs transition-all hover:bg-kumho-red active:scale-[0.98] shadow-xl relative z-10"
            >
              Consultar Stock
            </button>
          </div>

          <div className="lg:col-span-8 relative min-h-[500px] overflow-hidden group rounded-[3rem] border border-zinc-200">
             <ImageWithFallback 
                src="https://images.unsplash.com/photo-1578844541663-4711efaf362a?q=80&w=2670&auto=format&fit=crop" 
                className="absolute inset-0 w-full h-full object-cover grayscale transition-all duration-1000 group-hover:scale-105 group-hover:grayscale-0 opacity-40 group-hover:opacity-100" 
                alt="Kumho Tech" 
             />
             <div className="absolute inset-0 bg-gradient-to-r from-zinc-50 via-zinc-50/20 to-transparent flex flex-col justify-center p-14 space-y-8 relative z-10">
                <div className="w-12 h-1 px-1 bg-kumho-red" />
                <h4 className="font-display text-5xl md:text-6xl font-black uppercase italic leading-[0.9] text-slate-900">Pasión por la <br /><span className="text-kumho-red">velocidad.</span></h4>
                <p className="text-slate-900/60 max-w-sm text-base font-semibold leading-relaxed">Transferimos la tecnología de la Formula 3 a cada neumático de calle, garantizando una adherencia excepcional en cualquier condición.</p>
                <div onClick={() => document.getElementById('catalog')?.scrollIntoView({behavior: 'smooth'})} className="inline-flex items-center gap-4 bg-white/80 backdrop-blur-md px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] group cursor-pointer border border-white hover:bg-white transition-all shadow-xl w-fit">
                  Ver Gama Deportiva <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform text-kumho-red" />
                </div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const CTA = () => (
    <section className="h-[70vh] relative overflow-hidden flex items-center justify-center bg-slate-900 mx-6 mb-12 rounded-[4rem] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.3)] group">
        <ImageWithFallback src="https://images.unsplash.com/photo-1494905998402-395d579af36f?q=80&w=2670&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover opacity-30 grayscale scale-110 group-hover:scale-100 transition-transform duration-1000" alt="Road" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60" />
        <div className="relative text-center space-y-12 px-6">
           <motion.h2 
             initial={{ opacity: 0, y: 30 }}
             whileInView={{ opacity: 1, y: 0 }}
             className="text-6xl md:text-[10rem] font-black uppercase italic leading-[0.8] text-white tracking-tighter font-display"
           >
             Elegí tu <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-kumho-red to-red-500">Destino.</span>
           </motion.h2>
           <motion.button 
             initial={{ opacity: 0 }}
             whileInView={{ opacity: 1 }}
             transition={{ delay: 0.2 }}
             className="group bg-white text-slate-900 h-24 px-20 rounded-3xl font-black uppercase tracking-[0.2em] text-sm hover:bg-kumho-red hover:text-white transition-all transform hover:scale-110 active:scale-95 shadow-2xl relative overflow-hidden"
           >
             <span className="relative z-10 font-display">Contactar Asesor Online</span>
             <div className="absolute inset-0 bg-white group-hover:bg-kumho-red transition-colors" />
           </motion.button>
        </div>
    </section>
);

const MicroInfo = () => (
  <div className="flex justify-between items-center px-12 py-8 text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 bg-zinc-100/50">
    <div className="flex gap-8">
      <span>Catálogo 2026</span>
      <span>Tecnología X-Sport</span>
      <span>Made in South Korea</span>
    </div>
    <div className="flex gap-6">
      <span className="hover:text-kumho-red transition-colors cursor-pointer">@kumhotire.ar</span>
      <span className="hover:text-kumho-red transition-colors cursor-pointer">/kumhoargentina</span>
    </div>
  </div>
);

const Footer = () => (
  <footer className="bg-white border-t border-zinc-200 py-24">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-16">
        <div className="space-y-8">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-kumho-red flex items-center justify-center rounded-sm transform -skew-x-12">
                <span className="text-white font-black text-lg italic font-display">K</span>
            </div>
            <span className="font-display font-black text-xl tracking-tighter uppercase italic text-slate-800">Kumho</span>
          </div>
          <p className="text-zinc-500 text-sm font-medium leading-relaxed">Líder global en fabricación de neumáticos. Tecnología coreana de vanguardia adaptada a los desafíos de los caminos argentinos.</p>
          <div className="flex gap-4">
            {['IG', 'FB', 'TW'].map(social => (
              <span key={social} className="w-10 h-10 border border-zinc-200 rounded-full flex items-center justify-center hover:border-kumho-red hover:text-kumho-red transition-all cursor-pointer text-[10px] font-black">{social}</span>
            ))}
          </div>
        </div>
        
        <div className="space-y-8">
          <h4 className="text-xs font-black uppercase tracking-[0.2em] text-slate-900">Empresa</h4>
          <ul className="space-y-4 text-sm text-slate-500 font-medium">
             <li><Link to="/" className="hover:text-kumho-red transition-colors">Sobre Kumho</Link></li>
             <li><Link to="/" className="hover:text-kumho-red transition-colors">Tecnología</Link></li>
             <li><Link to="/" className="hover:text-kumho-red transition-colors">Noticias</Link></li>
             <li><Link to="/" className="hover:text-kumho-red transition-colors">Sustentabilidad</Link></li>
          </ul>
        </div>
        
        <div className="space-y-8">
          <h4 className="text-xs font-black uppercase tracking-[0.2em] text-slate-900">Soporte</h4>
          <ul className="space-y-4 text-sm text-slate-500 font-medium">
             <li className="flex items-center gap-3"><Phone size={14} className="text-kumho-red" /> +54 11 4000-0000</li>
             <li className="flex items-center gap-3"><MapPin size={14} className="text-kumho-red" /> Av. Libertador 1234, CABA</li>
             <li><Link to="/" className="hover:text-kumho-red transition-colors">Garantía de Fábrica</Link></li>
             <li><Link to="/" className="hover:text-kumho-red transition-colors">Puntos de Venta</Link></li>
          </ul>
        </div>
        <div className="p-10 bg-zinc-50 rounded-[2.5rem] space-y-6">
           <h4 className="text-xs font-black uppercase tracking-[0.2em] text-slate-900">Newsletter Argentina</h4>
           <div className="space-y-4">
              <input type="email" placeholder="Email" className="w-full bg-white border border-zinc-200 rounded-xl p-4 text-xs outline-none focus:border-kumho-red transition-all sleek-shadow" />
              <button className="w-full bg-slate-900 text-white p-4 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-kumho-red transition-colors shadow-lg">Suscribirme</button>
           </div>
        </div>
      </div>
      <div className="mt-24 pt-10 border-t border-zinc-100 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-black uppercase tracking-widest text-zinc-400">
         <p>© 2026 Kumho Tire Argentina. Tecnología Coreana.</p>
         <div className="flex gap-10">
            <Link to="/" className="hover:text-slate-900 transition-colors">Privacidad</Link>
            <Link to="/" className="hover:text-slate-900 transition-colors">Legales</Link>
            <Link to="/" className="hover:text-slate-900 transition-colors">Cookies</Link>
         </div>
      </div>
    </div>
  </footer>
);

// --- Page Views ---

const HomePage = () => (
  <>
    <Hero />
    <TireSelector />
    <FeaturesSection />
    <CatalogSection />
    <CTA />
    <MicroInfo />
  </>
);

// --- 3D Viewer Component ---
const Tire3DViewer = ({ image, name }: { image: string, name: string }) => {
  const mouseX = useSpring(0, { stiffness: 300, damping: 30 });
  const mouseY = useSpring(0, { stiffness: 300, damping: 30 });
  const rotateX = useTransform(mouseY, [-0.5, 0.5], [15, -15]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-30, 30]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div 
      className="relative w-full aspect-square bg-white rounded-[3.5rem] sleek-shadow border border-white flex items-center justify-center overflow-hidden cursor-move group"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: "1000px" }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--color-kumho-red)_0%,_transparent_70%)] opacity-5 pointer-events-none" />
      
      <motion.div 
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative w-4/5 h-4/5 z-10"
      >
        <ImageWithFallback 
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          src={image} 
          alt={name} 
          className="w-full h-full object-contain filter drop-shadow-[0_30px_50px_rgba(0,0,0,0.25)]"
          style={{ transform: "translateZ(50px)" }}
          whileHover={{}} // Placeholder to trigger motion component
        />
        <div className="absolute inset-0 filter blur-xl opacity-20 scale-95 translate-z-[-20px] bg-black rounded-full" />
      </motion.div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900/10 backdrop-blur-sm px-4 py-2 rounded-full border border-slate-900/5">
        <Info size={12} className="text-slate-500" />
        <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Mover para inspeccionar 360°</span>
      </div>
    </div>
  );
};

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const product = PRODUCTS.find(p => p.id === id);
  const navigate = useNavigate();

  if (!product) return <div className="pt-32 text-center h-screen">Producto no encontrado</div>;

  return (
    <div className="pt-20 min-h-screen bg-zinc-100 industrial-grid border-b border-zinc-200">
      <div className="max-w-7xl mx-auto px-6 py-12 lg:py-24">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-slate-500 font-black uppercase text-[10px] tracking-widest hover:text-kumho-red transition-colors mb-12 group">
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Volver al Catálogo
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          <div className="space-y-12">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Tire3DViewer image={product.image} name={product.name} />
            </motion.div>
            
            <div className="grid grid-cols-2 gap-6">
              {Object.entries(product.specs).map(([key, val]) => (
                <div key={key} className="bg-white p-8 rounded-3xl sleek-shadow border border-zinc-100">
                  <span className="text-[10px] font-black uppercase text-zinc-400 tracking-widest block mb-1">{key}</span>
                  <span className="text-xl font-black text-slate-800 italic uppercase">{val}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-12">
            <div className="space-y-4">
              <span className="text-kumho-red font-black uppercase text-xs tracking-[0.3em] italic">{product.type}</span>
              <h1 className="text-6xl md:text-8xl font-black uppercase italic leading-none text-slate-900">{product.name}</h1>
              <p className="text-lg md:text-xl text-slate-600 font-medium leading-relaxed">
                {product.description}
              </p>
            </div>

            <div className="bg-white p-10 rounded-[2.5rem] sleek-shadow border border-zinc-100 italic">
               <p className="text-slate-700 leading-relaxed font-medium text-lg">
                  "{product.longDescription}"
               </p>
            </div>

            <div className="space-y-8">
              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Características Clave</h3>
              <div className="space-y-6">
                {product.features.map((f: any, i: number) => (
                  <div key={i} className="flex gap-6 items-start group">
                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-kumho-red sleek-shadow border border-zinc-100 flex-shrink-0 group-hover:bg-kumho-red group-hover:text-white transition-colors">
                      <f.icon size={22} />
                    </div>
                    <div>
                      <h4 className="text-lg font-black uppercase italic text-slate-800">{f.title}</h4>
                      <p className="text-sm text-slate-500 font-medium">{f.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-8 flex flex-col gap-6">
              <div className="flex items-end gap-4">
                 <div>
                    <span className="text-[10px] font-black uppercase text-zinc-400 tracking-widest block">Precio sugerido</span>
                    <span className="text-5xl font-black text-kumho-red font-mono">{product.price}</span>
                 </div>
                 <span className="text-xs text-zinc-400 font-bold mb-2 uppercase tracking-tighter">Incluye IVA</span>
              </div>
              <button className="w-full bg-slate-900 text-white h-16 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-kumho-red transition-all red-glow flex items-center justify-center gap-4 active:scale-[0.98]">
                Solicitar Cotización <ArrowRight />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="relative overflow-x-hidden min-h-screen bg-zinc-100">
        <Navbar />
        <ContinuousTireTrack />
        
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/product/:id" element={<ProductDetailPage />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}
