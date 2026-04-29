import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'motion/react';
import React, { useRef, useEffect, useState } from 'react';
import { cn } from '@/src/lib/utils';
import { 
  Search, ChevronRight, Menu, MapPin, Phone, ArrowRight, Fan, 
  ShieldCheck, Gauge, ArrowLeft, Info, Settings, Wind, Droplets, X
} from 'lucide-react';
import { BrowserRouter as Router, Routes, Route, Link, useParams, useNavigate, useLocation } from 'react-router-dom';
import { PRODUCTS } from './constants';
import { Product } from './types';

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
        <div className="w-12 h-12 bg-kumho-red flex items-center justify-center rounded-sm transform -skew-x-12 opacity-20">
          <span className="text-white font-black text-xl italic font-display">K</span>
        </div>
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
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setIsOpen(false);
  };

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <>
      <nav className="fixed top-4 md:top-6 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] md:w-[calc(100%-3rem)] max-w-7xl border border-white/20 bg-white/70 backdrop-blur-2xl rounded-2xl md:rounded-3xl shadow-[0_20px_40px_-20px_rgba(0,0,0,0.1)] transition-all duration-300">
        <div className="px-4 md:px-8 h-16 md:h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 md:gap-3">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-kumho-red flex items-center justify-center rounded-sm transform -skew-x-12">
              <span className="text-white font-black text-lg md:text-xl italic font-display">K</span>
            </div>
            <span className="font-display font-black text-lg md:text-2xl tracking-tighter uppercase text-slate-800 line-clamp-1">
              Kumho <span className="text-kumho-red">AR</span>
            </span>
          </Link>
          
          <div className="hidden md:flex items-center gap-10 text-[11px] font-bold tracking-[0.2em] uppercase text-slate-500">
            <Link to="/" className="hover:text-kumho-red transition-colors">Inicio</Link>
            <button onClick={() => scrollTo('catalog')} className="hover:text-kumho-red transition-colors">Catálogo</button>
            <button onClick={() => scrollTo('features')} className="hover:text-kumho-red transition-colors">Tecnología</button>
            <button onClick={() => scrollTo('selector')} className="hover:text-kumho-red transition-colors">Sucursales</button>
          </div>

          <div className="flex items-center gap-3">
            <a 
              href="https://wa.me/541100000000" 
              target="_blank" 
              rel="noreferrer"
              className="bg-slate-900 border-2 border-slate-900 hover:bg-kumho-red hover:border-kumho-red text-white px-4 md:px-6 h-9 md:h-11 flex items-center justify-center rounded-xl text-[8px] md:text-[10px] font-black uppercase tracking-[0.2em] transition-all active:scale-95 shadow-lg"
            >
              WhatsApp
            </a>
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 text-slate-800"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
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
              <button onClick={() => scrollTo('catalog')} className="text-left py-4 border-b border-zinc-100">Catálogo</button>
              <button onClick={() => scrollTo('features')} className="text-left py-4 border-b border-zinc-100">Tecnología</button>
              <button onClick={() => scrollTo('selector')} className="text-left py-4 border-b border-zinc-100">Sucursales</button>
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
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360 * 8]);
  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0.08, 0.15, 0.15, 0.08]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.4]);
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '10%']);
  const rotateY = useTransform(scrollYProgress, [0, 1], [15, 45]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none perspective-[3000px]">
      <div className="absolute inset-0 bg-slate-50/80" />
      
      {/* Technical Blueprint Elements */}
      <div className="absolute inset-0 opacity-[0.05] industrial-grid" />
      
      <div className="absolute top-0 right-0 w-full h-full overflow-hidden">
        <motion.div 
          style={{ rotateZ: rotate, opacity, scale, rotateY, y }}
          className="absolute -right-[15%] md:-right-[20%] -top-[10%] w-[120vw] h-[120vw] md:w-[80vw] md:h-[80vw] flex items-center justify-center"
        >
          <div className="relative w-full h-full">
            <img 
                src="https://images.unsplash.com/photo-1549434764-da209774659f?q=95&w=2500&auto=format,compress&fit=crop" 
                alt="Rotating Background Tire" 
                className="w-full h-full object-contain filter grayscale contrast-125 brightness-90"
            />
            {/* Glossy Overlay for 3D depth */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/20 via-transparent to-black/20 rounded-full" />
            <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(0,0,0,0.2)] rounded-full" />
            
            {/* Technical Measurement Rings */}
            <div className="absolute inset-0 border-[0.5px] border-slate-900/10 rounded-full scale-[1.05]" />
            <div className="absolute inset-0 border-[0.5px] border-slate-900/5 rounded-full scale-[1.15]" />
            <div className="absolute inset-x-0 top-1/2 h-px bg-slate-900/10 -translate-y-1/2 scale-x-[1.2]" />
            <div className="absolute inset-y-0 left-1/2 w-px bg-slate-900/10 -translate-x-1/2 scale-y-[1.2]" />
          </div>
        </motion.div>

        {/* Second tire for depth in footer area */}
        <motion.div 
          style={{ 
            rotateZ: rotate, 
            opacity: useTransform(scrollYProgress, [0.4, 0.6, 1], [0, 0.1, 0.15]), 
            scale: useTransform(scrollYProgress, [0.4, 1], [0.8, 1.1]),
            rotateY: -25
          }}
          className="absolute -left-[20%] -bottom-[10%] w-[100vw] h-[100vw] md:w-[60vw] md:h-[60vw] flex items-center justify-center"
        >
          <img 
              src="https://images.unsplash.com/photo-1578844251758-2f71daeb0133?q=95&w=2500&auto=format,compress&fit=crop" 
              alt="Rotating Background Tire Lower" 
              className="w-full h-full object-contain filter grayscale invert brightness-110 opacity-30"
          />
        </motion.div>
      </div>

      {/* Decorative Gradients */}
      <div className="absolute top-1/4 -left-1/4 w-1/2 h-1/2 bg-kumho-red/5 blur-[150px] rounded-full" />
      <div className="absolute bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-slate-900/10 blur-[150px] rounded-full" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_transparent_0%,_#f8fafc_70%)] opacity-60" />
    </div>
  );
};

