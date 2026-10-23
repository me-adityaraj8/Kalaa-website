import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import type { L, Lang } from '../data/types';

export type { L, Lang };

type LangContextValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (text: L) => string;
};

const LangContext = createContext<LangContextValue | null>(null);
const STORAGE_KEY = 'kalaa-lang';

function initialLang(): Lang {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'hi' || saved === 'en') return saved;
  } catch {
    // storage can be blocked; fall through to the default
  }
  return 'hi';
}

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(initialLang);

  useEffect(() => {
    document.documentElement.lang = lang === 'hi' ? 'hi' : 'en-IN';
  }, [lang]);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // not fatal
    }
  }, []);

  const value = useMemo(() => ({ lang, setLang, t: (text: L) => text[lang] }), [lang, setLang]);
  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang(): LangContextValue {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error('useLang must be used inside LangProvider');
  return ctx;
}

export const otherLang = (lang: Lang): Lang => (lang === 'hi' ? 'en' : 'hi');
export const langAttr = (lang: Lang) => (lang === 'hi' ? 'hi' : 'en');
