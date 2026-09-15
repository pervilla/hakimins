import React, { useState, useEffect } from 'react';
import { TELEMETRY_NODES } from '../data/miningData';
import { TelemetryNode } from '../types';
import { 
  Radar, 
  Activity, 
  Radio, 
  MapPin, 
  AlertTriangle, 
  CheckCircle2, 
  Battery, 
  Flame, 
  Gauge, 
  RefreshCw,
  Cpu,
  Layers,
  ShieldAlert,
  HardHat
} from 'lucide-react';

export const FleetTelemetryView: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState<TelemetryNode>(TELEMETRY_NODES[0]);
  const [nodes, setNodes] = useState<TelemetryNode[]>(TELEMETRY_NODES);
  const [refreshing, setRefreshing] = useState(false);
  const [logs, setLogs] = useState<string[]>([
    '07:14:02 - NODO HAUL-7104: Telemetría satelital sincronizada vía Starlink LEO.',
    '07:13:45 - NODO JMB-SUB03: Presión hidráulica percusión estable en 228 bar.',
    '07:12:11 - NODO EXCAV-02: Factor de llenado de balde 98.4% registrado en Banco 19.',
    '07:10:58 - HAKIM FLEET OS: Algoritmo de prevención de colisión activo.',
  ]);

  // Periodic simulated micro-updates
  useEffect(() => {
    const interval = setInterval(() => {
      setNodes(prev => prev.map(n => ({
        ...n,
        neuralLatencyMs: +(n.neuralLatencyMs + (Math.random() * 0.2 - 0.1)).toFixed(2),
        engineTemp: +(n.engineTemp + (Math.random() * 0.4 - 0.2)).toFixed(1),
        hydraulicPressure: Math.round(n.hydraulicPressure + (Math.random() * 2 - 1)),
      })));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleManualSync = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      const timeStr = new Date().toLocaleTimeString();
      setLogs(prev => [`${timeStr} - SINCRONIZACIÓN MANUAL: Flota re-calibrada con éxito.`, ...prev.slice(0, 5)]);
    }, 800);
  };

  return (
    <div className="w-full bg-[#090f16] pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 flex flex-col gap-10">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/[0.08] pb-6">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 font-mono-tech text-xs text-cyan-400 uppercase tracking-widest font-bold">
              <Radio className="w-4 h-4 animate-pulse" />
              <span>Centro de Control Satelital // Hakim Fleet OS™ v4.8</span>
            </div>
            <h1 className="font-heading text-3xl sm:text-5xl text-white font-extrabold uppercase tracking-tight">
              Telemetría de Flota en Tiempo Real
            </h1>
            <p className="text-xs sm:text-sm text-gray-400 max-w-2xl leading-relaxed">
              Monitoreo continuo de salud estructural, diagnóstico de presión hidráulica y despacho autónomo para maquinaria pesada operando en tajo y socavón andino.
            </p>
          </div>

          <button
            onClick={handleManualSync}
            disabled={refreshing}
            className="self-start sm:self-auto px-4 py-2.5 bg-[#161c24] hover:bg-[#1f2733] border border-cyan-500/30 text-cyan-300 text-xs font-mono-tech uppercase rounded flex items-center gap-2 transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin text-cyan-400' : ''}`} />
            <span>{refreshing ? 'Sincronizando...' : 'Recalibrar Flota'}</span>
          </button>
        </div>

        {/* Top Status Indicators */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono-tech">
          <div className="p-4 bg-[#121820] border border-white/[0.08] rounded flex flex-col gap-1">
            <span className="text-gray-500 uppercase text-[10px]">Unidades Conectadas</span>
            <span className="text-2xl font-bold text-white">4 / 4 NODOS</span>
            <span className="text-[10px] text-emerald-400 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> 100% Enlace Activo
            </span>
          </div>

          <div className="p-4 bg-[#121820] border border-white/[0.08] rounded flex flex-col gap-1">
            <span className="text-gray-500 uppercase text-[10px]">Latencia Media LEO</span>
            <span className="text-2xl font-bold text-cyan-400">4.1 ms</span>
            <span className="text-[10px] text-gray-400">Canal Starlink Privado</span>
          </div>

          <div className="p-4 bg-[#121820] border border-white/[0.08] rounded flex flex-col gap-1">
            <span className="text-gray-500 uppercase text-[10px]">Disponibilidad SLA</span>
            <span className="text-2xl font-bold text-amber-400">99.4%</span>
            <span className="text-[10px] text-gray-400">Estándar Hakim</span>
          </div>

          <div className="p-4 bg-[#121820] border border-white/[0.08] rounded flex flex-col gap-1">
            <span className="text-gray-500 uppercase text-[10px]">Alertas Críticas</span>
            <span className="text-2xl font-bold text-emerald-400">0 FALLAS</span>
            <span className="text-[10px] text-emerald-300">Monitoreo Predictivo OK</span>
          </div>
        </div>

        {/* Main Telemetry Cockpit Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left: Active Nodes Fleet List (Col 5) */}
          <div className="lg:col-span-5 flex flex-col gap-3">
            <span className="font-mono-tech text-xs text-gray-400 uppercase tracking-wider font-semibold">
              Unidades Mineras Monitoreadas:
            </span>

            {nodes.map((node) => {
              const isSelected = selectedNode.id === node.id;
              return (
                <button
                  key={node.id}
                  onClick={() => setSelectedNode(node)}
                  className={`p-4 rounded-lg text-left border transition-all flex flex-col gap-2 ${
                    isSelected
                      ? 'bg-[#1a222d] border-amber-400 shadow-[0_0_20px_rgba(255,184,0,0.2)]'
                      : 'bg-[#121820] border-white/[0.08] hover:border-white/[0.2] hover:bg-[#161c24]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono-tech text-xs text-amber-400 font-bold">
                      {node.unitCode}
                    </span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono-tech uppercase ${
                      node.status === 'Operativo' || node.status === 'En Ciclo'
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                    }`}>
                      {node.status}
                    </span>
                  </div>

                  <h3 className="font-heading text-base font-bold text-white uppercase">
                    {node.name}
                  </h3>

                  <div className="flex items-center gap-1.5 text-xs text-gray-400 font-mono-tech">
                    <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span className="truncate">{node.mineSite}</span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 pt-1 font-mono-tech text-[11px] text-gray-300 border-t border-white/[0.05]">
                    <div>P. Hidr: <strong className="text-white">{node.hydraulicPressure} bar</strong></div>
                    <div>Temp: <strong className="text-amber-400">{node.engineTemp}°C</strong></div>
                    <div>Lat: <strong className="text-cyan-300">{node.neuralLatencyMs}ms</strong></div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right: Detailed HUD Diagnostics for Selected Node (Col 7) */}
          <div className="lg:col-span-7 bg-[#121820] border border-white/[0.08] rounded-lg p-6 sm:p-8 flex flex-col gap-6 shadow-2xl">
            
            {/* Unit Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/[0.08] pb-4">
              <div>
                <span className="font-mono-tech text-xs text-cyan-400 uppercase tracking-widest font-bold">
                  DIAGNÓSTICO EN TIEMPO REAL // {selectedNode.unitCode}
                </span>
                <h2 className="font-heading text-2xl sm:text-3xl font-extrabold uppercase text-white mt-0.5">
                  {selectedNode.name}
                </h2>
                <span className="text-xs text-gray-400 font-mono-tech">
                  Modelo: {selectedNode.model}
                </span>
              </div>

              <div className="flex flex-col sm:items-end font-mono-tech text-xs text-gray-400">
                <span className="text-white font-bold">{selectedNode.coordinates}</span>
                <span className="text-amber-400">{selectedNode.location}</span>
              </div>
            </div>

            {/* Gauges Matrix */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 font-mono-tech">
              
              <div className="p-4 bg-[#090f16] border border-white/[0.05] rounded flex flex-col gap-1">
                <span className="text-gray-500 uppercase text-[10px]">Presión Hidráulica</span>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-bold text-white">{selectedNode.hydraulicPressure}</span>
                  <span className="text-xs text-amber-400">BAR</span>
                </div>
                <div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden mt-1">
                  <div 
                    className="h-full bg-amber-400 rounded-full" 
                    style={{ width: `${Math.min(100, (selectedNode.hydraulicPressure / 400) * 100)}%` }}
                  />
                </div>
              </div>

              <div className="p-4 bg-[#090f16] border border-white/[0.05] rounded flex flex-col gap-1">
                <span className="text-gray-500 uppercase text-[10px]">Temperatura Motor/Aceite</span>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-bold text-white">{selectedNode.engineTemp}</span>
                  <span className="text-xs text-amber-400">°C</span>
                </div>
                <div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden mt-1">
                  <div 
                    className="h-full bg-cyan-400 rounded-full" 
                    style={{ width: `${Math.min(100, (selectedNode.engineTemp / 110) * 100)}%` }}
                  />
                </div>
              </div>

              <div className="p-4 bg-[#090f16] border border-white/[0.05] rounded flex flex-col gap-1">
                <span className="text-gray-500 uppercase text-[10px]">Carga de Energía / Combustible</span>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-bold text-emerald-400">{selectedNode.fuelOrBattery}</span>
                  <span className="text-xs text-emerald-400">%</span>
                </div>
                <div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden mt-1">
                  <div 
                    className="h-full bg-emerald-400 rounded-full" 
                    style={{ width: `${selectedNode.fuelOrBattery}%` }}
                  />
                </div>
              </div>

              <div className="p-4 bg-[#090f16] border border-white/[0.05] rounded flex flex-col gap-1">
                <span className="text-gray-500 uppercase text-[10px]">Carga Útil Transportada</span>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-bold text-white">{selectedNode.payloadTon}</span>
                  <span className="text-xs text-gray-400">TON</span>
                </div>
                <span className="text-[10px] text-gray-400">Cálculo por pesaje dinámico</span>
              </div>

              <div className="p-4 bg-[#090f16] border border-white/[0.05] rounded flex flex-col gap-1">
                <span className="text-gray-500 uppercase text-[10px]">Vibración Mecánica RMS</span>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-bold text-white">{selectedNode.vibrationMmS}</span>
                  <span className="text-xs text-gray-400">mm/s</span>
                </div>
                <span className="text-[10px] text-emerald-400">Dentro de norma ISO 10816</span>
              </div>

              <div className="p-4 bg-[#090f16] border border-white/[0.05] rounded flex flex-col gap-1">
                <span className="text-gray-500 uppercase text-[10px]">LiDAR Obstáculo Frontal</span>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-bold text-cyan-300">{selectedNode.distanceObstacleM}</span>
                  <span className="text-xs text-gray-400">METROS</span>
                </div>
                <span className="text-[10px] text-cyan-400">Escaneo 360° sin colisión</span>
              </div>

            </div>

            {/* Active Notification Banner */}
            <div className="p-4 bg-[#090f16] border border-amber-500/20 rounded flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0" />
              <div className="flex flex-col">
                <span className="font-mono-tech text-[10px] text-amber-400 font-bold uppercase">
                  ESTADO DE OPERACIÓN EN GUARDIA
                </span>
                <span className="text-xs text-gray-200">
                  {selectedNode.alert || 'Comportamiento predictivo óptimo sin anomalías térmicas.'}
                </span>
              </div>
            </div>

            {/* Live Event Stream Log */}
            <div className="flex flex-col gap-2">
              <span className="font-mono-tech text-xs text-gray-400 uppercase tracking-wider font-semibold">
                Registro de Eventos y Telemetría en Tiempo Real:
              </span>
              <div className="p-3 bg-[#090f16] rounded border border-white/[0.05] font-mono-tech text-xs flex flex-col gap-1.5 text-gray-400 max-h-36 overflow-y-auto">
                {logs.map((log, i) => (
                  <div key={i} className="text-gray-300">
                    <span className="text-cyan-400">&gt;</span> {log}
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
