import React, { createContext, useContext, useState, useEffect } from 'react';

export type LangCode = 'en' | 'hi' | 'te' | 'ta' | 'kn';

const STORAGE_KEY = 'vf_lang';

interface LanguageContextValue {
  lang: LangCode;
  setLang: (lang: LangCode) => void;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

const isLangCode = (value: unknown): value is LangCode =>
  value === 'en' || value === 'hi' || value === 'te' || value === 'ta' || value === 'kn';

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
