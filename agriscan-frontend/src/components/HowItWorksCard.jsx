import React from 'react';
import { Camera, Cpu, FileCheck2, ChevronRight, Target, UserCheck, History, Sprout, Check, Database } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function HowItWorksCard({ onOpenScan, onSelectBenefit }) {
  const { t } = useLanguage();

  return (
    <section id="how-it-works" className="relative pt-6 sm:pt-10 z-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto pb-12">
      
      {/* Main Floating Container matching the white rounded card in reference */}
      <div className="bg-white rounded-[28px] sm:rounded-[36px] p-6 sm:p-10 lg:p-12 shadow-[0_20px_50px_-15px_rgba(20,50,30,0.14)] border border-green-100/90 transition-all">
        
        {/* Section Title */}
        <div className="text-center mb-10 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#11291c] font-display tracking-tight">
            {t('hiw_title')}
          </h2>
          <p className="text-sm text-gray-500 mt-1.5 font-medium">
            {t('hiw_subtitle')}
          </p>
        </div>

        {/* 3 Step Workflow */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-4 relative items-stretch">
          
          {/* STEP 1: SNAP A PHOTO */}
          <div 
            onClick={onOpenScan}
            className="group relative cursor-pointer flex flex-col justify-between bg-[#edf7ef] hover:bg-[#e4f3e7] rounded-2xl p-5 border border-green-200/80 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-white/90 border border-green-200 flex items-center justify-center text-[#257038] shadow-xs group-hover:scale-105 transition-transform">
                  <div className="relative">
                    <Camera className="w-6 h-6 text-[#257038]" />
                    <Sprout className="w-3 h-3 text-emerald-600 absolute -bottom-1 -right-1" />
                  </div>
                </div>

                <span className="text-[11px] font-bold uppercase tracking-wider text-green-700 bg-white/80 px-2.5 py-1 rounded-full border border-green-200">
                  {t('hiw_step1_badge')}
                </span>
              </div>

              <h3 className="font-extrabold text-[#132c1c] text-base sm:text-lg tracking-tight mb-1">
                {t('hiw_step1_title')}
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 font-medium leading-snug mb-5">
                {t('hiw_step1_desc')}
              </p>
            </div>

            {/* Smartphone Mockup 1 */}
            <div className="relative mx-auto w-full max-w-[190px] aspect-[9/16] bg-gray-900 rounded-[24px] p-2 shadow-md border-2 border-gray-800 flex flex-col justify-between overflow-hidden">
              <div className="w-12 h-1.5 bg-gray-800 rounded-full mx-auto mb-1" />
              
              <div className="relative flex-1 rounded-[16px] overflow-hidden bg-emerald-950 flex items-center justify-center">
                <img 
                  src="https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=400&q=80" 
                  alt="Leaf in camera viewfinder" 
                  className="absolute inset-0 w-full h-full object-cover opacity-85"
                />

                <div className="relative w-28 h-28 border border-white/40 rounded-lg flex items-center justify-center">
                  <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-emerald-400" />
                  <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-emerald-400" />
                  <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-emerald-400" />
                  <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-emerald-400" />
                  <span className="text-[10px] text-emerald-300 font-mono font-bold bg-black/60 px-1.5 py-0.5 rounded">
                    {t('hiw_step1_focus')}
                  </span>
                </div>
              </div>

              <div className="py-1.5 flex items-center justify-center">
                <div className="w-5 h-5 rounded-full border-2 border-white flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-white" />
                </div>
              </div>
            </div>

            <div className="hidden md:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10 w-6 h-6 rounded-full bg-white border border-green-300 items-center justify-center text-green-600 shadow-sm">
              <ChevronRight className="w-4 h-4" />
            </div>
          </div>


          {/* STEP 2: AI ANALYSIS */}
          <div 
            onClick={onOpenScan}
            className="group relative cursor-pointer flex flex-col justify-between bg-[#f4faf5] hover:bg-[#e9f6ec] rounded-2xl p-5 border border-green-200/80 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-white/90 border border-green-200 flex items-center justify-center text-[#257038] shadow-xs group-hover:scale-105 transition-transform">
                  <Cpu className="w-6 h-6 text-[#257038]" />
                </div>

                <span className="text-[11px] font-bold uppercase tracking-wider text-green-700 bg-white/80 px-2.5 py-1 rounded-full border border-green-200">
                  {t('hiw_step2_badge')}
                </span>
              </div>

              <h3 className="font-extrabold text-[#132c1c] text-base sm:text-lg tracking-tight mb-1">
                {t('hiw_step2_title')}
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 font-medium leading-snug mb-5">
                {t('hiw_step2_desc')}
              </p>
            </div>

            {/* Smartphone Mockup 2 */}
            <div className="relative mx-auto w-full max-w-[190px] aspect-[9/16] bg-gray-900 rounded-[24px] p-2 shadow-md border-2 border-gray-800 flex flex-col justify-between overflow-hidden">
              <div className="w-12 h-1.5 bg-gray-800 rounded-full mx-auto mb-1" />
              
              <div className="relative flex-1 rounded-[16px] overflow-hidden bg-[#0c2415] p-3 flex flex-col items-center justify-center text-center">
                <div className="w-12 h-12 rounded-xl bg-emerald-900/60 border border-emerald-400/40 flex items-center justify-center mb-2.5 shadow-inner relative">
                  <Database className="w-6 h-6 text-emerald-400 animate-pulse" />
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                </div>

                <div className="space-y-1 w-full">
                  <div className="h-1.5 w-full bg-emerald-950 rounded-full overflow-hidden border border-emerald-800/60">
                    <div className="h-full bg-gradient-to-r from-emerald-500 to-green-300 w-3/4 rounded-full animate-pulse" />
                  </div>
                  <p className="text-[10px] text-emerald-300 font-semibold">
                    {t('hiw_step2_matching')}
                  </p>
                  <p className="text-[8.5px] text-emerald-400/80 font-mono">
                    {t('hiw_step2_models')}
                  </p>
                </div>
              </div>

              <div className="py-1.5 flex items-center justify-center">
                <span className="text-[8.5px] text-gray-400 font-mono">{t('hiw_step2_core')}</span>
              </div>
            </div>

            <div className="hidden md:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10 w-6 h-6 rounded-full bg-white border border-green-300 items-center justify-center text-green-600 shadow-sm">
              <ChevronRight className="w-4 h-4" />
            </div>
          </div>


          {/* STEP 3: GET SOLUTIONS */}
          <div 
            onClick={onOpenScan}
            className="group relative cursor-pointer flex flex-col justify-between bg-[#fbf9f2] hover:bg-[#f6f2e4] rounded-2xl p-5 border border-amber-200/80 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-white/90 border border-amber-200 flex items-center justify-center text-emerald-700 shadow-xs group-hover:scale-105 transition-transform">
                  <FileCheck2 className="w-6 h-6 text-[#257038]" />
                </div>

                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800 bg-white/80 px-2.5 py-1 rounded-full border border-amber-200">
                  {t('hiw_step3_badge')}
                </span>
              </div>

              <h3 className="font-extrabold text-[#132c1c] text-base sm:text-lg tracking-tight mb-1">
                {t('hiw_step3_title')}
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 font-medium leading-snug mb-5">
                {t('hiw_step3_desc')}
              </p>
            </div>

            {/* Smartphone Mockup 3 */}
            <div className="relative mx-auto w-full max-w-[190px] aspect-[9/16] bg-gray-900 rounded-[24px] p-2 shadow-md border-2 border-gray-800 flex flex-col justify-between overflow-hidden">
              <div className="w-12 h-1.5 bg-gray-800 rounded-full mx-auto mb-1" />
              
              <div className="relative flex-1 rounded-[16px] overflow-hidden bg-white p-2.5 flex flex-col justify-between text-left">
                <div>
                  <div className="flex items-center justify-between border-b border-gray-100 pb-1 mb-1">
                    <span className="text-[9px] font-bold text-gray-800">{t('hiw_scanReport')}</span>
                    <span className="text-[7.5px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded">
                      {t('hiw_match')}
                    </span>
                  </div>

                  <p className="text-[11px] font-extrabold text-red-700 leading-tight">
                    {t('hiw_earlyBlight')}
                  </p>
                  <p className="text-[8px] text-gray-500 mb-1.5">
                    Alternaria solani
                  </p>

                  <div className="space-y-1">
                    <div className="flex items-start gap-1">
                      <Check className="w-2.5 h-2.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="text-[7.5px] text-gray-700 leading-tight">{t('hiw_spray')}</span>
                    </div>
                    <div className="flex items-start gap-1">
                      <Check className="w-2.5 h-2.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="text-[7.5px] text-gray-700 leading-tight">{t('hiw_sanitize')}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 p-1 rounded-lg border border-green-200 text-center">
                  <span className="text-[7.5px] font-bold text-green-800">{t('hiw_saveYield')}</span>
                </div>
              </div>

              <div className="py-1.5 flex items-center justify-center">
                <span className="text-[8.5px] text-gray-400 font-mono">{t('hiw_expertVerified')}</span>
              </div>
            </div>
          </div>

        </div>


        {/* KEY BENEFITS SUB-SECTION */}
        <div className="mt-14 pt-10 border-t border-gray-100">
          <div className="text-center mb-8">
            <h3 className="text-xl sm:text-2xl font-bold text-[#11291c] font-display">
              {t('benefits_title')}
            </h3>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              {t('benefits_subtitle')}
            </p>
          </div>

          {/* 4 Benefit Cards matching reference row layout */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            
            <div 
              onClick={() => onSelectBenefit('diagnosis')}
              className="flex flex-col items-center text-center p-4 sm:p-5 rounded-2xl bg-gray-50/90 hover:bg-[#edf7ef] border border-gray-200/80 hover:border-green-300 transition-all cursor-pointer group hover:shadow-md"
            >
              <div className="w-14 h-14 rounded-2xl bg-white shadow-xs border border-gray-100 flex items-center justify-center mb-3 group-hover:scale-110 group-hover:bg-[#257038] group-hover:text-white transition-all text-[#257038]">
                <Target className="w-7 h-7" />
              </div>
              <h4 className="font-bold text-gray-900 text-sm sm:text-base group-hover:text-[#257038] transition-colors">
                {t('benefit1_title')}
              </h4>
              <p className="text-xs text-gray-500 mt-1 hidden sm:block">
                {t('benefit1_desc')}
              </p>
            </div>

            <div 
              onClick={() => onSelectBenefit('advice')}
              className="flex flex-col items-center text-center p-4 sm:p-5 rounded-2xl bg-gray-50/90 hover:bg-[#edf7ef] border border-gray-200/80 hover:border-green-300 transition-all cursor-pointer group hover:shadow-md"
            >
              <div className="w-14 h-14 rounded-2xl bg-white shadow-xs border border-gray-100 flex items-center justify-center mb-3 group-hover:scale-110 group-hover:bg-[#257038] group-hover:text-white transition-all text-[#257038]">
                <UserCheck className="w-7 h-7" />
              </div>
              <h4 className="font-bold text-gray-900 text-sm sm:text-base group-hover:text-[#257038] transition-colors">
                {t('benefit2_title')}
              </h4>
              <p className="text-xs text-gray-500 mt-1 hidden sm:block">
                {t('benefit2_desc')}
              </p>
            </div>

            <div 
              onClick={() => onSelectBenefit('history')}
              className="flex flex-col items-center text-center p-4 sm:p-5 rounded-2xl bg-gray-50/90 hover:bg-[#edf7ef] border border-gray-200/80 hover:border-green-300 transition-all cursor-pointer group hover:shadow-md"
            >
              <div className="w-14 h-14 rounded-2xl bg-white shadow-xs border border-gray-100 flex items-center justify-center mb-3 group-hover:scale-110 group-hover:bg-[#257038] group-hover:text-white transition-all text-[#257038]">
                <History className="w-7 h-7" />
              </div>
              <h4 className="font-bold text-gray-900 text-sm sm:text-base group-hover:text-[#257038] transition-colors">
                {t('benefit3_title')}
              </h4>
              <p className="text-xs text-gray-500 mt-1 hidden sm:block">
                {t('benefit3_desc')}
              </p>
            </div>

            <div 
              onClick={() => onSelectBenefit('crops')}
              className="flex flex-col items-center text-center p-4 sm:p-5 rounded-2xl bg-gray-50/90 hover:bg-[#edf7ef] border border-gray-200/80 hover:border-green-300 transition-all cursor-pointer group hover:shadow-md"
            >
              <div className="w-14 h-14 rounded-2xl bg-white shadow-xs border border-gray-100 flex items-center justify-center mb-3 group-hover:scale-110 group-hover:bg-[#257038] group-hover:text-white transition-all text-[#257038]">
                <Sprout className="w-7 h-7" />
              </div>
              <h4 className="font-bold text-gray-900 text-sm sm:text-base group-hover:text-[#257038] transition-colors">
                {t('benefit4_title')}
              </h4>
              <p className="text-xs text-gray-500 mt-1 hidden sm:block">
                {t('benefit4_desc')}
              </p>
            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

