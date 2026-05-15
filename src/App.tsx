import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'motion/react';
import React, { useRef, useEffect, useState } from 'react';
import { cn } from '@/src/lib/utils';
import { CataloguePage } from './components/Catalogue/CataloguePage';
import { 
  Search, ChevronRight, Menu, MapPin, Phone, ArrowRight, Fan, 
  ShieldCheck, Gauge, ArrowLeft, Info, Settings, Wind, Droplets, X,
  ExternalLink, Download, Share2, Layers, Car, Ruler
} from 'lucide-react';
import { BRANDS } from './data/vehiclesData';
import { BrowserRouter as Router, Routes, Route, Link, useParams, useNavigate, useLocation } from 'react-router-dom';
import { PRODUCTS, WHATSAPP_PHONE } from './constants';
import { Product } from './types';

// --- Components ---

const MSBLogo = ({ className, size = 'md', light = false }: { className?: string, size?: 'sm' | 'md' | 'lg' | 'xl', light?: boolean }) => {
  const sizes = {
    sm: { text: 'text-xl', neum: 'text-[10px]', gap: 'gap-3' },
    md: { text: 'text-2xl', neum: 'text-[12px]', gap: 'gap-4' },
    lg: { text: 'text-5xl', neum: 'text-[16px]', gap: 'gap-5' },
    xl: { text: 'text-7xl', neum: 'text-[20px]', gap: 'gap-6' }
  };
  
  const s = sizes[size];
  
  return (
    <div className={cn("flex items-center", s.gap, className)}>
      <div className={cn(
        "px-3 py-1.5 rounded-lg font-black italic font-display uppercase leading-none shadow-sm bg-msb-red text-white"
      )}>
        <span className={s.text}>MSB</span>
      </div>
      <div className="flex flex-col">
        <span className={cn(
          "font-black uppercase tracking-[0.2em] italic leading-none border-b", 
          s.neum,
          light ? "text-white border-white/20" : "text-slate-900 border-msb-red/20 pb-0.5"
        )}>
          Neumáticos
        </span>
      </div>
    </div>
  );
};
const ImageWithFallback = ({ src, alt, className, ...props }: React.ImgHTMLAttributes<HTMLImageElement> & { whileHover?: any, transition?: any }) => {
  const [error, setError] = React.useState(false);
  
  if (error) {
    return (
      <div className={cn("flex items-center justify-center bg-zinc-100 rounded-3xl", className)}>
        <MSBLogo size="sm" className="opacity-20 translate-y-2" />
      </div>
    );
  }

  const Component = props.whileHover ? motion.img : 'img';

  return (
    <Component
      src={src || undefined}
      alt={alt}
      className={className}
      onError={() => setError(true)}
      referrerPolicy="no-referrer"
      {...props}
    />
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setIsOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <>
      <nav className={cn(
        "fixed top-0 left-0 w-full z-50 px-6 h-20 flex items-center justify-between transition-all duration-300",
        scrolled ? "bg-white/80 backdrop-blur-lg border-b border-slate-200 shadow-sm" : "bg-transparent"
      )}>
          <Link to="/" className="hover:opacity-80 transition-opacity">
            <MSBLogo size="sm" />
          </Link>
          
          <div className="hidden md:flex items-center gap-10 text-[11px] font-black tracking-[0.2em] uppercase text-slate-500">
            <Link to="/" className="hover:text-msb-red transition-colors">Inicio</Link>
            <Link to="/catalog" className="hover:text-msb-red transition-colors">Catálogo</Link>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => window.open(`https://wa.me/${WHATSAPP_PHONE}?text=Hola! Quisiera realizar una consulta sobre neumáticos.`, '_blank')}
              className="msb-button-primary h-11 px-6 text-[10px]"
            >
              WhatsApp
            </button>
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 text-slate-900"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-white pt-24 px-6 md:hidden"
          >
            <div className="flex flex-col gap-8 text-2xl font-black uppercase italic tracking-tighter text-slate-800">
              <Link to="/catalog" className="text-left py-4 border-b border-zinc-100">Catálogo</Link>
              <Link to="/" className="py-4">Inicio</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const ContinuousTireTrack = () => {
  const { scrollYProgress } = useScroll();
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 720]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.05, 0.12, 0.12, 0.05]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const rotateY = useTransform(scrollYProgress, [0, 1], [15, 30]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none" style={{ perspective: '2000px' }}>
      {/* Blueprint Industrial Grid */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(0,0,0,0.1) 1px, transparent 0)', backgroundSize: '40px 40px' }} 
      />
      
      <div className="absolute top-0 right-0 w-full h-full overflow-hidden">
        <motion.div 
          style={{ rotateZ: rotate, opacity, scale, rotateY, y }}
          className="absolute -right-[20%] -top-[10%] w-[120vw] h-[120vw] md:w-[85vw] md:h-[85vw] flex items-center justify-center translate-x-1/4"
        >
          <div className="relative w-full h-full">
            <img 
                src="https://images.unsplash.com/photo-1549434764-da209774659f?q=95&w=2500&auto=format,compress&fit=crop" 
                alt="Rotating Background Tire" 
                className="w-full h-full object-contain filter grayscale contrast-150 brightness-110 opacity-60 mix-blend-multiply"
            />
            {/* Engineering Measurement HUD Rings (Subtle) */}
            <div className="absolute inset-0 flex items-center justify-center opacity-20">
              <div className="w-[95%] h-[95%] border-[0.5px] border-dashed border-black/20 rounded-full animate-[spin_60s_linear_infinite]" />
              <div className="absolute w-[80%] h-[80%] border-[0.5px] border-black/10 rounded-full" />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const RoadBackground = () => {
  return (
    <div id="road-background" className="absolute inset-x-0 top-0 bottom-0 z-0 overflow-hidden pointer-events-none bg-white">
      {/* Cinematic Road Perspective */}
      <div className="absolute inset-x-0 top-[20%] bottom-[-50%] z-0" style={{ perspective: '1200px' }}>
        <motion.div 
          className="absolute inset-0 origin-top"
          style={{ transform: 'rotateX(84deg)' }}
        >
          {/* Surface texture */}
          <div className="absolute inset-0 bg-slate-100/50" />
          <div className="absolute inset-0 industrial-grid opacity-30" />
          
          {/* Main Highway Surface */}
          <div className="absolute inset-x-0 top-0 bottom-0 flex justify-center">
            <div className="w-[1400px] h-full relative bg-slate-900/[0.03] border-x border-slate-900/10">
              {/* Central Speed Markings */}
              <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
                <line 
                  x1="50%" y1="-10%" x2="50%" y2="120%" 
                  stroke="#d32f2f" 
                  strokeWidth="10" 
                  strokeDasharray="80 120" 
                  className="animate-road-line"
                  opacity="0.2"
                />
              </svg>
              
              {/* Velocity Streaks */}
              {[...Array(40)].map((_, i) => (
                <div 
                  key={i}
                  className="absolute bg-slate-950/10 animate-speed-streak" 
                  style={{ 
                    left: `${Math.random() * 100}%`,
                    width: `${1 + Math.random() * 2}px`,
                    height: `${300 + Math.random() * 600}px`,
                    animationDelay: `${Math.random() * 3}s`,
                    animationDuration: `${0.4 + Math.random() * 0.8}s`,
                  }} 
                />
              ))}

              {/* Rails */}
              <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-msb-red/10" />
              <div className="absolute right-0 top-0 bottom-0 w-[4px] bg-msb-red/10" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Cinematic Masking */}
      <div className="absolute inset-x-0 top-0 h-[65%] bg-gradient-to-b from-white via-white to-transparent z-[1]" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-white to-transparent z-[1]" />
      
      {/* Light Projection */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,transparent_0%,white_90%)] z-[1]" />
    </div>
  );
};

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const heroPromos = [
  {
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1920&q=80",
    title: "MÁXIMO <br /><span className=\"text-msb-red drop-shadow-xl\">AGARRE.</span>",
    subtitle: "Tecnología de avanzada para las rutas <span className=\"text-msb-red underline underline-offset-8 decoration-slate-200\">argentinas</span>. Directo de fábrica.",
    badge: "CALIDAD PREMIUM",
    badgeColor: "bg-slate-900"
  },
  {
    image: "https://images.unsplash.com/photo-1574041796113-1b91eb0e1eb8?auto=format&fit=crop&w=1920&q=80",
    title: "15% OFF <br /><span className=\"text-amber-500 drop-shadow-xl\">KUMHO.</span>",
    subtitle: "Aprovechá nuestra promoción exclusiva en neumáticos seleccionados de alta performance. Por tiempo limitado.",
    badge: "OFERTA EXCLUSIVA",
    badgeColor: "bg-amber-500"
  },
  {
    image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1920&q=80",
    title: "NUEVO <br /><span className=\"text-msb-red drop-shadow-xl\">INGRESO.</span>",
    subtitle: "Conocé lo último en la línea SUV de Triangle y Firemax. Desempeño superior asegurado.",
    badge: "LANZAMIENTO OFICIAL",
    badgeColor: "bg-msb-red"
  }
];

