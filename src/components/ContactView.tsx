import React from 'react';
import { COMPANY_INFO } from '../data/miningData';
import {
  MapPin,
  Phone,
  Mail,
  Globe,
  MessageSquare,
  Clock,
  Wrench,
  Facebook
} from 'lucide-react';

interface ContactViewProps {
  onOpenQuote: () => void;
}

export const ContactView: React.FC<ContactViewProps> = ({ onOpenQuote }) => {
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(COMPANY_INFO.address)}&output=embed`;

  const contactItems = [
    {
      icon: MapPin,
      label: 'Dirección',
      value: COMPANY_INFO.address,
      href: 'https://maps.app.goo.gl/E15WnJ9Avp9doycD8',
    },
    {
      icon: Phone,
      label: 'Teléfonos',
      value: `${COMPANY_INFO.phone} | ${COMPANY_INFO.phoneSecondary}`,
      href: `tel:${COMPANY_INFO.phone.replace(/\s/g, '')}`,
    },
    {
      icon: Mail,
      label: 'Correo',
      value: COMPANY_INFO.emailSales,
      href: `mailto:${COMPANY_INFO.emailSales}`,
    },
    {
      icon: Globe,
      label: 'Sitio web',
      value: 'hakimins.com.pe',
      href: COMPANY_INFO.website,
    },
  ];

  return (
    <div className="w-full bg-[#090f16] pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 flex flex-col gap-12">

        {/* Banner */}
        <div className="flex flex-col gap-3 border-b border-white/[0.08] pb-8">
          <div className="flex items-center gap-2 font-mono-tech text-xs text-amber-400 uppercase tracking-widest font-semibold">
            <MessageSquare className="w-4 h-4" />
            <span>Contáctenos // Planta Chaclacayo, Lima</span>
          </div>
          <h1 className="font-heading text-3xl sm:text-5xl text-white font-extrabold uppercase tracking-tight">
            Póngase en Contacto
          </h1>
          <p className="text-sm sm:text-base text-gray-300 max-w-3xl leading-relaxed">
            Cuéntenos qué equipo necesita, ya sea fabricación, mantenimiento, overhaul, repuestos, alquiler o capacitación, y le responderemos con una propuesta.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* Contact Info */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {contactItems.map((item, idx) => {
              const Icon = item.icon;
              return (
                <a
                  key={idx}
                  href={item.href}
                  target={item.href.startsWith('http') ? '_blank' : undefined}
                  rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="flex items-start gap-4 p-5 bg-[#121820] border border-white/[0.08] rounded-lg hover:border-amber-500/40 transition-colors group"
                >
                  <div className="p-2.5 bg-amber-500/10 text-amber-400 rounded border border-amber-500/20 shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="font-mono-tech text-[10px] text-gray-500 uppercase tracking-wider">
                      {item.label}
                    </span>
                    <span className="text-sm text-gray-200 group-hover:text-amber-300 transition-colors">
                      {item.value}
                    </span>
                  </div>
                </a>
              );
            })}

            <div className="flex items-center gap-2 p-5 bg-[#121820] border border-white/[0.08] rounded-lg">
              <Clock className="w-4 h-4 text-cyan-400 shrink-0" />
              <span className="text-xs text-gray-300">{COMPANY_INFO.hours}</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a
                href={COMPANY_INFO.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-heading font-bold text-xs uppercase tracking-wider rounded transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp</span>
              </a>
              <a
                href={COMPANY_INFO.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-3.5 bg-[#1877f2] hover:bg-[#3b8bf5] text-white font-heading font-bold text-xs uppercase tracking-wider rounded transition-colors"
              >
                <Facebook className="w-4 h-4" />
                <span>Facebook</span>
              </a>
            </div>

            <button
              onClick={onOpenQuote}
              className="flex items-center justify-center gap-2 py-4 bg-[#ffb800] hover:bg-[#ffc933] text-[#1a1200] font-heading font-extrabold text-sm uppercase tracking-wider rounded transition-all shadow-[0_0_20px_rgba(255,184,0,0.3)]"
            >
              <Wrench className="w-4 h-4 text-[#1a1200]" />
              <span>Solicitar Cotización</span>
            </button>
          </div>

          {/* Map */}
          <div className="lg:col-span-7 bg-[#121820] border border-white/[0.08] rounded-lg overflow-hidden min-h-[420px] flex">
            <iframe
              title="Ubicación de Hakim Integral Service S.A.C."
              src={mapSrc}
              className="w-full h-full min-h-[420px] border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

        </div>

      </div>
    </div>
  );
};
