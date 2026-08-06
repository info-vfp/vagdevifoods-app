import React from 'react';
import { useLanguage, LangCode } from '../context/LanguageContext';

const LANGUAGE_OPTIONS: { value: LangCode; label: string }[] = [
  { value: 'en', label: 'EN' },
  { value: 'hi', label: 'हिंदी' },
  { value: 'te', label: 'తెలుగు' },
  { value: 'ta', label: 'தமிழ்' },
  { value: 'kn', label: 'ಕನ್ನಡ' },
];

interface LanguageSwitcherProps {
  className?: string;
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ className = '' }) => {
  const { lang, setLang } = useLanguage();

  return (
    <select
      value={lang}
      onChange={(e) => setLang(e.target.value as LangCode)}
      aria-label="Language"
      className={`appearance-none bg-white border border-brand-line rounded-full px-3.5 min-h-[44px] text-[13px] sm:text-[11px] font-bold text-brand-primary cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand-secondary/40 ${className}`}
    >
      {LANGUAGE_OPTIONS.map((opt) => (
        <option key={opt.value} value={opt.value}>{opt.label}</option>
      ))}
    </select>
  );
};

export default LanguageSwitcher;