const Hero = () => {
  const [currentPromoIndex, setCurrentPromoIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPromoIndex((prevIndex) => (prevIndex + 1) % heroPromos.length);
    }, 6000); 
    return () => clearInterval(interval);
  }, []);

  const currentPromo = heroPromos[currentPromoIndex];

  return (
  <section id="hero" className="relative min-h-[85vh] pt-24 md:pt-24 pb-32 md:pb-40 flex items-center overflow-hidden bg-slate-50">
    <div className="absolute inset-0 industrial-grid opacity-[0.05] z-0" />
    
    {/* Giant Tire / Performance Image Graphic */}
    <div className="absolute top-0 right-0 w-full h-full md:w-[70%] pointer-events-none overflow-hidden flex items-center justify-end z-[1]">
      <div className="relative w-full h-full flex items-center justify-center mask-image-left" style={{ WebkitMaskImage: 'linear-gradient(to right, transparent, black 20%)' }}>
        <AnimatePresence mode="wait">
          <motion.img 
            key={currentPromoIndex}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            src={currentPromo.image}
            alt=""
            className="absolute inset-0 w-full h-full object-cover filter contrast-[1.1] brightness-[1.1]"
          />
        </AnimatePresence>
        {/* Abstract Overlays to blend with light background */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-50 via-slate-50/10 to-transparent z-[2]" />
      </div>
    </div>

    {/* Soft overlay to depth and blend */}
    <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-transparent to-transparent z-[2]" />
    
    <div className="max-w-7xl mx-auto px-8 xl:px-12 relative z-10 w-full flex flex-col items-start text-left pt-0 mt-0">
      <div className="space-y-10 max-w-3xl">
        <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-3 px-6 py-2 bg-slate-200/50 backdrop-blur-sm border border-slate-300/50 rounded-full"
          >
            <div className="w-2 h-2 bg-msb-red rounded-full animate-pulse shadow-[0_0_10px_rgba(211,47,47,0.3)]" />
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-600 italic">Distribuidor N°1 de Kumho, Triangle y Firemax de Argentina</span>
        </motion.div>

        <div className="space-y-6 relative min-h-[300px] sm:min-h-[320px] md:min-h-[400px]">
          {/* Subtle ghosted tire behind title */}
          <div className="absolute -top-16 -left-16 w-64 h-64 opacity-[0.07] pointer-events-none z-[-1] animate-[spin_60s_linear_infinite]">
             <img 
               src="https://images.unsplash.com/photo-1580274455171-137b77abdd0c?auto=format&fit=crop&w=800&q=80" 
               className="w-full h-full object-contain filter grayscale"
               alt=""
             />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentPromoIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="absolute inset-x-0 top-0"
            >
              {currentPromo.badge && (
                <div className={cn("mb-6 inline-flex items-center px-4 py-1.5 rounded-full text-[10px] sm:text-xs font-black uppercase tracking-widest text-white shadow-sm border border-white/20", currentPromo.badgeColor || "bg-msb-red")}>
                  <div className="w-1.5 h-1.5 bg-white rounded-full mr-2 animate-pulse" />
                  {currentPromo.badge}
                </div>
              )}
              <h1 
                className="text-6xl sm:text-7xl md:text-[7.5rem] font-black uppercase leading-[0.85] text-slate-950 italic font-display tracking-tighter mb-6"
                dangerouslySetInnerHTML={{ __html: currentPromo.title }}
              />
              <p 
                className="text-lg md:text-2xl text-slate-600 font-bold italic uppercase leading-tight pr-4 max-w-2xl"
                dangerouslySetInnerHTML={{ __html: currentPromo.subtitle }}
              />
            </motion.div>
           </AnimatePresence>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-6 pt-2 z-10 relative"
        >
          <Link to="/catalog" className="msb-button-primary h-16 md:h-18 px-10 text-xs md:text-sm shadow-2xl flex items-center justify-center gap-3 group relative overflow-hidden">
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="relative z-10 flex items-center gap-3 text-white font-black tracking-widest uppercase">MIRÁ EL STOCK DISPONIBLE <ArrowRight size={18} /></span>
          </Link>
        </motion.div>

        {/* Carousel Controls */}
        <div className="flex items-center gap-6 pt-4 z-10 relative">
          <div className="flex gap-2">
            <button 
              onClick={() => setCurrentPromoIndex((prev) => (prev - 1 + heroPromos.length) % heroPromos.length)}
              className="w-10 h-10 rounded-full border border-slate-300 flex items-center justify-center text-slate-400 hover:bg-white hover:text-slate-900 transition-colors shadow-sm"
            >
               <ArrowLeft size={16} />
            </button>
            <button 
              onClick={() => setCurrentPromoIndex((prev) => (prev + 1) % heroPromos.length)}
              className="w-10 h-10 rounded-full border border-slate-300 flex items-center justify-center text-slate-400 hover:bg-white hover:text-slate-900 transition-colors shadow-sm"
            >
               <ArrowRight size={16} />
            </button>
          </div>
          <div className="flex gap-2 bg-white/50 backdrop-blur-sm p-3 rounded-full border border-slate-200/50 shadow-sm">
            {heroPromos.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPromoIndex(i)}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-300",
                  i === currentPromoIndex ? "w-8 bg-msb-red" : "w-2 bg-slate-300 hover:bg-slate-400"
                )}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
  );
};

