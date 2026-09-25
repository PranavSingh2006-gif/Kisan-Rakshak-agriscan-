import React, { useState, useRef, useEffect } from 'react';
import { Menu, X, Leaf, Bot, Globe } from 'lucide-react';
import { useLanguage, LANGUAGES } from '../context/LanguageContext';

export default function Navbar({ onOpenScan, onNavigate, currentPath = '/' }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const langMenuRef = useRef(null);
  const { lang, setLang, t } = useLanguage();

  // Close language dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (langMenuRef.current && !langMenuRef.current.contains(e.target)) {
        setLangMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const isFeatures = currentPath === '/features' || currentPath.startsWith('/features');
  const isDashboard = currentPath === '/dashboard' || currentPath.startsWith('/dashboard');
  const isAssistant = currentPath === '/assistant' || currentPath.startsWith('/assistant');
  const isHome = !isFeatures && !isAssistant && !isDashboard;

  const nav = (path) => {
    setMobileMenuOpen(false);
    onNavigate ? onNavigate(path) : (window.location.pathname = path);
  };

  const handleHowItWorksClick = (e) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    if (!isHome) {
      if (onNavigate) onNavigate('/');
      setTimeout(() => {
        const el = document.getElementById('how-it-works');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById('how-it-works');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const activeCls = 'font-semibold text-[#257038] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[#257038] after:rounded-full';
  const inactiveCls = 'font-medium text-gray-700 hover:text-[#257038]';

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-green-100 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          {/* Brand Logo */}
          <a
            href="/"
            onClick={(e) => { e.preventDefault(); nav('/'); }}
            className="flex items-center gap-2.5 group focus:outline-none cursor-pointer"
          >
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-[#206332] via-[#2d8444] to-[#48a962] text-white shadow-md shadow-green-900/15 group-hover:scale-105 transition-transform">
              <span className="font-display font-extrabold text-2xl tracking-tighter leading-none text-white ml-0.5">K</span>
              <span className="absolute -top-1 -right-1 text-emerald-300">
                <Leaf className="w-4 h-4 fill-emerald-300 transform rotate-12" />
              </span>
            </div>
            <div className="flex items-baseline">
              <span className="text-2xl font-bold tracking-tight text-[#163821] font-display mr-1.5">Kisan</span>
              <span className="text-2xl font-bold tracking-tight text-[#257038] font-display">Rakshak</span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-7">
            <a href="/" onClick={(e) => { e.preventDefault(); nav('/'); }}
              className={`text-[14px] transition-colors relative py-1 cursor-pointer ${isHome ? activeCls : inactiveCls}`}>
              {t('home')}
            </a>
            <a href="/dashboard" onClick={(e) => { e.preventDefault(); nav('/dashboard'); }}
              className={`text-[14px] transition-colors relative py-1 cursor-pointer ${isDashboard ? activeCls : inactiveCls}`}>
              {t('dashboard')}
            </a>
            <a href="/features" onClick={(e) => { e.preventDefault(); nav('/features'); }}
              className={`text-[14px] transition-colors relative py-1 cursor-pointer ${isFeatures ? activeCls : inactiveCls}`}>
              {t('features')}
            </a>
            <a href="#how-it-works" onClick={handleHowItWorksClick}
              className="text-[14px] font-medium text-gray-700 hover:text-[#257038] transition-colors cursor-pointer">
              {t('howItWorks')}
            </a>
            <a href="/assistant" onClick={(e) => { e.preventDefault(); nav('/assistant'); }}
              className={`text-[14px] transition-colors relative py-1 cursor-pointer flex items-center gap-1.5 ${isAssistant ? activeCls : inactiveCls}`}>
              <Bot className="w-3.5 h-3.5 text-emerald-600" />
              <span>{t('aiAssistant')}</span>
            </a>
          </nav>

          {/* Desktop Right: Language Switcher + Crop Scan */}
          <div className="hidden lg:flex items-center gap-3">

            {/* Language Dropdown */}
            <div className="relative" ref={langMenuRef}>
              <button
                onClick={() => setLangMenuOpen(o => !o)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-full border border-gray-200 bg-white hover:border-[#257038] hover:text-[#257038] text-gray-600 font-semibold text-xs transition-all duration-200 shadow-xs cursor-pointer"
                aria-label="Switch Language"
              >
                <Globe className="w-3.5 h-3.5" />
                <span>{LANGUAGES.find(l => l.code === lang)?.label ?? 'EN'}</span>
                <svg
                  className={"w-3 h-3 transition-transform duration-200 " + (langMenuOpen ? 'rotate-180' : '')}
                  fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {langMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-36 bg-white border border-gray-100 rounded-2xl shadow-xl overflow-hidden z-50">
                  {LANGUAGES.map(l => (
                    <button
                      key={l.code}
                      onClick={() => { setLang(l.code); setLangMenuOpen(false); }}
                      className={
                        "w-full flex items-center gap-2.5 px-4 py-2.5 text-sm font-medium transition-colors cursor-pointer " +
                        (lang === l.code ? 'bg-emerald-50 text-[#257038] font-bold' : 'text-gray-700 hover:bg-gray-50')
                      }
                    >
                      <span className={"w-1.5 h-1.5 rounded-full shrink-0 " + (lang === l.code ? 'bg-[#257038]' : '')} />
                      <span>{l.full}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={onOpenScan}
              className="px-6 py-2.5 rounded-full border-[1.75px] border-[#257038] text-[#257038] font-bold text-xs tracking-wider uppercase hover:bg-[#257038] hover:text-white transition-all duration-200 active:scale-95 shadow-xs hover:shadow-md cursor-pointer"
            >
              {t('cropScan')}
            </button>
          </div>

          {/* Mobile Hamburger */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-gray-700 hover:text-[#257038] hover:bg-green-50 focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-green-100 px-5 pt-3 pb-6 shadow-xl">
          <div className="flex flex-col gap-3">

            <a href="/" onClick={(e) => { e.preventDefault(); nav('/'); }}
              className={`text-base px-3 py-2 rounded-lg cursor-pointer ${isHome ? 'font-semibold text-[#257038] bg-green-50/80' : 'font-medium text-gray-700 hover:text-[#257038]'}`}>
              {t('home')}
            </a>
            <a href="/dashboard" onClick={(e) => { e.preventDefault(); nav('/dashboard'); }}
              className={`text-base px-3 py-2 rounded-lg cursor-pointer ${isDashboard ? 'font-semibold text-[#257038] bg-green-50/80' : 'font-medium text-gray-700 hover:text-[#257038]'}`}>
              {t('dashboard')}
            </a>
            <a href="/features" onClick={(e) => { e.preventDefault(); nav('/features'); }}
              className={`text-base px-3 py-2 rounded-lg cursor-pointer ${isFeatures ? 'font-semibold text-[#257038] bg-green-50/80' : 'font-medium text-gray-700 hover:text-[#257038]'}`}>
              {t('features')}
            </a>
            <a href="#how-it-works" onClick={handleHowItWorksClick}
              className="text-base font-medium text-gray-700 hover:text-[#257038] px-3 py-2 cursor-pointer">
              {t('howItWorks')}
            </a>
            <a href="/assistant" onClick={(e) => { e.preventDefault(); nav('/assistant'); }}
              className={`text-base px-3 py-2 rounded-lg cursor-pointer flex items-center gap-2 ${isAssistant ? 'font-semibold text-[#257038] bg-green-50/80' : 'font-medium text-gray-700 hover:text-[#257038]'}`}>
              <Bot className="w-4 h-4 text-emerald-600" />
              <span>{t('aiAssistant')}</span>
            </a>

            {/* Mobile Language Switcher */}
            <div className="pt-2 border-t border-gray-100">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider px-1 mb-2">Language / भाषा</p>
              <div className="flex gap-2">
                {LANGUAGES.map(l => (
                  <button
                    key={l.code}
                    onClick={() => setLang(l.code)}
                    className={
                      "flex-1 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer " +
                      (lang === l.code
                        ? 'bg-[#257038] text-white border-[#257038]'
                        : 'bg-white text-gray-600 border-gray-200 hover:border-[#257038] hover:text-[#257038]')
                    }
                  >
                    {l.full}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => { setMobileMenuOpen(false); onOpenScan(); }}
                className="w-full py-3 rounded-full border-[2px] border-[#257038] text-[#257038] font-bold text-sm tracking-wider uppercase hover:bg-[#257038] hover:text-white transition-all shadow-xs cursor-pointer"
              >
                {t('cropScan')}
              </button>
            </div>

          </div>
        </div>
      )}
    </header>
  );
}