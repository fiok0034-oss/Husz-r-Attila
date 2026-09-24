/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { IntroScreen } from './components/IntroScreen';
import { InteractiveOccultScene } from './components/InteractiveOccultScene';
import { ParticleBackground } from './components/ParticleBackground';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ServiceGrid } from './components/ServiceGrid';
import { RitualGenerator } from './components/RitualGenerator';
import { DarknessSlider } from './components/DarknessSlider';
import { ParanormalRadar } from './components/ParanormalRadar';
import { DiagnosticTest } from './components/DiagnosticTest';
import { CustomerPortal } from './components/CustomerPortal';
import { AboutSection } from './components/AboutSection';
import { Testimonials } from './components/Testimonials';
import { Footer } from './components/Footer';
import { ToastSystem } from './components/ToastSystem';
import { ShadowEntity } from './components/ShadowEntity';
import { EmergencyModal } from './components/EmergencyModal';
import { SealGeneratorModal } from './components/SealGeneratorModal';
import { ApartmentHeatmapModal } from './components/ApartmentHeatmapModal';
import { SecretMenuModal } from './components/SecretMenuModal';
import { OrderModal } from './components/OrderModal';
import { BureaucraticCase, ServiceItem } from './types';
import { INITIAL_CASES, SERVICES } from './utils/constants';
import { occultAudio } from './utils/audio';

export default function App() {
  const [hasEntered, setHasEntered] = useState(false);
  const [effectsEnabled, setEffectsEnabled] = useState(true);
  const [darknessLevel, setDarknessLevel] = useState(666);
  const [cases, setCases] = useState<BureaucraticCase[]>(INITIAL_CASES);

  // Modals state
  const [isEmergencyOpen, setIsEmergencyOpen] = useState(false);
  const [isSealModalOpen, setIsSealModalOpen] = useState(false);
  const [isHeatmapModalOpen, setIsHeatmapModalOpen] = useState(false);
  const [isSecretMenuOpen, setIsSecretMenuOpen] = useState(false);
  const [secretClickCount, setSecretClickCount] = useState(0);

  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  const handleSecretClick = () => {
    const nextCount = secretClickCount + 1;
    setSecretClickCount(nextCount);
    occultAudio.playGlitchSound();

    if (nextCount >= 6) {
      setIsSecretMenuOpen(true);
      setSecretClickCount(0);
    }
  };

  const handleOpenOrder = (service: ServiceItem) => {
    setSelectedService(service);
    setIsOrderModalOpen(true);
  };

  const handleOrderSuccess = (newCase: BureaucraticCase) => {
    setCases((prev) => [newCase, ...prev]);
  };

  const handleScrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-transparent text-[#e5e2db] relative overflow-x-hidden selection:bg-[#8b0000] selection:text-white">
      {/* Intro Terminal Screen on initial load */}
      {!hasEntered && <IntroScreen onEnter={() => setHasEntered(true)} />}

      {/* Master Cinematic Underground Occult Temple Scene with Parallax */}
      <InteractiveOccultScene
        effectsEnabled={effectsEnabled}
        darknessLevel={darknessLevel}
      />

      {/* Particle & Ambient Atmosphere Canvas */}
      <ParticleBackground
        effectsEnabled={effectsEnabled}
        darknessLevel={darknessLevel}
      />

      {/* Interactive Shadow Entity */}
      <ShadowEntity effectsEnabled={effectsEnabled} />

      {/* Toast Notification System */}
      <ToastSystem effectsEnabled={effectsEnabled} />

      {/* Top Bar Navigation */}
      <Navbar
        onOpenEmergency={() => setIsEmergencyOpen(true)}
        effectsEnabled={effectsEnabled}
        onToggleEffects={() => setEffectsEnabled(!effectsEnabled)}
        onSecretTrigger={() => setIsSecretMenuOpen(true)}
        secretClickCount={secretClickCount}
      />

      {/* Hero Section */}
      <Hero
        onOpenRituals={() => handleScrollToSection('ritualegenerator')}
        onOpenDiagnostic={() => handleScrollToSection('diagnosztika')}
        onSecretClick={handleSecretClick}
        secretCount={secretClickCount}
      />

      {/* Services Grid */}
      <ServiceGrid
        onOrder={handleOpenOrder}
        onOpenSealModal={() => setIsSealModalOpen(true)}
        onOpenHeatmapModal={() => setIsHeatmapModalOpen(true)}
        onOpenDiagnosticModal={() => handleScrollToSection('diagnosztika')}
      />

      {/* Interactive Ritual Generator */}
      <RitualGenerator />

      {/* Huge Darkness Level Slider */}
      <DarknessSlider
        darknessLevel={darknessLevel}
        onDarknessChange={setDarknessLevel}
      />

      {/* Paranormal Radar Scanner */}
      <ParanormalRadar />

      {/* Diagnostic Assessment Survey */}
      <DiagnosticTest
        onOrderMiAFranc={() => {
          const miAFranc = SERVICES.find((s) => s.id === 'mi-a-franc') || SERVICES[0];
          handleOpenOrder(miAFranc);
        }}
      />

      {/* Sötét Ügyfélkapu (Bureaucratic Portal) */}
      <CustomerPortal cases={cases} />

      {/* Testimonials Wall */}
      <Testimonials />

      {/* Attila Biography & Stats */}
      <AboutSection />

      {/* Legal & Administrative Footer */}
      <Footer />

      {/* Emergency Floating Modal */}
      <EmergencyModal
        isOpen={isEmergencyOpen}
        onClose={() => setIsEmergencyOpen(false)}
        onStartInvestigation={() => handleScrollToSection('diagnosztika')}
      />

      {/* Personal Seal Generator Modal */}
      <SealGeneratorModal
        isOpen={isSealModalOpen}
        onClose={() => setIsSealModalOpen(false)}
      />

      {/* Apartment Heatmap Modal */}
      <ApartmentHeatmapModal
        isOpen={isHeatmapModalOpen}
        onClose={() => setIsHeatmapModalOpen(false)}
      />

      {/* Secret Forbidden Menu Modal */}
      <SecretMenuModal
        isOpen={isSecretMenuOpen}
        onClose={() => setIsSecretMenuOpen(false)}
      />

      {/* Order & Checkout Modal */}
      <OrderModal
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
        selectedService={selectedService}
        onOrderSuccess={handleOrderSuccess}
      />
    </div>
  );
}