const FeatureCard: React.FC<{ icon: any, title: string, desc: string, delay?: number }> = ({ icon: Icon, title, desc, delay = 0 }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-msb-red/30 transition-all duration-300 group flex flex-col items-start text-left relative overflow-hidden"
  >
    <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-bl-[100px] -z-10 transition-transform group-hover:scale-110 group-hover:bg-msb-red/5" />
    <div className="w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center mb-8 text-slate-800 group-hover:bg-msb-red group-hover:text-white transition-all shadow-inner">
      <Icon size={28} />
    </div>
    <h3 className="text-xl font-black uppercase italic mb-4 text-slate-800 tracking-tighter">{title}</h3>
    <p className="text-slate-500 text-sm leading-relaxed font-bold uppercase tracking-tight relative z-10">{desc}</p>
  </motion.div>
);

const FeaturesSection = () => (
  <section id="features" className="py-24 xl:py-32 bg-slate-100 relative overflow-hidden border-t border-slate-200">
    <div className="absolute inset-0 tech-pattern opacity-[0.03] pointer-events-none" />
    <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-slate-50 to-transparent" />
    <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-slate-100 to-transparent" />
    
    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-64 h-64 bg-msb-red/5 blur-[100px] rounded-full pointer-events-none" />
    
    <div className="max-w-7xl mx-auto px-8 xl:px-12 relative z-10 w-full">
      <div className="flex flex-col xl:flex-row gap-12 lg:gap-16 items-center">
        {/* Left column text */}
        <div className="xl:w-1/3 flex flex-col justify-center text-left relative z-20 w-full">
           <div className="w-20 h-1.5 bg-msb-red mb-8 rounded-full shadow-[0_0_10px_rgba(237,28,36,0.5)]" />
           <h2 className="text-5xl md:text-6xl font-black uppercase italic tracking-tighter text-slate-900 font-display leading-[0.9] mb-6 drop-shadow-md">
             Máximo <br/><span className="text-msb-red relative">
               Rendimiento
               <svg className="absolute -bottom-2 left-0 w-full h-3 text-msb-red/20" viewBox="0 0 100 20" preserveAspectRatio="none">
                 <path d="M0 10 Q 50 20 100 10" fill="transparent" stroke="currentColor" strokeWidth="4" />
               </svg>
             </span>
           </h2>
           <p className="text-slate-600 font-bold uppercase tracking-tight text-lg leading-relaxed bg-white/60 backdrop-blur-md p-6 rounded-2xl border border-white/50 shadow-sm relative">
             <span className="absolute left-0 top-0 bottom-0 w-1 bg-msb-red rounded-l-2xl" />
             Desarrollados con tecnología de avanzada para soportar las exigencias extremas de cada camino.
           </p>
        </div>

        {/* Right column cards */}
        <div className="xl:w-2/3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10 w-full">
          <FeatureCard 
            icon={ShieldCheck}
            title="TRACCIÓN"
            desc="Máximo agarre en asfalto mojado y rutas de ripio."
          />
          <FeatureCard 
            icon={Fan}
            title="DURACIÓN"
            desc="Compuestos reforzados para el doble de kilometraje."
          />
          <FeatureCard 
            icon={Gauge}
            title="FRENAJE"
            desc="Respuesta inmediata en situaciones críticas."
          />
        </div>
      </div>
    </div>
  </section>
);

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  return (
    <Link to={`/product/${product.id}`} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-2xl hover:border-msb-red/20 group block transition-all duration-500 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-bl-[100px] -z-10 group-hover:bg-msb-red/5 transition-colors" />
      <div className="aspect-square bg-slate-50 border border-slate-100 rounded-2xl overflow-hidden relative flex items-center justify-center p-6 mb-6 group-hover:border-msb-red/20 transition-colors">
        <ImageWithFallback 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-contain filter drop-shadow-xl group-hover:scale-110 transition-transform duration-700 ease-out" 
        />
        <div className="absolute top-3 left-3">
          <span className="bg-white/80 backdrop-blur-md px-2 py-1 rounded-md text-[9px] font-black uppercase tracking-widest text-msb-red shadow-sm border border-slate-100">Stock</span>
        </div>
      </div>
      
      <div className="space-y-4">
        <div>
           <p className="text-msb-red text-[10px] uppercase font-black tracking-widest mb-1.5">{product.type}</p>
           <h3 className="text-xl md:text-2xl font-black uppercase italic text-slate-800 tracking-tighter group-hover:text-msb-red transition-colors">{product.name}</h3>
        </div>
        
        <div className="flex items-center justify-between pt-4 border-t border-slate-100 group-hover:border-slate-200 transition-colors">
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Consultar precio</p>
            <p className="text-slate-900 font-black text-xl md:text-2xl font-mono tracking-tighter italic">{product.price}</p>
          </div>
          <div className="w-10 h-10 md:w-12 md:h-12 bg-slate-100 text-slate-600 rounded-xl flex items-center justify-center group-hover:bg-msb-red group-hover:text-white transition-all shadow-inner group-hover:shadow-msb-red/30">
            <ArrowRight size={20} className="group-hover:-rotate-45 transition-transform duration-300" />
          </div>
        </div>
      </div>
    </Link>
  );
};

