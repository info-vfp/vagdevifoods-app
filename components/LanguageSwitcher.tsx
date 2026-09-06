import React from 'react';
import { useLanguage, LANGUAGE_OPTIONS, LangCode } from '../context/LanguageContext';

/**
 * The compact control for the desktop nav, where horizontal space is scarce and a visitor
 * on a laptop is far more likely to want English anyway. Phones get LanguageStrip instead —
 * see the note there for why a <select> is the wrong shape for this audience.
 */

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
      // `appearance-none` strips the native dropdown arrow, which left a plain rounded pill
      // that does not read as a control — a real problem on a phone, where this is now the
      // only way to change language. The chevron is drawn back in as a background image so
      // the element stays a single <select> and `className` keeps working at the call site.
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%231F2937' stroke-width='1.6' fill='none' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E\")",
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'right 0.7rem center',
      }}
      className={`appearance-none bg-white border border-brand-line rounded-full ps-3.5 pe-7 min-h-[44px] text-[13px] sm:text-[11px] font-bold text-brand-primary cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand-secondary/40 ${className}`}
    >
      {LANGUAGE_OPTIONS.map((opt) => (
        // React's server renderer marks the active option with a `selected` attribute,
        // while the client renderer sets it as a DOM property and leaves no attribute.
        // That difference alone fails hydration, so the mismatch is suppressed here —
        // the rendered result is identical either way.
        <option key={opt.value} value={opt.value} suppressHydrationWarning>
          {opt.label}
        </option>
      ))}
    </select>
  );
};

export default LanguageSwitcher;
