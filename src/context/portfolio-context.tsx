import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

import { usePreferences } from '@/hooks/use-preferences';
import i18n from '@/i18n';

type PreferenceContextValue = ReturnType<typeof usePreferences> & {
  toggleTheme: () => void;
  toast: string;
  showToast: (msg: string) => void;
};

const Ctx = createContext<PreferenceContextValue | null>(null);

export function PreferenceProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const {
    prefs,
    resolved,
    setTheme,
    setLang,
    setTextStep,
    setHighContrast,
    setUnderlineLinks,
    setReduceMotion,
    setDyslexiaFont,
    resetA11y,
  } = usePreferences();

  const [toast, setToast] = useState('');
  const toastTimer = useRef<number | undefined>(undefined);

  useEffect(() => {
    document.documentElement.lang = resolved.lang;
    void i18n.changeLanguage(resolved.lang);
  }, [resolved.lang]);

  function showToast(msg: string) {
    setToast(msg);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(''), 1800);
  }

  const toggleTheme = useCallback(
    () => setTheme(resolved.themeDark ? 'light' : 'dark'),
    [resolved.themeDark, setTheme],
  );

  const value: PreferenceContextValue = {
    prefs,
    resolved,
    setTheme,
    toggleTheme,
    setLang,
    setTextStep,
    setHighContrast,
    setUnderlineLinks,
    setReduceMotion,
    setDyslexiaFont,
    resetA11y,
    toast,
    showToast,
  };

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function usePreference() {
  const ctx = useContext(Ctx);
  if (!ctx)
    throw new Error('usePreference must be used within PreferenceProvider');
  return ctx;
}
