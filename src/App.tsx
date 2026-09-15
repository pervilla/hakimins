import React, { useState } from 'react';
import { ScreenView, Equipment } from './types';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { ImpactStats } from './components/ImpactStats';
import { EquipmentCatalog } from './components/EquipmentCatalog';
import { NeuralFleetSection } from './components/NeuralFleetSection';
import { SustainabilitySection } from './components/SustainabilitySection';
import { Footer } from './components/Footer';
import { EquipmentDetailModal } from './components/EquipmentDetailModal';
import { QuoteModal } from './components/QuoteModal';
import { DemoVideoModal } from './components/DemoVideoModal';
import { ServicesView } from './components/ServicesView';
import { SparePartsView } from './components/SparePartsView';
import { FleetTelemetryView } from './components/FleetTelemetryView';
import { CorporateView } from './components/CorporateView';

export function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenView>('inicio');
  const [selectedEquipment, setSelectedEquipment] = useState<Equipment | null>(null);
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [quotePrefillEquipment, setQuotePrefillEquipment] = useState<Equipment | null>(null);
  const [quotePrefillSector, setQuotePrefillSector] = useState<string | undefined>(undefined);
  const [demoModalOpen, setDemoModalOpen] = useState(false);

  const handleNavigate = (screen: ScreenView) => {
    setCurrentScreen(screen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
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

  return (
    <div className="min-h-screen flex flex-col bg-[#090f16] text-[#dde3ee] font-sans theme-root">
      {/* Sticky Universal Header */}
      <Header
        currentScreen={currentScreen}
        onNavigate={handleNavigate}
        onOpenQuote={() => handleOpenQuote()}
      />

      {/* Main View Router */}
      <main className="flex-1 w-full">
        {currentScreen === 'inicio' && (
          <>
            <HeroSection
              onExploreCatalog={() => {
                const el = document.getElementById('catalogo');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
                else handleNavigate('maquinaria');
              }}
              onOpenDemo={() => setDemoModalOpen(true)}
            />
            <ImpactStats />
            <EquipmentCatalog
              onSelectEquipment={(eq) => setSelectedEquipment(eq)}
              onOpenQuoteWithEquipment={handleOpenQuoteWithEquipment}
            />
            <NeuralFleetSection
              onOpenFullTelemetry={() => handleNavigate('telemetria')}
            />
            <SustainabilitySection />
          </>
        )}

        {currentScreen === 'maquinaria' && (
          <div className="pt-8">
            <EquipmentCatalog
              onSelectEquipment={(eq) => setSelectedEquipment(eq)}
              onOpenQuoteWithEquipment={handleOpenQuoteWithEquipment}
            />
          </div>
        )}

        {currentScreen === 'servicios' && (
          <ServicesView
            onOpenQuoteWithService={handleOpenQuoteWithService}
          />
        )}

        {currentScreen === 'repuestos' && (
          <SparePartsView
            onOpenQuoteWithPart={handleOpenQuoteWithPart}
          />
        )}

        {currentScreen === 'telemetria' && (
          <FleetTelemetryView />
        )}

        {currentScreen === 'corporativo' && (
          <CorporateView
            onOpenQuote={() => handleOpenQuote()}
          />
        )}
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

      {/* 4K Autonomous Machinery Simulation Modal */}
      {demoModalOpen && (
        <DemoVideoModal
          onClose={() => setDemoModalOpen(false)}
        />
      )}
    </div>
  );
}

export default App;
