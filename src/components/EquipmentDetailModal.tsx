import React, { useState } from 'react';
import { Equipment } from '../types';
import { COMPANY_INFO } from '../data/miningData';
import { 
  X, 
  Wrench, 
  ShieldCheck, 
  Layers, 
  MessageSquare,
  FileDown
} from 'lucide-react';

interface EquipmentDetailModalProps {
  equipment: Equipment | null;
  onClose: () => void;
  onOpenQuote: (equipment: Equipment) => void;
}

export const EquipmentDetailModal: React.FC<EquipmentDetailModalProps> = ({
  equipment,
  onClose,
  onOpenQuote,
}) => {
  const [activeTab, setActiveTab] = useState<'specs' | 'features' | 'applications'>('specs');

  if (!equipment) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-4xl bg-[#121820] border border-white/[0.15] rounded-lg shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col max-h-[90vh]"
        role="dialog"
        aria-modal="true"
      >
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#0e141c] border-b border-white/[0.08]">
          <div className="flex items-center gap-3">
            <span className="font-mono-tech text-xs text-amber-400 font-bold uppercase tracking-wider">
              {equipment.series}
            </span>
            <span className="text-gray-600">|</span>
            <span className="font-mono-tech text-xs text-gray-300">
              FICHA TÉCNICA OFICIAL
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-gray-400 hover:text-white rounded bg-white/[0.05] hover:bg-white/[0.1] transition-colors"
            aria-label="Cerrar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Header Media & Summary */}
        <div className="grid grid-cols-1 md:grid-cols-12 bg-[#090f16] border-b border-white/[0.08]">
          <div className="md:col-span-5 relative h-56 md:h-auto min-h-[220px]">
            <img
              src={equipment.image}
              alt={equipment.altText}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-transparent to-[#090f16]" />
            <div className="absolute bottom-3 left-3 px-2 py-0.5 bg-black/80 rounded font-mono-tech text-[10px] text-amber-400">
              {equipment.tag}
            </div>
          </div>
          <div className="md:col-span-7 p-6 flex flex-col justify-center gap-2">
            <span className="font-mono-tech text-[11px] text-cyan-400 uppercase tracking-widest">
              {equipment.lineLabel} // {equipment.partnerBrand || 'Fabricación Hakim'}
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl font-extrabold uppercase text-white tracking-tight">
              {equipment.name}
            </h2>
            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
              {equipment.description}
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 px-6 bg-[#0e141c] border-b border-white/[0.08] text-xs font-mono-tech overflow-x-auto">
          <button
            onClick={() => setActiveTab('specs')}
            className={`py-3 px-3 border-b-2 font-bold uppercase transition-all ${
              activeTab === 'specs'
                ? 'border-amber-400 text-amber-400'
                : 'border-transparent text-gray-400 hover:text-white'
            }`}
          >
            Especificaciones Técnicas
          </button>
          <button
            onClick={() => setActiveTab('features')}
            className={`py-3 px-3 border-b-2 font-bold uppercase transition-all ${
              activeTab === 'features'
                ? 'border-amber-400 text-amber-400'
                : 'border-transparent text-gray-400 hover:text-white'
            }`}
          >
            Sistemas & Características
          </button>
          <button
            onClick={() => setActiveTab('applications')}
            className={`py-3 px-3 border-b-2 font-bold uppercase transition-all ${
              activeTab === 'applications'
                ? 'border-amber-400 text-amber-400'
                : 'border-transparent text-gray-400 hover:text-white'
            }`}
          >
            Yacimientos & Aplicaciones
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-6 overflow-y-auto flex-1 text-sm bg-[#121820]">
          {activeTab === 'specs' && (
            <div className="flex flex-col gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono-tech text-xs">
                {equipment.section && (
                  <div className="p-3 bg-[#161c24] border border-amber-500/20 rounded flex flex-col gap-1 sm:col-span-2">
                    <span className="text-gray-500 uppercase text-[10px]">Sección de Labor Recomendada</span>
                    <span className="text-amber-400 font-bold text-sm">
                      {equipment.section.minWidth}–{equipment.section.maxWidth} m ancho · {equipment.section.minHeight}–{equipment.section.maxHeight} m alto
                    </span>
                  </div>
                )}
                <div className="p-3 bg-[#161c24] border border-white/[0.06] rounded flex flex-col gap-1">
                  <span className="text-gray-500 uppercase text-[10px]">Capacidad Nominal</span>
                  <span className="text-white font-bold text-sm">{equipment.specs.capacidad}</span>
                </div>
                <div className="p-3 bg-[#161c24] border border-white/[0.06] rounded flex flex-col gap-1">
                  <span className="text-gray-500 uppercase text-[10px]">Potencia de Planta</span>
                  <span className="text-amber-400 font-bold text-sm">{equipment.specs.potencia}</span>
                </div>
                <div className="p-3 bg-[#161c24] border border-white/[0.06] rounded flex flex-col gap-1">
                  <span className="text-gray-500 uppercase text-[10px]">Peso Operacional Bruto</span>
                  <span className="text-white font-bold text-sm">{equipment.specs.pesoOperacional}</span>
                </div>
                {equipment.specs.trenPotencia && (
                  <div className="p-3 bg-[#161c24] border border-white/[0.06] rounded flex flex-col gap-1">
                    <span className="text-gray-500 uppercase text-[10px]">Tren de Potencia</span>
                    <span className="text-cyan-300 font-bold text-sm">{equipment.specs.trenPotencia}</span>
                  </div>
                )}
                {equipment.specs.dimensiones && (
                  <div className="p-3 bg-[#161c24] border border-white/[0.06] rounded flex flex-col gap-1">
                    <span className="text-gray-500 uppercase text-[10px]">Dimensiones (L x An x Al)</span>
                    <span className="text-gray-200 text-xs">{equipment.specs.dimensiones}</span>
                  </div>
                )}
                {equipment.specs.cicloPromedio && (
                  <div className="p-3 bg-[#161c24] border border-white/[0.06] rounded flex flex-col gap-1">
                    <span className="text-gray-500 uppercase text-[10px]">Ciclo / Rendimiento Promedio</span>
                    <span className="text-gray-200 text-xs">{equipment.specs.cicloPromedio}</span>
                  </div>
                )}
                {equipment.specs.presionHidraulica && (
                  <div className="p-3 bg-[#161c24] border border-white/[0.06] rounded flex flex-col gap-1 sm:col-span-2">
                    <span className="text-gray-500 uppercase text-[10px]">Presión y Caudal Hidráulico</span>
                    <span className="text-amber-300 font-mono-tech text-xs">{equipment.specs.presionHidraulica}</span>
                  </div>
                )}
              </div>

              {equipment.specGroups && equipment.specGroups.length > 0 && (
                <div className="flex flex-col gap-4 pt-2">
                  <span className="font-mono-tech text-xs text-amber-400 uppercase tracking-wider font-semibold">
                    Especificaciones Detalladas
                  </span>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {equipment.specGroups.map((group, gi) => (
                      <div key={gi} className="p-4 bg-[#161c24] border border-white/[0.06] rounded flex flex-col gap-2">
                        <span className="font-heading text-sm font-bold text-white uppercase border-b border-white/[0.08] pb-1.5">
                          {group.title}
                        </span>
                        <div className="flex flex-col">
                          {group.items.map((item, ii) => (
                            <div key={ii} className="flex justify-between gap-3 py-1 border-b border-white/[0.04] last:border-0 font-mono-tech text-[11px]">
                              <span className="text-gray-500">{item.label}</span>
                              <span className="text-gray-200 text-right">{item.value}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="p-4 bg-[#0e141c] border border-white/[0.08] rounded text-xs text-gray-400 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-cyan-400" />
                  <span>Los equipos se entregan con pruebas de funcionamiento y verificación previa.</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'features' && (
            <div className="flex flex-col gap-3">
              <span className="font-mono-tech text-xs text-amber-400 uppercase tracking-wider font-semibold">
                Innovaciones de Ingeniería & Blindaje
              </span>
              <ul className="grid grid-cols-1 gap-2.5">
                {equipment.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 p-3 bg-[#161c24] border border-white/[0.05] rounded text-xs text-gray-200">
                    <span className="w-5 h-5 rounded-full bg-amber-400/20 text-amber-400 flex items-center justify-center shrink-0 text-[10px] font-bold mt-0.5">
                      ✓
                    </span>
                    <span className="leading-relaxed">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {activeTab === 'applications' && (
            <div className="flex flex-col gap-4">
              <span className="font-mono-tech text-xs text-cyan-400 uppercase tracking-wider font-semibold">
                Compatibilidad con Yacimientos Peruanos y Globales
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {equipment.applications.map((app, i) => (
                  <div key={i} className="p-4 bg-[#161c24] border border-white/[0.08] rounded flex flex-col gap-2">
                    <Layers className="w-4 h-4 text-amber-400" />
                    <span className="font-heading text-xs font-bold uppercase text-white">{app}</span>
                    <p className="text-[11px] text-gray-400 leading-relaxed">
                      Configurado según la sección de labor y las condiciones de la operación.
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Bottom Actions */}
        <div className="p-4 sm:p-6 bg-[#0e141c] border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex flex-col sm:flex-row items-center gap-2 w-full sm:w-auto">
            {equipment.brochureUrl && (
              <a
                href={equipment.brochureUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-4 py-2.5 bg-[#1e2632] hover:bg-[#283242] text-cyan-300 hover:text-cyan-200 text-xs font-mono-tech uppercase rounded flex items-center justify-center gap-2 border border-cyan-500/30 transition-colors"
              >
                <FileDown className="w-4 h-4" />
                <span>Descargar Ficha PDF</span>
              </a>
            )}
            <a
              href={`${COMPANY_INFO.whatsappLink}?text=${encodeURIComponent(`Hola Hakim Integral Service, quisiera información del ${equipment.name}.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-4 py-2.5 bg-[#1e2632] hover:bg-[#283242] text-emerald-300 hover:text-emerald-200 text-xs font-mono-tech uppercase rounded flex items-center justify-center gap-2 border border-white/[0.08] transition-colors"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Consultar por WhatsApp</span>
            </a>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="px-4 py-2.5 text-xs font-mono-tech uppercase text-gray-400 hover:text-white"
            >
              Cerrar
            </button>
            <button
              onClick={() => {
                onClose();
                onOpenQuote(equipment);
              }}
              className="flex-1 sm:flex-none px-6 py-2.5 bg-[#ffb800] hover:bg-[#ffc933] text-[#1a1200] font-heading font-extrabold text-xs uppercase tracking-wider rounded flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(255,184,0,0.3)] transition-all"
            >
              <Wrench className="w-4 h-4 text-[#1a1200]" />
              <span>Solicitar Cotización de este Equipo</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
