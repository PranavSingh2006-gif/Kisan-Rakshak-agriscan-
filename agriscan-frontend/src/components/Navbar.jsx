import React, { useState } from 'react';
import { Menu, X, Leaf, Bot } from 'lucide-react';

export default function Navbar({ onOpenScan, onNavigate, currentPath = '/' }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isFeatures = currentPath === '/features' || currentPath.startsWith('/features') || (typeof window !== 'undefined' && window.location.hash === '#features');
  const isDashboard = currentPath === '/dashboard' || currentPath.startsWith('/dashboard') || (typeof window !== 'undefined' && window.location.hash === '#dashboard');
  const isAssistant = currentPath === '/assistant' || currentPath.startsWith('/assistant');
  const isHome = !isFeatures && !isAssistant && !isDashboard;

  const handleHowItWorksClick = (e) => {
    e.preventDefault();
    if (isFeatures || isAssistant) {
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

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-green-100 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo: 'K' stylized with leaf + 'Kisan Rakshak' */}
          <a 
            href="/" 
            onClick={(e) => {
              e.preventDefault();
              onNavigate ? onNavigate('/') : (window.location.pathname = '/');
            }}
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

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7">
            <a 
              href="/" 
              onClick={(e) => {
                e.preventDefault();
                onNavigate ? onNavigate('/') : (window.location.pathname = '/');
              }}
              className={`text-[14px] transition-colors relative py-1 cursor-pointer ${
                isHome 
                  ? 'font-semibold text-[#257038] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[#257038] after:rounded-full' 
                  : 'font-medium text-gray-700 hover:text-[#257038]'
              }`}
            >
              Home
            </a>
            <a 
              href="/dashboard" 
              onClick={(e) => {
                e.preventDefault();
                onNavigate ? onNavigate('/dashboard') : (window.location.pathname = '/dashboard');
              }}
              className={`text-[14px] transition-colors relative py-1 cursor-pointer ${
                isDashboard 
                  ? 'font-semibold text-[#257038] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[#257038] after:rounded-full' 
                  : 'font-medium text-gray-700 hover:text-[#257038]'
              }`}
            >
              Dashboard
            </a>
            <a 
              href="/features" 
              onClick={(e) => {
                e.preventDefault();
                onNavigate ? onNavigate('/features') : (window.location.pathname = '/features');
              }}
              className={`text-[14px] transition-colors relative py-1 cursor-pointer ${
                isFeatures 
                  ? 'font-semibold text-[#257038] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[#257038] after:rounded-full' 
                  : 'font-medium text-gray-700 hover:text-[#257038]'
              }`}
            >
              Features
            </a>
            <a 
              href="#how-it-works" 
              onClick={handleHowItWorksClick}
              className="text-[14px] font-medium text-gray-700 hover:text-[#257038] transition-colors cursor-pointer"
            >
              How It Works
            </a>
            {/* AI Assistant Navigation Item */}
            <a 
              href="/assistant" 
              onClick={(e) => {
                e.preventDefault();
                onNavigate ? onNavigate('/assistant') : (window.location.pathname = '/assistant');
              }}
              className={`text-[14px] transition-colors relative py-1 cursor-pointer flex items-center gap-1.5 ${
                isAssistant 
                  ? 'font-semibold text-[#257038] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[#257038] after:rounded-full' 
                  : 'font-medium text-gray-700 hover:text-[#257038]'
              }`}
            >
              <Bot className="w-3.5 h-3.5 text-emerald-600" />
              <span>AI Assistant</span>
            </a>
          </nav>

          {/* Right Action CTA Button (Crop Scan) */}
          <div className="hidden lg:flex items-center gap-4">
            <button
              onClick={onOpenScan}
              className="px-6 py-2.5 rounded-full border-[1.75px] border-[#257038] text-[#257038] font-bold text-xs tracking-wider uppercase hover:bg-[#257038] hover:text-white transition-all duration-200 active:scale-95 shadow-xs hover:shadow-md cursor-pointer"
            >
              Crop Scan
            </button>
          </div>

          {/* Mobile Menu Toggle */}
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

      {/* Mobile Dropdown Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-green-100 px-5 pt-3 pb-6 shadow-xl animate-fadeIn">
          <div className="flex flex-col gap-3">
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                setMobileMenuOpen(false);
                onNavigate ? onNavigate('/') : (window.location.pathname = '/');
              }}
              className={`text-base px-3 py-2 rounded-lg cursor-pointer ${
                isHome ? 'font-semibold text-[#257038] bg-green-50/80' : 'font-medium text-gray-700 hover:text-[#257038]'
              }`}
            >
              Home
            </a>
            <a
              href="/dashboard"
              onClick={(e) => {
                e.preventDefault();
                setMobileMenuOpen(false);
                onNavigate ? onNavigate('/dashboard') : (window.location.pathname = '/dashboard');
              }}
              className={`text-base px-3 py-2 rounded-lg cursor-pointer ${
                isDashboard ? 'font-semibold text-[#257038] bg-green-50/80' : 'font-medium text-gray-700 hover:text-[#257038]'
              }`}
            >
              Dashboard
            </a>
            <a
              href="/features"
              onClick={(e) => {
                e.preventDefault();
                setMobileMenuOpen(false);
                onNavigate ? onNavigate('/features') : (window.location.pathname = '/features');
              }}
              className={`text-base px-3 py-2 rounded-lg cursor-pointer ${
                isFeatures ? 'font-semibold text-[#257038] bg-green-50/80' : 'font-medium text-gray-700 hover:text-[#257038]'
              }`}
            >
              Features
            </a>
            <a
              href="#how-it-works"
              onClick={(e) => {
                setMobileMenuOpen(false);
                handleHowItWorksClick(e);
              }}
              className="text-base font-medium text-gray-700 hover:text-[#257038] px-3 py-2 cursor-pointer"
            >
              How It Works
            </a>
            <a
              href="/assistant"
              onClick={(e) => {
                e.preventDefault();
                setMobileMenuOpen(false);
                onNavigate ? onNavigate('/assistant') : (window.location.pathname = '/assistant');
              }}
              className={`text-base px-3 py-2 rounded-lg cursor-pointer flex items-center gap-2 ${
                isAssistant ? 'font-semibold text-[#257038] bg-green-50/80' : 'font-medium text-gray-700 hover:text-[#257038]'
              }`}
            >
              <Bot className="w-4 h-4 text-emerald-600" />
              <span>AI Assistant</span>
            </a>
            
            <div className="pt-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenScan();
                }}
                className="w-full py-3 rounded-full border-[2px] border-[#257038] text-[#257038] font-bold text-sm tracking-wider uppercase hover:bg-[#257038] hover:text-white transition-all shadow-xs cursor-pointer"
              >
                Crop Scan
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
