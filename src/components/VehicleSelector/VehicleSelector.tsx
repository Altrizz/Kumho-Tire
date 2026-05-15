
import React, { useState, useMemo } from 'react';
import { Search, ChevronRight, Phone, MessageSquare, AlertTriangle, CheckCircle2, Car, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/src/lib/utils';
import vehicleData from '../../data/catalogueLoader';

interface VehicleEntry {
  marca: string;
  modelo: string;
  anio_desde: number;
  anio_hasta: number;
  version: string;
  carroceria: string;
  medida: string;
  estado: string;
  rodado: string | number;
  posicion?: string;
}

const WHATSAPP_PHONE = "541159678314";

export const VehicleSelector: React.FC = () => {
  const navigate = useNavigate();
  const [marca, setMarca] = useState('');
  const [modelo, setModelo] = useState('');
  const [anio, setAnio] = useState<string>('');
  const [version, setVersion] = useState('');

  // Normalization and extraction helpers
  const brands = useMemo(() => {
    const unique = Array.from(new Set(vehicleData.map(d => d.marca)));
    return unique.filter(Boolean).sort((a, b) => a.localeCompare(b));
  }, []);

  const models = useMemo(() => {
    if (!marca) return [];
    const filtered = vehicleData.filter(d => d.marca === marca);
    const unique = Array.from(new Set(filtered.map(d => d.modelo)));
    return unique.filter(Boolean).sort((a, b) => a.localeCompare(b));
  }, [marca]);

  const years = useMemo(() => {
    if (!marca || !modelo) return [];
    const filtered = vehicleData.filter(d => d.marca === marca && d.modelo === modelo);
    const availableYears = new Set<number>();
    
    filtered.forEach(d => {
      const start = Number(d.anio_desde) || 0;
      const end = Number(d.anio_hasta) || new Date().getFullYear();
      if (start > 0) {
        for (let y = start; y <= end; y++) {
          availableYears.add(y);
        }
      }
    });

    return Array.from(availableYears).sort((a, b) => b - a);
  }, [marca, modelo]);

  const versions = useMemo(() => {
    if (!marca || !modelo || !anio) return [];
    const selectedYear = Number(anio);
    return vehicleData.filter(d => 
      d.marca === marca && 
      d.modelo === modelo && 
      Number(d.anio_desde) <= selectedYear && 
      (Number(d.anio_hasta) >= selectedYear || !d.anio_hasta)
    ).sort((a, b) => a.version.localeCompare(b.version));
  }, [marca, modelo, anio]);

  const results = useMemo(() => {
    if (!marca || !modelo || !anio || !version) return [];
    const selectedYear = Number(anio);
    return vehicleData.filter(d => 
      d.marca === marca && 
      d.modelo === modelo && 
      d.version === version &&
      Number(d.anio_desde) <= selectedYear && 
      (Number(d.anio_hasta) >= selectedYear || !d.anio_hasta)
    );
  }, [marca, modelo, anio, version]);

  const handleWhatsApp = (medida?: string) => {
    const text = medida 
      ? `Hola! Consulto por neumáticos para mi ${marca} ${modelo} ${anio} (${version}). La medida sugerida es ${medida}.`
      : `Hola! Consulto por neumáticos para mi ${marca} ${modelo} ${anio} (${version}).`;
    window.open(`https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 md:p-12 bg-white rounded-[2rem] border border-slate-200 shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-bl-[100px] -z-10" />
      
      <div className="space-y-4 mb-10 text-center md:text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-msb-red/5 border border-msb-red/10 rounded-full text-msb-red text-[10px] font-black uppercase tracking-widest mb-2">
          <Car size={14} /> Selector Vehicular
        </div>
        <h2 className="text-3xl md:text-5xl font-black uppercase italic tracking-tighter text-slate-800">
          Encontrá la medida <span className="text-msb-red">correcta</span> para tu vehículo
        </h2>
        <p className="text-slate-500 font-bold uppercase text-[11px] tracking-widest">
          Seleccioná marca, modelo, año y versión para ver la medida recomendada.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          {/* Marca */}
          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block ml-1">1. Marca</label>
            <div className="relative">
              <select 
                value={marca}
                onChange={(e) => {
                  setMarca(e.target.value);
                  setModelo('');
                  setAnio('');
                  setVersion('');
                }}
                className="w-full bg-slate-50 border border-slate-200 text-slate-900 pr-10 pl-5 py-4 rounded-2xl font-bold text-lg outline-none focus:border-msb-red transition-all cursor-pointer appearance-none hover:bg-slate-100"
              >
                <option value="">Seleccioná Marca</option>
                {brands.map(b => <option key={b} value={b}>{b}</option>)}
              </select>
              <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 rotate-90 text-slate-400 pointer-events-none" size={20} />
            </div>
          </div>

          {/* Modelo */}
          <div className="space-y-3">
            <label className={cn(
              "text-[10px] font-black uppercase tracking-widest block ml-1 transition-colors",
              marca ? "text-slate-400" : "text-slate-200"
            )}>2. Modelo</label>
            <div className="relative">
              <select 
                disabled={!marca}
                value={modelo}
                onChange={(e) => {
                  setModelo(e.target.value);
                  setAnio('');
                  setVersion('');
                }}
                className="w-full bg-slate-50 border border-slate-200 text-slate-900 pr-10 pl-5 py-4 rounded-2xl font-bold text-lg outline-none focus:border-msb-red transition-all cursor-pointer appearance-none hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <option value="">Seleccioná Modelo</option>
                {models.map(m => <option key={m} value={m}>{m}</option>)}
              </select>
              <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 rotate-90 text-slate-400 pointer-events-none" size={20} />
            </div>
          </div>

          {/* Año */}
          <div className="space-y-3">
            <label className={cn(
              "text-[10px] font-black uppercase tracking-widest block ml-1 transition-colors",
              modelo ? "text-slate-400" : "text-slate-200"
            )}>3. Año</label>
            <div className="relative">
              <select 
                disabled={!modelo}
                value={anio}
                onChange={(e) => {
                  setAnio(e.target.value);
                  setVersion('');
                }}
                className="w-full bg-slate-50 border border-slate-200 text-slate-900 pr-10 pl-5 py-4 rounded-2xl font-bold text-lg outline-none focus:border-msb-red transition-all cursor-pointer appearance-none hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <option value="">Seleccioná Año</option>
                {years.map(y => <option key={y} value={y}>{y}</option>)}
              </select>
              <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 rotate-90 text-slate-400 pointer-events-none" size={20} />
            </div>
          </div>

          {/* Versión */}
          <div className="space-y-3">
            <label className={cn(
              "text-[10px] font-black uppercase tracking-widest block ml-1 transition-colors",
              anio ? "text-slate-400" : "text-slate-200"
            )}>4. Versión / Gama</label>
            <div className="relative">
              <select 
                disabled={!anio}
                value={version}
                onChange={(e) => setVersion(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 text-slate-900 pr-10 pl-5 py-4 rounded-2xl font-bold text-lg outline-none focus:border-msb-red transition-all cursor-pointer appearance-none hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <option value="">Seleccioná Versión</option>
                {versions.map(v => (
                  <option key={`${v.version}-${v.rodado}`} value={v.version}>
                    {v.version} {v.rodado ? `- R${v.rodado}` : ''}
                  </option>
                ))}
              </select>
              <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 rotate-90 text-slate-400 pointer-events-none" size={20} />
            </div>
          </div>
        </div>

        <div className="flex flex-col h-full bg-slate-50 rounded-[1.5rem] p-8 border border-slate-100 relative">
          <div className="absolute top-4 right-4 text-slate-200">
             <MessageSquare size={120} strokeWidth={1} />
          </div>

          <div className="relative z-10 h-full flex flex-col justify-between">
            {version ? (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                {results.map((res, i) => (
                  <div key={i} className="space-y-6 pb-6 border-b border-slate-200 last:border-0 last:pb-0">
                    <div className="space-y-2">
                       <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Resultado para:</span>
                       <h4 className="text-xl font-bold text-slate-800 leading-tight">
                         {marca} {modelo} {anio} <br />
                         <span className="text-sm font-medium text-slate-500 uppercase">{res.version}</span>
                       </h4>
                    </div>

                    {res.estado === 'Pendiente fitment' || !res.medida ? (
                      <div className="bg-amber-50 border border-amber-100 p-5 rounded-2xl flex gap-4">
                        <AlertTriangle className="text-amber-500 shrink-0" size={24} />
                        <div>
                          <p className="text-amber-900 font-bold text-sm uppercase italic tracking-tight">Medida pendiente de validación</p>
                          <p className="text-amber-700 text-xs mt-1">Consultanos para confirmar la medida exacta para tu versión.</p>
                        </div>
                      </div>
                    ) : (
                      <div className="bg-emerald-50 border border-emerald-100 p-6 rounded-3xl group">
                        <div className="flex items-center justify-between gap-3 mb-3">
                           <div className="flex items-center gap-3">
                             <CheckCircle2 className="text-emerald-500" size={20} />
                             <span className="text-emerald-900 font-black uppercase text-[10px] tracking-widest italic leading-none">Medida recomendada</span>
                           </div>
                           {res.posicion && (
                             <span className="text-[10px] font-bold text-emerald-700/50 uppercase tracking-tighter bg-emerald-100/50 px-2 py-0.5 rounded-md">
                               {res.posicion}
                             </span>
                           )}
                        </div>
                        <div className="text-4xl md:text-5xl font-black text-emerald-600 italic tracking-tighter drop-shadow-sm font-display">
                          {res.medida}
                        </div>
                        {res.rodado && (
                           <p className="text-emerald-800/60 font-bold text-[10px] mt-2 uppercase tracking-widest">Rodado Original: R{res.rodado}</p>
                        )}
                      </div>
                    )}

                    <div className="flex flex-col gap-3">
                      <button 
                        disabled={!res.medida}
                        onClick={() => {
                          if (res.medida) {
                            navigate(`/catalog?search=${encodeURIComponent(res.medida)}`);
                          }
                        }}
                        className="w-full py-4 border-2 border-slate-200 rounded-2xl font-black uppercase text-[10px] tracking-widest text-slate-700 hover:border-slate-800 hover:bg-slate-800 hover:text-white transition-all flex items-center justify-center gap-3 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                      >
                        VER PRODUCTOS EN CATÁLOGO
                        <ArrowRight size={16} />
                      </button>

                      <button 
                        onClick={() => handleWhatsApp(res.medida)}
                        className="w-full msb-button-primary h-16 flex items-center justify-center gap-4 text-xs shadow-xl shadow-msb-red/20 group overflow-hidden"
                      >
                        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <Phone size={18} className="group-hover:rotate-12 transition-transform" />
                        CONSULTAR DISPONIBILIDAD
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4 opacity-40">
                <div className="w-20 h-20 bg-slate-200 rounded-full flex items-center justify-center text-slate-400">
                  <Search size={32} />
                </div>
                <div>
                  <p className="text-sm font-black uppercase tracking-widest text-slate-500">Esperando selección</p>
                  <p className="text-xs text-slate-400 mt-1 max-w-[200px]">Completá los pasos de la izquierda para descubrir tu medida ideal.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
