import React, { useState } from 'react';
import { Equipment, QuoteFormData } from '../types';
import { COMPANY_INFO } from '../data/miningData';
import { 
  X, 
  Send, 
  CheckCircle2, 
  ShieldCheck, 
  MessageSquare,
  Wrench,
  AlertTriangle,
  Loader2
} from 'lucide-react';

const API_URL = `${import.meta.env.BASE_URL}api/contacto.php`;

interface QuoteModalProps {
  initialEquipment?: Equipment | null;
  initialSector?: string;
  onClose: () => void;
}

export const QuoteModal: React.FC<QuoteModalProps> = ({
  initialEquipment,
  initialSector,
  onClose,
}) => {
  const [submittedTicket, setSubmittedTicket] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [formData, setFormData] = useState<QuoteFormData>({
    nombre: '',
    empresa: '',
    ruc: '',
    cargo: '',
    email: '',
    telefono: '',
    tipoRequerimiento: initialEquipment 
      ? `Cotización: ${initialEquipment.name} (${initialEquipment.series})`
      : initialSector || 'Overhaul Integral de Maquinaria',
    equipoOservicio: initialEquipment ? initialEquipment.name : '',
    unidadMinera: '',
    comentarios: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitError(null);
    setSubmitting(true);
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok || !data || data.status !== 'success') {
        throw new Error(data?.message || 'No se pudo enviar la solicitud.');
      }
      setSubmittedTicket(`RFQ-HKM-${Math.floor(1000 + Math.random() * 9000)}`);
    } catch (err) {
      setSubmitError(
        'No pudimos enviar su solicitud. Verifique su conexión o escríbanos por WhatsApp.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  const whatsappMessage = encodeURIComponent(
    `Hola Hakim Integral Service. He generado la solicitud de cotización ${submittedTicket || 'técnica'} para ${formData.empresa || 'mi empresa'} (${formData.tipoRequerimiento}). Por favor su asistencia comercial.`
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-3xl bg-[#121820] border border-white/[0.15] rounded-lg shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
        role="dialog"
        aria-modal="true"
      >
        {/* Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#0e141c] border-b border-white/[0.08]">
          <div className="flex items-center gap-3">
            <Wrench className="w-5 h-5 text-amber-400" />
            <span className="font-heading font-extrabold text-sm sm:text-base text-white uppercase tracking-wider">
              Solicitud de Cotización Técnica // Hakim Integral Service
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-gray-400 hover:text-white rounded bg-white/[0.05] hover:bg-white/[0.1] transition-colors"
            aria-label="Cerrar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1">
          {submittedTicket ? (
            <div className="flex flex-col items-center justify-center text-center py-8 gap-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="flex flex-col gap-1">
                <span className="font-mono-tech text-xs text-amber-400 uppercase tracking-widest font-bold">
                  EXPEDIENTE REGISTRADO EXITOSAMENTE
                </span>
                <h3 className="font-heading text-2xl font-extrabold text-white uppercase">
                  Ticket #{submittedTicket}
                </h3>
              </div>

              <p className="text-sm text-gray-300 max-w-md leading-relaxed">
                Hemos asignado su requerimiento para <strong>{formData.empresa || 'su compañía'}</strong> a un Ingeniero de Proyectos Senior de Hakim Integral Service S.A.C.
              </p>

              <div className="w-full max-w-md p-4 bg-[#0e141c] border border-white/[0.08] rounded text-left font-mono-tech text-xs text-gray-300 flex flex-col gap-2 my-2">
                <div className="flex justify-between border-b border-white/[0.06] pb-1.5">
                  <span className="text-gray-500">REQUERIMIENTO:</span>
                  <span className="text-amber-400 font-bold">{formData.tipoRequerimiento}</span>
                </div>
                <div className="flex justify-between border-b border-white/[0.06] pb-1.5">
                  <span className="text-gray-500">RESPUESTA:</span>
                  <span className="text-cyan-400 font-bold">Le contactaremos a la brevedad</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">ATENCIÓN PLANTA CHACLACAYO:</span>
                  <span className="text-gray-300">{COMPANY_INFO.phone}</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 pt-2 w-full max-w-md">
                <a
                  href={`${COMPANY_INFO.whatsappLink}?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-heading font-bold text-xs uppercase rounded flex items-center justify-center gap-2 transition-colors"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Conectar por WhatsApp Inmediato</span>
                </a>
                <button
                  onClick={onClose}
                  className="px-6 py-3 bg-[#1e2632] hover:bg-[#283242] text-gray-200 text-xs font-mono-tech uppercase rounded"
                >
                  Finalizar
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="p-3.5 bg-[#090f16] border border-amber-500/20 rounded flex items-center justify-between text-xs text-gray-300">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>
                    Atención a operaciones mineras en Perú. RUC: {COMPANY_INFO.ruc}
                  </span>
                </div>
                <span className="hidden sm:inline font-mono-tech text-[10px] text-cyan-400">
                  Respuesta ágil
                </span>
              </div>

              {/* Requirement Type Selector */}
              <div className="flex flex-col gap-1.5">
                <label className="font-mono-tech text-xs text-gray-300 uppercase">
                  Tipo de Requerimiento Técnico *
                </label>
                <select
                  required
                  value={formData.tipoRequerimiento}
                  onChange={(e) => setFormData({ ...formData, tipoRequerimiento: e.target.value })}
                  className="bg-[#090f16] border border-white/[0.1] text-white text-xs font-mono-tech px-3.5 py-2.5 rounded focus:border-amber-400 focus:outline-none"
                >
                  <option value="Mantenimiento, Reparación y Overhaul">Mantenimiento, Reparación y Overhaul de Equipos</option>
                  <option value="Fabricación de Equipos a Medida">Fabricación de Jumbos y Equipos a Medida</option>
                  <option value="Adquisición de Maquinaria">Adquisición / Cotización de Maquinaria</option>
                  <option value="Suministro de Repuestos">Suministro de Repuestos y Componentes</option>
                  <option value="Alquiler de Maquinaria">Alquiler de Maquinaria</option>
                  <option value="Tableros Eléctricos">Preparación y Reparación de Tableros Eléctricos</option>
                  <option value="Fabricación de Piezas Mecánicas">Fabricación de Piezas Mecánicas</option>
                  <option value="Asesoramiento y Capacitación">Asesoramiento y Capacitación</option>
                </select>
              </div>

              {/* Grid 2 cols: Empresa / RUC */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="font-mono-tech text-xs text-gray-300 uppercase">
                    Empresa Minera / Contratista *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. Minera Chinalco / Contratista Minero"
                    value={formData.empresa}
                    onChange={(e) => setFormData({ ...formData, empresa: e.target.value })}
                    className="bg-[#090f16] border border-white/[0.1] text-white text-xs px-3.5 py-2.5 rounded focus:border-amber-400 focus:outline-none"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="font-mono-tech text-xs text-gray-300 uppercase">
                    RUC de la Empresa (Perú)
                  </label>
                  <input
                    type="text"
                    maxLength={11}
                    placeholder="20XXXXXXXXX"
                    value={formData.ruc}
                    onChange={(e) => setFormData({ ...formData, ruc: e.target.value })}
                    className="bg-[#090f16] border border-white/[0.1] text-white text-xs font-mono-tech px-3.5 py-2.5 rounded focus:border-amber-400 focus:outline-none"
                  />
                </div>
              </div>

              {/* Grid 2 cols: Contacto / Cargo */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="font-mono-tech text-xs text-gray-300 uppercase">
                    Nombre & Apellidos *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ing. Carlos Mendoza"
                    value={formData.nombre}
                    onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                    className="bg-[#090f16] border border-white/[0.1] text-white text-xs px-3.5 py-2.5 rounded focus:border-amber-400 focus:outline-none"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="font-mono-tech text-xs text-gray-300 uppercase">
                    Cargo Operacional
                  </label>
                  <input
                    type="text"
                    placeholder="Superintendente de Mina / Mantenimiento"
                    value={formData.cargo}
                    onChange={(e) => setFormData({ ...formData, cargo: e.target.value })}
                    className="bg-[#090f16] border border-white/[0.1] text-white text-xs px-3.5 py-2.5 rounded focus:border-amber-400 focus:outline-none"
                  />
                </div>
              </div>

              {/* Grid 2 cols: Email / Telefono */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="font-mono-tech text-xs text-gray-300 uppercase">
                    Correo Corporativo *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="cmendoza@minera.pe"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="bg-[#090f16] border border-white/[0.1] text-white text-xs font-mono-tech px-3.5 py-2.5 rounded focus:border-amber-400 focus:outline-none"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="font-mono-tech text-xs text-gray-300 uppercase">
                    Teléfono Celular / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+51 987 654 321"
                    value={formData.telefono}
                    onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                    className="bg-[#090f16] border border-white/[0.1] text-white text-xs font-mono-tech px-3.5 py-2.5 rounded focus:border-amber-400 focus:outline-none"
                  />
                </div>
              </div>

              {/* Unidad Minera / Ubicacion */}
              <div className="flex flex-col gap-1.5">
                <label className="font-mono-tech text-xs text-gray-300 uppercase">
                  Unidad Minera / Ubicación Geográfica & Altitud
                </label>
                <input
                  type="text"
                  placeholder="Ej. U.M. Yauli, Junín (4,300 msnm) o Mina Cerro Verde, Arequipa"
                  value={formData.unidadMinera}
                  onChange={(e) => setFormData({ ...formData, unidadMinera: e.target.value })}
                  className="bg-[#090f16] border border-white/[0.1] text-white text-xs px-3.5 py-2.5 rounded focus:border-amber-400 focus:outline-none"
                />
              </div>

              {/* Comentarios Técnicos */}
              <div className="flex flex-col gap-1.5">
                <label className="font-mono-tech text-xs text-gray-300 uppercase">
                  Detalles del Requerimiento / Código de Parte / Horas de Operación
                </label>
                <textarea
                  rows={3}
                  placeholder="Indique modelo de equipo (ej. Sandvik LH307, Jumbo Boomer S1D), síntomas mecánicos o especificaciones deseadas..."
                  value={formData.comentarios}
                  onChange={(e) => setFormData({ ...formData, comentarios: e.target.value })}
                  className="bg-[#090f16] border border-white/[0.1] text-white text-xs px-3.5 py-2.5 rounded focus:border-amber-400 focus:outline-none resize-none"
                />
              </div>

              {/* Error Banner */}
              {submitError && (
                <div className="flex items-start gap-2.5 p-3.5 bg-red-500/10 border border-red-500/30 rounded text-xs text-red-200">
                  <AlertTriangle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  <span>{submitError}</span>
                </div>
              )}

              {/* Submit Row */}
              <div className="flex items-center justify-between pt-2 border-t border-white/[0.08]">
                <div className="text-[11px] font-mono-tech text-gray-500">
                  Sus datos se usan solo para atender su requerimiento
                </div>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2.5 text-xs font-mono-tech uppercase text-gray-400 hover:text-white"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-6 py-2.5 bg-[#ffb800] hover:bg-[#ffc933] disabled:opacity-60 disabled:cursor-not-allowed text-[#1a1200] font-heading font-extrabold text-xs uppercase tracking-wider rounded flex items-center gap-2 shadow-[0_0_20px_rgba(255,184,0,0.3)] transition-all"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 text-black animate-spin" />
                        <span>Enviando...</span>
                      </>
                    ) : (
                      <>
                        <span>Enviar Requerimiento</span>
                        <Send className="w-3.5 h-3.5 text-black" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
