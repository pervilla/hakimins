import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { ScreenView, Equipment } from './types';
import { useSeo } from './hooks/useSeo';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { ImpactStats } from './components/ImpactStats';
import { EquipmentCatalog } from './components/EquipmentCatalog';
import { LaborSelector } from './components/LaborSelector';
import { SustainabilitySection } from './components/SustainabilitySection';
import { Footer } from './components/Footer';
import { EquipmentDetailModal } from './components/EquipmentDetailModal';
import { QuoteModal } from './components/QuoteModal';
import { ServicesView } from './components/ServicesView';
import { SparePartsView } from './components/SparePartsView';
import { CorporateView } from './components/CorporateView';
import { ContactView } from './components/ContactView';

const BASENAME = import.meta.env.BASE_URL.replace(/\/$/, '') || '/';

const SCREEN_PATHS: Record<ScreenView, string> = {
  inicio: '/',
  maquinaria: '/equipos',
  servicios: '/servicios',
  repuestos: '/repuestos',
  corporativo: '/nosotros',
  contacto: '/contacto',
};

const SEO: Record<string, { title: string; description: string; path: string }> = {
  '/': {
    title: 'Hakim Integral Service S.A.C. | Maquinaria y Servicio Técnico para Minería Subterránea',
    description: 'Fabricación, mantenimiento, reparación y overhaul de equipos para la minería subterránea de pequeña y mediana escala: jumbos electrohidráulicos, scoops, dumpers, scalers, sondaje diamantino y repuestos.',
    path: '/',
  },
  '/equipos': {
    title: 'Equipos y Maquinaria Minera | Hakim Integral Service',
    description: 'Jumbos frontoneros y empernadores, desatadores de rocas, scoops LHD, dumpers y equipos de sondaje diamantino para minería subterránea de pequeña y mediana escala.',
    path: '/equipos',
  },
  '/servicios': {
    title: 'Mantenimiento, Overhaul y Servicios Mineros | Hakim Integral Service',
    description: 'Mantenimiento, reparación y overhaul de equipos mineros, fabricación a medida, aceros de perforación, repuestos, alquiler, tableros eléctricos, piezas mecánicas y capacitación.',
    path: '/servicios',
  },
  '/repuestos': {
    title: 'Repuestos y Componentes Mineros | Hakim Integral Service',
    description: 'Venta y suministro de repuestos y componentes para maquinaria de minería y construcción: hidráulica, perforación, transmisión, sellos y componentes eléctricos.',
    path: '/repuestos',
  },
  '/nosotros': {
    title: 'Nosotros | Hakim Integral Service S.A.C.',
    description: 'Empresa peruana dedicada a la fabricación, mantenimiento, reparación y overhaul de equipos para la minería subterránea de pequeña y mediana escala. Conoce nuestra trayectoria.',
    path: '/nosotros',
  },
  '/contacto': {
    title: 'Contacto | Hakim Integral Service S.A.C.',
    description: 'Contáctenos para cotizar maquinaria, repuestos, mantenimiento, overhaul o alquiler de equipos para minería subterránea. Planta en Chaclacayo, Lima.',
    path: '/contacto',
  },
};

const SeoManager: React.FC = () => {
  const { pathname } = useLocation();
  const seo = SEO[pathname] ?? SEO['/'];
  useSeo(seo.title, seo.description, seo.path);
  return null;
};

const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);
  return null;
};

const AppShell: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [selectedEquipment, setSelectedEquipment] = useState<Equipment | null>(null);
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [quotePrefillEquipment, setQuotePrefillEquipment] = useState<Equipment | null>(null);
  const [quotePrefillSector, setQuotePrefillSector] = useState<string | undefined>(undefined);

  const pathToScreen = (pathname: string): ScreenView => {
    const entry = (Object.entries(SCREEN_PATHS) as [ScreenView, string][]).find(([, p]) => p === pathname);
    return entry ? entry[0] : 'inicio';
  };

  const handleNavigate = (screen: ScreenView) => {
    navigate(SCREEN_PATHS[screen]);
  };

  const handleOpenQuote = (sector?: string) => {
    setQuotePrefillEquipment(null);
    setQuotePrefillSector(sector);
    setQuoteModalOpen(true);
  };

  const handleOpenQuoteWithEquipment = (equipment: Equipment) => {
    setQuotePrefillEquipment(equipment);
    setQuotePrefillSector(undefined);
    setQuoteModalOpen(true);
  };

  const handleOpenQuoteWithService = (serviceName: string) => {
    setQuotePrefillEquipment(null);
    setQuotePrefillSector(`Servicio: ${serviceName}`);
    setQuoteModalOpen(true);
  };

  const handleOpenQuoteWithPart = (partName: string) => {
    setQuotePrefillEquipment(null);
    setQuotePrefillSector(`Repuesto: ${partName}`);
    setQuoteModalOpen(true);
  };

  const catalogProps = {
    onSelectEquipment: (eq: Equipment) => setSelectedEquipment(eq),
    onOpenQuoteWithEquipment: handleOpenQuoteWithEquipment,
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#090f16] text-[#dde3ee] font-sans theme-root">
      <SeoManager />
      <ScrollToTop />

      {/* Sticky Universal Header */}
      <Header
        currentScreen={pathToScreen(location.pathname)}
        onNavigate={handleNavigate}
        onOpenQuote={() => handleOpenQuote()}
      />

      {/* Main View Router */}
      <main className="flex-1 w-full">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <HeroSection
                  onExploreCatalog={() => {
                    const el = document.getElementById('catalogo');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                    else navigate('/equipos');
                  }}
                />
                <ImpactStats />
                <LaborSelector {...catalogProps} />
                <EquipmentCatalog {...catalogProps} />
                <SustainabilitySection />
              </>
            }
          />

          <Route
            path="/equipos"
            element={
              <div className="pt-8">
                <LaborSelector {...catalogProps} />
                <EquipmentCatalog {...catalogProps} />
              </div>
            }
          />

          <Route
            path="/servicios"
            element={<ServicesView onOpenQuoteWithService={handleOpenQuoteWithService} />}
          />

          <Route
            path="/repuestos"
            element={<SparePartsView onOpenQuoteWithPart={handleOpenQuoteWithPart} />}
          />

          <Route
            path="/nosotros"
            element={<CorporateView onOpenQuote={() => handleOpenQuote()} />}
          />

          <Route
            path="/contacto"
            element={<ContactView onOpenQuote={() => handleOpenQuote()} />}
          />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* Industrial Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenQuote={(sector) => handleOpenQuote(sector)}
      />

      {/* Technical Detail Sheet Modal */}
      {selectedEquipment && (
        <EquipmentDetailModal
          equipment={selectedEquipment}
          onClose={() => setSelectedEquipment(null)}
          onOpenQuote={handleOpenQuoteWithEquipment}
        />
      )}

      {/* RFQ Technical Quote Modal */}
      {quoteModalOpen && (
        <QuoteModal
          initialEquipment={quotePrefillEquipment}
          initialSector={quotePrefillSector}
          onClose={() => {
            setQuoteModalOpen(false);
            setQuotePrefillEquipment(null);
            setQuotePrefillSector(undefined);
          }}
        />
      )}
    </div>
  );
};

export function App() {
  return (
    <BrowserRouter basename={BASENAME}>
      <AppShell />
    </BrowserRouter>
  );
}

export default App;
