import { createContext, useContext } from 'react';

const Ctx = createContext<any>(null);
export function PortfolioProvider({ children }: { children: React.ReactNode }) {
  return (
    <Ctx.Provider
      value={{
        themeDark: false,
        hc: false,
        ul: false,
        motion: false,
        dys: false,
        textStep: 0,
        lang: 'en',
        toast: '',
        toggleTheme: () => {},
        setLang: () => {},
        setTextStep: () => {},
        setHc: () => {},
        setUl: () => {},
        setMotion: () => {},
        setDys: () => {},
        resetA11y: () => {},
        showToast: () => {},
      }}
    >
      {children}
    </Ctx.Provider>
  );
}
export function usePortfolio() {
  const ctx = useContext(Ctx);
  if (!ctx)
    throw new Error('usePortfolio must be used within PortfolioProvider');
  return ctx;
}
