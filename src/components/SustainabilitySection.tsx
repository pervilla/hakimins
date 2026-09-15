import React from 'react';
import { CheckCircle2, Shield, Recycle } from 'lucide-react';

export const SustainabilitySection: React.FC = () => {
  return (
    <section className="w-full bg-[#0e141c] py-20 border-t border-white/[0.08]" id="sostenibilidad">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 flex flex-col gap-14">
        
        {/* Section Header */}
        <div className="flex flex-col gap-2 max-w-3xl">
          <div className="font-mono-tech text-xs text-amber-400 uppercase tracking-widest font-semibold">
            // COMPROMISO DE TRABAJO
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl text-white font-extrabold uppercase tracking-tight">
            Seguridad, Calidad y Vida Útil de los Equipos
          </h2>
          <p className="text-sm sm:text-base text-gray-400 leading-relaxed pt-1">
            Trabajamos con un enfoque de seguridad en cada intervención, cuidando la integridad del personal y la continuidad operativa de la mina. Un mantenimiento bien ejecutado extiende la vida útil de los equipos y reduce costos.
          </p>
        </div>

        {/* Three-Pillar Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          
          {/* Pillar 1 */}
          <div className="flex flex-col justify-between p-6 sm:p-8 bg-[#161c24] border border-white/[0.08] rounded gap-6 transition-all hover:border-amber-500/30">
            <div className="flex flex-col gap-3">
              <span className="font-heading text-4xl sm:text-5xl font-extrabold text-amber-400">
                01
              </span>
              <h3 className="font-heading text-lg font-bold text-white uppercase">
                Seguridad en la Operación
              </h3>
              <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                Priorizamos la seguridad del personal y la integridad de los equipos. Intervenciones planificadas y ejecutadas con procedimientos de trabajo seguros, en taller y en la unidad minera.
              </p>
            </div>
            <div className="font-mono-tech text-xs text-gray-400 flex items-center gap-2 uppercase pt-4 border-t border-white/[0.06]">
              <Shield className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>Enfoque de cero daño</span>
            </div>
          </div>

          {/* Pillar 2 */}
          <div className="flex flex-col justify-between p-6 sm:p-8 bg-[#161c24] border border-white/[0.08] rounded gap-6 transition-all hover:border-cyan-500/30">
            <div className="flex flex-col gap-3">
              <span className="font-heading text-4xl sm:text-5xl font-extrabold text-amber-400">
                02
              </span>
              <h3 className="font-heading text-lg font-bold text-white uppercase">
                Calidad del Trabajo Técnico
              </h3>
              <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                Reparación y fabricación con control de calidad interno, tolerancias de mecanizado y verificación de funcionamiento antes de la entrega, con informe técnico del trabajo realizado.
              </p>
            </div>
            <div className="font-mono-tech text-xs text-gray-400 flex items-center gap-2 uppercase pt-4 border-t border-white/[0.06]">
              <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>Control de calidad interno</span>
            </div>
          </div>

          {/* Pillar 3 */}
          <div className="flex flex-col justify-between p-6 sm:p-8 bg-[#161c24] border border-white/[0.08] rounded gap-6 transition-all hover:border-emerald-500/30">
            <div className="flex flex-col gap-3">
              <span className="font-heading text-4xl sm:text-5xl font-extrabold text-amber-400">
                03
              </span>
              <h3 className="font-heading text-lg font-bold text-white uppercase">
                Reconstrucción y Vida Útil
              </h3>
              <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                El overhaul y la fabricación de piezas permiten extender la vida útil de los equipos y reducir la compra de maquinaria nueva, con un uso más eficiente de los recursos del cliente.
              </p>
            </div>
            <div className="font-mono-tech text-xs text-gray-400 flex items-center gap-2 uppercase pt-4 border-t border-white/[0.06]">
              <Recycle className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>Extensión de vida útil</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
