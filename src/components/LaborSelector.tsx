import React, { useMemo, useState } from 'react';
import { Equipment } from '../types';
import { EQUIPMENTS } from '../data/miningData';
import { Ruler, Check, ChevronRight, AlertTriangle, HardHat } from 'lucide-react';

interface LaborSelectorProps {
  onSelectEquipment: (equipment: Equipment) => void;
  onOpenQuoteWithEquipment: (equipment: Equipment) => void;
}

const PRESETS = [
  { w: 2.0, h: 2.0 },
  { w: 2.5, h: 2.5 },
  { w: 3.0, h: 3.0 },
  { w: 3.5, h: 3.5 },
  { w: 4.0, h: 4.0 },
  { w: 4.5, h: 4.5 },
  { w: 5.0, h: 5.0 },
];

export const LaborSelector: React.FC<LaborSelectorProps> = ({
  onSelectEquipment,
  onOpenQuoteWithEquipment,
}) => {
  const [width, setWidth] = useState(3.0);
  const [height, setHeight] = useState(3.0);

  const matches = useMemo(
    () =>
      EQUIPMENTS.filter((eq) => {
        if (!eq.section) return false;
        return (
          width >= eq.section.minWidth &&
          width <= eq.section.maxWidth &&
          height >= eq.section.minHeight &&
          height <= eq.section.maxHeight
        );
      }),
    [width, height]
  );

  const fmt = (n: number) => n.toFixed(1);
  const sectionRange = (eq: Equipment) =>
    eq.section
      ? `${eq.section.minWidth}–${eq.section.maxWidth} m ancho · ${eq.section.minHeight}–${eq.section.maxHeight} m alto`
      : 'Configuración a medida';

  return (
    <section className="w-full bg-[#0b1016] py-20 border-t border-white/[0.08]" id="selector">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 flex flex-col gap-10">

        {/* Header */}
        <div className="flex flex-col gap-2 max-w-3xl">
          <div className="flex items-center gap-2 text-amber-400 font-mono-tech text-xs tracking-widest uppercase font-semibold">
            <Ruler className="w-4 h-4" />
            <span>Selector por Sección de Labor // Recomendación de Equipo</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl text-white font-extrabold uppercase tracking-tight">
            ¿Cuánto mide su labor?
          </h2>
          <p className="text-sm sm:text-base text-gray-400 leading-relaxed pt-1">
            Indique el ancho y la altura de su galería o túnel y le mostramos los equipos de nuestra línea que se adaptan a esa sección.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* Controls */}
          <div className="lg:col-span-5 flex flex-col gap-6 bg-[#121820] border border-white/[0.08] rounded-lg p-6 shadow-2xl">

            {/* Visual representation */}
            <div className="flex items-center justify-center h-44 bg-[#090f16] border border-white/[0.06] rounded">
              <div className="relative flex items-end justify-center w-40 h-36">
                <div
                  className="bg-amber-400/10 border-2 border-amber-400/60 rounded-sm flex items-center justify-center transition-all duration-200"
                  style={{
                    width: `${(width / 6) * 100}%`,
                    height: `${(height / 6) * 100}%`,
                  }}
                >
                  <span className="font-mono-tech text-[10px] text-amber-300 font-bold">
                    {fmt(width)} × {fmt(height)} m
                  </span>
                </div>
              </div>
            </div>

            {/* Width slider */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between font-mono-tech text-xs">
                <span className="text-gray-400 uppercase tracking-wider">Ancho de labor</span>
                <span className="text-amber-400 font-bold">{fmt(width)} m</span>
              </div>
              <input
                type="range"
                min={1.5}
                max={6}
                step={0.1}
                value={width}
                onChange={(e) => setWidth(parseFloat(e.target.value))}
                className="w-full accent-[#ffb800] cursor-pointer"
                aria-label="Ancho de labor en metros"
              />
            </div>

            {/* Height slider */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between font-mono-tech text-xs">
                <span className="text-gray-400 uppercase tracking-wider">Altura de labor</span>
                <span className="text-amber-400 font-bold">{fmt(height)} m</span>
              </div>
              <input
                type="range"
                min={1.5}
                max={6}
                step={0.1}
                value={height}
                onChange={(e) => setHeight(parseFloat(e.target.value))}
                className="w-full accent-[#ffb800] cursor-pointer"
                aria-label="Altura de labor en metros"
              />
            </div>

            {/* Presets */}
            <div className="flex flex-col gap-2 pt-2 border-t border-white/[0.06]">
              <span className="font-mono-tech text-[10px] text-gray-500 uppercase tracking-wider">
                Secciones frecuentes
              </span>
              <div className="flex flex-wrap gap-1.5">
                {PRESETS.map((p) => {
                  const active = width === p.w && height === p.h;
                  return (
                    <button
                      key={`${p.w}x${p.h}`}
                      onClick={() => {
                        setWidth(p.w);
                        setHeight(p.h);
                      }}
                      className={`px-2.5 py-1.5 rounded font-mono-tech text-[11px] transition-all border ${
                        active
                          ? 'bg-[#ffb800] text-[#1a1200] border-[#ffb800] font-bold'
                          : 'bg-[#161c24] text-gray-300 border-white/[0.08] hover:border-amber-500/40'
                      }`}
                    >
                      {p.w} × {p.h}
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Results */}
          <div className="lg:col-span-7 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="font-mono-tech text-xs text-gray-400 uppercase tracking-wider font-semibold">
                Equipos recomendados
              </span>
              <span className="font-mono-tech text-xs text-cyan-400">
                {matches.length} {matches.length === 1 ? 'equipo' : 'equipos'}
              </span>
            </div>

            {matches.length > 0 ? (
              <div className="flex flex-col gap-3">
                {matches.map((eq) => (
                  <div
                    key={eq.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-[#121820] border border-white/[0.08] rounded-lg hover:border-amber-500/40 transition-colors"
                  >
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono-tech text-[10px] text-amber-400 font-bold uppercase tracking-wider">
                          {eq.lineLabel}
                        </span>
                      </div>
                      <h4 className="font-heading text-base font-bold text-white uppercase">
                        {eq.name}
                      </h4>
                      <div className="flex items-center gap-1.5 font-mono-tech text-[11px] text-gray-400">
                        <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>Apta para {sectionRange(eq)}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => onSelectEquipment(eq)}
                        className="flex items-center gap-1.5 px-3 py-2 bg-[#242a33] hover:bg-amber-400 hover:text-black text-gray-200 font-mono-tech text-[11px] uppercase rounded transition-all"
                      >
                        <span>Ficha</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => onOpenQuoteWithEquipment(eq)}
                        className="px-3 py-2 bg-[#1e2632] hover:bg-[#283242] text-amber-400 border border-amber-500/30 font-mono-tech text-[11px] uppercase rounded transition-colors"
                      >
                        Cotizar
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center text-center gap-3 p-10 bg-[#121820] border border-white/[0.08] rounded-lg">
                <AlertTriangle className="w-8 h-8 text-amber-400" />
                <span className="font-heading text-base font-bold text-white uppercase">
                  No hay un equipo de línea para esta sección
                </span>
                <p className="text-xs text-gray-400 max-w-sm">
                  Para secciones fuera de nuestros rangos fabricamos equipos a medida. Cuéntenos las dimensiones de su labor.
                </p>
                <button
                  onClick={() => onOpenQuoteWithEquipment(EQUIPMENTS[0])}
                  className="mt-1 px-5 py-2.5 bg-[#ffb800] hover:bg-[#ffc933] text-[#1a1200] font-heading font-bold text-xs uppercase rounded transition-colors flex items-center gap-2"
                >
                  <HardHat className="w-4 h-4 text-[#1a1200]" />
                  <span>Solicitar fabricación a medida</span>
                </button>
              </div>
            )}

            <p className="font-mono-tech text-[10px] text-gray-500 pt-1">
              Valores referenciales. La configuración final del equipo se define junto al cliente según la labor y el tipo de roca.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};
