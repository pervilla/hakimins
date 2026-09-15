import React from 'react';
import { CheckCircle2, Shield, Recycle, Award, Sparkles } from 'lucide-react';

export const SustainabilitySection: React.FC = () => {
  return (
    <section className="w-full bg-[#0e141c] py-20 border-t border-white/[0.08]" id="sostenibilidad">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 flex flex-col gap-14">
        
        {/* Section Header */}
        <div className="flex flex-col gap-2 max-w-3xl">
          <div className="font-mono-tech text-xs text-amber-400 uppercase tracking-widest font-semibold">
            // RESPONSABILIDAD CORPORATIVA & MANDATO 2030
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl text-white font-extrabold uppercase tracking-tight">
            Compromiso Ambiental y Gobernanza Sostenible
          </h2>
          <p className="text-sm sm:text-base text-gray-400 leading-relaxed pt-1">
            Nuestra presencia en los principales yacimientos andinos exige un liderazgo implacable en la transición hacia una minería de cero fatalidades, menor huella de carbono y protección absoluta del capital humano.
          </p>
        </div>

        {/* Corporate Tri-Pillar Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          
          {/* Pillar 1 */}
          <div className="flex flex-col justify-between p-6 sm:p-8 bg-[#161c24] border border-white/[0.08] rounded gap-6 transition-all hover:border-amber-500/30">
            <div className="flex flex-col gap-3">
              <span className="font-heading text-4xl sm:text-5xl font-extrabold text-amber-400">
                01
              </span>
              <h3 className="font-heading text-lg font-bold text-white uppercase">
                Cero Emisiones Netas 2035
              </h3>
              <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                Inversión continua en la transición de trenes de potencia hacia celdas de combustible de hidrógeno verde, baterías LFP de alto ciclaje y jumbos electrohidráulicos conectados a la red de mina.
              </p>
            </div>
            <div className="font-mono-tech text-xs text-gray-400 flex items-center gap-2 uppercase pt-4 border-t border-white/[0.06]">
              <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>Objetivo alineado GHG Protocol</span>
            </div>
          </div>

          {/* Pillar 2 */}
          <div className="flex flex-col justify-between p-6 sm:p-8 bg-[#161c24] border border-white/[0.08] rounded gap-6 transition-all hover:border-cyan-500/30">
            <div className="flex flex-col gap-3">
              <span className="font-heading text-4xl sm:text-5xl font-extrabold text-amber-400">
                02
              </span>
              <h3 className="font-heading text-lg font-bold text-white uppercase">
                Seguridad Operacional ISO 45001
              </h3>
              <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                Cero fatalidades registradas en equipos teleoperados y reducción del 95% del personal expuesto a frentes de carguío y zonas de tronadura de alto riesgo mediante cabinas remotas.
              </p>
            </div>
            <div className="font-mono-tech text-xs text-gray-400 flex items-center gap-2 uppercase pt-4 border-t border-white/[0.06]">
              <Shield className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>Zero Harm Philosophy (DS 024)</span>
            </div>
          </div>

          {/* Pillar 3 */}
          <div className="flex flex-col justify-between p-6 sm:p-8 bg-[#161c24] border border-white/[0.08] rounded gap-6 transition-all hover:border-emerald-500/30">
            <div className="flex flex-col gap-3">
              <span className="font-heading text-4xl sm:text-5xl font-extrabold text-amber-400">
                03
              </span>
              <h3 className="font-heading text-lg font-bold text-white uppercase">
                Ciclo de Vida Circular RePower
              </h3>
              <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                Programa de refabricación remanufacturada (Hakim RePower) que recupera el 85% del acero estructural de cada máquina tras 60,000 horas de servicio activo en cantera o mina.
              </p>
            </div>
            <div className="font-mono-tech text-xs text-gray-400 flex items-center gap-2 uppercase pt-4 border-t border-white/[0.06]">
              <Recycle className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>Economía Circular Certificada</span>
            </div>
          </div>

        </div>

        {/* Executive Testimonial Banner */}
        <div className="p-6 sm:p-8 bg-[#161c24] border border-white/[0.08] rounded flex flex-col md:flex-row items-center gap-6">
          <div className="w-16 h-16 rounded-full bg-amber-400 text-black flex items-center justify-center font-extrabold shrink-0 shadow-[0_0_20px_rgba(255,184,0,0.4)]">
            <Award className="w-8 h-8 text-black" />
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-sm sm:text-base italic text-gray-200 leading-relaxed">
              "La maquinaria pesada ya no se define únicamente por la fuerza bruta de su acero o la cilindrada de su motor, sino por la inteligencia algorítmica, la confiabilidad electrohidráulica y la precisión sustentable con la que orquesta la extracción de los minerales críticos indispensables para el futuro del mundo."
            </p>
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="font-heading text-sm font-bold uppercase text-amber-400">
                Ing. Dirección de Operaciones & Overhaul
              </span>
              <span className="text-gray-500">•</span>
              <span className="font-mono-tech text-xs text-gray-400 uppercase">
                Hakim Integral Service S.A.C. / Planta Central Chaclacayo
              </span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
