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
                // SOLICITE UNA COTIZACIÓN
              </span>
              <h3 className="font-heading text-2xl sm:text-3xl text-white font-extrabold uppercase tracking-tight">
                ¿Necesita maquinaria o servicio técnico para su operación?
              </h3>
              <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                Cuéntenos qué equipo necesita, ya sea fabricación, mantenimiento, overhaul, repuestos o alquiler, y le responderemos con una propuesta.
              </p>
            </div>

            {/* Quick Lead Form */}
            <form onSubmit={handleQuickSubmit} className="w-full lg:w-auto flex flex-col sm:flex-row items-stretch gap-3">
              <select
                value={selectedSector}
                onChange={(e) => setSelectedSector(e.target.value)}
                className="bg-[#0b0f14] border border-white/[0.15] text-gray-200 text-xs font-mono-tech px-4 py-3.5 rounded focus:outline-none focus:border-amber-400"
              >
                <option value="Fabricación de Equipos">Fabricación de Equipos a Medida</option>
                <option value="Mantenimiento y Overhaul">Mantenimiento, Reparación y Overhaul</option>
                <option value="Venta y Suministro de Repuestos">Venta y Suministro de Repuestos</option>
                <option value="Alquiler y Venta de Maquinaria">Alquiler y Venta de Maquinaria</option>
                <option value="Tableros Eléctricos">Tableros Eléctricos</option>
                <option value="Asesoramiento y Capacitación">Asesoramiento y Capacitación</option>
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
                  alt="Hakim Integral Service" 
                  className="h-9 w-auto object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-heading font-extrabold text-lg text-white uppercase">
                  HAKIM INTEGRAL SERVICE
                </span>
                <span className="text-[10px] font-mono-tech text-amber-400 uppercase tracking-widest">
                  Maquinaria & Minería
                </span>
              </div>
            </div>

            <p className="text-xs text-gray-400 leading-relaxed">
              Empresa peruana dedicada a la fabricación, mantenimiento, reparación y overhaul de equipos para la minería subterránea de pequeña y mediana escala. Maquinaria simple, de fácil operación y bajo costo de mantenimiento.
            </p>

            <div className="flex flex-col gap-1.5 text-xs font-mono-tech text-gray-400 pt-2">
              <div><strong className="text-gray-200">RUC:</strong> {COMPANY_INFO.ruc}</div>
              <div><strong className="text-gray-200">Dirección:</strong> {COMPANY_INFO.address}</div>
              <div><strong className="text-gray-200">Teléfonos:</strong> {COMPANY_INFO.phone} | {COMPANY_INFO.phoneSecondary}</div>
              <div><strong className="text-gray-200">Email:</strong> {COMPANY_INFO.emailSales}</div>
              <div><strong className="text-gray-200">Web:</strong> hakimins.com.pe</div>
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
                  className="hover:text-amber-400 transition-colors text-left text-amber-300 font-semibold"
                >
                  Jumbos Frontoneros Electrohidráulicos
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('maquinaria')} 
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  Jumbos Empernadores (Bolter)
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('maquinaria')} 
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  Desatadores de Rocas (Scaler)
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('maquinaria')} 
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  Scoops LHD de Bajo Perfil
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('maquinaria')} 
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  Dumpers Mineros Subterráneos
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('maquinaria')} 
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  Equipos de Sondaje Diamantino
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
                  Mantenimiento, Reparación y Overhaul
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('servicios')} 
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  Fabricación y Diseño de Equipos
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('repuestos')} 
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  Venta y Suministro de Repuestos
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('servicios')} 
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  Alquiler y Venta de Maquinaria
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('servicios')} 
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  Tableros Eléctricos
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('servicios')} 
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  Fabricación de Piezas Mecánicas
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('servicios')} 
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  Asesoramiento y Capacitación
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
                <span>Planta Principal: Chaclacayo, Lima</span>
              </div>
              <div className="flex items-start gap-1.5 text-gray-400">
                <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                <span>Atención a unidades mineras en todo el Perú</span>
              </div>
            </div>

            {/* Contact Links */}
            <div className="pt-2 flex flex-col gap-1 text-[10px] font-mono-tech">
              <a
                href={COMPANY_INFO.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="px-2 py-0.5 bg-[#161c24] border border-white/[0.08] rounded text-emerald-300 hover:text-emerald-200 transition-colors"
              >
                WhatsApp: {COMPANY_INFO.whatsapp}
              </a>
              <a
                href={COMPANY_INFO.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="px-2 py-0.5 bg-[#161c24] border border-white/[0.08] rounded text-cyan-300 hover:text-cyan-200 transition-colors"
              >
                Facebook / Hakim Integral Service
              </a>
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
            <button
              onClick={() => onNavigate('contacto')}
              className="text-gray-400 hover:text-amber-400 transition-colors"
            >
              Contacto
            </button>
            <span className="text-gray-700 hidden sm:inline">|</span>
            <a
              href={COMPANY_INFO.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              hakimins.com.pe
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};