const Hero = () => {
  const { scrollYProgress } = useScroll();
  const rotateX = useTransform(scrollYProgress, [0, 0.2], [1, 5]);
  const rotateY = useTransform(scrollYProgress, [0, 0.2], [-1, -5]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 1.05]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
  <section id="hero" className="relative min-h-[90vh] md:min-h-screen flex items-center pt-24 md:pt-32 pb-12 overflow-hidden industrial-grid bg-white/40">
    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-white/80 via-transparent to-zinc-50/20 pointer-events-none z-[1]" />
    
    {/* Blurred Car Background for Atmosphere */}
    <motion.div 
      initial={{ opacity: 0, scale: 1.1 }}
      animate={{ opacity: 0.12, scale: 1 }}
      transition={{ duration: 2.5, ease: "easeOut" }}
      className="absolute inset-0 z-0 pointer-events-none"
    >
      <img 
        src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=2670&auto=format&fit=crop" 
        className="w-full h-full object-cover filter blur-[60px] md:blur-[120px] brightness-50"
        alt="Atmospheric Car"
      />
    </motion.div>

    <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-center relative z-10 w-full">
      <div className="space-y-8 md:space-y-12">
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="inline-flex items-center gap-3 px-4 md:px-5 py-2 bg-kumho-red ring-1 ring-white/20 rounded-full shadow-[0_10px_20px_-5px_rgba(230,0,18,0.3)]"
          >
            <div className="w-2 h-2 bg-white rounded-full animate-pulse shadow-[0_0_8px_white]" />
            <span className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.2em] text-white">Distribuidor Directo Argentina</span>
        </motion.div>

        <div className="space-y-4 md:space-y-6">
          <motion.h1 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl sm:text-6xl md:text-[6rem] lg:text-[7rem] xl:text-[8rem] font-black uppercase leading-[1.1] text-slate-900 italic font-display tracking-tighter"
          >
            Control <span className="inline-block px-1 md:px-2 pt-2 md:pt-4 pb-1 md:pb-2 text-transparent bg-clip-text bg-gradient-to-br from-kumho-red via-red-900 to-slate-900 drop-shadow-2xl">Total</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="max-w-lg text-lg md:text-xl text-slate-500 font-medium leading-relaxed"
          >
            Más que un neumático, es ingeniería de precisión coreana adaptada a cada kilómetro de las rutas argentinas.
          </motion.p>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4 md:gap-6"
        >
          <button className="group relative bg-slate-900 text-white h-16 md:h-20 px-8 md:px-12 rounded-2xl md:rounded-[1.5rem] font-black uppercase tracking-widest text-xs md:text-sm overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_20px_40px_-10px_rgba(30,41,59,0.3)]">
            <div className="absolute inset-0 bg-gradient-to-r from-kumho-red to-red-600 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500" />
            <span className="relative z-10 flex items-center justify-center gap-3">
              Cotizar Medida <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </span>
          </button>
          <button 
            onClick={() => document.getElementById('selector')?.scrollIntoView({behavior: 'smooth'})} 
            className="group bg-white/50 backdrop-blur-md border border-zinc-200 text-slate-800 h-16 md:h-20 px-8 md:px-10 rounded-2xl md:rounded-[1.5rem] font-black uppercase tracking-widest text-xs md:text-sm hover:border-slate-900 transition-all active:scale-95 flex items-center justify-center gap-3"
          >
            Sucursales
          </button>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="pt-8 md:pt-12 flex items-center justify-between md:justify-start gap-4 md:gap-10 border-t border-zinc-200/50"
        >
          <div className="space-y-1 group cursor-default">
            <p className="text-3xl md:text-4xl font-black text-slate-900 italic font-display group-hover:text-kumho-red transition-colors">6</p>
            <p className="text-[8px] md:text-[10px] text-slate-400 uppercase font-black tracking-widest">Cuotas</p>
          </div>
          <div className="h-8 md:h-10 w-[1px] bg-zinc-200/50" />
          <div className="space-y-1 group cursor-default">
            <p className="text-3xl md:text-4xl font-black text-kumho-red italic font-display">24h</p>
            <p className="text-[8px] md:text-[10px] text-slate-400 uppercase font-black tracking-widest">Despacho</p>
          </div>
          <div className="h-8 md:h-10 w-[1px] bg-zinc-200/50" />
          <div className="space-y-1 group cursor-default">
            <p className="text-3xl md:text-4xl font-black text-slate-900 italic font-display">100%</p>
            <p className="text-[8px] md:text-[10px] text-slate-400 uppercase font-black tracking-widest">Garantía</p>
          </div>
        </motion.div>
      </div>

      {/* Animated Performance Car Replacement */}
      <motion.div 
        initial={{ opacity: 0, x: 100, filter: 'blur(20px)' }}
        whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
        className="relative perspective-[2000px] hidden md:block"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 w-[140%] h-[140%] bg-[radial-gradient(circle_at_center,_var(--color-kumho-red)_0%,_transparent_70%)] opacity-20 blur-[100px]" />
        
        <motion.div
          style={{ rotateX, rotateY, scale }}
          animate={{ 
            y: [0, -15, 0],
            rotateZ: [-1, 1, -1]
          }}
          transition={{ 
            y: { duration: 6, repeat: Infinity, ease: "easeInOut" },
            rotateZ: { duration: 6, repeat: Infinity, ease: "easeInOut" }
          }}
          className="relative group cursor-zoom-in"
          onClick={() => setIsModalOpen(true)}
        >
          {/* Main Technical Pod Background */}
          <div className="absolute inset-0 bg-zinc-950/95 backdrop-blur-md rounded-[4rem] border border-white/10 shadow-[0_80px_100px_-40px_rgba(0,0,0,0.9)]" />
          
          {/* Interior Glow & Grid Accents */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,_rgba(230,0,18,0.2)_0%,_transparent_50%)] rounded-[4rem] opacity-50" />
          <div className="absolute inset-0 opacity-[0.05] industrial-grid rounded-[4rem]" />
          
          {/* Corner Technical Markers */}
          <div className="absolute top-8 left-8 w-4 h-4 border-t-2 border-l-2 border-white/20 rounded-tl-sm" />
          <div className="absolute top-8 right-8 w-4 h-4 border-t-2 border-r-2 border-white/20 rounded-tr-sm" />
          <div className="absolute bottom-8 left-8 w-4 h-4 border-b-2 border-l-2 border-white/20 rounded-bl-sm" />
          <div className="absolute bottom-8 right-8 w-4 h-4 border-b-2 border-r-2 border-white/20 rounded-br-sm" />

          <div className="relative z-10 p-12 md:p-16">
            <TechnicalTire />
            
            {/* Pulsing Scan Line Effect */}
            <motion.div 
               animate={{ top: ["0%", "100%", "0%"] }}
               transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
               className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-kumho-red/40 to-transparent pointer-events-none z-20 hidden md:block"
            />
          </div>
          
          {/* Floating Feature Tags - Improved & Unclipped */}
          <motion.div 
             animate={{ y: [0, 10, 0] }}
             transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
             className="absolute -top-6 -left-6 bg-white rounded-2xl shadow-2xl border border-zinc-100 p-4 md:p-5 hidden lg:flex items-center gap-4 z-20 min-w-[200px]"
          >
            <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center text-white shrink-0 shadow-lg">
              <Gauge size={22} />
            </div>
            <div className="text-left">
              <p className="text-[9px] font-black uppercase text-slate-400 tracking-[0.2em] mb-0.5">High Performance</p>
              <p className="text-base font-black text-slate-900 italic font-display uppercase tracking-tighter leading-tight">Racing Series</p>
            </div>
          </motion.div>

          <motion.div 
             animate={{ y: [0, -10, 0] }}
             transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
             className="absolute -bottom-8 -right-4 bg-white rounded-2xl shadow-2xl border border-zinc-100 p-4 md:p-5 hidden lg:flex items-center gap-4 z-20 min-w-[200px]"
          >
            <div className="w-12 h-12 bg-kumho-red rounded-xl flex items-center justify-center text-white shrink-0 shadow-lg">
              <ShieldCheck size={22} />
            </div>
            <div className="text-left">
              <p className="text-[9px] font-black uppercase text-slate-400 tracking-[0.2em] mb-0.5">Kumho Care</p>
              <p className="text-base font-black text-slate-900 italic font-display uppercase tracking-tighter leading-tight">Garantía Total</p>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>

    {/* Modal Viewer */}
    <AnimatePresence>
      {isModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsModalOpen(false)}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-zinc-950/95 backdrop-blur-2xl p-6 md:p-20 cursor-zoom-out"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="relative max-w-7xl w-full h-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute -top-12 md:-top-20 right-0 text-white hover:text-kumho-red transition-all p-4 bg-white/5 rounded-full hover:bg-white/10"
            >
              <X size={32} />
            </button>
            <div className="relative max-w-2xl w-full aspect-square flex items-center justify-center">
              <TechnicalTire className="scale-110" />
              <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-md px-6 py-3 rounded-full text-white/50 text-[10px] font-black uppercase tracking-[0.3em] font-display md:flex hidden italic">
                Kumho Technical Asset v1.0
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  </section>
  );
};

