import React, { useState } from 'react';
import { CurrencyProvider } from './context/CurrencyContext';
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

export const App: React.FC = () => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isVideoTourOpen, setIsVideoTourOpen] = useState(false);
  const [selectedCustomModules, setSelectedCustomModules] = useState<string[]>([]);

  return (
    <CurrencyProvider>
      <div className="min-h-screen bg-slate-950 text-slate-100 antialiased selection:bg-emerald-500 selection:text-slate-950">
        <Navbar onOpenBooking={() => setIsBookingOpen(true)} />

        <main>
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
    </CurrencyProvider>
  );
};

export default App;
