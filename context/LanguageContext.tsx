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
