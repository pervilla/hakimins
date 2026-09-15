import React, { useState, useEffect } from 'react';
import { TELEMETRY_NODES } from '../data/miningData';
import { TelemetryNode } from '../types';
import { 
  Eye, 
  Cpu, 
  Leaf, 
  Radar, 
  Activity, 
  Radio, 
  ShieldCheck, 
  AlertTriangle,
  ArrowRight
} from 'lucide-react';

interface NeuralFleetSectionProps {
  onOpenFullTelemetry: () => void;
}

export const NeuralFleetSection: React.FC<NeuralFleetSectionProps> = ({ onOpenFullTelemetry }) => {
  const [selectedUnit, setSelectedUnit] = useState<TelemetryNode>(TELEMETRY_NODES[0]);
  const [radarAngle, setRadarAngle] = useState(0);
  const [liveLatency, setLiveLatency] = useState(selectedUnit.neuralLatencyMs);

  // Rotate simulated radar sweep
  useEffect(() => {
    const interval = setInterval(() => {
      setRadarAngle(prev => (prev + 4) % 360);
    }, 40);
    return () => clearInterval(interval);
  }, []);

  // Tiny fluctuation to simulate live sensor stream
  useEffect(() => {
    const stream = setInterval(() => {
      setLiveLatency(+(selectedUnit.neuralLatencyMs + (Math.random() * 0.4 - 0.2)).toFixed(2));
    }, 1200);
    return () => clearInterval(stream);
  }, [selectedUnit]);

  return (
    <section className="w-full bg-[#090f16] py-20 relative overflow-hidden border-t border-white/[0.08]" id="tecnologia">
      {/* Subtle Background Vector Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 flex flex-col gap-12">
        
        {/* Split Layout matching Image 6 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left HUD & Telemetry Diagnostic Card (Col 5) */}
          <div className="lg:col-span-5 flex flex-col bg-[#121820] border border-white/[0.1] rounded p-6 shadow-2xl relative">
            
            {/* Unit Selector Pills */}
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                <span className="font-mono-tech text-xs text-cyan-400 uppercase tracking-widest font-bold">
                  LIVE SENSOR TELEMETRY
                </span>
              </div>
              <span className="font-mono-tech text-xs text-gray-400">
                {selectedUnit.unitCode}
              </span>
            </div>

            {/* Quick machine switcher */}
            <div className="flex gap-1.5 py-3 overflow-x-auto">
              {TELEMETRY_NODES.map((node) => (
                <button
                  key={node.id}
                  onClick={() => {
                    setSelectedUnit(node);
                    setLiveLatency(node.neuralLatencyMs);
                  }}
                  className={`px-2.5 py-1 text-[10px] font-mono-tech uppercase rounded whitespace-nowrap transition-all ${
                    selectedUnit.id === node.id
                      ? 'bg-amber-400 text-black font-bold shadow'
                      : 'bg-[#1a222d] text-gray-400 hover:text-white border border-white/[0.05]'
                  }`}
                >
                  {node.name.split(' ')[0]} {node.unitCode.split('#')[1]}
                </button>
              ))}
            </div>

            {/* Synthetic Radar / LiDAR Simulation Viewport */}
            <div className="relative w-full h-64 bg-[#090f16] my-2 rounded border border-white/[0.08] overflow-hidden flex items-center justify-center">
              {/* Concentric Range Circles */}
              <div className="absolute w-56 h-56 rounded-full border border-cyan-500/20" />
              <div className="absolute w-40 h-40 rounded-full border border-cyan-500/30" />
              <div className="absolute w-24 h-24 rounded-full border border-amber-500/30" />
              
              {/* Crosshair axes */}
              <div className="absolute w-px h-full bg-cyan-500/20" />
              <div className="absolute h-px w-full bg-cyan-500/20" />
              
              {/* Radar Sweep Line */}
              <div
                className="absolute w-28 h-28 top-1/2 left-1/2 origin-top-left pointer-events-none opacity-40 bg-gradient-to-br from-cyan-400/40 via-transparent to-transparent"
                style={{ transform: `rotate(${radarAngle}deg)` }}
              />

              {/* Dynamic Target Indicators */}
              <div className="absolute top-10 left-12 flex items-center gap-1.5 bg-black/60 px-2 py-0.5 rounded border border-amber-500/30">
                <div className="w-2 h-2 bg-amber-400 rounded-sm animate-pulse" />
                <span className="font-mono-tech text-[9px] text-amber-400 tracking-tighter">
                  ROCK_BURDEN [{selectedUnit.distanceObstacleM}m]
                </span>
              </div>

              <div className="absolute bottom-12 right-14 flex items-center gap-1.5 bg-black/60 px-2 py-0.5 rounded border border-cyan-500/30">
                <div className="w-2 h-2 bg-cyan-400 rounded-sm" />
                <span className="font-mono-tech text-[9px] text-cyan-400 tracking-tighter">
                  EXCAV_UNIT [42.1m]
                </span>
              </div>

              {/* Central Machine Node */}
              <div className="relative z-10 w-9 h-9 rounded-full bg-[#ffb800] text-[#1a1200] flex items-center justify-center font-heading font-extrabold text-xs shadow-[0_0_20px_rgba(255,184,0,0.7)]">
                HKM
              </div>

              {/* Coordinates watermark */}
              <div className="absolute bottom-2 left-2 font-mono-tech text-[9px] text-gray-500">
                {selectedUnit.coordinates}
              </div>
            </div>

            {/* Active Telemetric Gauges */}
            <div className="grid grid-cols-3 gap-2 pt-2 font-mono-tech">
              <div className="flex flex-col bg-[#161c24] border border-white/[0.05] p-2 rounded">
                <span className="text-gray-500 uppercase text-[9px]">LiDAR 3D Mesh</span>
                <span className="text-cyan-400 font-bold text-xs">300m / 360°</span>
              </div>
              <div className="flex flex-col bg-[#161c24] border border-white/[0.05] p-2 rounded">
                <span className="text-gray-500 uppercase text-[9px]">Radar 77 GHz</span>
                <span className="text-white font-bold text-xs">ACTIVE LOCK</span>
              </div>
              <div className="flex flex-col bg-[#161c24] border border-white/[0.05] p-2 rounded">
                <span className="text-gray-500 uppercase text-[9px]">Neural Latency</span>
                <span className="text-amber-400 font-bold text-xs">&lt; {liveLatency} ms</span>
              </div>
            </div>

            {/* Secondary telemetry info */}
            <div className="mt-3 p-2.5 bg-[#090f16] border border-white/[0.05] rounded flex items-center justify-between text-xs font-mono-tech">
              <div className="flex items-center gap-2 text-gray-300">
                <Activity className="w-3.5 h-3.5 text-amber-400" />
                <span>P. Hidráulica: <strong className="text-white">{selectedUnit.hydraulicPressure} bar</strong></span>
              </div>
              <div className="text-gray-400">
                Temp: <strong className="text-white">{selectedUnit.engineTemp}°C</strong>
              </div>
              <div className="text-cyan-400">
                Carga: <strong className="text-cyan-300">{selectedUnit.payloadTon} T</strong>
              </div>
            </div>

            {/* Link to full console */}
            <button
              onClick={onOpenFullTelemetry}
              className="mt-3 w-full py-2 bg-[#1a222d] hover:bg-[#222c3b] text-cyan-400 hover:text-cyan-300 text-xs font-mono-tech uppercase rounded flex items-center justify-center gap-2 border border-cyan-500/20 transition-colors"
            >
              <span>Abrir Centro de Control Hakim Fleet OS™</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Right Content Block: Features & Architecture (Col 7) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <div className="font-mono-tech text-xs text-amber-400 uppercase tracking-widest font-semibold">
                // COMPUTACIÓN EMBARCADA & AUTONOMÍA INDUSTRIAL
              </div>
              <h2 className="font-heading text-3xl sm:text-4xl text-white font-extrabold uppercase tracking-tight leading-tight">
                Hakim Neural Fleet™: El futuro de la minería sin conductor y overhaul predictivo
              </h2>
              <p className="text-base text-gray-300 leading-relaxed">
                La plataforma de orquestación autónoma y telemetría predictiva más avanzada del sector extractivo peruano. Gestiona sinergias complejas de transporte masivo en superficie y avance en interior mina mediante algoritmos de enjambre y análisis en tiempo real.
              </p>
            </div>

            {/* 3 Technological Value Pillars */}
            <div className="flex flex-col gap-4">
              {/* Feature 1 */}
              <div className="flex items-start gap-4 p-4 bg-[#161c24] border border-white/[0.06] rounded transition-colors hover:bg-[#1c2430] hover:border-amber-500/30 group">
                <div className="p-3 bg-amber-500/10 text-amber-400 rounded shrink-0 border border-amber-500/20 group-hover:scale-105 transition-transform">
                  <Eye className="w-6 h-6" />
                </div>
                <div className="flex flex-col">
                  <h4 className="font-heading text-base font-bold text-white uppercase group-hover:text-amber-400 transition-colors">
                    Navegación Autónoma LiDAR 3D Multiespectral
                  </h4>
                  <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                    Detección volumétrica y clasificación instantánea de obstáculos a 300 metros incluso en condiciones extremas de ventisca de polvo, neblina tóxica y oscuridad total en interior de pozo y socavón.
                  </p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="flex items-start gap-4 p-4 bg-[#161c24] border border-white/[0.06] rounded transition-colors hover:bg-[#1c2430] hover:border-cyan-500/30 group">
                <div className="p-3 bg-cyan-500/10 text-cyan-400 rounded shrink-0 border border-cyan-500/20 group-hover:scale-105 transition-transform">
                  <Cpu className="w-6 h-6" />
                </div>
                <div className="flex flex-col">
                  <h4 className="font-heading text-base font-bold text-white uppercase group-hover:text-cyan-400 transition-colors">
                    Gemelos Digitales y Mantenimiento Predictivo
                  </h4>
                  <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                    Anticipación analítica de fatiga estructural y desgaste hidráulico con hasta 14 días de antelación gracias a más de 1,200 sensores telemétricos procesados en el borde (Edge Computing) en cada equipo minero.
                  </p>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="flex items-start gap-4 p-4 bg-[#161c24] border border-white/[0.06] rounded transition-colors hover:bg-[#1c2430] hover:border-emerald-500/30 group">
                <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded shrink-0 border border-emerald-500/20 group-hover:scale-105 transition-transform">
                  <Leaf className="w-6 h-6" />
                </div>
                <div className="flex flex-col">
                  <h4 className="font-heading text-base font-bold text-white uppercase group-hover:text-emerald-400 transition-colors">
                    Descarbonización y Recuperación Regenerativa
                  </h4>
                  <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                    Reducción comprobada del 38% en emisiones de CO₂ mediante ciclos de frenado regenerativo en rampas descendentes y reconversión de jumbos y scoops diésel a trenes motrices 100% electrohidráulicos.
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
