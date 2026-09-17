import React from 'react';
import { COMPANY_INFO } from '../data/miningData';
import { ArrowRight, Activity } from 'lucide-react';

interface HeroSectionProps {
  onExploreCatalog: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onExploreCatalog }) => {
  return (
    <section className="relative w-full min-h-[92vh] flex items-center justify-center overflow-hidden pt-28 pb-16 bg-[#090f16]">
      {/* Background Image with Gradient Scrims */}
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center transition-transform duration-1000 scale-[1.02]"
        style={{ backgroundImage: `url('${COMPANY_INFO.heroBgUrl}')` }}
      />
      
      {/* Multi-layer Gradients */}
      <div className="hero-overlay-scrim absolute inset-0 bg-gradient-to-t from-[#0e141c]/90 via-[#0e141c]/60 to-[#090f16]/75 backdrop-brightness-[0.88]" />
      <div className="hero-radial-scrim absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-amber-500/15 via-transparent to-[#0e141c]/80" />
      
      {/* Grid Blueprint Line Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      {/* Hero Content */}
      <div className="hero-content-light relative z-10 w-full px-4 sm:px-8 max-w-7xl mx-auto flex flex-col items-start gap-6 sm:gap-8">
        
        {/* Sector Pill */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#161c24]/90 border border-white/[0.1] backdrop-blur-md shadow-xl">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-400"></span>
          </span>
          <span className="font-mono-tech text-xs uppercase text-amber-400 font-semibold tracking-wider">
            Maquinaria y Servicio Técnico Minero
          </span>
          <span className="w-1 h-3 bg-white/20 hidden sm:inline-block"></span>
          <span className="font-mono-tech text-[10px] text-gray-400 tracking-wider uppercase hidden sm:inline">
            Minería Subterránea de Pequeña y Mediana Escala
          </span>
        </div>

        {/* Hero Typography Hierarchy */}
        <div className="flex flex-col gap-3 max-w-5xl">
          <h1 className="font-heading text-4xl sm:text-6xl lg:text-7xl font-extrabold uppercase text-white tracking-tight leading-[1.06]">
            Maquinaria y soporte <br />
            <span className="hero-title-accent text-transparent bg-clip-text bg-gradient-to-r from-[#ffdca1] via-[#ffb800] to-[#ff9800]">
              para tu operación minera
            </span>
          </h1>
          <p className="text-base sm:text-xl text-gray-300 max-w-3xl pt-2 leading-relaxed font-normal">
            Fabricamos y mantenemos jumbos electrohidráulicos, scoops, dumpers, scalers y equipos de sondaje. Soluciones simples y de fácil mantenimiento para la minería subterránea de pequeña y mediana escala.
          </p>
        </div>

        {/* Action Cluster */}
        <div className="flex flex-wrap items-center gap-4 pt-2 w-full">
          <button
            onClick={onExploreCatalog}
            className="inline-flex items-center gap-3 px-8 py-4 bg-[#ffb800] hover:bg-[#ffc933] text-[#1a1200] font-heading font-extrabold text-sm sm:text-base uppercase tracking-wider rounded shadow-[0_0_28px_rgba(255,184,0,0.4)] transition-all active:translate-y-[1px]"
          >
            <span>Ver Equipos</span>
            <ArrowRight className="w-5 h-5 text-[#1a1200]" />
          </button>

          <a
            href={COMPANY_INFO.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-6 py-4 bg-[#1e2632]/80 hover:bg-[#283242] border border-white/[0.12] backdrop-blur-md text-white font-heading font-bold text-xs sm:text-sm uppercase tracking-wider rounded transition-all shadow-lg hover:border-cyan-500/40"
          >
            <Activity className="w-4 h-4 text-cyan-400" />
            <span>Escríbenos por WhatsApp</span>
          </a>

          {/* Support Capsule */}
          <div className="ml-auto hidden xl:flex items-center gap-4 px-5 py-3 bg-[#0e141c]/90 border border-white/[0.1] backdrop-blur-xl rounded shadow-2xl">
            <div className="flex flex-col">
              <span className="font-mono-tech text-[10px] text-gray-400 uppercase tracking-wider">
                Sede Principal
              </span>
              <span className="font-heading text-sm text-amber-400 font-extrabold tracking-tight">
                Chaclacayo, Lima
              </span>
            </div>
            <div className="h-8 w-px bg-white/10" />
            <div className="flex flex-col">
              <span className="font-mono-tech text-[10px] text-gray-400 uppercase tracking-wider">
                Ventas
              </span>
              <span className="font-mono-tech text-xs text-gray-200">
                {COMPANY_INFO.phone}
              </span>
            </div>
          </div>
        </div>

        {/* Footer Watermark */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between w-full pt-8 border-t border-white/[0.08] gap-2">
          <div className="font-mono-tech text-xs text-gray-400 flex flex-wrap items-center gap-2">
            <span className="text-gray-300 font-bold">// HAKIM INTEGRAL SERVICE S.A.C.</span>
            <span className="text-gray-600">•</span>
            <span>{COMPANY_INFO.experienceYears}</span>
            <span className="text-gray-600">•</span>
            <span>MARCAS ATENDIDAS: EPIROC · SANDVIK · MINE MASTER · RESEMIN · CAT</span>
          </div>
          <div className="flex items-center gap-1.5 font-mono-tech text-xs text-amber-400">
            <Activity className="w-3.5 h-3.5 animate-pulse" />
            <span>CHACLACAYO, LIMA — PERÚ</span>
          </div>
        </div>

      </div>
    </section>
  );
};
