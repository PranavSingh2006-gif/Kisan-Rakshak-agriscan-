import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="relative z-20 pt-4 pb-10 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row items-center justify-end gap-3 sm:gap-8 text-xs sm:text-sm text-gray-500 font-medium">
        <div className="flex items-center gap-6">
          <a 
            href="mailto:support@kisanrakshak.farm" 
            className="hover:text-[#257038] transition-colors"
          >
            {t('footer_contact')}
          </a>
          <a 
            href="#privacy" 
            onClick={(e) => { 
              e.preventDefault(); 
            }}
            className="hover:text-[#257038] transition-colors"
          >
            {t('footer_privacy')}
          </a>
        </div>
        <div className="text-gray-600">
          {t('footer_copy')}
        </div>
      </div>
    </footer>
  );
}
