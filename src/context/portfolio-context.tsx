import { createContext, useContext, useEffect, useRef, useState } from 'react';

import i18n from '@/i18n';
import type { LANG } from '@/lib/constants.ts';

interface Prefs {
  themeDark: boolean;
  lang: LANG;
  textStep: number;
  hc: boolean;
  ul: boolean;
  motion: boolean;
  dys: boolean;
}

interface PortfolioContextValue extends Prefs {
  toggleTheme(): void;
  setLang(l: LANG): void;
  setTextStep(v: number): void;
  setHc(v: boolean): void;
  setUl(v: boolean): void;
  setMotion(v: boolean): void;
  setDys(v: boolean): void;
  resetA11y(): void;
  toast: string;
  showToast(msg: string): void;
}

const DEFAULTS: Prefs = {
  themeDark: false,
  lang: 'en',
  textStep: 0,
  hc: false,
  ul: false,
  motion: false,
  dys: false,
};

function loadPrefs(): Partial<Prefs> {
  try {
    const raw = localStorage.getItem('sv_prefs');
    if (raw) return JSON.parse(raw) as Partial<Prefs>;
  } catch {}
  return {};
}

function savePrefs(p: Prefs) {
  try {
    localStorage.setItem('sv_prefs', JSON.stringify(p));
  } catch {}
}

const Ctx = createContext<PortfolioContextValue | null>(null);

function tryChangeLanguage(lang: LANG): void {
  void i18n.changeLanguage(lang);
}

export function PortfolioProvider({ children }: { children: React.ReactNode }) {
  const [prefs, setPrefs] = useState<Prefs>(() => ({
    ...DEFAULTS,
    ...loadPrefs(),
  }));
  const [toast, setToast] = useState('');
  const toastTimer = useRef<number | undefined>(undefined);

  useEffect(() => {
    savePrefs(prefs);
  }, [prefs]);

  const mountedRef = useRef(false);
  useEffect(() => {
    if (mountedRef.current) return; // only run on mount
    mountedRef.current = true;
    document.documentElement.lang = prefs.lang;
    tryChangeLanguage(prefs.lang);
  }, [prefs.lang]);

  const patch = (update: Partial<Prefs>) =>
    setPrefs(p => ({ ...p, ...update }));

  function showToast(msg: string) {
    setToast(msg);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(''), 1800);
  }

  const value: PortfolioContextValue = {
    ...prefs,
    toggleTheme() {
      const next = !prefs.themeDark;
      patch({ themeDark: next });
      showToast(next ? '// dark mode engaged' : '// light mode');
    },
    setLang: (l: LANG) => {
      patch({ lang: l });
      document.documentElement.lang = l;
      tryChangeLanguage(l);
    },
    setTextStep: (v: number) =>
      patch({ textStep: Math.max(-1, Math.min(3, v)) }),
    setHc: (v: boolean) => patch({ hc: v }),
    setUl: (v: boolean) => patch({ ul: v }),
    setMotion: (v: boolean) => patch({ motion: v }),
    setDys: (v: boolean) => patch({ dys: v }),
    resetA11y: () =>
      patch({
        textStep: 0,
        hc: false,
        ul: false,
        motion: false,
        dys: false,
        themeDark: false,
      }),
    toast,
    showToast,
  };

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function usePortfolio() {
  const ctx = useContext(Ctx);
  if (!ctx)
    throw new Error('usePortfolio must be used within PortfolioProvider');
  return ctx;
}
