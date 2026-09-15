import React, { useState } from 'react';
import { Equipment, EquipmentLine } from '../types';
import { EQUIPMENTS, EQUIPMENT_LINES } from '../data/miningData';
import { 
  ChevronRight, 
  Gauge, 
  HardHat, 
  Zap
} from 'lucide-react';

interface EquipmentCatalogProps {
  onSelectEquipment: (equipment: Equipment) => void;
  onOpenQuoteWithEquipment: (equipment: Equipment) => void;
}

export const EquipmentCatalog: React.FC<EquipmentCatalogProps> = ({
  onSelectEquipment,
  onOpenQuoteWithEquipment,
}) => {
  const [activeFilter, setActiveFilter] = useState<'todos' | EquipmentLine>('todos');

  const filteredList = activeFilter === 'todos'
    ? EQUIPMENTS
    : EQUIPMENTS.filter(e => e.line === activeFilter);

  const sectionRange = (eq: Equipment) =>
    eq.section
      ? `${eq.section.minWidth}–${eq.section.maxWidth} m ancho · ${eq.section.minHeight}–${eq.section.maxHeight} m alto`
      : 'Configuración a medida';

  return (
    <section className="w-full bg-[#0e141c] py-20 relative" id="catalogo">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 flex flex-col gap-12">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-white/[0.08] pb-8">
          <div className="flex flex-col gap-2 max-w-2xl">
            <div className="flex items-center gap-2 text-amber-400 font-mono-tech text-xs tracking-widest uppercase font-semibold">
              <HardHat className="w-4 h-4" />
              <span>Líneas del Ciclo de Minado // Pequeña y Mediana Escala</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl text-white font-extrabold uppercase tracking-tight">
              Equipos por Línea de Trabajo
            </h2>
            <p className="text-sm sm:text-base text-gray-400 leading-relaxed pt-1">
              Equipos de diseño simple y fácil mantenimiento organizados por la labor que realizan: desarrollo, fortificación, desatado, carga y acarreo, y sondaje. Fabricación y reacondicionamiento según la necesidad de la operación.
            </p>
          </div>

          {/* Line Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 bg-[#161c24] border border-white/[0.08] p-1.5 rounded self-start lg:self-end max-w-full">
            <button
              onClick={() => setActiveFilter('todos')}
              className={`px-3 py-1.5 rounded font-mono-tech text-xs uppercase transition-all ${
                activeFilter === 'todos'
                  ? 'bg-[#ffb800] text-[#1a1200] font-bold shadow'
                  : 'text-gray-400 hover:text-white hover:bg-white/[0.05]'
              }`}
            >
              Todos ({EQUIPMENTS.length})
            </button>
            {EQUIPMENT_LINES.map((line) => {
              const count = EQUIPMENTS.filter(e => e.line === line.id).length;
              return (
                <button
                  key={line.id}
                  onClick={() => setActiveFilter(line.id)}
                  className={`px-3 py-1.5 rounded font-mono-tech text-xs uppercase transition-all ${
                    activeFilter === line.id
                      ? 'bg-[#ffb800] text-[#1a1200] font-bold shadow'
                      : 'text-gray-400 hover:text-white hover:bg-white/[0.05]'
                  }`}
                >
                  {line.short} ({count})
                </button>
              );
            })}
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredList.map((eq) => (
            <article
              key={eq.id}
              className="group relative flex flex-col bg-[#161c24] border border-white/[0.08] rounded overflow-hidden shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:border-amber-500/40 hover:shadow-[0_20px_40px_rgba(0,0,0,0.8)]"
            >
              {/* Media Container */}
              <div className="relative w-full h-72 overflow-hidden bg-[#090f16]">
                <img
                  src={eq.image}
                  alt={eq.altText}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#161c24] via-transparent to-transparent" />
                
                {/* Top Badge: Series */}
                <div className="absolute top-3 left-3 px-2.5 py-1 bg-[#090f16]/90 border border-white/[0.1] backdrop-blur-md rounded font-mono-tech text-[10px] text-amber-400 font-bold uppercase tracking-wider">
                  {eq.series}
                </div>

                {/* Top Right: Line */}
                <div className="absolute top-3 right-3 px-2 py-0.5 bg-black/70 backdrop-blur-sm rounded text-[10px] font-mono-tech text-gray-300 border border-white/[0.08]">
                  {eq.lineLabel}
                </div>

                {/* Bottom Right Tag */}
                <div className="absolute bottom-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded font-mono-tech text-[10px] font-bold backdrop-blur-md shadow-md bg-[#242a33]/90 text-cyan-300 border border-cyan-500/30">
                  <Gauge className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{eq.tag}</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex flex-col flex-1 justify-between gap-5">
                <div>
                  <h3 className="font-heading text-xl font-bold text-white uppercase group-hover:text-amber-400 transition-colors tracking-tight">
                    {eq.name}
                  </h3>
                  <p className="text-xs text-gray-400 mt-2 leading-relaxed">
                    {eq.headline}
                  </p>
                </div>

                {/* Spec Block */}
                <div className="flex flex-col gap-1.5 bg-[#090f16] border border-white/[0.05] p-3.5 rounded font-mono-tech text-xs text-gray-300">
                  <div className="flex justify-between gap-3 py-1 border-b border-white/[0.05]">
                    <span className="text-gray-500 uppercase text-[10px] shrink-0">Sección</span>
                    <span className="text-white font-semibold text-right">{sectionRange(eq)}</span>
                  </div>
                  <div className="flex justify-between gap-3 py-1 border-b border-white/[0.05]">
                    <span className="text-gray-500 uppercase text-[10px] shrink-0">Accionamiento</span>
                    <span className="text-amber-400 font-semibold text-right">{eq.specs.potencia}</span>
                  </div>
                  <div className="flex justify-between gap-3 py-1">
                    <span className="text-gray-500 uppercase text-[10px] shrink-0">Peso</span>
                    <span className="text-white font-semibold text-right">{eq.specs.pesoOperacional}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2 pt-1">
                  <button
                    onClick={() => onSelectEquipment(eq)}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-[#242a33] hover:bg-amber-400 hover:text-black text-gray-200 font-mono-tech text-xs uppercase tracking-wider rounded transition-all group/btn font-semibold"
                  >
                    <span>Ficha Técnica</span>
                    <ChevronRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                  </button>
                  <button
                    onClick={() => onOpenQuoteWithEquipment(eq)}
                    className="px-3 py-2.5 bg-[#1e2632] hover:bg-[#283242] text-amber-400 hover:text-amber-300 border border-amber-500/30 rounded text-xs font-mono-tech uppercase transition-colors"
                    title="Cotizar este equipo"
                  >
                    Cotizar
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="p-6 bg-gradient-to-r from-[#161c24] to-[#121820] border border-amber-500/20 rounded-lg flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-amber-500/10 rounded border border-amber-500/30 text-amber-400 shrink-0">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-heading text-white font-bold uppercase text-base">
                ¿Necesita un equipo a medida?
              </h4>
              <p className="text-xs text-gray-400 mt-0.5">
                Fabricamos jumbos electrohidráulicos y equipos de sondaje diamantino según la sección de labor y el tipo de roca de su operación.
              </p>
            </div>
          </div>
          <button
            onClick={() => onOpenQuoteWithEquipment(EQUIPMENTS[0])}
            className="px-5 py-2.5 bg-[#ffb800] hover:bg-[#ffc933] text-[#1a1200] font-heading font-bold text-xs uppercase tracking-wider rounded shrink-0 transition-colors"
          >
            Solicitar Fabricación
          </button>
        </div>

      </div>
    </section>
  );
};
