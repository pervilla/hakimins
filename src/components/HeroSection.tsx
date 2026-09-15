import React from 'react';
import { COMPANY_INFO } from '../data/miningData';
import { useTheme } from '../context/ThemeContext';
import { ArrowRight, Play, Radar, Activity, CheckCircle2, ShieldAlert, Cpu } from 'lucide-react';

interface HeroSectionProps {
  onExploreCatalog: () => void;
  onOpenDemo: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onExploreCatalog, onOpenDemo }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <section className={`relative w-full min-h-[92vh] flex items-center justify-center overflow-hidden pt-28 pb-16 transition-colors duration-300 ${
      isDark ? 'bg-[#090f16]' : 'bg-[#f4f6f9]'
    }`}>
      {/* Cinematic Background Image: Titan Mini Electro-Hydraulic Jumbo */}
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center transition-all duration-1000 scale-[1.01]"
        style={{ 
          backgroundImage: `url('${COMPANY_INFO.heroBgUrl}')`,
          backgroundPosition: 'center 45%'
        }}
      />
      
      {/* Dynamic Gradients for Contrast in both Dark and Light Modes */}
      {isDark ? (
        <>
          <div className="absolute inset-0 bg-gradient-to-t from-[#0e141c] via-[#0e141c]/70 to-[#090f16]/80 backdrop-brightness-[0.78]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#090f16] via-[#090f16]/85 sm:via-[#090f16]/65 to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-amber-500/15 via-transparent to-[#0e141c]/90 pointer-events-none" />
        </>
      ) : (
        <>
          <div className="absolute inset-0 bg-gradient-to-t from-[#f4f6f9] via-[#f4f6f9]/65 to-[#f4f6f9]/80 backdrop-brightness-[1.02]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#f4f6f9] via-[#f4f6f9]/88 sm:via-[#f4f6f9]/65 to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-[#f4f6f9]/70 pointer-events-none" />
        </>
      )}
      
      {/* Grid Blueprint Line Overlay */}
      <div className={`absolute inset-0 bg-[size:4rem_4rem] pointer-events-none ${
        isDark 
          ? 'bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)]'
          : 'bg-[linear-gradient(to_right,rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.03)_1px,transparent_1px)]'
      }`} />

      {/* Hero Monolithic Content Chassis */}
      <div className="relative z-10 w-full px-4 sm:px-8 max-w-7xl mx-auto flex flex-col items-start gap-6 sm:gap-8">
        
        {/* Operational Status Pill */}
        <div className={`inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border backdrop-blur-md shadow-xl transition-colors ${
          isDark 
            ? 'bg-[#161c24]/90 border-white/[0.1]' 
            : 'bg-white/95 border-black/10 shadow-md'
        }`}>
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-400"></span>
          </span>
          <span className="font-mono-tech text-xs uppercase text-amber-500 font-bold tracking-wider">
            Jumbo Electrohidráulico Titan Mini • Ingeniería Pesada Subterránea & Socavón
          </span>
          <span className={`w-1 h-3 hidden sm:inline-block ${isDark ? 'bg-white/20' : 'bg-black/15'}`}></span>
          <span className={`font-mono-tech text-[10px] tracking-wider uppercase hidden sm:inline ${
            isDark ? 'text-gray-400' : 'text-gray-500'
          }`}>
            FABRICACIÓN HAKIM // 2025
          </span>
        </div>

        {/* Hero Typography Hierarchy */}
        <div className="flex flex-col gap-3 max-w-5xl">
          <h1 className={`font-heading text-4xl sm:text-6xl lg:text-7xl font-extrabold uppercase tracking-tight leading-[1.06] ${
            isDark ? 'text-white' : 'text-[#0a1017]'
          }`}>
            Potencia sin precedentes <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ffdca1] via-[#ffb800] to-[#ff9800]">
              para la minería global
            </span>
          </h1>
          <p className={`text-base sm:text-xl max-w-3xl pt-2 leading-relaxed font-normal ${
            isDark ? 'text-gray-300' : 'text-[#334155]'
          }`}>
            Diseñamos, fabricamos y realizamos el overhaul integral de jumbos electrohidráulicos Titan Mini y maquinaria de extracción subterránea y tajo abierto. Redefinimos los límites de tonelaje, eficiencia hidráulica y resistencia en los yacimientos andinos más exigentes del Perú.
          </p>
        </div>

        {/* Action Cluster & Live Telemetry Badge */}
        <div className="flex flex-wrap items-center gap-4 pt-2 w-full">
          {/* Primary Amber Trigger */}
          <button
            onClick={onExploreCatalog}
            className="inline-flex items-center gap-3 px-8 py-4 bg-[#ffb800] hover:bg-[#ffc933] text-[#1a1200] font-heading font-extrabold text-sm sm:text-base uppercase tracking-wider rounded shadow-[0_0_28px_rgba(255,184,0,0.4)] transition-all active:translate-y-[1px] cursor-pointer"
          >
            <span>Explorar Catálogo 2025</span>
            <ArrowRight className="w-5 h-5 text-[#1a1200]" />
          </button>

          {/* Secondary HUD Button */}
          <button
            onClick={onOpenDemo}
            type="button"
            className={`inline-flex items-center gap-2.5 px-6 py-4 border backdrop-blur-md font-heading font-bold text-xs sm:text-sm uppercase tracking-wider rounded transition-all shadow-md cursor-pointer ${
              isDark 
                ? 'bg-[#1e2632]/80 hover:bg-[#283242] border-white/[0.12] text-white hover:border-cyan-500/40' 
                : 'bg-white/90 hover:bg-white border-black/10 text-[#0f172a] hover:border-amber-500/50'
            }`}
          >
            <Play className="w-4 h-4 text-cyan-500 fill-cyan-500" />
            <span>Ver Simulación Técnica (4K HDR)</span>
          </button>

          {/* Floating Telemetry Capsule */}
          <div className={`ml-auto hidden xl:flex items-center gap-4 px-5 py-3 border backdrop-blur-xl rounded shadow-2xl transition-colors ${
            isDark 
              ? 'bg-[#0e141c]/90 border-white/[0.1]' 
              : 'bg-white/95 border-black/10'
          }`}>
            <div className="flex flex-col">
              <span className={`font-mono-tech text-[10px] uppercase tracking-wider ${
                isDark ? 'text-gray-400' : 'text-gray-500'
              }`}>
                Disponibilidad Operativa
              </span>
              <span className="font-heading text-lg text-amber-500 font-extrabold tracking-tight">
                99.4% SLA
              </span>
            </div>
            <div className={`h-8 w-px ${isDark ? 'bg-white/10' : 'bg-black/10'}`} />
            <div className="flex items-center gap-2 text-cyan-500">
              <Radar className="w-5 h-5 animate-spin" style={{ animationDuration: '8s' }} />
              <div className="flex flex-col">
                <span className="font-mono-tech text-[9px] uppercase tracking-widest text-cyan-600 font-bold">
                  Telemetría Titan Mini
                </span>
                <span className={`font-mono-tech text-[10px] ${
                  isDark ? 'text-gray-200' : 'text-gray-700 font-medium'
                }`}>
                  Flota Conectada Activa
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Chassis Corner Vector Watermark */}
        <div className={`flex flex-col sm:flex-row items-start sm:items-center justify-between w-full pt-8 border-t gap-2 ${
          isDark ? 'border-white/[0.08]' : 'border-black/[0.08]'
        }`}>
          <div className={`font-mono-tech text-xs flex flex-wrap items-center gap-2 ${
            isDark ? 'text-gray-400' : 'text-gray-500'
          }`}>
            <span className={`font-bold ${isDark ? 'text-gray-300' : 'text-gray-800'}`}>// HAKIM HEAVY IND.</span>
            <span>•</span>
            <span>RUC: {COMPANY_INFO.ruc}</span>
            <span>•</span>
            <span>TITAN-MINI SUB-1 // CHASSIS FABRICATION</span>
            <span>•</span>
            <span>CALIBRADO PARA ALTURA 4,800+ MSNM</span>
          </div>
          <div className="flex items-center gap-1.5 font-mono-tech text-xs text-amber-500 font-semibold">
            <Activity className="w-3.5 h-3.5 animate-pulse" />
            <span>NODO CENTRAL CHACLACAYO - CONEXIÓN ÓPTIMA</span>
          </div>
        </div>

      </div>
    </section>
  );
};
