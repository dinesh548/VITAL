import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { HeroSection } from '@/components/sections/HeroSection';
import { ServicesSection } from '@/components/sections/ServicesSection';
import { PatientPortal } from '@/components/portals/PatientPortal';
import { DoctorPortal } from '@/components/portals/DoctorPortal';
import { MedicineChecker } from '@/components/medicine/MedicineChecker';
import { Footer } from '@/components/layout/Footer';

const Index = () => {
  const [currentView, setCurrentView] = useState<'home' | 'patient' | 'doctor' | 'medicine'>('home');

  const renderContent = () => {
    switch (currentView) {
      case 'patient':
        return <PatientPortal />;
      case 'doctor':
        return <DoctorPortal />;
      case 'medicine':
        return <MedicineChecker />;
      default:
        return (
          <>
            <HeroSection onNavigate={setCurrentView} />
            <ServicesSection onNavigate={setCurrentView} />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header currentView={currentView} onNavigate={setCurrentView} />
      <main>
        {renderContent()}
      </main>
      <Footer />
    </div>
  );
};

export default Index;