const FeatureCard: React.FC<{ icon: any, title: string, desc: string, delay?: number }> = ({ icon: Icon, title, desc, delay = 0 }) => (
  <motion.div 
    initial={{ opacity: 0, y: 15 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ delay, duration: 0.5 }}
    className="p-8 md:p-12 border border-zinc-100 bg-white hover:border-kumho-red transition-all group sleek-shadow rounded-2xl md:rounded-[3rem] relative overflow-hidden"
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
  <section id="features" className="py-32 bg-white/40 backdrop-blur-[1px] relative overflow-hidden">
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

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const getIcon = (type: string) => {
    if (type.includes('Extreme')) return <Gauge size={14} />;
    if (type.includes('Touring')) return <Wind size={14} />;
    if (type.includes('SUV')) return <ShieldCheck size={14} />;
    return <Settings size={14} />;
  };

  return (
    <Link to={`/product/${product.id}`} className="block space-y-4 md:space-y-6 group p-4 md:p-6 bg-white rounded-2xl md:rounded-[2.5rem] border border-zinc-100 shadow-[0_20px_40px_-20px_rgba(0,0,0,0.05)] hover:shadow-[0_40px_60px_-20px_rgba(0,0,0,0.1)] md:hover:-translate-y-3 transition-all duration-500 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-24 md:w-32 h-24 md:h-32 bg-kumho-red opacity-[0.02] rounded-bl-full md:translate-x-10 md:-translate-y-10 group-hover:scale-150 transition-transform duration-700" />
      
      <div className="aspect-square bg-zinc-50 rounded-2xl md:rounded-3xl overflow-hidden relative flex items-center justify-center p-3 md:p-4">
        <ImageWithFallback 
          whileHover={{ rotate: 10, scale: 1.05 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          src={product.image} 
          alt={product.name} 
          className="w-4/5 h-4/5 object-contain z-10 filter drop-shadow-[0_20px_30px_rgba(0,0,0,0.1)] group-hover:drop-shadow-[0_30px_40px_rgba(230,0,18,0.2)]" 
        />
        <div className="absolute top-3 right-3 bg-slate-900 text-white text-[7px] md:text-[8px] font-black uppercase px-3 py-1 md:py-1.5 rounded-full italic tracking-widest z-20 shadow-xl">Premium</div>
      </div>
      
      <div className="space-y-3 px-2">
        <div className="flex items-center gap-2 text-kumho-red">
          {getIcon(product.type)}
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
};

const CatalogSection = () => (
  <section id="catalog" className="py-32 bg-zinc-50/40 backdrop-blur-[1px] industrial-grid relative">
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
    <section id="selector" className="py-24 bg-zinc-50/40 backdrop-blur-[1px] relative overflow-hidden">
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
    <section className="min-h-[50vh] md:h-[70vh] py-20 relative overflow-hidden flex items-center justify-center bg-slate-900/90 mx-4 md:mx-6 mb-12 rounded-3xl md:rounded-[4rem] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.3)] group">
        <ImageWithFallback src="https://images.unsplash.com/photo-1494905998402-395d579af36f?q=80&w=2670&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover opacity-20 grayscale scale-110 group-hover:scale-100 transition-transform duration-1000" alt="Road" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60" />
        <div className="relative text-center space-y-8 md:space-y-12 px-6">
           <motion.h2 
             initial={{ opacity: 0, y: 30 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             className="text-5xl md:text-[10rem] font-black uppercase italic leading-[0.8] text-white tracking-tighter font-display"
           >
             Elegí tu <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-kumho-red to-red-500">Destino.</span>
           </motion.h2>
           <motion.button 
             initial={{ opacity: 0 }}
             whileInView={{ opacity: 1 }}
             viewport={{ once: true }}
             transition={{ delay: 0.2 }}
             className="group bg-white text-slate-900 h-20 md:h-24 px-12 md:px-20 rounded-2xl md:rounded-3xl font-black uppercase tracking-[0.2em] text-xs md:text-sm hover:bg-kumho-red hover:text-white transition-all transform md:hover:scale-110 active:scale-95 shadow-2xl relative overflow-hidden"
           >
             <span className="relative z-10 font-display">Contactar Asesor</span>
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
  <footer className="bg-white/60 backdrop-blur-md border-t border-zinc-200 py-24 relative z-10">
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

// --- Technical Tire Component (From Scratch) ---
const TechnicalTire = ({ className }: { className?: string }) => {
  return (
    <div className={cn("relative w-full aspect-square flex items-center justify-center", className)}>
      <motion.svg 
        viewBox="0 0 400 400" 
        className="w-full h-full drop-shadow-[0_40px_80px_rgba(0,0,0,1)]"
        animate={{ rotate: 360 }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      >
        {/* Outer Tire Shell (Dark Rubber) */}
        <circle cx="200" cy="200" r="185" fill="#020617" />
        <circle cx="200" cy="200" r="183" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="4" />
        
        {/* Radial Tread Patterns */}
        {[...Array(40)].map((_, i) => (
          <g key={i} transform={`rotate(${i * 9}, 200, 200)`}>
            <rect x="197" y="15" width="6" height="20" fill="rgba(255,255,255,0.04)" rx="1" />
            <rect x="202" y="10" width="2" height="15" fill="rgba(255,255,255,0.02)" rx="0.5" />
          </g>
        ))}
        
        {/* Sidewall Texture Rings */}
        <circle cx="200" cy="200" r="150" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1" strokeDasharray="2 4" />
        
        {/* Branding Path */}
        <defs>
          <path id="brandingPath" d="M 200, 200 m -145, 0 a 145,145 0 1,1 290,0 a 145,145 0 1,1 -290,0" />
        </defs>
        <text className="text-[12px] font-black fill-white/10 italic uppercase tracking-[0.25em] font-display">
          <textPath xlinkHref="#brandingPath" startOffset="0%">
            KUMHO TIRE POWER • KOREAN TECHNOLOGY • EXTREME PERFORMANCE • RACING SPEC •
          </textPath>
        </text>

        {/* Rim Structure (Deep Zinc) */}
        <circle cx="200" cy="200" r="115" fill="#111827" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
        
        {/* Spoke Design (High-Performance Mesh) */}
        {[...Array(6)].map((_, i) => (
          <g key={i} transform={`rotate(${i * 60}, 200, 200)`}>
             <path 
               d="M 200 200 L 200 90 Q 225 105 235 140 Q 245 180 200 200"
               fill="rgba(255,255,255,0.07)"
               stroke="rgba(255,255,255,0.2)"
               strokeWidth="0.7"
             />
             <path 
               d="M 200 200 L 200 90 Q 175 105 165 140 Q 155 180 200 200"
               fill="rgba(255,255,255,0.03)"
               stroke="rgba(255,255,255,0.1)"
               strokeWidth="0.5"
             />
          </g>
        ))}

        {/* Inner Mechanics Hub */}
        <circle cx="200" cy="200" r="45" fill="#020617" stroke="rgba(255,255,255,0.25)" strokeWidth="1" />
        <circle cx="200" cy="200" r="42" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" strokeDasharray="1 3" />
        
        {/* Lug Nuts (Technical Details) */}
        {[...Array(5)].map((_, i) => (
          <circle 
            key={i} 
            cx="200" 
            cy="172" 
            r="4.5" 
            fill="#1e293b" 
            stroke="rgba(255,255,255,0.2)" 
            strokeWidth="0.5"
            transform={`rotate(${i * 72}, 200, 200)`} 
          />
        ))}
        
        {/* Center Logo Hub (Now rotates with the tire) */}
        <g>
          <circle cx="200" cy="200" r="14" fill="#e60012" />
          <text x="200" y="204" textAnchor="middle" className="text-[12px] font-black fill-white italic font-display leading-none">K</text>
        </g>
        
        {/* Dynamic Rotation Pulse (Scanner Line) */}
        <motion.circle 
          cx="200" cy="200" r="110" 
          fill="none" 
          stroke="#e60012" 
          strokeWidth="1.5" 
          strokeDasharray="60 300"
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Inner Glint */}
        <circle cx="160" cy="160" r="120" fill="url(#RimGlow)" opacity="0.1" />
        <defs>
          <radialGradient id="RimGlow" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
            <stop offset="0%" stopColor="white" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>
      </motion.svg>
      
      {/* Decorative HUD Markers */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] border border-white/5 rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border border-white/5 rounded-full scale-y-110 opacity-30" />
      </div>
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
    <div className="pt-20 min-h-screen bg-transparent industrial-grid">
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
      <div className="relative overflow-x-hidden min-h-screen bg-slate-50">
        <Navbar />
        <ContinuousTireTrack />
        
        <main className="relative z-10">
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
