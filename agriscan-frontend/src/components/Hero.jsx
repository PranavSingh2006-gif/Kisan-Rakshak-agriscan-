import React from 'react';
import { Camera, Play, Sparkles, CheckCircle2, ShieldCheck, Zap, Activity, CloudSun } from 'lucide-react';

export default function Hero({ onOpenScan, onOpenDemo }) {
  return (
    <section id="home" className="relative pt-6 pb-20 md:pt-10 md:pb-28 overflow-hidden">
      
      {/* Soft sunny farm gradient background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#f2f8f3] via-[#e9f4eb]/50 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center">
          
          {/* Left Column: Heading, Subtitle, Dual CTAs */}
          <div className="lg:col-span-6 z-10 space-y-6 pt-2 lg:pt-0">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-green-100/90 border border-green-200 text-[#206332] text-xs font-semibold tracking-wide uppercase shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#257038]" />
              <span>AI Crop Diagnosis • Progressive Tracking • Weather Sync</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-extrabold text-[#11291c] font-display uppercase tracking-tight leading-[1.08]">
              INSTANT CROP DIAGNOSIS.<br />
              SMARTER FARMING.
            </h1>

            <p className="text-base sm:text-lg text-gray-600 max-w-xl font-normal leading-relaxed">
              Kisan Rakshak uses your smartphone to detect plant disease and provide expert treatment solutions in seconds. Save your harvest with advanced technology.
            </p>

            {/* Action Buttons matching reference */}
            <div className="flex flex-wrap items-center gap-4 pt-1">
              <button
                onClick={onOpenScan}
                className="group relative inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-[#257038] hover:bg-[#1e5c2e] text-white font-semibold text-base shadow-lg shadow-green-800/20 hover:shadow-green-800/30 transition-all duration-200 active:scale-95 cursor-pointer"
              >
                <span>Scan My Crops</span>
                <Camera className="w-4 h-4 ml-2.5 opacity-90 group-hover:scale-110 transition-transform" />
              </button>

              <button
                onClick={onOpenDemo}
                className="inline-flex items-center justify-center px-8 py-3.5 rounded-full border-[1.8px] border-[#257038] text-[#257038] bg-white/90 hover:bg-[#257038] hover:text-white font-semibold text-base transition-all duration-200 active:scale-95 shadow-sm hover:shadow-md backdrop-blur-sm cursor-pointer"
              >
                <Play className="w-4 h-4 mr-2.5 fill-current" />
                <span>Watch Demo</span>
              </button>
            </div>

            {/* Quick feature indicators */}
            <div className="pt-2 grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs text-gray-600 font-medium">
              <div className="flex items-center gap-2 p-2 rounded-xl bg-white/70 border border-green-100/60 shadow-xs">
                <CheckCircle2 className="w-4 h-4 text-[#257038] shrink-0" />
                <span>98.4% Precision</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-xl bg-white/70 border border-green-100/60 shadow-xs">
                <Activity className="w-4 h-4 text-[#257038] shrink-0" />
                <span>Progressive Tracking</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-xl bg-white/70 border border-green-100/60 shadow-xs col-span-2 sm:col-span-1">
                <CloudSun className="w-4 h-4 text-[#257038] shrink-0" />
                <span>Weather Disease Sync</span>
              </div>
            </div>

          </div>

          {/* Right Column: Clean Farmer Hero Image with Interactive Scanning Overlay */}
          <div className="lg:col-span-6 relative flex justify-center items-center">
            
            <div className="relative w-full max-w-[540px] rounded-3xl overflow-hidden shadow-2xl shadow-green-950/20 group border border-green-100/50">
              
              {/* Clean high-res photorealistic farmer photo */}
              <img
                src="/assets/farmer_hero_clean.jpg"
                alt="Indian farmer inspecting crop in field with Kisan Rakshak smartphone"
                className="w-full h-auto object-cover transform transition-transform duration-500 group-hover:scale-[1.01]"
              />
            </div>

          </div>

        </div>
      </div>

    </section>
  );
}

