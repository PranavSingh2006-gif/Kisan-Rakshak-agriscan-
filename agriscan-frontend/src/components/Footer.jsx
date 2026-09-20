import React from 'react';

export default function Footer() {
  return (
    <footer className="relative z-20 pt-4 pb-10 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row items-center justify-end gap-3 sm:gap-8 text-xs sm:text-sm text-gray-500 font-medium">
        <div className="flex items-center gap-6">
          <a 
            href="mailto:support@kisanrakshak.farm" 
            className="hover:text-[#257038] transition-colors"
          >
            Contact
          </a>
          <a 
            href="#privacy" 
            onClick={(e) => { 
              e.preventDefault(); 
            }}
            className="hover:text-[#257038] transition-colors"
          >
            Privacy Policy
          </a>
        </div>
        <div className="text-gray-600">
          &copy; 2024 Kisan Rakshak
        </div>
      </div>
    </footer>
  );
}
