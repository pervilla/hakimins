import React, { useState, useEffect } from 'react';
import { X, Play, Pause, Volume2, VolumeX, Eye, Radio, Shield, Camera } from 'lucide-react';
import { COMPANY_INFO } from '../data/miningData';

interface DemoVideoModalProps {
  onClose: () => void;
}

export const DemoVideoModal: React.FC<DemoVideoModalProps> = ({ onClose }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [cameraView, setCameraView] = useState<'front' | 'chassis' | 'lidar'>('front');
  const [hudSeconds, setHudSeconds] = useState(14);
  const [simSpeed, setSimSpeed] = useState(38.4);

  useEffect(() => {
    const timer = setInterval(() => {
      setHudSeconds(prev => (prev + 1) % 60);
      setSimSpeed(+(38 + Math.sin(Date.now() / 1000) * 4).toFixed(1));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const cameraImages = {
    front: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD8mEPodsLGDZCL4G8l8l3meCQQLLhaHHMJ8yD6fZBqoySn1iVY7OryJMaMyX8VWqlqt7J4Zv3PMTn566CRcoAAXN7e2q03ZBB0G0l1YNBZGo7zIMEvsRAkjr3bx-By_lCmG4L66FB8SPZK7BGRtu0vrUY6XPj61Wm31cnpaNzkRJK9mjB2Ivgk2XnymSuEmjd18axBwMQAq4aBiCQdLWoMqC62yEzWfdlGALZA21MV_GhwvGwiCodfRA',
    chassis: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCztsh6rbPKgT74Gddc2sVyD8fO-KtcP6PYlN3bxIkN8JSitaetHko4QPofuSjgnNLMmMX54oXKwWW7uOYjlRMUEyRnNf1GgJTEJawl2Mn0B-_qgJjoGxzOfWduPc0sJxFdiJlMhTzFDKgBLo6iCyFRmQxuLeyUFmgQpGgRg2JSzQL3Lns887kow42bBE8XgkDbptqoqdaim6RS9OvXBI3dIS2OcukA_E1TOgR_se7cCiuM-__3Gm_Xrw',
    lidar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCxorYWNLKJWsjkok5-jDhLDItU9jOryDl4sO4LWApx3nj80-3NGhqdjikAprvVicIyAZOb4P6XVchBtqT4O6OAvJQdreYQsalEgtKW9FoMNbBygpRBBsIzgKWcvZ3OMoMf3NLJyFwXF-hHzOpXQVWsgy3xNueggzvGiTGgSFZAQaaJOeUb6nt1werwylTWFO0UsoavNCs9nJjZtJQ4kieyL6yNfzNzLZMx_yCbMBpXIQWAMNWchvESXQ',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-lg animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-5xl bg-[#090f16] border border-white/[0.2] rounded-lg shadow-2xl overflow-hidden flex flex-col video-modal-container keep-white"
        role="dialog"
        aria-modal="true"
      >
        {/* Top bar */}
        <div className="flex items-center justify-between px-6 py-3 bg-[#0e141c] border-b border-white/[0.08]">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
            <span className="font-mono-tech text-xs text-white uppercase font-bold tracking-wider">
              LIVE SIMULATION // 4K HDR AUTONOMOUS DRIFT
            </span>
            <span className="text-gray-600">|</span>
            <span className="font-mono-tech text-[10px] text-amber-400">
              CAM: {cameraView.toUpperCase()} // 60 FPS
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-gray-400 hover:text-white rounded bg-white/[0.05] hover:bg-white/[0.1] transition-colors"
            aria-label="Cerrar reproductor"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cinematic Viewport with Dynamic HUD */}
        <div className="relative w-full aspect-video bg-black overflow-hidden flex items-center justify-center">
          <img
            src={cameraImages[cameraView]}
            alt="Simulación de maquinaria minera en operación"
            className="w-full h-full object-cover brightness-90 contrast-110"
          />

          {/* HUD Overlay */}
          <div className="absolute inset-0 pointer-events-none p-4 sm:p-8 flex flex-col justify-between font-mono-tech text-xs">
            {/* Top HUD Row */}
            <div className="flex items-start justify-between">
              <div className="flex flex-col gap-1 bg-black/60 backdrop-blur-md p-2.5 rounded border border-white/[0.1]">
                <div className="flex items-center gap-2 text-cyan-400 font-bold">
                  <Radio className="w-3.5 h-3.5 animate-spin" />
                  <span>STARLINK LEO CARRIER LOCKED</span>
                </div>
                <div className="text-[10px] text-gray-300">
                  LATENCIA: 3.4ms | JITTER: 0.1ms
                </div>
                <div className="text-[10px] text-amber-400">
                  ELEVACIÓN: 4,120 MSNM (ANDES PERÚ)
                </div>
              </div>

              <div className="flex flex-col items-end gap-1 bg-black/60 backdrop-blur-md p-2.5 rounded border border-white/[0.1]">
                <div className="text-white font-bold">
                  REC 00:02:{hudSeconds < 10 ? `0${hudSeconds}` : hudSeconds}
                </div>
                <div className="text-emerald-400 text-[10px]">
                  BATERÍA/DIÉSEL: 78% (8.4H RESTANTES)
                </div>
                <div className="text-cyan-400 text-[10px]">
                  PAYLOAD: 394.2 TONELADAS
                </div>
              </div>
            </div>

            {/* Center Reticle & Artificial Horizon */}
            <div className="self-center flex flex-col items-center justify-center opacity-80">
              <div className="w-24 h-24 rounded-full border border-dashed border-cyan-400/50 flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              </div>
              <span className="text-[10px] text-cyan-300 mt-2 bg-black/50 px-2 py-0.5 rounded">
                AUTONOMOUS VECTOR LOCK 100%
              </span>
            </div>

            {/* Bottom HUD Bar */}
            <div className="flex items-end justify-between">
              <div className="flex items-center gap-3 bg-black/60 backdrop-blur-md p-2.5 rounded border border-white/[0.1]">
                <div>
                  <span className="text-gray-400 text-[9px] block uppercase">Velocidad Rampa</span>
                  <span className="text-amber-400 font-bold text-base">{simSpeed} KM/H</span>
                </div>
                <div className="h-6 w-px bg-white/20" />
                <div>
                  <span className="text-gray-400 text-[9px] block uppercase">P. Hidráulica</span>
                  <span className="text-white font-bold text-base">215 BAR</span>
                </div>
                <div className="h-6 w-px bg-white/20" />
                <div>
                  <span className="text-gray-400 text-[9px] block uppercase">Obstáculos 300m</span>
                  <span className="text-emerald-400 font-bold text-base">VÍA DESPEJADA</span>
                </div>
              </div>

              <div className="text-right text-[10px] text-gray-400 bg-black/60 px-2 py-1 rounded">
                ALGORITMO DE ENJAMBRE HAKIM FLEET OS™
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Playback & Camera Controls */}
        <div className="p-4 bg-[#0e141c] border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-2.5 bg-[#ffb800] hover:bg-[#ffc933] text-black rounded font-bold transition-colors"
              title={isPlaying ? 'Pausar' : 'Reproducir'}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-black" />}
            </button>
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="p-2.5 bg-[#1e2632] hover:bg-[#283242] text-gray-300 rounded transition-colors"
              title={isMuted ? 'Activar audio' : 'Silenciar'}
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-amber-400" />}
            </button>

            <span className="text-xs font-mono-tech text-gray-400 hidden sm:inline">
              {isPlaying ? 'Transmitiendo en tiempo real' : 'Simulación pausada'}
            </span>
          </div>

          {/* Camera View Switcher */}
          <div className="flex items-center gap-1.5 bg-[#161c24] p-1 rounded border border-white/[0.08] font-mono-tech text-xs">
            <button
              onClick={() => setCameraView('front')}
              className={`px-3 py-1 rounded transition-colors ${
                cameraView === 'front' ? 'bg-[#ffb800] text-black font-bold' : 'text-gray-400 hover:text-white'
              }`}
            >
              Cámara Frontal
            </button>
            <button
              onClick={() => setCameraView('chassis')}
              className={`px-3 py-1 rounded transition-colors ${
                cameraView === 'chassis' ? 'bg-[#ffb800] text-black font-bold' : 'text-gray-400 hover:text-white'
              }`}
            >
              Carguío Titan-X
            </button>
            <button
              onClick={() => setCameraView('lidar')}
              className={`px-3 py-1 rounded transition-colors ${
                cameraView === 'lidar' ? 'bg-[#ffb800] text-black font-bold' : 'text-gray-400 hover:text-white'
              }`}
            >
              Perforación Drill-Max
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
