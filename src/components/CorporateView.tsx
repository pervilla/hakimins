import React from 'react';
import { COMPANY_INFO } from '../data/miningData';
import { 
  Building2, 
  MapPin, 
  Award, 
  ShieldCheck, 
  CheckCircle2, 
  Phone, 
  Mail, 
  Clock, 
  Calendar,
  Users,
  Compass
} from 'lucide-react';

interface CorporateViewProps {
  onOpenQuote: () => void;
}

export const CorporateView: React.FC<CorporateViewProps> = ({ onOpenQuote }) => {
  return (
    <div className="w-full bg-[#090f16] pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 flex flex-col gap-14">
        
        {/* Banner */}
        <div className="flex flex-col gap-3 border-b border-white/[0.08] pb-8">
          <div className="flex items-center gap-2 font-mono-tech text-xs text-amber-400 uppercase tracking-widest font-semibold">
            <Building2 className="w-4 h-4" />
            <span>Perfil Corporativo // Hakim Integral Service S.A.C.</span>
          </div>
          <h1 className="font-heading text-3xl sm:text-5xl text-white font-extrabold uppercase tracking-tight">
            Ingeniería Pesada & Compromiso Minero
          </h1>
          <p className="text-sm sm:text-base text-gray-300 max-w-3xl leading-relaxed">
            HAKIM INTEGRAL SERVICE S.A.C. es una empresa peruana líder en servicios de mantenimiento integral, reconstrucción mayor (overhaul), fabricación de jumbos electrohidráulicos y suministro de componentes críticos para la minería y construcción.
          </p>
        </div>

        {/* Corporate Legal Card */}
        <div className="p-8 bg-[#121820] border border-white/[0.08] rounded-lg shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="p-2 rounded bg-[#161c24] border border-amber-500/30 shrink-0">
              <img
                src={COMPANY_INFO.logoUrl}
                alt="Hakim Integral Service Logo"
                className="h-12 w-auto object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-mono-tech text-xs text-amber-400 uppercase font-bold tracking-wider">
                RAZÓN SOCIAL OFICIAL
              </span>
              <h2 className="font-heading text-2xl font-extrabold text-white uppercase">
                {COMPANY_INFO.legalName}
              </h2>
              <span className="font-mono-tech text-xs text-gray-400">
                RUC: {COMPANY_INFO.ruc} • Estado: ACTIVO / HABIDO (SUNAT)
              </span>
            </div>
          </div>

          <button
            onClick={onOpenQuote}
            className="px-6 py-3 bg-[#ffb800] hover:bg-[#ffc933] text-[#1a1200] font-heading font-extrabold text-xs uppercase tracking-wider rounded transition-all shadow-[0_0_20px_rgba(255,184,0,0.3)] shrink-0"
          >
            Contactar Gerencia
          </button>
        </div>

        {/* Misión, Visión, Valores */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-[#161c24] border border-white/[0.08] rounded flex flex-col gap-3">
            <div className="p-2.5 bg-amber-500/10 text-amber-400 rounded w-fit border border-amber-500/20">
              <Compass className="w-5 h-5" />
            </div>
            <h3 className="font-heading text-lg font-bold text-white uppercase">
              Nuestra Misión
            </h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Brindar soluciones integrales de ingeniería mecánica y electrohidráulica que aseguren la máxima disponibilidad, confiabilidad y seguridad de los equipos de nuestros clientes en las condiciones geográficas más exigentes del país.
            </p>
          </div>

          <div className="p-6 bg-[#161c24] border border-white/[0.08] rounded flex flex-col gap-3">
            <div className="p-2.5 bg-cyan-500/10 text-cyan-400 rounded w-fit border border-cyan-500/20">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="font-heading text-lg font-bold text-white uppercase">
              Nuestra Visión
            </h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Consolidarnos como el socio estratégico preferente de la gran y mediana minería en el Perú y Latinoamérica para el desarrollo tecnológico de maquinaria de socavón, overhaul especializado e integración de sistemas autónomos.
            </p>
          </div>

          <div className="p-6 bg-[#161c24] border border-white/[0.08] rounded flex flex-col gap-3">
            <div className="p-2.5 bg-emerald-500/10 text-emerald-400 rounded w-fit border border-emerald-500/20">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-heading text-lg font-bold text-white uppercase">
              Cultura de Seguridad
            </h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              El principio rector de Cero Daño a las personas y al entorno, rigurosamente alineado con el D.S. 024-2016-EM y las certificaciones internacionales ISO 45001 e ISO 14001 en cada una de nuestras intervenciones.
            </p>
          </div>
        </div>

        {/* Peruvian Facilities & Bases */}
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <span className="font-mono-tech text-xs text-amber-400 uppercase tracking-widest font-semibold">
              // INFRAESTRUCTURA & COBERTURA NACIONAL
            </span>
            <h2 className="font-heading text-3xl font-extrabold uppercase text-white tracking-tight">
              Plantas de Operación y Bases de Soporte Minero
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {COMPANY_INFO.branches.map((branch, i) => (
              <div key={i} className="p-5 bg-[#121820] border border-white/[0.08] rounded flex flex-col justify-between gap-4">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-amber-400">
                    <MapPin className="w-4 h-4" />
                    <span className="font-mono-tech text-xs font-bold uppercase">{branch.city}</span>
                  </div>
                  <h4 className="font-heading text-base font-bold text-white uppercase">
                    {branch.type}
                  </h4>
                  <p className="text-xs font-mono-tech text-gray-400">
                    {branch.address}
                  </p>
                </div>
                <div className="pt-3 border-t border-white/[0.06] text-xs text-gray-300">
                  <strong className="text-cyan-400 font-mono-tech text-[10px] block uppercase">Alcance Operacional:</strong>
                  {branch.coverage}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Certificaciones y Marcas Homologadas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Certificaciones */}
          <div className="p-6 bg-[#121820] border border-white/[0.08] rounded flex flex-col gap-4">
            <span className="font-mono-tech text-xs text-cyan-400 uppercase tracking-widest font-bold">
              ESTÁNDARES & HOMOLOGACIONES
            </span>
            <div className="flex flex-col gap-3">
              {COMPANY_INFO.certifications.map((cert, idx) => (
                <div key={idx} className="flex items-center gap-3 p-3 bg-[#161c24] rounded border border-white/[0.05]">
                  <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0" />
                  <div className="flex flex-col">
                    <span className="font-heading text-sm font-bold text-white">{cert.code}</span>
                    <span className="text-xs text-gray-400">{cert.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Marcas Atendidas */}
          <div className="p-6 bg-[#121820] border border-white/[0.08] rounded flex flex-col gap-4">
            <span className="font-mono-tech text-xs text-amber-400 uppercase tracking-widest font-bold">
              MARCAS ATENDIDAS EN OVERHAUL & REPUESTOS
            </span>
            <p className="text-xs text-gray-400">
              Personal altamente capacitado y herramientas especiales para el mantenimiento y suministro conforme a manuales de fábrica:
            </p>
            <div className="grid grid-cols-2 gap-2.5">
              {COMPANY_INFO.partnerBrands.map((brand, idx) => (
                <div key={idx} className="p-3 bg-[#161c24] rounded border border-white/[0.05] text-xs font-mono-tech text-gray-200 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                  <span>{brand}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