const CatalogSection = () => (
  <section id="catalog" className="py-24 xl:py-32 bg-slate-50 relative overflow-hidden xl:-mt-12 rounded-t-[3rem] z-20 shadow-[0_-20px_50px_rgba(0,0,0,0.05)] border-t border-slate-200">
    <div className="absolute top-0 right-0 w-1/3 h-1/2 bg-msb-red/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
    <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-slate-300/20 blur-[120px] rounded-full translate-y-1/2 -translate-x-1/2 pointer-events-none" />
    <div className="absolute inset-0 tech-pattern opacity-[0.02] pointer-events-none" />
    
    <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
      <div className="flex flex-col md:flex-row justify-between items-end gap-10 mb-16 border-b-2 border-slate-200/60 pb-10">
        <div className="space-y-4">
           <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white border border-slate-200 rounded-full mb-2 shadow-sm">
             <div className="w-2 h-2 bg-msb-red rounded-full animate-pulse" />
             <span className="text-[10px] font-black uppercase tracking-widest text-slate-600 italic">Disponibilidad Inmediata</span>
           </div>
           <h2 className="text-6xl md:text-8xl lg:text-9xl font-black uppercase italic tracking-tighter text-slate-900 font-display leading-none drop-shadow-sm">
             STOCK <br /><span className="text-msb-red">ACTUAL</span>
           </h2>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <Link to="/catalog" className="msb-button-outline h-16 px-8 shadow-lg flex items-center justify-center whitespace-nowrap">
            LISTA COMPLETA
          </Link>
          <button 
            onClick={() => window.open('/catalogo_msb.pdf', '_blank')}
            className="msb-button-primary bg-slate-900 border-slate-900 hover:bg-slate-800 h-16 px-8 shadow-lg flex items-center justify-center gap-3 whitespace-nowrap"
          >
            <Download size={20} /> DESCARGAR CATÁLOGO
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {PRODUCTS.map(p => <ProductCard key={p.id} product={p} />)}
      </div>
    </div>
  </section>
);

const Badge = ({ children, variant = 'gray', className }: { children: React.ReactNode, variant?: 'red' | 'gray', className?: string }) => (
  <div className={cn(
    "inline-flex items-center px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] italic",
    variant === 'red' ? "bg-msb-red text-white" : "bg-slate-100 text-slate-500",
    className
  )}>
    {children}
  </div>
);

