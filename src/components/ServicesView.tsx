import React, { useState } from 'react';
import { SERVICES, COMPANY_INFO } from '../data/miningData';
import { ServiceDetail } from '../types';
import { 
  Wrench, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  FileText, 
  Activity, 
  Gauge, 
  Bolt, 
  Flame, 
  Award,
  Layers
} from 'lucide-react';

interface ServicesViewProps {
  onOpenQuoteWithService: (serviceName: string) => void;
}

export const ServicesView: React.FC<ServicesViewProps> = ({ onOpenQuoteWithService }) => {
  const [selectedService, setSelectedService] = useState<ServiceDetail>(SERVICES[0]);

  const overhaulPhases = [
    {
      num: '01',
      title: 'Recepción y Diagnóstico Inicial',
      desc: 'Recepción del equipo e inspección inicial para levantar el estado de componentes y definir el alcance del trabajo.',
    },
    {
      num: '02',
      title: 'Desarmado y Evaluación',
      desc: 'Desarme del equipo y evaluación componente por componente para determinar qué se repara y qué se reemplaza.',
    },
    {
      num: '03',
      title: 'Reparación Mecánica e Hidráulica',
      desc: 'Reparación de bombas, cilindros, mandos y sistemas de rotación y percusión, con cambio de sellos y componentes según estado.',
    },
    {
      num: '04',
      title: 'Reconstrucción Estructural',
      desc: 'Recuperación y refuerzo de estructuras, plumas y chasis mediante mecanizado y soldadura según necesidad.',
    },
    {
      num: '05',
      title: 'Rearmado con Repuestos',
      desc: 'Montaje del equipo con repuestos y sellos nuevos según estado y especificación del fabricante.',
    },
    {
      num: '06',
      title: 'Pruebas y Entrega',
      desc: 'Pruebas de funcionamiento antes de la entrega, con informe técnico del trabajo y repuestos utilizados.',
    },
  ];

  return (
    <div className="w-full bg-[#090f16] pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 flex flex-col gap-16">
        
        {/* Page Banner */}
        <div className="flex flex-col gap-3 border-b border-white/[0.08] pb-8">
          <div className="flex items-center gap-2 font-mono-tech text-xs text-amber-400 uppercase tracking-widest font-semibold">
            <Wrench className="w-4 h-4" />
            <span>Capacidades de Taller & Servicio en Mina // Planta Chaclacayo, Lima</span>
          </div>
          <h1 className="font-heading text-3xl sm:text-5xl text-white font-extrabold uppercase tracking-tight">
            Mantenimiento, Fabricación y Servicios
          </h1>
          <p className="text-sm sm:text-base text-gray-300 max-w-3xl leading-relaxed">
            Desde el mantenimiento y overhaul de equipos subterráneos hasta la fabricación a medida de jumbos electrohidráulicos, tableros eléctricos y piezas mecánicas para las operaciones mineras del Perú.
          </p>
        </div>

        {/* Interactive Overhaul Protocol Lifecycle */}
        <div className="p-8 bg-[#121820] border border-white/[0.08] rounded-lg shadow-2xl flex flex-col gap-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.06] pb-4">
            <div>
              <span className="font-mono-tech text-xs text-cyan-400 uppercase tracking-widest font-bold">
                PROTOCOLO DE TRABAJO HAKIM
              </span>
              <h3 className="font-heading text-2xl text-white font-bold uppercase mt-1">
                Ciclo de Mantenimiento y Overhaul
              </h3>
            </div>
            <div className="flex items-center gap-2 font-mono-tech text-xs text-gray-400">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>Garantía según alcance del servicio</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {overhaulPhases.map((phase, idx) => (
              <div 
                key={idx} 
                className="p-5 bg-[#161c24] border border-white/[0.06] rounded flex flex-col gap-3 transition-colors hover:border-amber-500/30 group"
              >
                <div className="flex items-center justify-between">
                  <span className="font-heading text-2xl font-extrabold text-amber-400 group-hover:scale-110 transition-transform">
                    {phase.num}
                  </span>
                  <span className="font-mono-tech text-[10px] text-gray-500 uppercase">
                    FASE // {phase.num}
                  </span>
                </div>
                <h4 className="font-heading text-sm font-bold text-white uppercase group-hover:text-amber-300 transition-colors">
                  {phase.title}
                </h4>
                <p className="text-xs text-gray-400 leading-relaxed">
                  {phase.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Detailed Services Catalog Grid */}
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-1">
            <span className="font-mono-tech text-xs text-amber-400 uppercase tracking-widest font-semibold">
              // CATÁLOGO DE SERVICIOS ESPECIALIZADOS
            </span>
            <h2 className="font-heading text-3xl font-extrabold uppercase text-white tracking-tight">
              Ingeniería Aplicada y Mantenimiento Mayor
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left selector menu */}
            <div className="lg:col-span-4 flex flex-col gap-2">
              {SERVICES.map((srv) => {
                const isSelected = selectedService.id === srv.id;
                return (
                  <button
                    key={srv.id}
                    onClick={() => setSelectedService(srv)}
                    className={`p-4 rounded text-left flex flex-col gap-1 transition-all border ${
                      isSelected
                        ? 'bg-amber-500/15 border-amber-400 text-white shadow-[0_0_20px_rgba(255,184,0,0.15)]'
                        : 'bg-[#121820] border-white/[0.06] text-gray-400 hover:text-white hover:bg-[#161c24]'
                    }`}
                  >
                    <span className="font-mono-tech text-[10px] uppercase text-amber-400 font-bold">
                      {srv.category}
                    </span>
                    <span className="font-heading font-bold text-sm uppercase text-white">
                      {srv.title}
                    </span>
                    <span className="text-xs text-gray-400 line-clamp-1">
                      {srv.subtitle}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Right detailed spotlight */}
            <div className="lg:col-span-8 bg-[#121820] border border-white/[0.08] rounded-lg p-6 sm:p-8 flex flex-col gap-6 shadow-2xl">
              <div className="relative h-64 w-full rounded overflow-hidden bg-[#090f16]">
                <img
                  src={selectedService.image}
                  alt={selectedService.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#121820] via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 px-3 py-1 bg-black/80 rounded font-mono-tech text-xs text-amber-400 font-bold uppercase">
                  {selectedService.category}
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <span className="font-mono-tech text-xs text-cyan-400 uppercase tracking-widest">
                  ESPECIFICACIÓN TÉCNICA // {selectedService.id.toUpperCase()}
                </span>
                <h3 className="font-heading text-2xl sm:text-3xl font-extrabold uppercase text-white">
                  {selectedService.title}
                </h3>
                <h4 className="text-sm font-semibold text-amber-400">
                  {selectedService.subtitle}
                </h4>
                <p className="text-sm text-gray-300 leading-relaxed pt-2">
                  {selectedService.description}
                </p>
              </div>

              {/* Sub-services */}
              {selectedService.subServices && selectedService.subServices.length > 0 && (
                <div className="flex flex-col gap-2.5 pt-2">
                  <span className="font-mono-tech text-xs text-gray-400 uppercase tracking-wider font-semibold">
                    Soluciones que incluye:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {selectedService.subServices.map((sub, idx) => (
                      <div key={idx} className="p-3 bg-[#161c24] rounded border border-white/[0.05] flex flex-col gap-1">
                        <span className="font-heading text-xs font-bold text-amber-400 uppercase">
                          {sub.title}
                        </span>
                        <span className="text-[11px] text-gray-400 leading-relaxed">
                          {sub.description}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Steps */}
              <div className="flex flex-col gap-2.5 pt-2">
                <span className="font-mono-tech text-xs text-gray-400 uppercase tracking-wider font-semibold">
                  Procedimiento de Trabajo en Taller / Mina:
                </span>
                <div className="grid grid-cols-1 gap-2">
                  {selectedService.processSteps.map((step, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3 bg-[#161c24] rounded border border-white/[0.04] text-xs text-gray-200">
                      <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-mono-tech text-[10px] font-bold shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Guarantees & Deliverables */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 font-mono-tech text-xs">
                <div className="p-3 bg-[#090f16] border border-white/[0.05] rounded flex flex-col gap-1">
                  <span className="text-gray-500 uppercase text-[10px]">Entregable Técnico</span>
                  <span className="text-gray-200">{selectedService.deliverable}</span>
                </div>
                <div className="p-3 bg-[#090f16] border border-white/[0.05] rounded flex flex-col gap-1">
                  <span className="text-gray-500 uppercase text-[10px]">Garantía Operacional</span>
                  <span className="text-amber-400 font-bold">{selectedService.guarantee}</span>
                </div>
              </div>

              {/* Action trigger */}
              <div className="flex items-center justify-between pt-4 border-t border-white/[0.08]">
                <div className="text-xs font-mono-tech text-gray-400">
                  Atención técnica en taller y en unidad minera
                </div>
                <button
                  onClick={() => onOpenQuoteWithService(selectedService.title)}
                  className="px-6 py-3 bg-[#ffb800] hover:bg-[#ffc933] text-[#1a1200] font-heading font-extrabold text-xs uppercase tracking-wider rounded flex items-center gap-2 shadow-[0_0_20px_rgba(255,184,0,0.3)] transition-all"
                >
                  <Wrench className="w-4 h-4 text-black" />
                  <span>Solicitar este Servicio</span>
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
