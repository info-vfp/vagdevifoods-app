import React from 'react';
import { useLanguage, LANGUAGE_OPTIONS, LangCode } from '../context/LanguageContext';

interface LanguageStripProps {
  /** Extra classes for the outer bar, so the Surya microsite can carry its own palette. */
  className?: string;
  /** Classes for the resting (unselected) chip. */
  chipClassName?: string;
  /** Classes for the chip of the language currently in use. */
  activeChipClassName?: string;
}

/**
 * Every language, shown at once, one tap each.
 *
 * This replaces a <select> on phones, and the reason is the audience: many visitors run a
 * rice shop in rural Telangana and read Telugu or Hindi rather than English. A dropdown
 * labelled "EN" fails them three times over — the label is meaningless if you cannot read
 * Latin script, the options are hidden until you know to tap it, and it assumes familiarity
 * with a native dropdown. Showing every script directly turns the task into recognition:
 * you see your own writing and press it.
 *
 * Rendered below the sticky header rather than inside it, so it is unmissable on arrival —
 * which is when language gets chosen — without permanently costing 44px of a small screen.
 * The mobile menu carries the same choices for anyone already scrolled down the page.
 */
const LanguageStrip: React.FC<LanguageStripProps> = ({
  className = 'border-b border-brand-line bg-brand-cream',
  chipClassName = 'text-brand-primary hover:bg-brand-primary/[.06]',
  activeChipClassName = 'bg-brand-dark text-white',
}) => {
  const { lang, setLang } = useLanguage();

  return (
    <div className={`lg:hidden ${className}`}>
      {/* `group` labels the row for screen readers; the buttons alone would read as five
          unrelated words. Horizontal scroll is a safety net — all five fit at 320px. */}
      <div
        role="group"
        aria-label="Choose a language"
        className="max-w-screen-xl mx-auto px-1.5 flex items-center gap-0.5 overflow-x-auto no-scrollbar"
      >
        {LANGUAGE_OPTIONS.map((option) => {
          const active = option.value === lang;
          return (
            <button
              key={option.value}
              type="button"
              lang={option.value}
              onClick={() => setLang(option.value as LangCode)}
              aria-current={active ? 'true' : undefined}
              className={`flex-shrink-0 min-h-[44px] min-w-[44px] px-2.5 rounded-full text-[13px] font-bold leading-none transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-brand-secondary/40 ${
                active ? activeChipClassName : chipClassName
              }`}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default LanguageStrip;