const TireSelector = () => {
  const [searchMode, setSearchMode] = React.useState<'size' | 'vehicle'>('size');
  
  // Size State
  const [width, setWidth] = React.useState('');
  const [profile, setProfile] = React.useState('');
  const [rim, setRim] = React.useState('');

  // Vehicle State
  const [brand, setBrand] = React.useState('');
  const [model, setModel] = React.useState('');
  const [year, setYear] = React.useState('');
  const [version, setVersion] = React.useState('');

  const navigate = useNavigate();

  const widths = ['155', '165', '175', '185', '195', '205', '215', '225', '235', '245', '255', '265', '275', '285', '295', '305', '315'];
  const profiles = ['30', '35', '40', '45', '50', '55', '60', '65', '70', '75', '80'];
  const rims = ['13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '24'];

  const selectedBrandObj = BRANDS.find(b => b.name === brand);
  const models = selectedBrandObj ? [...selectedBrandObj.models].sort((a, b) => a.name.localeCompare(b.name)) : [];
  const selectedModelObj = models.find(m => m.name === model);
  const years = selectedModelObj ? [...selectedModelObj.years].sort((a, b) => b - a) : [];
  const versions = selectedModelObj ? [...selectedModelObj.versions].sort((a, b) => a.name.localeCompare(b.name)) : [];
  const selectedVersionObj = versions.find(v => v.name === version);

  const handleConsultar = () => {
    let message = '';
    if (searchMode === 'size') {
      if (!width || !profile || !rim) return alert('Por favor, seleccioná Ancho, Perfil y Rodado para consultar.');
      message = `Hola! Les escribo desde la web por los neumáticos medida: *${width}/${profile} R${rim}*.\n\n¿Tienen stock disponible?`;
    } else {
      if (!brand || !model || !year || !version) return alert('Por favor, completá los datos de Marca, Modelo, Año y Versión de tu vehículo.');
      const size = selectedVersionObj?.tireSize || '';
      message = `Hola! Les consulto stock para mi vehículo:\n\n*Marca:* ${brand}\n*Modelo:* ${model}\n*Año:* ${year}\n*Versión:* ${version}\n*Medida Sugerida:* ${size}\n\n¿Tendrán disponibilidad? Muchas gracias!`;
    }
    window.open(`https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <section id="selector" className="py-24 xl:py-32 bg-slate-950 relative overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-slate-900/50 to-transparent pointer-events-none" />
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 industrial-grid opacity-10 pointer-events-none" />
      <div className="absolute inset-0 tech-pattern opacity-10 pointer-events-none" />
      
      {/* Glow Orbs */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-msb-red/10 blur-[150px] rounded-full -translate-y-1/2 animate-pulse-slow" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-msb-red/5 blur-[150px] rounded-full translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-8 xl:px-12 relative z-10 text-white">
        <div className="flex flex-col gap-12 lg:gap-16 items-center text-center">
          {/* Header left side => Now Top Header */}
          <div className="flex flex-col items-center justify-center space-y-6 w-full max-w-3xl">
            <div className="flex flex-col items-center">
               <Badge variant="red" className="mb-4 text-center">SELECTOR INTELIGENTE</Badge>
               <h2 className="text-5xl md:text-6xl font-black uppercase italic tracking-tighter text-white font-display leading-[0.85] text-center">
                 ENCONTRÁ <br className="md:hidden" />TU <span className="text-msb-red">NEUMÁTICO</span>
               </h2>
            </div>
            <p className="text-slate-400 text-lg sm:text-xl font-bold uppercase leading-relaxed max-w-2xl mx-auto">
              Filtrá por medida exacta o seleccioná tu vehículo para conocer el equipo original.
            </p>
          </div>

          {/* Selector Card right side => Now Full Width */}
          <div className="w-full bg-white p-8 md:p-10 xl:p-12 rounded-[2.5rem] shadow-[0_40px_100px_-15px_rgba(0,0,0,0.5)] border border-slate-800/10 relative text-left">
            <div className="absolute top-0 right-0 p-8 opacity-[0.03] pointer-events-none">
              <Layers size={200} />
            </div>

            <div className="relative z-10 flex flex-col gap-6">
              
              {/* Tabs */}
              <div className="bg-slate-100 p-2 rounded-xl flex gap-2 mx-auto relative shadow-inner max-w-xl w-full mb-2">
                <button 
                  onClick={() => setSearchMode('size')}
                  className={cn(
                    "flex-1 py-3 rounded-lg font-black uppercase italic text-xs md:text-sm tracking-widest transition-all flex items-center justify-center gap-3 z-10",
                    searchMode === 'size' ? "bg-white text-slate-900 shadow-sm" : "text-slate-400 hover:text-slate-600"
                  )}
                >
                  <Ruler size={18} /> POR MEDIDA
                </button>
                <button 
                  onClick={() => setSearchMode('vehicle')}
                  className={cn(
                    "flex-1 py-3 rounded-lg font-black uppercase italic text-xs md:text-sm tracking-widest transition-all flex items-center justify-center gap-3 z-10",
                    searchMode === 'vehicle' ? "bg-white text-slate-900 shadow-sm" : "text-slate-400 hover:text-slate-600"
                  )}
                >
                  <Car size={18} /> POR VEHÍCULO
                </button>
              </div>

              <div className="min-h-[96px]">
                <AnimatePresence mode="wait">
                  {searchMode === 'size' ? (
                    <motion.div 
                      key="size"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      transition={{ duration: 0.2 }}
                      className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto w-full"
                    >
                      <div className="space-y-3">
                        <label className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] pl-2">Ancho</label>
                        <div className="relative">
                          <select 
                            value={width}
                            onChange={(e) => setWidth(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-200 text-slate-900 pr-10 pl-5 py-4 rounded-xl font-bold text-lg outline-none focus:border-msb-red transition-all cursor-pointer appearance-none hover:bg-slate-100"
                          >
                            <option value="">Seleccione</option>
                            {widths.map(w => <option key={w} value={w}>{w}</option>)}
                          </select>
                          <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 rotate-90 text-slate-400 pointer-events-none" size={20} />
                        </div>
                      </div>
                      <div className="space-y-3">
                        <label className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] pl-2">Perfil</label>
                        <div className="relative">
                          <select 
                            value={profile}
                            onChange={(e) => setProfile(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-200 text-slate-900 pr-10 pl-5 py-4 rounded-xl font-bold text-lg outline-none focus:border-msb-red transition-all cursor-pointer appearance-none hover:bg-slate-100"
                          >
                            <option value="">Seleccione</option>
                            {profiles.map(p => <option key={p} value={p}>{p}</option>)}
                          </select>
                          <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 rotate-90 text-slate-400 pointer-events-none" size={20} />
                        </div>
                      </div>
                      <div className="space-y-3">
                        <label className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] pl-2">Rodado</label>
                        <div className="relative">
                          <select 
                            value={rim}
                            onChange={(e) => setRim(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-200 text-slate-900 pr-10 pl-5 py-4 rounded-xl font-bold text-lg outline-none focus:border-msb-red transition-all cursor-pointer appearance-none hover:bg-slate-100"
                          >
                            <option value="">Seleccione</option>
                            {rims.map(r => <option key={r} value={r}>R{r}</option>)}
                          </select>
                          <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 rotate-90 text-slate-400 pointer-events-none" size={20} />
                        </div>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div 
                      key="vehicle"
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.2 }}
                      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto w-full"
                    >
                      <div className="space-y-3">
                        <label className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] pl-2">Marca</label>
                        <div className="relative">
                          <select 
                            value={brand}
                            onChange={(e) => {
                              setBrand(e.target.value);
                              setModel('');
                              setYear('');
                              setVersion('');
                            }}
                            className="w-full bg-slate-50 border border-slate-200 text-slate-900 pr-10 pl-4 py-4 rounded-xl font-bold text-base outline-none focus:border-msb-red transition-all cursor-pointer appearance-none hover:bg-slate-100"
                          >
                            <option value="">Seleccione Marca</option>
                            {BRANDS.sort((a, b) => a.name.localeCompare(b.name)).map(b => (
                              <option key={b.name} value={b.name}>{b.name}</option>
                            ))}
                          </select>
                          <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 rotate-90 text-slate-400 pointer-events-none" size={20} />
                        </div>
                      </div>
                      <div className="space-y-3">
                        <label className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] pl-2">Modelo</label>
                        <div className="relative">
                          <select 
                            value={model}
                            disabled={!brand}
                            onChange={(e) => {
                              setModel(e.target.value);
                              setYear('');
                              setVersion('');
                            }}
                            className="w-full bg-slate-50 border border-slate-200 text-slate-900 pr-10 pl-4 py-4 rounded-xl font-bold text-base outline-none focus:border-msb-red transition-all cursor-pointer disabled:opacity-50 disabled:bg-slate-50 appearance-none hover:bg-slate-100"
                          >
                            <option value="">Seleccione Modelo</option>
                            {models.map(m => (
                              <option key={m.name} value={m.name}>{m.name}</option>
                            ))}
                          </select>
                          <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 rotate-90 text-slate-400 pointer-events-none" size={20} />
                        </div>
                      </div>
                      <div className="space-y-3">
                        <label className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] pl-2">Año</label>
                        <div className="relative">
                          <select 
                            value={year}
                            disabled={!model}
                            onChange={(e) => {
                              setYear(e.target.value);
                              setVersion('');
                            }}
                            className="w-full bg-slate-50 border border-slate-200 text-slate-900 pr-10 pl-4 py-4 rounded-xl font-bold text-base outline-none focus:border-msb-red transition-all cursor-pointer disabled:opacity-50 disabled:bg-slate-50 appearance-none hover:bg-slate-100"
                          >
                            <option value="">Seleccione Año</option>
                            {years.map(y => (
                              <option key={y} value={y}>{y}</option>
                            ))}
                          </select>
                          <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 rotate-90 text-slate-400 pointer-events-none" size={20} />
                        </div>
                      </div>
                      <div className="space-y-3">
                        <label className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] pl-2">Versión / Gama</label>
                        <div className="relative">
                          <select 
                            value={version}
                            disabled={!year}
                            onChange={(e) => setVersion(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-200 text-slate-900 pr-10 pl-4 py-4 rounded-xl font-bold text-base outline-none focus:border-msb-red transition-all cursor-pointer disabled:opacity-50 disabled:bg-slate-50 appearance-none hover:bg-slate-100"
                          >
                            <option value="">Seleccione Versión</option>
                            {versions.map(v => (
                              <option key={v.name} value={v.name}>{v.name}</option>
                            ))}
                          </select>
                          <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 rotate-90 text-slate-400 pointer-events-none" size={20} />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              
              <div className="pt-6 border-t border-slate-100 flex flex-col gap-6">
                <AnimatePresence>
                  {searchMode === 'vehicle' && selectedVersionObj?.tireSize && year && version && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                      animate={{ opacity: 1, height: 'auto', marginBottom: 24 }}
                      exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                      className="p-6 bg-slate-900 rounded-3xl overflow-hidden"
                    >
                      <div className="flex flex-col md:flex-row items-center gap-6">
                        <div className="text-center md:text-left flex-1">
                          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-msb-red mb-2">MEDIDA ORIGINAL SUGERIDA</p>
                          <p className="text-5xl font-black text-white italic tracking-tighter">{selectedVersionObj.tireSize}</p>
                        </div>
                        <div className="w-px h-12 bg-white/20 hidden md:block" />
                        <p className="text-slate-400 font-bold uppercase text-xs max-w-[200px] text-center md:text-left leading-relaxed">
                          Equipamiento original de fábrica para <span className="text-white block mt-1">{brand} {model} {version}</span>
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="flex flex-col sm:flex-row gap-4 w-full max-w-4xl mx-auto">
                    <button 
                      onClick={handleConsultar}
                      className="flex-1 py-5 rounded-2xl font-black border-2 border-slate-200 text-slate-800 hover:border-slate-800 hover:bg-slate-800 hover:text-white uppercase tracking-widest transition-all flex items-center justify-center gap-3 group text-sm"
                    >
                      <Phone size={18} className="group-hover:scale-110 transition-transform" />
                      HABLAR CON UN ASESOR
                    </button>
                  <button 
                    onClick={() => {
                      let searchParam = '';
                      if (searchMode === 'size') {
                        if (!width || !profile || !rim) return alert('Por favor, seleccioná Ancho, Perfil y Rodado para consultar el catálogo.');
                        searchParam = `${width}/${profile} R${rim}`;
                      } else {
                        if (!brand || !model || !year || !version) return alert('Por favor, completá todos los datos de tu vehículo.');
                        searchParam = selectedVersionObj?.tireSize || '';
                      }
                      if (searchParam) {
                        navigate(`/catalog?search=${encodeURIComponent(searchParam)}`);
                      }
                    }}
                    className="flex-[1.5] bg-msb-red text-white py-5 rounded-2xl font-black uppercase tracking-widest shadow-lg shadow-msb-red/20 transition-all flex items-center justify-center gap-3 group hover:bg-red-700 text-sm"
                  >
                    VER STOCK EN CATÁLOGO
                    <ArrowRight size={20} className="group-hover:translate-x-1.5 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


const CTA = () => (
    <section className="py-24 xl:py-32 bg-msb-red relative overflow-hidden group">
        <div className="absolute inset-0 tech-pattern opacity-[0.08] pointer-events-none" />
        <div className="absolute inset-0 diagonal-lines opacity-[0.08] pointer-events-none" />
        
        {/* Animated Particles for CTA */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(12)].map((_, i) => (
            <div 
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full opacity-30 animate-float"
              style={{ 
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.4}s`,
                animationDuration: `${6 + Math.random() * 4}s`
              }}
            />
          ))}
        </div>

        <div className="max-w-7xl mx-auto px-8 xl:px-12 grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10 text-white">
          <div className="space-y-6">
            <h2 className="text-7xl md:text-[9rem] font-black uppercase italic leading-[0.8] text-white tracking-tighter font-display">
              VIVÍ EL <br /><span className="text-black/20">PODER.</span>
            </h2>
          </div>
          <div className="flex flex-col items-center md:items-end gap-10">
            <p className="text-3xl font-black italic text-white text-center md:text-right uppercase max-w-md leading-tight">
              No le des tu seguridad a cualquiera. <br />
              <span className="bg-white text-msb-red px-3 inline-block mt-2">ELEGÍ MSB.</span>
            </p>
            <button 
              onClick={() => window.open(`https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent("Hola! Quisiera recibir asesoramiento técnico sobre neumáticos.")}`, '_blank')}
              className="bg-white text-slate-950 px-16 h-24 text-xl font-black uppercase tracking-[0.1em] rounded-2xl shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-4"
            >
              ASISTENCIA POR WHATSAPP <ArrowRight size={28} />
            </button>
          </div>
        </div>
    </section>
);

