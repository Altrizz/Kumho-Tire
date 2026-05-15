import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, SlidersHorizontal, ChevronDown, Check, X, 
  ExternalLink, Download, Share2, ArrowLeft, ArrowRight,
  Info, Filter, Grid, List, Layers, Shield, Droplets, Wind,
  Maximize2, Zap, BarChart3, Truck, Car, Compass, Construction,
  Copy, CheckCircle2, Phone
} from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import { cn } from '@/src/lib/utils';
import { CATALOGUE_DATA } from '@/src/data/catalogueData';
import { CatalogueProduct, CatalogueProductSize } from '@/src/types';
import { WHATSAPP_PHONE } from '@/src/constants';

// --- Components ---

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'red' | 'outline' | 'ghost';
}

const Badge: React.FC<BadgeProps> = ({ children, className, variant = 'default' }) => {
  const variants = {
    default: "bg-slate-100 text-slate-600",
    red: "bg-msb-red text-white",
    outline: "border border-slate-200 text-slate-500",
    ghost: "bg-slate-50/50 text-slate-400"
  };
  return (
    <span className={cn("px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider", variants[variant], className)}>
      {children}
    </span>
  );
};

interface ProductCardProps {
  product: CatalogueProduct;
  onOpen: (p: CatalogueProduct) => void;
  isCompared: boolean;
  onCompareToggle: (id: string) => void;
  viewMode?: 'grid' | 'list';
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onOpen, isCompared, onCompareToggle, viewMode = 'grid' }) => {
  if (viewMode === 'list') {
    return (
      <motion.div 
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl border border-slate-100 p-4 md:p-6 hover:border-msb-red/30 transition-all duration-300 shadow-sm group flex flex-col md:flex-row gap-6 md:items-center"
      >
        {/* Left: Image & Compare */}
        <div className="flex items-center gap-6 md:w-1/4 shrink-0">
           <button 
             onClick={() => onCompareToggle(product.id)}
             className={cn(
               "w-10 h-10 shrink-0 rounded-full flex items-center justify-center transition-all shadow-md border border-slate-100",
               isCompared ? "bg-msb-red text-white border-msb-red" : "bg-white text-slate-400 hover:text-msb-red"
             )}
             title="Comparar"
           >
             {isCompared ? <Check size={18} strokeWidth={3} /> : <Layers size={18} />}
           </button>
           <div className="w-24 h-24 md:w-32 md:h-32 bg-slate-50 rounded-xl p-2 flex items-center justify-center relative shrink-0">
              {product.featured && <Badge variant="red" className="absolute -top-2 -right-2 scale-75 origin-top-right">TOP</Badge>}
              <img src={product.image || undefined} alt={product.displayName} className="w-full h-full object-contain filter drop-shadow-md group-hover:scale-110 transition-transform" />
           </div>
        </div>

        {/* Middle: Details */}
        <div className="flex-1 space-y-2">
           <div className="flex items-center gap-2 mb-1">
             <div className="bg-slate-900 text-white px-2 py-0.5 rounded text-[10px] font-black italic inline-block">
               {product.patternCode}
             </div>
             <p className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">{product.vehicleType}</p>
           </div>
           <h3 className="text-xl md:text-2xl font-black uppercase italic text-slate-900 tracking-tighter leading-tight group-hover:text-msb-red transition-colors">{product.displayName}</h3>
           <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed max-w-2xl">
             {product.description.es}
           </p>
           <div className="flex flex-wrap gap-1.5 pt-2">
             {product.performanceTags.slice(0, 3).map(tag => (
               <Badge key={tag} className="text-[9px]" variant="outline">{tag}</Badge>
             ))}
           </div>
        </div>

        {/* Right: Actions */}
        <div className="md:w-48 shrink-0 flex flex-col items-start md:items-end gap-3 border-t md:border-t-0 md:border-l border-slate-100 pt-4 md:pt-0 md:pl-6">
           <div className="w-full">
             <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1 text-left md:text-right">Rodados R{product.rimSizes.slice(0,2).join(', R')}{product.rimSizes.length > 2 ? '...' : ''}</p>
           </div>
           <button 
             onClick={() => onOpen(product)}
             className="w-full msb-button-primary h-12 text-[10px] px-4"
           >
             VER FICHA TÉCNICA
           </button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="clean-card group flex flex-col h-full border-t-4 border-t-msb-red/10 hover:border-t-msb-red transition-all duration-300"
    >
      <div className="flex justify-between items-start mb-6">
        <div>
           {product.featured && <Badge variant="red" className="mb-2">Destacado</Badge>}
           <div className="bg-slate-900 text-white px-3 py-1 rounded text-[14px] font-black italic mb-1 inline-block">
             {product.patternCode}
           </div>
        </div>
        <button 
          onClick={() => onCompareToggle(product.id)}
          className={cn(
            "w-10 h-10 shrink-0 rounded-full flex items-center justify-center transition-all shadow-md border border-slate-100",
            isCompared ? "bg-msb-red text-white border-msb-red" : "bg-white text-slate-400 hover:text-msb-red"
          )}
          title="Comparar"
        >
          {isCompared ? <Check size={18} strokeWidth={3} /> : <Layers size={18} />}
        </button>
      </div>

      <div className="w-full aspect-[4/3] bg-slate-50/50 rounded-xl mb-6 p-4 flex items-center justify-center relative">
         <img src={product.image || undefined} alt={product.displayName} className="w-full h-full object-contain filter drop-shadow-md group-hover:scale-110 transition-transform" />
      </div>

      <div className="flex-1 space-y-4">
        <div>
          <p className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] mb-1">{product.vehicleType}</p>
          <h3 className="text-xl font-black uppercase italic text-slate-900 tracking-tighter leading-tight group-hover:text-msb-red transition-colors">{product.displayName}</h3>
          <p className="text-xs text-slate-500 font-bold uppercase mt-1">{product.category}</p>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {product.performanceTags.slice(0, 4).map(tag => (
            <Badge key={tag}>{tag}</Badge>
          ))}
          {product.performanceTags.length > 4 && <Badge variant="ghost">+{product.performanceTags.length - 4}</Badge>}
        </div>

        <p className="text-sm text-slate-500 line-clamp-3 leading-relaxed">
          {product.description.es}
        </p>
      </div>

      <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col gap-4">
        <div className="flex items-center justify-between">
           <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Rodados disponibles</span>
           <div className="flex gap-1">
              {product.rimSizes.slice(0, 3).map(rim => (
                <span key={rim} className="text-[10px] font-bold text-slate-700">R{rim}</span>
              ))}
              {product.rimSizes.length > 3 && <span className="text-[10px] text-slate-400">...</span>}
           </div>
        </div>
        <button 
          onClick={() => onOpen(product)}
          className="w-full msb-button-primary h-12 text-[11px]"
        >
          VER FICHA TÉCNICA
        </button>
      </div>
    </motion.div>
  );
};

