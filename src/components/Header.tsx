import React, { useState } from 'react';
import { ScreenView } from '../types';
import { COMPANY_INFO } from '../data/miningData';
import { useTheme } from '../context/ThemeContext';
import { 
  Menu, 
  X, 
  Globe, 
  Wrench, 
  Radio, 
  ShieldCheck, 
  PhoneCall, 
  ChevronRight,
  Sparkles,
  Sun,
  Moon
} from 'lucide-react';

interface HeaderProps {
  currentScreen: ScreenView;
  onNavigate: (screen: ScreenView) => void;
  onOpenQuote: () => void;
}

export const Header: React.FC<HeaderProps> = ({ currentScreen, onNavigate, onOpenQuote }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const navItems: { id: ScreenView; label: string; badge?: string }[] = [
    { id: 'inicio', label: 'Inicio' },
    { id: 'maquinaria', label: 'Equipos', badge: 'Catálogo' },
    { id: 'servicios', label: 'Servicios' },
    { id: 'repuestos', label: 'Repuestos' },
    { id: 'corporativo', label: 'Nosotros' },
    { id: 'contacto', label: 'Contacto' },
  ];

  const handleNavClick = (screen: ScreenView) => {
    onNavigate(screen);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#090f16]/90 backdrop-blur-xl border-b border-white/[0.07] shadow-[0_12px_32px_-4px_rgba(0,0,0,0.8)]">
      {/* Top micro-bar for quick emergency line & headquarters */}
      <div className="hidden lg:flex items-center justify-between px-6 py-1 bg-[#060a0f] border-b border-white/[0.04] text-[11px] font-mono-tech text-gray-400">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 text-amber-400 font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
            HAKIM INTEGRAL SERVICE S.A.C. // RUC: {COMPANY_INFO.ruc}
          </span>
          <span className="text-gray-600">|</span>
          <span>PLANTA PRINCIPAL: CHACLACAYO, LIMA — PERÚ</span>
        </div>
        <div className="flex items-center gap-5">
          <a 
            href={`tel:${COMPANY_INFO.phone}`} 
            className="flex items-center gap-1 hover:text-amber-400 transition-colors"
          >
            <PhoneCall className="w-3 h-3 text-cyan-400" />
            <span>CENTRAL: {COMPANY_INFO.phone}</span>
          </a>
          <span className="text-gray-600">|</span>
          <span className="text-cyan-400 flex items-center gap-1">
            <Radio className="w-3 h-3 animate-pulse" />
            SOPORTE TÉCNICO ESPECIALIZADO
          </span>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="h-20 w-full px-4 sm:px-8 max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Brand Monogram & Name */}
        <div className="flex items-center gap-3 shrink-0">
          <button 
            onClick={() => handleNavClick('inicio')}
            className="flex items-center gap-3 text-left group focus:outline-none"
            aria-label="Ir al inicio"
          >
            <div className="relative p-1 rounded bg-[#161c24] border border-amber-500/20 group-hover:border-amber-500/50 transition-all">
              <img 
                src={COMPANY_INFO.logoUrl} 
                alt="Hakim Integral Service Logo" 
                className="h-9 w-auto object-contain transition-transform group-hover:scale-105"
              />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-heading font-extrabold text-lg sm:text-xl tracking-tight text-white uppercase group-hover:text-amber-400 transition-colors">
                  HAKIM
                </span>
                <span className="font-heading font-semibold text-xs sm:text-sm tracking-widest text-amber-400 uppercase">
                  INTEGRAL SERVICE
                </span>
              </div>
              <span className="text-[10px] font-mono-tech tracking-wider text-gray-400 uppercase hidden sm:block">
                Maquinaria & Minería
              </span>
            </div>
          </button>

          {/* Grid Status Pill */}
          <div className="hidden 2xl:flex items-center gap-2 px-3 py-1 bg-[#161c24] border border-white/[0.08] rounded ml-2">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
            <span className="font-mono-tech text-[10px] text-gray-300 uppercase tracking-wider">
              Sede: Chaclacayo, Lima
            </span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navItems.map((item) => {
            const isActive = currentScreen === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`relative px-3 py-2 text-sm font-medium transition-all rounded flex items-center gap-1.5 ${
                  isActive
                    ? 'text-amber-400 bg-amber-500/10 font-semibold'
                    : 'text-gray-300 hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                <span>{item.label}</span>
                {item.badge && (
                  <span className={`text-[9px] font-mono-tech px-1.5 py-0.5 rounded uppercase ${
                    item.badge === 'Live' 
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' 
                      : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                  }`}>
                    {item.badge}
                  </span>
                )}
                {isActive && (
                  <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-amber-400 rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Action Cluster */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Country / HQ Tag */}
          <div className="hidden sm:flex items-center gap-1.5 bg-[#161c24] border border-white/[0.08] px-2.5 py-1 rounded text-gray-300">
            <Globe className="w-3.5 h-3.5 text-cyan-400" />
            <span className="font-mono-tech text-[10px] uppercase tracking-wider text-gray-200">
              PERÚ HQ
            </span>
          </div>

          {/* Dark / Light Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="flex items-center gap-1.5 bg-[#161c24] hover:bg-[#1e2632] border border-white/[0.1] px-2.5 py-1 rounded text-xs font-mono-tech transition-all cursor-pointer group shadow-sm"
            aria-label={theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
            title={theme === 'dark' ? 'Cambiar a Modo Claro' : 'Cambiar a Modo Oscuro'}
          >
            {theme === 'dark' ? (
              <>
                <Sun className="w-3.5 h-3.5 text-amber-400 group-hover:rotate-45 transition-transform" />
                <span className="hidden sm:inline text-[11px] text-gray-300 font-medium">Claro</span>
              </>
            ) : (
              <>
                <Moon className="w-3.5 h-3.5 text-indigo-500 group-hover:-rotate-12 transition-transform" />
                <span className="hidden sm:inline text-[11px] text-gray-700 font-medium">Oscuro</span>
              </>
            )}
          </button>

          {/* Primary CTA - Cotizar */}
          <button
            onClick={onOpenQuote}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#ffb800] hover:bg-[#ffc933] text-[#1a1200] font-heading font-bold text-xs sm:text-sm uppercase tracking-wider rounded shadow-[0_0_20px_rgba(255,184,0,0.35)] transition-all active:translate-y-[1px]"
          >
            <Wrench className="w-4 h-4 text-[#1a1200]" />
            <span className="whitespace-nowrap">Cotizar / Ventas</span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-gray-300 hover:text-white bg-[#161c24] border border-white/[0.08] rounded focus:outline-none"
            aria-label="Abrir menú"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0e141c] border-b border-white/[0.1] px-4 py-6 flex flex-col gap-3 shadow-2xl animate-in slide-in-from-top duration-200">
          <div className="flex items-center justify-between pb-3 border-b border-white/[0.08] text-xs font-mono-tech text-gray-400">
            <span className="text-amber-400 font-bold">HAKIM INTEGRAL SERVICE S.A.C.</span>
            <span>RUC: {COMPANY_INFO.ruc}</span>
          </div>

          <div className="flex flex-col gap-1">
            {navItems.map((item) => {
              const isActive = currentScreen === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center justify-between px-4 py-3 rounded text-left font-heading text-sm uppercase tracking-wider transition-colors ${
                    isActive 
                      ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30' 
                      : 'text-gray-200 hover:bg-white/[0.05]'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span>{item.label}</span>
                    {item.badge && (
                      <span className="text-[9px] font-mono-tech px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-white/[0.08] flex flex-col gap-2.5">
            {/* Mobile Theme Toggle */}
            <div className="flex items-center justify-between p-3 rounded bg-[#161c24] border border-white/[0.06]">
              <div className="flex items-center gap-2 text-xs font-heading font-bold uppercase text-gray-200">
                {theme === 'dark' ? <Moon className="w-4 h-4 text-amber-400" /> : <Sun className="w-4 h-4 text-amber-500" />}
                <span>Tema: {theme === 'dark' ? 'Modo Oscuro' : 'Modo Claro'}</span>
              </div>
              <button
                onClick={toggleTheme}
                className="px-3 py-1.5 rounded bg-[#090f16] border border-white/[0.1] font-mono-tech text-xs text-amber-400 font-semibold flex items-center gap-1.5"
              >
                {theme === 'dark' ? (
                  <>
                    <Sun className="w-3.5 h-3.5" />
                    <span>Cambiar a Claro</span>
                  </>
                ) : (
                  <>
                    <Moon className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Cambiar a Oscuro</span>
                  </>
                )}
              </button>
            </div>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenQuote();
              }}
              className="w-full py-3 bg-[#ffb800] text-[#1a1200] font-heading font-bold text-sm uppercase rounded flex items-center justify-center gap-2"
            >
              <Wrench className="w-4 h-4" />
              <span>Solicitar Cotización Técnica</span>
            </button>
            <div className="flex items-center justify-between px-2 text-xs font-mono-tech text-gray-400">
              <span>Soporte 24/7: {COMPANY_INFO.phone}</span>
              <span>Chaclacayo, Lima</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