const MicroInfo = () => (
  <div className="flex flex-col md:flex-row justify-between items-center px-12 py-6 text-[11px] font-black uppercase tracking-[0.3em] text-slate-400 bg-white border-t border-slate-100">
    <div className="flex gap-10">
      <span>DISTRIBUIDOR OFICIAL</span>
      <span className="text-msb-red">EST. 1995</span>
      <span>BUENOS AIRES - ARGENTINA</span>
    </div>
    <div className="flex gap-8 mt-4 md:mt-0">
      <span className="hover:text-msb-red cursor-pointer transition-colors">@msb.neumaticos</span>
      <span className="hover:text-msb-red cursor-pointer transition-colors">INFO@MSB.COM.AR</span>
    </div>
  </div>
);

const Footer = () => (
  <footer className="bg-slate-950 py-24 xl:py-32 relative z-10">
    <div className="absolute inset-0 industrial-grid opacity-[0.02] pointer-events-none" />
    <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-msb-red/30 to-transparent" />
    <div className="max-w-7xl mx-auto px-6 relative z-10">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-16">
        <div className="space-y-10">
          <MSBLogo size="sm" light={true} />
          <p className="text-slate-500 text-xs font-black uppercase leading-relaxed tracking-wider">
            Líder en neumáticos de alta performance para las calles argentinas. Calidad premium garantizada.
          </p>
          <div className="flex gap-3">
            {['IG', 'FB', 'YT'].map(social => (
              <span key={social} className="w-12 h-12 bg-white/5 border border-white/10 text-white/40 flex items-center justify-center hover:bg-msb-red hover:text-white hover:border-msb-red transition-all cursor-pointer text-[10px] font-black rounded-xl">{social}</span>
            ))}
          </div>
        </div>
        
        <div className="space-y-8">
          <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-msb-red">Mapa del Sitio</h4>
          <ul className="space-y-4 text-xs text-slate-400 font-black uppercase tracking-widest">
             <li><Link to="/" className="hover:text-white transition-colors">Nuestro Taller</Link></li>
             <li><Link to="/" className="hover:text-white transition-colors">Tecnología MSB</Link></li>
             <li><Link to="/" className="hover:text-white transition-colors">Catálogo PDF</Link></li>
             <li><Link to="/" className="hover:text-white transition-colors">Franquicias</Link></li>
          </ul>
        </div>
        
        <div className="space-y-8">
          <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-msb-red">Contacto</h4>
          <ul className="space-y-6 text-xs text-slate-400 font-black uppercase tracking-widest">
             <li className="flex items-center gap-4 text-white"><Phone size={16} className="text-msb-red" /> 0810-MSB-TIRE</li>
             <li className="flex items-start gap-4"><MapPin size={16} className="text-msb-red shrink-0" /> Av. Warnes 1234,<br />Buenos Aires</li>
             <li className="text-white">Sucursal Tigre: RUTA 27</li>
          </ul>
        </div>

        <div className="p-8 bg-white/5 border border-white/10 rounded-2xl space-y-6">
           <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-white">Novedades</h4>
           <p className="text-[10px] text-slate-500 font-black uppercase">Recibí ofertas exclusivas por semana.</p>
           <div className="space-y-4">
              <input type="email" placeholder="TU EMAIL" className="w-full bg-black/40 border border-white/10 text-white p-4 text-[10px] uppercase font-black outline-none focus:border-msb-red rounded-xl" />
              <button className="w-full msb-button-primary h-12 text-[10px] shadow-none">OK</button>
           </div>
        </div>
      </div>
      <div className="mt-24 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[9px] font-black uppercase tracking-[0.4em] text-slate-600">
         <p>© 2026 NEUMATICOS MSB ARGENTINA. AGARRE TOTAL.</p>
         <div className="flex gap-10">
            <Link to="/" className="hover:text-white transition-colors">Privacidad</Link>
            <Link to="/" className="hover:text-white transition-colors">Legales</Link>
         </div>
      </div>
    </div>
  </footer>
);