const SpecsTable = ({ sizes }: { sizes: CatalogueProductSize[] }) => {
  const [search, setSearch] = useState('');
  const [sortConfig, setSortConfig] = useState<{ key: keyof CatalogueProductSize, direction: 'asc' | 'desc' } | null>(null);

  const filteredSizes = useMemo(() => {
    let result = sizes.filter(s => 
      s.tireSize.toLowerCase().includes(search.toLowerCase()) ||
      s.loadIndex.toLowerCase().includes(search.toLowerCase()) ||
      s.utqg.toLowerCase().includes(search.toLowerCase())
    );

    if (sortConfig) {
      result.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
        if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return result;
  }, [sizes, search, sortConfig]);

  const requestSort = (key: keyof CatalogueProductSize) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input 
            type="text" 
            placeholder="Buscá por medida (ej: 275/30)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-12 pr-4 text-sm outline-none focus:border-msb-red transition-all"
          />
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
        <table className="w-full text-left text-sm border-collapse min-w-[1000px]">
          <thead className="sticky top-0 bg-slate-50 z-10 border-b border-slate-200">
            <tr>
              <th className="px-6 py-4 font-black uppercase tracking-wider text-[10px] text-slate-400 cursor-pointer hover:text-msb-red transition-colors" onClick={() => requestSort('tireSize')}>Medida (Global)</th>
              <th className="px-6 py-4 font-black uppercase tracking-wider text-[10px] text-slate-400">Ancho Rim (Rec/Apro)</th>
              <th className="px-6 py-4 font-black uppercase tracking-wider text-[10px] text-slate-400">Presión (bar/psi)</th>
              <th className="px-6 py-4 font-black uppercase tracking-wider text-[10px] text-slate-400 cursor-pointer hover:text-msb-red transition-colors" onClick={() => requestSort('maxLoadKg')}>Carga Max (kg/lbs)</th>
              <th className="px-6 py-4 font-black uppercase tracking-wider text-[10px] text-slate-400">Dim (mm/inch)</th>
              <th className="px-6 py-4 font-black uppercase tracking-wider text-[10px] text-slate-400 cursor-pointer hover:text-msb-red transition-colors" onClick={() => requestSort('utqg')}>UTQG</th>
              <th className="px-6 py-4 font-black uppercase tracking-wider text-[10px] text-slate-400 shrink-0">Protector Rim</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredSizes.map((s, i) => (
              <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                <td className="px-6 py-4 font-black text-slate-900">{s.tireSize} {s.loadIndex}</td>
                <td className="px-6 py-4 text-xs text-slate-500">{s.recommendedRimWidth} ({s.approvedRimWidth})</td>
                <td className="px-6 py-4 text-xs text-slate-500">{s.maxAirPressureBar}/{s.maxAirPressurePsi}</td>
                <td className="px-6 py-4 text-xs text-slate-500">{s.maxLoadKg}/{s.maxLoadLbs}</td>
                <td className="px-6 py-4 text-xs text-slate-500">{s.overallDiameterMm}mm / {s.overallDiameterInch}"</td>
                <td className="px-6 py-4 font-mono text-xs">{s.utqg}</td>
                <td className="px-6 py-4 text-xs text-slate-500">
                  <Badge variant={s.rimProtector === 'Yes' ? 'red' : 'outline'}>
                    {s.rimProtector === 'Yes' ? 'SÍ' : 'NO'}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredSizes.length === 0 && (
          <div className="py-20 text-center">
             <Info className="mx-auto text-slate-300 mb-4" size={48} />
             <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">No encontramos medidas que coincidan</p>
          </div>
        )}
      </div>
    </div>
  );
};

const ProductDetailModal = ({ product, onClose }: { product: CatalogueProduct, onClose: () => void }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
    >
      <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-md" onClick={onClose} />
      
      <motion.div 
        initial={{ y: 50, scale: 0.95 }}
        animate={{ y: 0, scale: 1 }}
        exit={{ y: 50, scale: 0.95 }}
        className="relative bg-white w-full max-w-6xl max-h-[90vh] overflow-hidden rounded-[2.5rem] shadow-2xl flex flex-col"
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-slate-100 px-8 py-6 flex items-center justify-between z-20">
           <div className="flex items-center gap-6">
              <button 
                onClick={onClose}
                className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-colors"
                aria-label="Cerrar detalles"
              >
                <ArrowLeft size={18} className="text-slate-500" />
              </button>
              <div>
                <Badge variant="red" className="mb-1">{product.patternCode}</Badge>
                <h2 className="text-3xl font-black uppercase italic tracking-tighter text-slate-900">{product.displayName}</h2>
              </div>
           </div>
           <div className="flex gap-3">
              <button className="hidden md:flex w-12 h-12 rounded-xl bg-slate-50 items-center justify-center text-slate-500 hover:bg-slate-100 transition-all shadow-sm">
                <Share2 size={20} />
              </button>
              <button className="hidden md:flex w-12 h-12 rounded-xl bg-slate-50 items-center justify-center text-slate-500 hover:bg-slate-100 transition-all shadow-sm">
                <Download size={20} />
              </button>
              <button 
                onClick={onClose}
                className="w-12 h-12 rounded-xl bg-slate-900 text-white flex items-center justify-center hover:bg-msb-red transition-all shadow-lg"
              >
                <X size={24} />
              </button>
           </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-8 lg:p-12 space-y-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Left: Summary & Tech Details */}
            <div className="space-y-8">
              <div className="bg-slate-900 rounded-[3rem] p-12 flex flex-col items-center justify-center border border-slate-800 shadow-2xl relative overflow-hidden min-h-[300px]">
                <div className="absolute inset-0 industrial-grid opacity-20 pointer-events-none" />
                <div className="z-10 text-center">
                   <Badge variant="red" className="mb-4">PATTERN</Badge>
                   <h3 className="text-6xl md:text-8xl font-black italic text-white tracking-tight drop-shadow-2xl">{product.patternCode}</h3>
                </div>
                {product.recommendedFor && (
                  <div className="absolute bottom-8 left-8 right-8 bg-white/10 backdrop-blur-md border border-white/10 p-6 rounded-2xl shadow-sm z-10 text-center">
                     <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Recomendado para</p>
                     <p className="text-sm font-black uppercase italic text-white">{product.recommendedFor}</p>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                 <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                       <SlidersHorizontal size={12} className="text-msb-red" /> Uso principal
                    </p>
                    <p className="text-sm font-black uppercase text-slate-800">{product.usage.join(' / ')}</p>
                 </div>
                 <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                       <Compass size={12} className="text-msb-red" /> Categoría Vehículo
                    </p>
                    <p className="text-sm font-black uppercase text-slate-800">{product.vehicleType}</p>
                 </div>
              </div>
            </div>

            {/* Right: Description & Performance */}
            <div className="space-y-12">
               <div className="space-y-6">
                 <h3 className="text-xs font-black uppercase tracking-[0.4em] text-slate-400">DESCRIPCIÓN TÉCNICA</h3>
                 <div className="prose prose-slate prose-sm">
                    <p className="text-lg font-bold italic uppercase text-slate-700 leading-snug">
                       "{product.description.es}"
                    </p>
                 </div>
               </div>

               <div className="space-y-8">
                  <h3 className="text-xs font-black uppercase tracking-[0.4em] text-slate-400">ATRIBUTOS DE DESEMPEÑO</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     {product.performanceTags.map((tag) => (
                       <div key={tag} className="flex items-center gap-4 p-4 rounded-xl border border-slate-100 hover:border-msb-red/30 transition-colors bg-white shadow-sm group">
                         <div className="w-10 h-10 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-msb-red/5 group-hover:text-msb-red transition-all">
                            {tag === 'Deportivo' || tag === 'Sport' ? <Zap size={18} /> : 
                             tag === 'Manejo' || tag === 'Handling' ? <SlidersHorizontal size={18} /> : 
                             tag === 'Frenado en Mojado' || tag === 'Wet Braking' ? <Droplets size={18} /> : 
                             tag === 'Confort' || tag === 'Comfort' ? <Shield size={18} /> : 
                             tag === 'Silencioso' || tag === 'Silent' ? <Wind size={18} /> :
                             tag === 'Kilometraje' || tag === 'Mileage' || tag === 'Durabilidad' ? <BarChart3 size={18} /> : 
                             tag === 'Todo Terreno' ? <Construction size={18} /> :
                             tag === 'Tracción' ? <Compass size={18} /> : <CheckCircle2 size={18} />}
                         </div>
                         <span className="font-black uppercase italic text-slate-800 text-sm tracking-tight">{tag}</span>
                       </div>
                     ))}
                  </div>
               </div>
            </div>
          </div>

          {/* Sizes Table Section */}
          <div className="space-y-8 pb-20">
             <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="space-y-1">
                  <h3 className="text-xs font-black uppercase tracking-[0.4em] text-slate-400">MEDIDAS DISPONIBLES Y ESPECIFICACIONES</h3>
                  <p className="text-[10px] font-bold text-slate-400 uppercase italic">Se encontraron {product.sizes.length} medidas para este modelo</p>
                </div>
                <button 
                  onClick={() => window.open(`https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(`Hola! Quisiera consultar stock y precio del modelo *${product.displayName}* (${product.patternCode}).\n\n¿Tendrán disponibilidad? Muchas gracias.`)}`, '_blank')}
                  className="msb-button-primary h-14 px-8 text-[10px] shadow-lg shadow-msb-red/20 flex items-center gap-2 group"
                >
                   PEDÍ COTIZACIÓN POR WHATSAPP <Phone size={14} className="group-hover:rotate-12 transition-transform" />
                </button>
             </div>
             <SpecsTable sizes={product.sizes} />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const ProductCompareBar = ({ selectedIds, onClear, onOpenCompare }: { selectedIds: string[], onClear: () => void, onOpenCompare: () => void }) => (
  <motion.div 
    initial={{ y: 100 }}
    animate={{ y: 0 }}
    exit={{ y: 100 }}
    className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 w-full max-w-2xl px-6"
  >
    <div className="bg-slate-900 border border-white/10 rounded-2xl shadow-2xl p-4 flex items-center justify-between text-white">
       <div className="flex items-center gap-6">
          <div className="flex -space-x-3">
             {selectedIds.map(id => {
               const p = CATALOGUE_DATA.products.find(p => p.id === id);
               return (
                 <div key={id} className="w-12 h-12 rounded-full bg-white border-2 border-slate-900 overflow-hidden flex items-center justify-center p-2 shadow-lg">
                    <img src={p?.image || undefined} className="w-full h-full object-contain" />
                 </div>
               );
             })}
          </div>
          <div>
            <p className="text-xs font-black uppercase tracking-wider">{selectedIds.length} PRODUCTOS</p>
            <p className="text-[10px] text-slate-400 uppercase font-bold">Listos para comparar</p>
          </div>
       </div>
       <div className="flex items-center gap-3">
          <button onClick={onClear} className="px-4 h-12 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-white transition-colors">LIMPIAR</button>
          <button 
            onClick={onOpenCompare}
            className="bg-msb-red hover:bg-red-700 text-white px-8 h-12 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg flex items-center gap-2 transition-all active:scale-95"
          >
            COMPARAR SELECCIÓN <ArrowRight size={14} />
          </button>
       </div>
    </div>
  </motion.div>
);

const CompareModal = ({ products, onClose, onRemove }: { products: CatalogueProduct[], onClose: () => void, onRemove: (id: string) => void }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[110] flex items-center justify-center p-4 md:p-8"
    >
      <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-xl" onClick={onClose} />
      
      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 50, opacity: 0 }}
        className="relative bg-white w-full max-w-7xl max-h-[90vh] overflow-hidden rounded-[2.5rem] shadow-2xl flex flex-col"
      >
        <div className="sticky top-0 bg-white border-b border-slate-100 px-8 py-6 flex items-center justify-between z-20">
           <div className="flex items-center gap-4">
              <Layers className="text-msb-red" size={24} />
              <h2 className="text-2xl font-black uppercase italic tracking-tighter text-slate-900">Comparativa de Productos</h2>
           </div>
           <button onClick={onClose} className="w-12 h-12 rounded-xl bg-slate-50 text-slate-900 flex items-center justify-center hover:bg-slate-100 transition-all">
             <X size={24} />
           </button>
        </div>

        <div className="flex-1 overflow-x-auto overflow-y-auto">
          <div className="min-w-[900px] p-8 lg:p-12">
            <table className="w-full text-left border-separate border-spacing-x-4">
               <thead>
                 <tr>
                    <th className="w-1/4"></th>
                    {products.map(p => (
                      <th key={p.id} className="w-1/4 pb-8 align-top">
                        <div className="relative bg-slate-50 rounded-3xl p-6 border border-slate-100 group">
                           <button 
                             onClick={() => onRemove(p.id)}
                             className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center shadow-lg hover:bg-msb-red transition-colors"
                           >
                             <X size={14} />
                           </button>
                           <div className="aspect-square flex items-center justify-center mb-6">
                              <img src={p.image || undefined} className="w-full h-full object-contain filter drop-shadow-xl" />
                           </div>
                           <Badge variant="red" className="mb-2">{p.patternCode}</Badge>
                           <h3 className="text-xl font-black uppercase italic text-slate-900 leading-tight">{p.displayName}</h3>
                        </div>
                      </th>
                    ))}
                 </tr>
               </thead>
               <tbody>
                  <tr>
                    <td className="py-6 border-b border-slate-100"><span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Tipo de Vehículo</span></td>
                    {products.map(p => (
                      <td key={p.id} className="py-6 border-b border-slate-100 font-black text-slate-700 text-sm uppercase">{p.vehicleType}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-6 border-b border-slate-100"><span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Categoría</span></td>
                    {products.map(p => (
                      <td key={p.id} className="py-6 border-b border-slate-100 font-bold text-msb-red text-sm uppercase italic">{p.category}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-6 border-b border-slate-100"><span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Performance</span></td>
                    {products.map(p => (
                      <td key={p.id} className="py-6 border-b border-slate-100">
                        <div className="flex flex-wrap gap-1.5">
                           {p.performanceTags.map(tag => <Badge key={tag} variant="ghost">{tag}</Badge>)}
                        </div>
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-6 border-b border-slate-100"><span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Medidas Rim</span></td>
                    {products.map(p => (
                      <td key={p.id} className="py-6 border-b border-slate-100 font-mono text-sm">R{p.rimSizes.join(', R')}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-8"><span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Recomendación MSB</span></td>
                    {products.map(p => (
                      <td key={p.id} className="py-8">
                         <div className="bg-slate-900 text-white p-6 rounded-2xl text-xs font-black uppercase italic leading-relaxed relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-2 opacity-10">
                               <Shield size={32} />
                            </div>
                            {p.category.includes('Performance') || p.category.includes('Deportivo') ? 'IDEAL PARA CONDUCCIÓN DEPORTIVA Y ALTA VELOCIDAD' : 
                             p.category.includes('Terrain') || p.category.includes('Terreno') ? 'EXCELENTE PARA OFF-ROAD Y CONDICIONES HOSTILES' :
                             p.category.includes('Commercial') || p.category.includes('Comercial') ? 'MAXIMA DURACIÓN PARA USO INTENSIVO DIARIO' :
                             'EQUILIBRIO PERFECTO ENTRE CONFORT Y SEGURIDAD'}
                         </div>
                      </td>
                    ))}
                  </tr>
               </tbody>
            </table>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export const CataloguePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchParamValue = searchParams.get('search') || '';
  const [search, setSearch] = useState(searchParamValue);

  useEffect(() => {
    setSearch(searchParamValue);
  }, [searchParamValue]);

  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [selectedUsage, setSelectedUsage] = useState('Todos');
  const [selectedRim, setSelectedRim] = useState('Todos');
  const [activeSort, setActiveSort] = useState('A-Z');
  
  // Sync URL search param when user types
  const handleSearchChange = (val: string) => {
    setSearch(val);
    const newParams = new URLSearchParams(searchParams);
    if (val) {
      newParams.set('search', val);
    } else {
      newParams.delete('search');
    }
    setSearchParams(newParams);
  };
  const [selectedProduct, setSelectedProduct] = useState<CatalogueProduct | null>(null);
  const [compareIds, setCompareIds] = useState<string[]>([]);
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const categories = ['Todos', ...CATALOGUE_DATA.categories];
  const usages = ['Todos', ...CATALOGUE_DATA.usages];
  const rims = ['Todos', ...CATALOGUE_DATA.rimSizes];

  const filteredProducts = useMemo(() => {
    const normalize = (str: string) => str.toLowerCase().replace(/[^a-z0-9]/g, '');
    const normalizeDigits = (str: string) => str.replace(/\D/g, '');
    
    const searchNormalized = normalize(search);
    const searchDigits = normalizeDigits(search);
    
    let result = CATALOGUE_DATA.products.filter(p => {
      const matchSearch = 
        normalize(p.displayName).includes(searchNormalized) ||
        normalize(p.patternCode).includes(searchNormalized) ||
        normalize(p.category).includes(searchNormalized) ||
        p.performanceTags.some(t => normalize(t).includes(searchNormalized)) ||
        p.sizes.some(s => {
          const tireNormalized = normalize(s.tireSize);
          const tireDigits = normalizeDigits(s.tireSize);
          
          // Match by normalized string (includes letters like R, P, LT)
          if (tireNormalized.includes(searchNormalized) || searchNormalized.includes(tireNormalized)) return true;
          
          // Match by digits only (e.g. 2055516) - only if we have at least 5 digits to avoid false positives
          if (searchDigits.length >= 5 && tireDigits.length >= 5) {
             if (tireDigits.includes(searchDigits) || searchDigits.includes(tireDigits)) return true;
          }
          
          return false;
        });

      const matchCategory = selectedCategory === 'Todos' || p.vehicleType === selectedCategory;
      const matchUsage = selectedUsage === 'Todos' || p.usage.includes(selectedUsage);
      const matchRim = selectedRim === 'Todos' || p.rimSizes.includes(selectedRim);

      return matchSearch && matchCategory && matchUsage && matchRim;
    });

    // Sorting
    switch (activeSort) {
      case 'A-Z':
        result.sort((a, b) => a.displayName.localeCompare(b.displayName));
        break;
      case 'Categoría':
        result.sort((a, b) => a.category.localeCompare(b.category));
        break;
      case 'Rim':
        result.sort((a, b) => parseInt(a.rimSizes[0]) - parseInt(b.rimSizes[0]));
        break;
    }

    return result;
  }, [search, selectedCategory, selectedUsage, selectedRim, activeSort]);

  const toggleCompare = (id: string) => {
    setCompareIds(prev => {
      if (prev.includes(id)) return prev.filter(i => i !== id);
      if (prev.length >= 3) {
        alert('Solo podés comparar hasta 3 productos.');
        return prev;
      }
      return [...prev, id];
    });
  };

  const compareProducts = CATALOGUE_DATA.products.filter(p => compareIds.includes(p.id));

  return (
    <div className="min-h-screen bg-[#f8f9fa] pt-24 pb-32">
      {/* Catalogue Header */}
      <section className="bg-white border-b border-slate-200 px-8 xl:px-12 py-12 md:py-20 relative overflow-hidden">
        <div className="absolute inset-0 industrial-grid opacity-[0.03] pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10 text-left flex flex-col md:flex-row md:items-end justify-between gap-12">
            <div className="space-y-6 max-w-2xl">
              <div>
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase italic tracking-tighter text-slate-950 font-display leading-[0.8] drop-shadow-sm">
                  Stock de <br /><span className="text-msb-red">Productos</span>
                </h1>
              </div>
              <p className="max-w-xl text-slate-500 font-bold uppercase tracking-widest text-xs md:text-sm leading-relaxed">
                Navegá por modelos de neumáticos, aplicaciones, medidas y fichas técnicas oficiales.
              </p>
            </div>
           <div className="flex shrink-0 pb-4">
             <button 
                onClick={() => window.open('/catalogo_msb.pdf', '_blank')}
                className="msb-button-primary bg-slate-900 border-slate-900 hover:bg-slate-800 h-16 px-10 shadow-lg flex items-center gap-3 whitespace-nowrap"
             >
                <Download size={20} /> DESCARGAR CATÁLOGO PDF
             </button>
           </div>
        </div>
      </section>

      {/* Main Layout */}
      <section className="max-w-7xl mx-auto px-8 xl:px-12 py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-12 items-start">
          
          {/* Sidebar Desktop */}
          <aside className={cn(
            "lg:sticky lg:top-32 space-y-10 z-40 transition-all",
            isSidebarOpen ? "fixed inset-0 bg-white p-8 overflow-y-auto block" : "hidden lg:block "
          )}>
            {isSidebarOpen && (
              <div className="flex items-center justify-between mb-8 lg:hidden">
                <h3 className="font-black text-xl uppercase italic tracking-tighter">Filtros</h3>
                <button onClick={() => setIsSidebarOpen(false)} className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center">
                  <X size={20} />
                </button>
              </div>
            )}

            <div className="space-y-4">
               <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-[0.3em] flex items-center gap-2">
                 <Search size={12} className="text-msb-red" /> Buscá
               </h4>
               <div className="relative">
                 <input 
                    type="text" 
                    placeholder="Medida o modelo..."
                    value={search}
                    onChange={(e) => handleSearchChange(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-xl py-4 pl-4 pr-10 text-sm outline-none focus:border-msb-red transition-all shadow-sm"
                 />
                 <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
               </div>
            </div>

            <div className="space-y-4 text-[11px] font-black uppercase tracking-widest">
               <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-[0.3em] flex items-center gap-2">
                 <Filter size={12} className="text-msb-red" /> Vehículo
               </h4>
               <div className="flex flex-col gap-2">
                  {categories.map(cat => (
                    <button 
                      key={cat} 
                      onClick={() => setSelectedCategory(cat)}
                      className={cn(
                        "flex items-center justify-between px-4 py-3 rounded-xl transition-all border",
                        selectedCategory === cat ? "bg-slate-900 border-slate-900 text-white shadow-lg" : "bg-white border-slate-100 text-slate-500 hover:border-msb-red/30"
                      )}
                    >
                      {cat} {selectedCategory === cat && <Check size={12} strokeWidth={4} />}
                    </button>
                  ))}
               </div>
            </div>

            <div className="space-y-4 text-[11px] font-black uppercase tracking-widest">
               <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-[0.3em] flex items-center gap-2">
                 <Compass size={12} className="text-msb-red" /> Aplicación / Uso
               </h4>
               <select 
                 value={selectedUsage} 
                 onChange={(e) => setSelectedUsage(e.target.value)}
                 className="w-full bg-white border border-slate-200 rounded-xl py-4 px-4 outline-none focus:border-msb-red transition-all shadow-sm appearance-none"
               >
                 {usages.map(u => <option key={u} value={u}>{u}</option>)}
               </select>
            </div>

            <div className="space-y-4 text-[11px] font-black uppercase tracking-widest">
               <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-[0.3em] flex items-center gap-2">
                 <SlidersHorizontal size={12} className="text-msb-red" /> Rodado (Rim)
               </h4>
               <div className="grid grid-cols-4 gap-2">
                  {rims.map(rim => (
                    <button 
                      key={rim}
                      onClick={() => setSelectedRim(rim)}
                      className={cn(
                        "h-10 rounded-lg flex items-center justify-center text-[10px] font-black border transition-all",
                        selectedRim === rim ? "bg-msb-red border-msb-red text-white shadow-md scale-105" : "bg-white border-slate-100 text-slate-400 hover:border-msb-red/20"
                      )}
                    >
                      {rim === 'Todos' ? 'ALL' : rim}
                    </button>
                  ))}
               </div>
            </div>
          </aside>

          {/* Product Feed */}
          <main className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white p-4 md:p-6 rounded-2xl border border-slate-100 shadow-sm">
               <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5 p-1 bg-slate-50 rounded-lg border border-slate-100">
                    <button 
                      onClick={() => setViewMode('grid')}
                      className={cn("w-10 h-10 rounded-md shadow-sm flex items-center justify-center transition-all", viewMode === 'grid' ? "bg-white text-slate-800" : "text-slate-400 hover:bg-white/50 hover:text-slate-600")}
                    ><Grid size={18} /></button>
                    <button 
                      onClick={() => setViewMode('list')}
                      className={cn("w-10 h-10 rounded-md shadow-sm flex items-center justify-center transition-all", viewMode === 'list' ? "bg-white text-slate-800" : "text-slate-400 hover:bg-white/50 hover:text-slate-600")}
                    ><List size={18} /></button>
                  </div>
                  <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest pl-2 hidden sm:inline-block">
                    {filteredProducts.length} PRODUCTOS ENCONTRADOS
                  </span>
               </div>
               
               <div className="flex items-center gap-4">
                  <button 
                    onClick={() => setIsSidebarOpen(true)}
                    className="lg:hidden flex-1 flex items-center justify-center gap-2 bg-slate-50 border border-slate-100 rounded-xl px-6 h-12 text-[10px] font-black uppercase tracking-widest text-slate-600"
                  >
                    <SlidersHorizontal size={16} /> FILTROS
                  </button>
                  <div className="flex items-center gap-3">
                    <span className="hidden md:inline text-[10px] font-black uppercase text-slate-400 tracking-widest">Ordenar por</span>
                    <div className="flex items-center gap-1 bg-slate-50 p-1 rounded-lg border border-slate-100">
                      {['A-Z', 'Categoría', 'Rim'].map(sort => (
                        <button 
                          key={sort}
                          onClick={() => setActiveSort(sort)}
                          className={cn(
                            "px-4 h-9 rounded-md text-[10px] font-black uppercase tracking-widest transition-all",
                            activeSort === sort ? "bg-white text-msb-red shadow-sm" : "text-slate-400 hover:text-slate-600"
                          )}
                        >
                          {sort}
                        </button>
                      ))}
                    </div>
                  </div>
               </div>
            </div>

            <div className={cn(
              "gap-8",
              viewMode === 'grid' ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3" : "flex flex-col"
            )}>
               <AnimatePresence mode="popLayout">
                 {filteredProducts.map(p => (
                   <ProductCard 
                     key={p.id} 
                     product={p} 
                     onOpen={setSelectedProduct} 
                     isCompared={compareIds.includes(p.id)}
                     onCompareToggle={toggleCompare}
                     viewMode={viewMode}
                   />
                 ))}
               </AnimatePresence>
            </div>

            {filteredProducts.length === 0 && (
              <div className="bg-white border-2 border-dashed border-slate-100 rounded-[3rem] py-24 md:py-32 px-8 text-center space-y-8 animate-in fade-in zoom-in-95 duration-500 shadow-sm relative overflow-hidden">
                <div className="absolute inset-0 industrial-grid opacity-[0.03] pointer-events-none" />
                <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto shadow-inner">
                  <Search size={40} className="text-slate-200" strokeWidth={1.5} />
                </div>
                <div className="space-y-4 max-w-xl mx-auto relative z-10">
                  <h3 className="text-3xl font-black uppercase italic tracking-tighter text-slate-800">No encontramos resultados</h3>
                  <p className="text-slate-500 font-bold uppercase tracking-widest text-xs leading-relaxed">
                    No hay productos que coincidan con "<span className="text-msb-red">{search}</span>". 
                    Intentá con términos más generales o usá nuestro selector vehicular para saber qué medida necesitás.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
                  <button 
                    onClick={() => { handleSearchChange(''); setSelectedCategory('Todos'); setSelectedUsage('Todos'); setSelectedRim('Todos'); }} 
                    className="px-10 h-16 bg-slate-100 text-slate-600 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-200 transition-all"
                  >
                    LIMPIAR FILTROS
                  </button>
                  <Link 
                    to="/" 
                    onClick={() => {
                      setTimeout(() => {
                        document.getElementById('selector')?.scrollIntoView({ behavior: 'smooth' });
                      }, 100);
                    }}
                    className="px-10 h-16 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-msb-red transition-all shadow-xl flex items-center justify-center gap-3"
                  >
                    <Car size={18} /> IR AL SELECTOR VEHICULAR
                  </Link>
                </div>
              </div>
            )}
          </main>
        </div>
      </section>

      {/* Featured Brands Horizontal */}
      <section className="bg-slate-950 py-12 border-y border-white/5 opacity-40 grayscale contrast-150">
         <div className="max-w-7xl mx-auto px-8 xl:px-12 flex justify-around items-center gap-12 overflow-x-auto no-scrollbar">
            <span className="text-3xl font-black italic text-white font-display">KUMHO</span>
            <span className="text-3xl font-black italic text-white font-display">ECSTA</span>
            <span className="text-3xl font-black italic text-white font-display">SOLUS</span>
            <span className="text-3xl font-black italic text-white font-display">CRUGEN</span>
            <span className="text-3xl font-black italic text-white font-display">ROAD VENTURE</span>
         </div>
      </section>

      {/* Modals and Bars */}
      <AnimatePresence>
        {selectedProduct && (
          <ProductDetailModal 
            product={selectedProduct} 
            onClose={() => setSelectedProduct(null)} 
          />
        )}
        
        {compareIds.length > 0 && (
          <ProductCompareBar 
            selectedIds={compareIds} 
            onClear={() => setCompareIds([])}
            onOpenCompare={() => setIsCompareOpen(true)}
          />
        )}

        {isCompareOpen && (
          <CompareModal 
            products={compareProducts} 
            onClose={() => setIsCompareOpen(false)}
            onRemove={(id) => toggleCompare(id)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};
