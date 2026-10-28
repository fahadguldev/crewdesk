import React, { useState } from 'react';
import { CurrencyProvider } from './context/CurrencyContext';
import { useSmoothScroll } from './hooks/useSmoothScroll';
import { Navbar } from './components/layout/Navbar';
import { HeroSection } from './components/sections/HeroSection';
import { PainVsGainSection } from './components/sections/PainVsGainSection';
import { ModulesShowcase } from './components/sections/ModulesShowcase';
import { CustomModuleBuilder } from './components/sections/CustomModuleBuilder';
import { RoleDashboards } from './components/sections/RoleDashboards';
import { InteractivePricing } from './components/sections/InteractivePricing';
import { SecurityGuarantee } from './components/sections/SecurityGuarantee';
import { OnboardingRoadmap } from './components/sections/OnboardingRoadmap';
import { FaqSection } from './components/sections/FaqSection';
import { ConversionCta } from './components/sections/ConversionCta';
import { Footer } from './components/layout/Footer';
import { BookingModal } from './components/modals/BookingModal';
import { VideoTourModal } from './components/modals/VideoTourModal';

export const AppContent: React.FC = () => {
  useSmoothScroll();

  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isVideoTourOpen, setIsVideoTourOpen] = useState(false);
  const [selectedCustomModules, setSelectedCustomModules] = useState<string[]>([]);

  return (
    <div className="min-h-screen bg-[#0B1020] text-slate-100 antialiased selection:bg-emerald-500 selection:text-slate-950 overflow-x-hidden">
      <Navbar onOpenBooking={() => setIsBookingOpen(true)} />

      <main className="bg-[#0B1020]">
        <HeroSection
          onOpenBooking={() => setIsBookingOpen(true)}
          onOpenVideoTour={() => setIsVideoTourOpen(true)}
        />

        <PainVsGainSection />

        <ModulesShowcase />

        <CustomModuleBuilder
          onSelectModulesForWalkthrough={(modules) => {
            setSelectedCustomModules(modules);
            setIsBookingOpen(true);
          }}
        />

        <RoleDashboards />

        <InteractivePricing onOpenBooking={() => setIsBookingOpen(true)} />

        <SecurityGuarantee />

        <OnboardingRoadmap />

        <FaqSection />

        <ConversionCta initialModules={selectedCustomModules} />
      </main>

      <Footer />

      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
      />

      <VideoTourModal
        isOpen={isVideoTourOpen}
        onClose={() => setIsVideoTourOpen(false)}
      />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <CurrencyProvider>
      <AppContent />
    </CurrencyProvider>
  );
};

export default App;
