import React from 'react';
import { COMPANY_INFO } from '../data/miningData';
import { ArrowRight, Play, Radar, Activity, CheckCircle2, ShieldAlert } from 'lucide-react';

interface HeroSectionProps {
  onExploreCatalog: () => void;
  onOpenDemo: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onExploreCatalog, onOpenDemo }) => {
  return (
    <section className="relative w-full min-h-[92vh] flex items-center justify-center overflow-hidden pt-28 pb-16 bg-[#090f16]">
      {/* Cinematic Background Image with Gradient Scrims */}
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center transition-transform duration-1000 scale-[1.02]"
        style={{ backgroundImage: `url('${COMPANY_INFO.heroBgUrl}')` }}
      />
      
      {/* High-tech Multi-layer Gradients */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0e141c] via-[#0e141c]/70 to-[#090f16]/85 backdrop-brightness-[0.78]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-amber-500/15 via-transparent to-[#0e141c]/90" />
      
      {/* Grid Blueprint Line Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      {/* Hero Monolithic Content Chassis */}
      <div className="relative z-10 w-full px-4 sm:px-8 max-w-7xl mx-auto flex flex-col items-start gap-6 sm:gap-8 keep-white">
        
        {/* Operational Status Pill */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#161c24]/90 border border-white/[0.1] backdrop-blur-md shadow-xl">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-400"></span>
          </span>
          <span className="font-mono-tech text-xs uppercase text-amber-400 font-semibold tracking-wider">
            Ingeniería Pesada de Nueva Generación | Flota Ultra-Class & Subterránea
          </span>
          <span className="w-1 h-3 bg-white/20 hidden sm:inline-block"></span>
          <span className="font-mono-tech text-[10px] text-gray-400 tracking-wider uppercase hidden sm:inline">
            SYS-SPEC 2025 // ACTIVE
          </span>
        </div>

        {/* Hero Typography Hierarchy */}
        <div className="flex flex-col gap-3 max-w-5xl">
          <h1 className="font-heading text-4xl sm:text-6xl lg:text-7xl font-extrabold uppercase text-white tracking-tight leading-[1.06]">
            Potencia sin precedentes <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ffdca1] via-[#ffb800] to-[#ff9800]">
              para la minería global
            </span>
          </h1>
          <p className="text-base sm:text-xl text-gray-300 max-w-3xl pt-2 leading-relaxed font-normal">
            Diseñamos, fabricamos y realizamos el overhaul integral de maquinaria de extracción a cielo abierto y socavón subterráneo. Redefinimos los límites de tonelaje, eficiencia electrohidráulica y autonomía industrial en los entornos andinos más implacables del planeta.
          </p>
        </div>

        {/* Action Cluster & Live Telemetry Badge */}
        <div className="flex flex-wrap items-center gap-4 pt-2 w-full">
          {/* Primary Amber Trigger */}
          <button
            onClick={onExploreCatalog}
            className="inline-flex items-center gap-3 px-8 py-4 bg-[#ffb800] hover:bg-[#ffc933] text-[#1a1200] font-heading font-extrabold text-sm sm:text-base uppercase tracking-wider rounded shadow-[0_0_28px_rgba(255,184,0,0.4)] transition-all active:translate-y-[1px]"
          >
            <span>Explorar Catálogo 2025</span>
            <ArrowRight className="w-5 h-5 text-[#1a1200]" />
          </button>

          {/* Secondary HUD Glass Button */}
          <button
            onClick={onOpenDemo}
            type="button"
            className="inline-flex items-center gap-2.5 px-6 py-4 bg-[#1e2632]/80 hover:bg-[#283242] border border-white/[0.12] backdrop-blur-md text-white font-heading font-bold text-xs sm:text-sm uppercase tracking-wider rounded transition-all shadow-lg hover:border-cyan-500/40"
          >
            <Play className="w-4 h-4 text-cyan-400 fill-cyan-400" />
            <span>Demostración Autónoma (4K HDR)</span>
          </button>

          {/* Floating Telemetry Capsule */}
          <div className="ml-auto hidden xl:flex items-center gap-4 px-5 py-3 bg-[#0e141c]/90 border border-white/[0.1] backdrop-blur-xl rounded shadow-2xl">
            <div className="flex flex-col">
              <span className="font-mono-tech text-[10px] text-gray-400 uppercase tracking-wider">
                Disponibilidad Operativa
              </span>
              <span className="font-heading text-lg text-amber-400 font-extrabold tracking-tight">
                99.4% SLA
              </span>
            </div>
            <div className="h-8 w-px bg-white/10" />
            <div className="flex items-center gap-2 text-cyan-400">
              <Radar className="w-5 h-5 animate-spin" style={{ animationDuration: '8s' }} />
              <div className="flex flex-col">
                <span className="font-mono-tech text-[9px] uppercase tracking-widest text-cyan-400 font-bold">
                  Telemetría Satelital
                </span>
                <span className="font-mono-tech text-[10px] text-gray-200">
                  Flota Conectada LEO
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Chassis Corner Vector Watermark */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between w-full pt-8 border-t border-white/[0.08] gap-2">
          <div className="font-mono-tech text-xs text-gray-400 flex flex-wrap items-center gap-2">
            <span className="text-gray-300 font-bold">// HAKIM HEAVY IND.</span>
            <span className="text-gray-600">•</span>
            <span>RUC: {COMPANY_INFO.ruc}</span>
            <span className="text-gray-600">•</span>
            <span>CHASSIS FABRICATION ID: HKM-9981-REV4</span>
            <span className="text-gray-600">•</span>
            <span>CALIBRATED FOR ATACAMA / ANDES / 4,800+ MSNM</span>
          </div>
          <div className="flex items-center gap-1.5 font-mono-tech text-xs text-amber-400">
            <Activity className="w-3.5 h-3.5 animate-pulse" />
            <span>NODO CENTRAL CHACLACAYO - CONEXIÓN ÓPTIMA</span>
          </div>
        </div>

      </div>
    </section>
  );
};
