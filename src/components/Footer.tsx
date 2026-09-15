import React, { useState } from 'react';
import { ScreenView } from '../types';
import { COMPANY_INFO } from '../data/miningData';
import { useTheme } from '../context/ThemeContext';
import { 
  Wrench, 
  MapPin, 
  Phone, 
  Mail, 
  ShieldCheck, 
  CheckCircle2, 
  Send, 
  ArrowRight,
  ExternalLink,
  Sun,
  Moon
} from 'lucide-react';

interface FooterProps {
  onNavigate: (screen: ScreenView) => void;
  onOpenQuote: (prefillSector?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenQuote }) => {
  const [quickEmail, setQuickEmail] = useState('');
  const [selectedSector, setSelectedSector] = useState('Minería Subterránea (Socavón)');
  const [quickSuccess, setQuickSuccess] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const handleQuickSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickEmail) return;
    setQuickSuccess(true);
    setTimeout(() => {
      onOpenQuote(selectedSector);
      setQuickSuccess(false);
    }, 1000);
  };

  return (
    <footer className="w-full bg-[#060a0f] border-t border-white/[0.08] relative z-20">
      
      {/* Top Pre-Footer Interactive RFQ Ribbon */}
      <div className="border-b border-white/[0.08] bg-[#090f16]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-14">
          <div className="p-8 sm:p-12 bg-gradient-to-r from-[#121820] to-[#161c24] border border-amber-500/30 rounded-lg shadow-2xl flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="flex flex-col gap-2 max-w-xl">
              <span className="font-mono-tech text-xs text-amber-400 uppercase tracking-widest font-semibold">
                // INICIE EL DESPLIEGUE OPERACIONAL
              </span>
              <h3 className="font-heading text-2xl sm:text-3xl text-white font-extrabold uppercase tracking-tight">
                ¿Preparado para transformar la escala de su explotación minera?
              </h3>
              <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                Solicite una consultoría técnica con nuestro equipo de ingeniería o configure los requerimientos de overhaul y suministro de su unidad minera.
              </p>
            </div>

            {/* Quick Lead Form */}
            <form onSubmit={handleQuickSubmit} className="w-full lg:w-auto flex flex-col sm:flex-row items-stretch gap-3">
              <select
                value={selectedSector}
                onChange={(e) => setSelectedSector(e.target.value)}
                className="bg-[#0b0f14] border border-white/[0.15] text-gray-200 text-xs font-mono-tech px-4 py-3.5 rounded focus:outline-none focus:border-amber-400"
              >
                <option value="Minería Subterránea (Socavón)">Minería Subterránea (Socavón)</option>
                <option value="Minería de Tajo Abierto">Minería de Tajo Abierto</option>
                <option value="Overhaul de Jumbos y Scoops">Overhaul de Jumbos y Scoops</option>
                <option value="Suministro de Repuestos Críticos">Suministro de Repuestos Críticos</option>
                <option value="Banco Hidráulico & Tableros">Banco Hidráulico & Tableros</option>
              </select>

              <input
                type="email"
                required
                value={quickEmail}
                onChange={(e) => setQuickEmail(e.target.value)}
                placeholder="correo@operaciones-mina.pe"
                className="bg-[#0b0f14] border border-white/[0.15] text-white text-xs font-mono-tech px-4 py-3.5 rounded placeholder-gray-500 focus:outline-none focus:border-amber-400 min-w-[240px]"
              />

              <button
                type="submit"
                disabled={quickSuccess}
                className="px-6 py-3.5 bg-[#ffb800] hover:bg-[#ffc933] text-[#1a1200] font-heading font-extrabold text-xs uppercase tracking-wider rounded transition-all shadow-[0_0_20px_rgba(255,184,0,0.3)] shrink-0 flex items-center justify-center gap-2"
              >
                {quickSuccess ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-black" />
                    <span>Conectando...</span>
                  </>
                ) : (
                  <>
                    <span>Iniciar Consulta</span>
                    <Send className="w-3.5 h-3.5 text-black" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Corporate 4-Column Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          
          {/* Column 1: Brand & Credentials (Col 4) */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="p-1 rounded bg-[#161c24] border border-amber-500/30">
                <img 
                  src={COMPANY_INFO.logoUrl} 
                  alt="Hakim Heavy Industries" 
                  className="h-9 w-auto object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-heading font-extrabold text-lg text-white uppercase">
                  HAKIM HEAVY IND.
                </span>
                <span className="text-[10px] font-mono-tech text-amber-400 uppercase tracking-widest">
                  Integral Service S.A.C.
                </span>
              </div>
            </div>

            <p className="text-xs text-gray-400 leading-relaxed">
              Líderes en ingeniería mecánica pesada, fabricación de jumbos electrohidráulicos, mantenimiento predictivo y overhaul a cero horas para la minería subterránea y de tajo abierto del Perú y la región andina.
            </p>

            <div className="flex flex-col gap-1.5 text-xs font-mono-tech text-gray-400 pt-2">
              <div><strong className="text-gray-200">RUC:</strong> {COMPANY_INFO.ruc}</div>
              <div><strong className="text-gray-200">Planta Chaclacayo:</strong> {COMPANY_INFO.headquarters.address}</div>
              <div><strong className="text-gray-200">Taller Ate:</strong> Pj. Gral. J. Velasco, Ate, Lima</div>
              <div><strong className="text-gray-200">Central Telefónica:</strong> {COMPANY_INFO.phone}</div>
              <div><strong className="text-gray-200">Email:</strong> {COMPANY_INFO.emailSales}</div>
            </div>
          </div>

          {/* Column 2: Maquinaria & Equipos (Col 3) */}
          <div className="lg:col-span-3 flex flex-col gap-3">
            <span className="font-mono-tech text-xs text-amber-400 uppercase tracking-widest font-bold border-b border-white/[0.08] pb-2">
              Maquinaria & Equipos
            </span>
            <ul className="flex flex-col gap-2 text-xs text-gray-400">
              <li>
                <button 
                  onClick={() => onNavigate('maquinaria')} 
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  Pala Hidráulica Masiva Serie Titan-X (820T)
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('maquinaria')} 
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  Camión Autónomo Haul-900 (400T)
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('maquinaria')} 
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  Perforadoras de Gran Diámetro Drill-Max
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('maquinaria')} 
                  className="hover:text-amber-400 transition-colors text-left text-amber-300 font-semibold"
                >
                  Jumbos Electrohidráulicos Subterráneos (Hakim)
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('maquinaria')} 
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  Cargadores LHD Scooptram Diésel & Batería
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('maquinaria')} 
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  Perforadoras Diamantinas para Sondajes
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Servicios & Soluciones (Col 3) */}
          <div className="lg:col-span-3 flex flex-col gap-3">
            <span className="font-mono-tech text-xs text-amber-400 uppercase tracking-widest font-bold border-b border-white/[0.08] pb-2">
              Servicios Especializados
            </span>
            <ul className="flex flex-col gap-2 text-xs text-gray-400">
              <li>
                <button 
                  onClick={() => onNavigate('servicios')} 
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  Overhaul Integral Cero Horas en Taller & Mina
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('servicios')} 
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  Fabricación y Diseño de Jumbos a Medida
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('servicios')} 
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  Tableros Eléctricos Mineros NEMA 4X / IP66
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('servicios')} 
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  Banco de Pruebas Hidráulico 500 Bar
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('telemetria')} 
                  className="hover:text-cyan-400 transition-colors text-left"
                >
                  Telemetría Satelital Hakim Fleet OS™
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('servicios')} 
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  Capacitación y Certificación de Operadores
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Red de Soporte Perú & Certificaciones (Col 2) */}
          <div className="lg:col-span-2 flex flex-col gap-3">
            <span className="font-mono-tech text-xs text-amber-400 uppercase tracking-widest font-bold border-b border-white/[0.08] pb-2">
              Presencia Minera
            </span>
            <div className="flex flex-col gap-2 text-xs text-gray-400">
              <div className="flex items-center gap-1.5 text-gray-300">
                <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Lima HQ (Chaclacayo)</span>
              </div>
              <div className="flex items-center gap-1.5 text-gray-300">
                <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Taller Ate (Mecanizados)</span>
              </div>
              <div className="flex items-center gap-1.5 text-gray-300">
                <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Base Arequipa (Sur)</span>
              </div>
              <div className="flex items-center gap-1.5 text-gray-300">
                <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Base Huancayo (Centro)</span>
              </div>
              <div className="flex items-center gap-1.5 text-gray-300">
                <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Base Trujillo (Norte)</span>
              </div>
            </div>

            {/* ISO Badge Pills */}
            <div className="pt-2 flex flex-col gap-1 text-[10px] font-mono-tech">
              <span className="px-2 py-0.5 bg-[#161c24] border border-white/[0.08] rounded text-cyan-300">
                ISO 9001 • ISO 14001
              </span>
              <span className="px-2 py-0.5 bg-[#161c24] border border-white/[0.08] rounded text-amber-300">
                ISO 45001 • DS 024
              </span>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Grid Connectivity */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-12 mt-12 border-t border-white/[0.06] text-xs font-mono-tech text-gray-500">
          <div>
            © {new Date().getFullYear()} HAKIM INTEGRAL SERVICE S.A.C. Todos los derechos reservados.
          </div>
          <div className="flex flex-wrap items-center gap-4">
            {/* Quick theme switcher button */}
            <button
              onClick={toggleTheme}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#161c24] hover:bg-[#1f2733] border border-white/[0.1] text-gray-300 transition-colors cursor-pointer"
              title={theme === 'dark' ? 'Cambiar a Modo Claro' : 'Cambiar a Modo Oscuro'}
            >
              {theme === 'dark' ? (
                <>
                  <Sun className="w-3.5 h-3.5 text-amber-400" />
                  <span className="text-[11px]">Modo Claro</span>
                </>
              ) : (
                <>
                  <Moon className="w-3.5 h-3.5 text-indigo-400" />
                  <span className="text-[11px]">Modo Oscuro</span>
                </>
              )}
            </button>
            <span className="text-gray-700 hidden sm:inline">|</span>
            <span className="text-gray-400 hover:text-white transition-colors cursor-pointer">
              Términos de Servicio
            </span>
            <span className="text-gray-700">|</span>
            <span className="text-gray-400 hover:text-white transition-colors cursor-pointer">
              Seguridad Industrial
            </span>
            <span className="text-gray-700 hidden sm:inline">|</span>
            <span className="text-cyan-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
              SYS_ACTIVE // GRID_PERÚ_ONLINE
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};
