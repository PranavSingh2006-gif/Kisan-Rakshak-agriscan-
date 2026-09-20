import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import HowItWorksCard from './components/HowItWorksCard';
import Footer from './components/Footer';
import ScanModal from './components/modals/ScanModal';
import FeaturesPage from './components/features/FeaturesPage';
import AIAssistantPage from './components/assistant/AIAssistantPage';
import FarmersDashboardPage from './components/dashboard/FarmersDashboardPage';

export default function App() {
  const [scanModalOpen, setScanModalOpen] = useState(false);
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handleLocationChange = () => setCurrentPath(window.location.pathname);
    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  const navigateTo = (path) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isFeaturesPage =
    currentPath === '/features' ||
    currentPath.startsWith('/features') ||
    window.location.hash === '#features' ||
    window.location.search.includes('features');

  const isDashboardPage =
    currentPath === '/dashboard' ||
    currentPath.startsWith('/dashboard') ||
    window.location.hash === '#dashboard';

  const isAssistantPage =
    currentPath === '/assistant' ||
    currentPath.startsWith('/assistant') ||
    window.location.hash === '#assistant';

  const [scanModalPlot, setScanModalPlot] = useState(null);

  const handleOpenScan = (plot = null) => {
    setScanModalPlot(plot);
    setScanModalOpen(true);
  };
  const handleCloseScan = () => {
    setScanModalOpen(false);
    setScanModalPlot(null);
  };
  const handleWatchDemo = () => handleOpenScan(null);
  const handleSelectBenefit = () => handleOpenScan(null);

  return (
    <div className="min-h-screen bg-[#fcfdfa] text-gray-900 flex flex-col font-sans selection:bg-green-100 selection:text-green-900">
      <Navbar onOpenScan={handleOpenScan} onNavigate={navigateTo} currentPath={currentPath} />
      <main className="flex-1 flex flex-col">
        {isFeaturesPage ? (
          <FeaturesPage onNavigate={navigateTo} onOpenScan={handleOpenScan} />
        ) : isDashboardPage ? (
          <FarmersDashboardPage onNavigate={navigateTo} onOpenScan={handleOpenScan} />
        ) : isAssistantPage ? (
          <AIAssistantPage onOpenScan={handleOpenScan} onNavigate={navigateTo} />
        ) : (
          <>
            <Hero onOpenScan={handleOpenScan} onOpenDemo={handleWatchDemo} />
            <div className="relative overflow-hidden pt-4 pb-6">
              <div
                className="absolute inset-0 opacity-80 pointer-events-none"
                style={{ backgroundImage: 'url(/assets/doodle_bg_clean.png)', backgroundRepeat: 'repeat', backgroundPosition: 'top left', backgroundSize: '240px auto' }}
              />
              <div className="relative z-10">
                <HowItWorksCard onOpenScan={handleOpenScan} onSelectBenefit={handleSelectBenefit} />
                <Footer onOpenScan={handleOpenScan} />
              </div>
            </div>
          </>
        )}
      </main>
      {scanModalOpen && <ScanModal isOpen={scanModalOpen} onClose={handleCloseScan} initialPlot={scanModalPlot} />}
    </div>
  );
}
