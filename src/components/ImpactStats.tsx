import React from 'react';
import { IMPACT_STATS } from '../data/miningData';
import { Globe, Cpu, Scale, CheckCircle2 } from 'lucide-react';

export const ImpactStats: React.FC = () => {
  const getIcon = (icon: string) => {
    switch (icon) {
      case 'public':
        return <Globe className="w-5 h-5 text-gray-400" />;
      case 'precision_manufacturing':
        return <Cpu className="w-5 h-5 text-gray-400" />;
      case 'scale':
        return <Scale className="w-5 h-5 text-gray-400" />;
      case 'verified':
      default:
        return <CheckCircle2 className="w-5 h-5 text-cyan-400" />;
    }
  };

  return (
    <section className="w-full bg-[#0b1016] border-y border-white/[0.08] shadow-2xl relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {IMPACT_STATS.map((stat, idx) => (
            <div
              key={idx}
              className="flex flex-col gap-2 p-5 bg-[#161c24] border border-white/[0.06] rounded transition-all duration-300 hover:bg-[#1c2430] hover:border-amber-500/30 hover:-translate-y-0.5 group"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono-tech text-[11px] text-amber-400 uppercase tracking-widest font-semibold">
                  {stat.code}
                </span>
                {getIcon(stat.icon)}
              </div>
              <span
                className={`font-heading text-2xl sm:text-3xl font-extrabold tracking-tight ${
                  stat.highlight ? 'text-cyan-400' : 'text-white'
                }`}
              >
                {stat.value}
              </span>
              <p className="text-xs text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
