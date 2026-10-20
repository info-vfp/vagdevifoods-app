import React from 'react';
import { MAIN_TRANSLATIONS } from '../content/mainTranslations';
import { useLanguage } from '../context/LanguageContext';

/**
 * First focusable element on the page: lets a keyboard or switch user jump past the header,
 * the language strip and seven nav links straight to the content. Invisible until focused.
 */
const SkipLink: React.FC<{ target?: string }> = ({ target = 'main-content' }) => {
  const { lang } = useLanguage();
  return (
    <a
      href={`#${target}`}
      className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:start-3 focus:z-[100] focus:bg-brand-dark focus:text-white focus:px-5 focus:py-3 focus:rounded-full focus:text-sm focus:font-bold"
    >
      {MAIN_TRANSLATIONS[lang].skip}
    </a>
  );
};

export default SkipLink;
