import React, { useState } from 'react';
import { SPARE_PARTS, COMPANY_INFO } from '../data/miningData';
import { SparePart } from '../types';
import { 
  Search, 
  Filter, 
  Package, 
  Clock, 
  CheckCircle2, 
  PhoneCall, 
  Wrench, 
  Zap,
  Radio,
  FileCheck
} from 'lucide-react';

interface SparePartsViewProps {
  onOpenQuoteWithPart: (partName: string) => void;
}

export const SparePartsView: React.FC<SparePartsViewProps> = ({ onOpenQuoteWithPart }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');

  const filteredParts = SPARE_PARTS.filter(part => {
    const matchesSearch = 
      part.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      part.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      part.compatibility.toLowerCase().includes(searchTerm.toLowerCase()) ||
      part.oemReference.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCat = selectedCategory === 'todos' || part.category === selectedCategory;

    return matchesSearch && matchesCat;
  });

  return (
    <div className="w-full bg-[#090f16] pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 flex flex-col gap-10">
        
        {/* Banner */}
        <div className="flex flex-col gap-3 border-b border-white/[0.08] pb-8">
          <div className="flex items-center gap-2 font-mono-tech text-xs text-amber-400 uppercase tracking-widest font-semibold">
            <Package className="w-4 h-4" />
            <span>División de Componentes & Suministros Críticos</span>
          </div>
          <h1 className="font-heading text-3xl sm:text-5xl text-white font-extrabold uppercase tracking-tight">
            Repuestos & Componentes Mineros
          </h1>
          <p className="text-sm sm:text-base text-gray-300 max-w-3xl leading-relaxed">
            Stock estratégico en almacenes de Lima (Chaclacayo / Ate), Arequipa y Huancayo. Componentes nuevos y reconstruidos con tolerancias OEM para entrega inmediata en campamento minero.
          </p>
        </div>

        {/* Emergency Dispatch Hotline Box */}
        <div className="p-4 sm:p-6 bg-gradient-to-r from-[#161c24] to-[#121820] border border-cyan-500/30 rounded-lg flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
              <Radio className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <span className="font-mono-tech text-xs text-cyan-400 uppercase font-bold block">
                DESPACHO DE EMERGENCIA // MÁQUINA PARADA EN MINA
              </span>
              <span className="text-xs text-gray-300">
                Logística aérea y terrestre prioritaria para piezas críticas hacia cualquier unidad minera en Perú.
              </span>
            </div>
          </div>
          <a
            href={`tel:${COMPANY_INFO.phone}`}
            className="px-5 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-black font-heading font-extrabold text-xs uppercase rounded flex items-center gap-2 transition-colors shrink-0"
          >
            <PhoneCall className="w-4 h-4" />
            <span>Llamar Guardia Técnica: {COMPANY_INFO.phone}</span>
          </a>
        </div>

        {/* Search and Filters Bar */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-[#121820] p-4 rounded border border-white/[0.08]">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar por código de parte, modelo de equipo (ej. COP 1838, LH307) o OEM..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#090f16] border border-white/[0.1] text-white text-xs pl-10 pr-4 py-2.5 rounded focus:outline-none focus:border-amber-400 font-mono-tech"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto">
            {['todos', 'hidraulica', 'perforacion', 'transmision', 'sellos', 'electricos'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-2 rounded text-xs font-mono-tech uppercase whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#ffb800] text-[#1a1200] font-bold shadow'
                    : 'bg-[#161c24] text-gray-400 hover:text-white border border-white/[0.05]'
                }`}
              >
                {cat === 'todos' ? 'Todos' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Results Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredParts.map((part) => (
            <div
              key={part.id}
              className="p-5 bg-[#121820] border border-white/[0.08] rounded flex flex-col justify-between gap-4 hover:border-amber-500/40 transition-colors group"
            >
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono-tech text-[10px] text-amber-400 font-bold uppercase">
                    {part.code}
                  </span>
                  <span className={`px-2 py-0.5 rounded font-mono-tech text-[9px] uppercase font-semibold ${
                    part.stockStatus === 'Inmediato'
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                  }`}>
                    {part.stockStatus}
                  </span>
                </div>

                <h3 className="font-heading text-base font-bold text-white uppercase group-hover:text-amber-400 transition-colors">
                  {part.name}
                </h3>

                <p className="text-xs text-gray-400 leading-relaxed">
                  {part.description}
                </p>
              </div>

              <div className="flex flex-col gap-1.5 bg-[#090f16] p-3 rounded font-mono-tech text-[11px] border border-white/[0.04]">
                <div className="flex justify-between">
                  <span className="text-gray-500 uppercase text-[9px]">Marca / OEM:</span>
                  <span className="text-gray-200">{part.brand}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 uppercase text-[9px]">Referencia:</span>
                  <span className="text-cyan-300">{part.oemReference}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 uppercase text-[9px]">Compatibilidad:</span>
                  <span className="text-gray-300 text-right truncate max-w-[180px]">{part.compatibility}</span>
                </div>
              </div>

              <button
                onClick={() => onOpenQuoteWithPart(`${part.name} (${part.code})`)}
                className="w-full py-2.5 bg-[#1e2632] hover:bg-[#ffb800] hover:text-[#1a1200] text-gray-200 font-mono-tech text-xs uppercase font-bold rounded transition-all flex items-center justify-center gap-2 border border-white/[0.08]"
              >
                <Wrench className="w-3.5 h-3.5" />
                <span>Consultar Disponibilidad</span>
              </button>
            </div>
          ))}
        </div>

        {filteredParts.length === 0 && (
          <div className="p-12 text-center bg-[#121820] rounded border border-white/[0.08] flex flex-col items-center gap-3">
            <Package className="w-12 h-12 text-gray-500" />
            <span className="font-heading text-lg font-bold text-white uppercase">
              No se encontraron coincidencias exactas
            </span>
            <p className="text-xs text-gray-400 max-w-md">
              Fabricamos y conseguimos componentes descatalogados o específicos bajo plano OEM. Consúltenos directamente.
            </p>
            <button
              onClick={() => onOpenQuoteWithPart('Búsqueda especial de repuesto')}
              className="mt-2 px-6 py-2.5 bg-[#ffb800] text-black font-heading font-bold text-xs uppercase rounded"
            >
              Consultar a Ingeniería
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
