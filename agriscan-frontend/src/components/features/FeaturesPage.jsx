import React, { useEffect } from 'react';
import { Camera, CloudSun, MapPin, Sparkles } from 'lucide-react';
import CropScanFeatureCard from './CropScanFeatureCard';
import WeatherForecastFeatureCard from './WeatherForecastFeatureCard';
import GeospatialUPMapFeatureCard from './GeospatialUPMapFeatureCard';
import Footer from '../Footer';
import { useLanguage } from '../../context/LanguageContext';

export default function FeaturesPage({ onNavigate, onOpenScan }) {
  const { t } = useLanguage();
  // Scroll to top upon load or anchor target
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-full flex flex-col font-sans selection:bg-green-100 selection:text-green-900 bg-[#fcfdfa] text-gray-900">
      
      {/* Quick-Jump Section Anchor Bar (Secondary Utility Bar) */}
      <div className="bg-white/95 backdrop-blur-md border-b border-green-100 py-3 sticky top-20 z-30 shadow-xs">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-3 overflow-x-auto">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-gray-600 uppercase tracking-wider hidden sm:inline">
              Sections:
            </span>
            <button
              onClick={() => scrollToSection('scan')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-gray-700 hover:text-[#257038] bg-green-50 hover:bg-green-100 transition-all cursor-pointer whitespace-nowrap"
            >
              <Camera className="w-3.5 h-3.5 text-[#257038]" />
              <span>1. Crop Scan</span>
            </button>
            <button
              onClick={() => scrollToSection('weather')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-gray-700 hover:text-[#257038] bg-amber-50 hover:bg-amber-100 transition-all cursor-pointer whitespace-nowrap"
            >
              <CloudSun className="w-3.5 h-3.5 text-amber-600" />
              <span>2. Weather Forecast</span>
            </button>
            <button
              onClick={() => scrollToSection('surveillance')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-gray-700 hover:text-[#257038] bg-red-50 hover:bg-red-100 transition-all cursor-pointer whitespace-nowrap"
            >
              <MapPin className="w-3.5 h-3.5 text-red-600" />
              <span>3. Maharashtra Disease Radar</span>
            </button>
          </div>

          <div className="text-[11px] font-bold text-[#257038] uppercase tracking-wide hidden md:block font-mono">
            Kisan Rakshak Precision Suite
          </div>
        </div>
      </div>

      {/* Main Content Area over Seamless Botanical Doodle Pattern matching Home Page */}
      <div className="relative overflow-hidden pt-4 pb-6">
        {/* Seamless botanical doodle wallpaper */}
        <div 
          className="absolute inset-0 opacity-80 pointer-events-none"
          style={{
            backgroundImage: 'url(/assets/doodle_bg_clean.png)',
            backgroundRepeat: 'repeat',
            backgroundPosition: 'top left',
            backgroundSize: '240px auto'
          }}
        />

        <div className="relative z-10 space-y-10">
          
          {/* Header Banner */}
          <section className="pt-6 pb-2 text-center space-y-3 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/90 border border-emerald-200 text-[#1b5e20] text-xs font-bold uppercase tracking-wider shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#257038]" />
              <span>{t('fp_suite')}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#11291c] font-display uppercase tracking-tight drop-shadow-2xs">
              Kisan Rakshak Platform Features
            </h1>
            <p className="text-sm sm:text-base text-gray-700 max-w-2xl mx-auto leading-relaxed font-medium">
              {t('fp_subtitle')}
            </p>
          </section>

          {/* Main Container: 3 Core Feature Cards Stacked from Top to Bottom */}
          <div className="max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            
            {/* Card 1: Crop Scan */}
            <CropScanFeatureCard />

            {/* Card 2: Weather Forecast (Mon-Sun graph) */}
            <WeatherForecastFeatureCard />

            {/* Card 3: Geospatial Surveillance Hotspot Map (Bright Radar View) */}
            <GeospatialUPMapFeatureCard />

          </div>

          {/* Clean Footer */}
          <div className="mt-16 pt-6 border-t border-gray-200">
            <Footer onOpenScan={onOpenScan} />
          </div>

        </div>
      </div>

    </div>
  );
}