// --- Technical Tire Component ---
const TechnicalTire = ({ className, hideHUD = false }: { className?: string, hideHUD?: boolean }) => {
  return (
    <div className={cn("relative w-full aspect-square flex items-center justify-center", className)}>
      <motion.svg 
        viewBox="0 0 400 400" 
        className="w-full h-full drop-shadow-[0_45px_100px_rgba(0,0,0,0.8)]"
      >
        {/* Master Tire Structure (Single rotation group for stability) */}
        <motion.g
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          style={{ originX: "200px", originY: "200px" }}
        >
          {/* Main Rubber Shell */}
          <circle cx="200" cy="200" r="185" fill="#020617" />
          <circle cx="200" cy="200" r="183" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="3" />
          
          {/* Symmetrical Tread */}
          {[...Array(40)].map((_, i) => (
            <g key={i} transform={`rotate(${i * 9}, 200, 200)`}>
              <rect x="197" y="10" width="6" height="22" fill="rgba(255,255,255,0.04)" rx="1.5" />
            </g>
          ))}
          
          {/* Engineering Markings */}
          <defs>
            <path id="tirePath" d="M 200, 200 m -148, 0 a 148,148 0 1,1 296,0 a 148,148 0 1,1 -296,0" />
          </defs>
          <text className="text-[10px] font-black fill-white/10 italic uppercase tracking-[0.4em] font-display">
            <textPath xlinkHref="#tirePath" startOffset="0%">
              NEUMATICOS MSB POWER • MSB ENGINEERING • EXTREME PERFORMANCE • RACING SPEC •
            </textPath>
          </text>

          {/* Rim Face */}
          <circle cx="200" cy="200" r="115" fill="#0f172a" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
          
          {/* Stable Spokes Design */}
          {[...Array(6)].map((_, i) => (
            <g key={i} transform={`rotate(${i * 60}, 200, 200)`}>
               <path 
                 d="M 200 200 L 200 85 Q 225 100 235 140 Q 245 180 200 200"
                 fill="rgba(255,255,255,0.06)"
                 stroke="rgba(255,255,255,0.2)"
                 strokeWidth="0.8"
               />
               <path 
                 d="M 200 200 L 200 85 Q 175 100 165 140 Q 155 180 200 200"
                 fill="rgba(255,255,255,0.03)"
                 stroke="rgba(255,255,255,0.1)"
                 strokeWidth="0.5"
               />
            </g>
          ))}
          
          {/* Hub Assembly */}
          <circle cx="200" cy="200" r="45" fill="#020617" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
          <circle cx="200" cy="200" r="38" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" strokeDasharray="4 4" />
          
          {/* Lugs */}
          {[...Array(5)].map((_, i) => (
            <circle 
              key={i} 
              cx="200" cy="175" r="4" 
              fill="#334155" 
              stroke="rgba(255,255,255,0.1)" 
              transform={`rotate(${i * 72}, 200, 200)`} 
            />
          ))}
          
          {/* Center Brand */}
          <g transform="translate(200, 200) scale(0.4)">
            <circle cx="0" cy="0" r="35" fill="#e60012" />
            <path d="M-30 0 C-20-10 -10-15 0 0" fill="white" />
            <path d="M30 0 C20-10 10-15 0 0" fill="white" />
            <text x="0" y="12" textAnchor="middle" className="text-[28px] font-black fill-white italic font-display">MSB</text>
          </g>
        </motion.g>

        {/* Stable Static Accents (Non-rotating) */}
        {!hideHUD && (
          <g className="pointer-events-none opacity-20">
            <path d="M 50 200 L 30 200 M 50 180 L 50 220" stroke="white" strokeWidth="0.5" />
            <path d="M 350 200 L 370 200 M 350 180 L 350 220" stroke="white" strokeWidth="0.5" />
          </g>
        )}
      </motion.svg>
      
      {/* Functional HUD Accents */}
      {!hideHUD && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="absolute top-1/4 -right-12 space-y-3 hidden md:block">
            <div className="bg-zinc-900/60 backdrop-blur px-3 py-1.5 rounded-lg border border-white/10">
              <p className="text-[8px] uppercase tracking-[0.2em] text-white/30 mb-0.5">PSI</p>
              <p className="text-xs font-bold text-msb-red tabular-nums">34.20 OK</p>
            </div>
            <div className="bg-zinc-900/60 backdrop-blur px-3 py-1.5 rounded-lg border border-white/10">
              <p className="text-[8px] uppercase tracking-[0.2em] text-white/30 mb-0.5">Temp</p>
              <p className="text-xs font-bold text-emerald-500 tabular-nums">82.4°F</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};


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
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--color-msb-red)_0%,_transparent_70%)] opacity-5 pointer-events-none" />
      
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
        <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Mové para ver en 360°</span>
      </div>
    </div>
  );
};

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const product = PRODUCTS.find(p => p.id === id);
  const navigate = useNavigate();

  if (!product) return <div className="pt-32 text-center h-screen font-black uppercase text-slate-400">Producto no encontrado</div>;

  return (
    <div className="pt-20 min-h-screen bg-white industrial-grid">
      <div className="max-w-7xl mx-auto px-8 xl:px-12 py-16 lg:py-32">
        <button onClick={() => navigate(-1)} className="flex items-center gap-4 text-slate-400 font-black uppercase text-[11px] tracking-[0.3em] hover:text-msb-red transition-colors mb-12">
          <ArrowLeft size={18} /> VOLVER AL STOCK
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          <div className="space-y-12">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-slate-50 p-12 rounded-[3rem] border border-slate-200 shadow-xl relative"
            >
              <Tire3DViewer image={product.image} name={product.name} />
              <div className="absolute bottom-10 right-10 text-msb-red font-black italic tracking-tighter text-3xl uppercase font-display">
                {product.type}
              </div>
            </motion.div>
            
            <div className="grid grid-cols-2 gap-6">
              {Object.entries(product.specs).map(([key, val]) => (
                <div key={key} className="clean-card">
                  <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest block mb-1">{key}</span>
                  <span className="text-2xl font-black text-slate-900 italic uppercase tracking-tighter">{val}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-12">
            <div className="space-y-6">
              <span className="text-msb-red font-black uppercase text-xs tracking-[0.4em] italic">{product.type} SERIES</span>
              <h1 className="text-7xl md:text-9xl font-black uppercase italic leading-none text-slate-950 tracking-tighter font-display">{product.name}</h1>
              <p className="text-xl md:text-2xl text-slate-500 font-black italic leading-tight uppercase">
                {product.description}
              </p>
            </div>

            <div className="bg-slate-50 p-10 border-l-8 border-msb-red rounded-r-2xl border-y border-r border-slate-200">
               <p className="text-slate-800 leading-tight font-black italic text-xl uppercase">
                  "{product.longDescription}"
               </p>
            </div>

            <div className="space-y-10">
              <h3 className="text-xs font-black uppercase tracking-[0.4em] text-slate-400">INGENIERÍA MSB</h3>
              <div className="grid grid-cols-1 gap-6">
                {product.features.map((f: any, i: number) => (
                  <div key={i} className="flex gap-8 items-start group bg-white p-6 rounded-2xl border border-slate-100 hover:border-msb-red/50 transition-colors shadow-sm">
                    <div className="w-12 h-12 bg-msb-red text-white flex items-center justify-center shrink-0 rounded-xl">
                      <f.icon size={22} />
                    </div>
                    <div>
                      <h4 className="text-xl font-black uppercase italic text-slate-900 tracking-tighter mb-1">{f.title}</h4>
                      <p className="text-[11px] text-slate-500 font-black uppercase tracking-widest leading-loose">{f.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-8 space-y-8">
              <div className="flex items-end gap-6 bg-slate-950 p-10 rounded-[2rem] shadow-2xl">
                 <div className="flex-1">
                    <span className="text-[10px] font-black uppercase text-white/40 tracking-widest block mb-2">Precio de Lista</span>
                    <span className="text-6xl md:text-7xl font-black text-white font-mono tracking-tighter italic">{product.price}</span>
                 </div>
                 <div className="text-right">
                    <span className="text-xs text-white/40 font-black uppercase block">Garantía</span>
                    <span className="text-xs text-white font-black uppercase">5 AÑOS</span>
                 </div>
              </div>
              <button 
                onClick={() => window.open(`https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(`Hola! Quisiera consultar stock y precio del modelo *${product.name}* (${product.type}).\n\n¿Tendrán disponibilidad? Muchas gracias.`)}`, '_blank')}
                className="msb-button-primary w-full h-28 text-lg group"
              >
                PEDÍ PRESUPUESTO POR WHATSAPP <ArrowRight size={32} className="group-hover:translate-x-2 transition-transform" />
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
      <div className="relative overflow-x-hidden min-h-screen bg-white">
        <Navbar />
        <ContinuousTireTrack />
        
        <main className="relative z-10">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/catalog" element={<CataloguePage />} />
            <Route path="/product/:id" element={<ProductDetailPage />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}
