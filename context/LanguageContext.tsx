import React, { createContext, useContext, useState, useEffect } from 'react';

export type LangCode = 'en' | 'hi' | 'te' | 'ta' | 'kn' | 'or' | 'ur';

/**
 * Every language, labelled in its own script.
 *
 * Lives here rather than in a component because two controls render it: the compact
 * <select> the desktop nav uses, and the always-visible LanguageStrip on phones.
 * The label is deliberately the endonym — a reader who cannot read Latin script
 * recognises "తెలుగు" but gets nothing from "TE".
 */
export const LANGUAGE_OPTIONS: { value: LangCode; label: string }[] = [
  { value: 'en', label: 'EN' },
  { value: 'hi', label: 'हिंदी' },
  { value: 'te', label: 'తెలుగు' },
  { value: 'ta', label: 'தமிழ்' },
  { value: 'kn', label: 'ಕನ್ನಡ' },
  { value: 'or', label: 'ଓଡ଼ିଆ' },
  { value: 'ur', label: 'اردو' },
];

/** Languages written right-to-left. Drives the `dir` attribute and Tailwind's rtl: variant. */
export const RTL_LANGUAGES: ReadonlySet<LangCode> = new Set<LangCode>(['ur']);

const STORAGE_KEY = 'vf_lang';

interface LanguageContextValue {
  lang: LangCode;
  setLang: (lang: LangCode) => void;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

const isLangCode = (value: unknown): value is LangCode =>
  value === 'en' || value === 'hi' || value === 'te' ||
  value === 'ta' || value === 'kn' || value === 'or' || value === 'ur';

/**
 * Google Fonts family names for the non-Latin scripts, keyed by language.
 *
 * These are deliberately kept out of index.html. Requesting all of them up front made the
 * font stylesheet render-blocking for ~2s on mobile, on behalf of scripts that the large
 * majority of visitors never switch to. They are fetched on demand instead.
 */
const SCRIPT_FONTS: Partial<Record<LangCode, string>> = {
  hi: 'Noto+Sans+Devanagari:wght@400;600;700',
  te: 'Noto+Sans+Telugu:wght@400;600;700',
  ta: 'Noto+Sans+Tamil:wght@400;600;700',
  kn: 'Noto+Sans+Kannada:wght@400;600;700',
  or: 'Noto+Sans+Oriya:wght@400;600;700',
  // Nastaliq is the script Urdu readers expect; Noto Sans Arabic would look wrong to them.
  ur: 'Noto+Nastaliq+Urdu:wght@400;600;700',
};

const loadedScripts = new Set<LangCode>();

/** Appends the script's font stylesheet once, the first time that language is selected. */
const ensureScriptFont = (lang: LangCode) => {
  const family = SCRIPT_FONTS[lang];
  if (!family || loadedScripts.has(lang) || typeof document === 'undefined') return;
  loadedScripts.add(lang);

  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = `https://fonts.googleapis.com/css2?family=${family}&display=swap`;
  document.head.appendChild(link);
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Always start from 'en' so the client's first render matches the pre-rendered HTML.
  // Reading localStorage during initialisation would produce a hydration mismatch for
  // anyone who had previously chosen another language.
  const [lang, setLangState] = useState<LangCode>('en');
  const [hydrated, setHydrated] = useState(false);

  // Restore the saved choice after mount, once hydration is safely done.
  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (isLangCode(stored)) setLangState(stored);
    setHydrated(true);
  }, []);

  // Don't write on the first pass, or we'd overwrite the stored value with the 'en' default.
  useEffect(() => {
    if (hydrated) window.localStorage.setItem(STORAGE_KEY, lang);
  }, [lang, hydrated]);

  // Pull in the script's webfont the first time it is actually needed, and keep <html lang>
  // honest — screen readers choose a pronunciation from it, so leaving it at "en" while the
  // page shows Telugu makes the site unusable with assistive tech.
  useEffect(() => {
    ensureScriptFont(lang);
    document.documentElement.lang = lang;
    // Urdu is right-to-left. Setting `dir` flips the logical CSS properties the layout is
    // built from, so the page mirrors without a second stylesheet.
    document.documentElement.dir = RTL_LANGUAGES.has(lang) ? 'rtl' : 'ltr';
  }, [lang]);

  const setLang = (next: LangCode) => setLangState(next);

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextValue => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within a LanguageProvider');
  return ctx;
};
