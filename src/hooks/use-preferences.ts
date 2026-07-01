import { useCallback, useEffect, useReducer } from 'react';
import { z } from 'zod';

import { LANG } from '@/lib/constants';

const TriStateSchema = z.enum(['system', 'on', 'off']);
const ThemeStateSchema = z.enum(['system', 'light', 'dark']);
const LangStateSchema = z.enum(Object.values(LANG));

const PrefsSchema = z.object({
  theme: ThemeStateSchema.catch(ThemeStateSchema.options[0]),
  lang: LangStateSchema.catch(LangStateSchema.options[0]),
  textStep: z.number().int().min(-1).max(3).catch(0),
  highContrast: TriStateSchema.catch(TriStateSchema.options[0]),
  underlineLinks: z.boolean().catch(false),
  reduceMotion: TriStateSchema.catch(TriStateSchema.options[0]),
  dyslexiaFont: z.boolean().catch(false),
});

export type Prefs = z.infer<typeof PrefsSchema>;
export type TriStatePref = z.infer<typeof TriStateSchema>;

export type ResolvedPrefs = {
  themeDark: boolean;
  lang: LANG;
  textStep: number;
  highContrast: boolean;
  underlineLinks: boolean;
  reduceMotion: boolean;
  dyslexiaFont: boolean;
};

type SystemSnapshot = {
  themeDark: boolean;
  highContrast: boolean;
  reduceMotion: boolean;
};

type State = {
  prefs: Prefs;
  system: SystemSnapshot;
};

type Action =
  | { type: 'SET_THEME'; payload: Prefs['theme'] }
  | { type: 'SET_LANG'; payload: Prefs['lang'] }
  | { type: 'SET_TEXT_STEP'; payload: Prefs['textStep'] }
  | { type: 'SET_HIGH_CONTRAST'; payload: Prefs['highContrast'] }
  | { type: 'SET_UNDERLINE_LINKS'; payload: Prefs['underlineLinks'] }
  | { type: 'SET_REDUCE_MOTION'; payload: Prefs['reduceMotion'] }
  | { type: 'SET_DYSLEXIA_FONT'; payload: Prefs['dyslexiaFont'] }
  | { type: 'RESET_A11Y' }
  | { type: 'SYNC_SYSTEM'; payload: Partial<SystemSnapshot> };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_THEME':
      return { ...state, prefs: { ...state.prefs, theme: action.payload } };
    case 'SET_LANG':
      return { ...state, prefs: { ...state.prefs, lang: action.payload } };
    case 'SET_TEXT_STEP':
      return {
        ...state,
        prefs: {
          ...state.prefs,
          textStep: Math.max(-1, Math.min(3, action.payload)),
        },
      };
    case 'SET_HIGH_CONTRAST':
      return {
        ...state,
        prefs: { ...state.prefs, highContrast: action.payload },
      };
    case 'SET_UNDERLINE_LINKS':
      return {
        ...state,
        prefs: { ...state.prefs, underlineLinks: action.payload },
      };
    case 'SET_REDUCE_MOTION':
      return {
        ...state,
        prefs: { ...state.prefs, reduceMotion: action.payload },
      };
    case 'SET_DYSLEXIA_FONT':
      return {
        ...state,
        prefs: { ...state.prefs, dyslexiaFont: action.payload },
      };
    case 'RESET_A11Y':
      return {
        ...state,
        prefs: {
          lang: 'en',
          textStep: 0,
          underlineLinks: false,
          dyslexiaFont: false,
          theme: 'system',
          highContrast: 'system',
          reduceMotion: 'system',
        },
      };
    case 'SYNC_SYSTEM':
      return { ...state, system: { ...state.system, ...action.payload } };
  }
}

const STORAGE_KEY = 'sv_prefs';

const MQL_DARK = window.matchMedia('(prefers-color-scheme: dark)');
const MQL_CONTRAST = window.matchMedia('(prefers-contrast: more)');
const MQL_MOTION = window.matchMedia('(prefers-reduced-motion: reduce)');

function readSystemSnapshot(): SystemSnapshot {
  return {
    themeDark: MQL_DARK.matches,
    highContrast: MQL_CONTRAST.matches,
    reduceMotion: MQL_MOTION.matches,
  };
}

function buildInitialState(): State {
  let stored: Record<string, unknown> = {};

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) stored = JSON.parse(raw) as Record<string, unknown>;
  } catch {}

  return {
    prefs: PrefsSchema.parse(stored),
    system: readSystemSnapshot(),
  };
}

function resolvePrefs(prefs: Prefs, system: SystemSnapshot): ResolvedPrefs {
  return {
    lang: prefs.lang,
    textStep: prefs.textStep,
    underlineLinks: prefs.underlineLinks,
    dyslexiaFont: prefs.dyslexiaFont,
    themeDark:
      prefs.theme === 'system' ? system.themeDark : prefs.theme === 'dark',
    highContrast:
      prefs.highContrast === 'system'
        ? system.highContrast
        : prefs.highContrast === 'on',
    reduceMotion:
      prefs.reduceMotion === 'system'
        ? system.reduceMotion
        : prefs.reduceMotion === 'on',
  };
}

export function usePreferences() {
  const [state, dispatch] = useReducer(reducer, undefined, buildInitialState);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.prefs));
    } catch {}
  }, [state.prefs]);

  useEffect(() => {
    const onDark = (e: MediaQueryListEvent) =>
      dispatch({ type: 'SYNC_SYSTEM', payload: { themeDark: e.matches } });
    const onMotion = (e: MediaQueryListEvent) =>
      dispatch({ type: 'SYNC_SYSTEM', payload: { reduceMotion: e.matches } });
    const onContrast = (e: MediaQueryListEvent) =>
      dispatch({ type: 'SYNC_SYSTEM', payload: { highContrast: e.matches } });

    MQL_DARK.addEventListener('change', onDark);
    MQL_MOTION.addEventListener('change', onMotion);
    MQL_CONTRAST.addEventListener('change', onContrast);

    return () => {
      MQL_DARK.removeEventListener('change', onDark);
      MQL_MOTION.removeEventListener('change', onMotion);
      MQL_CONTRAST.removeEventListener('change', onContrast);
    };
  }, []);

  const setTheme = useCallback(
    (v: Prefs['theme']) => dispatch({ type: 'SET_THEME', payload: v }),
    [],
  );
  const setLang = useCallback(
    (v: Prefs['lang']) => dispatch({ type: 'SET_LANG', payload: v }),
    [],
  );
  const setTextStep = useCallback(
    (v: Prefs['textStep']) => dispatch({ type: 'SET_TEXT_STEP', payload: v }),
    [],
  );
  const setHighContrast = useCallback(
    (v: Prefs['highContrast']) =>
      dispatch({ type: 'SET_HIGH_CONTRAST', payload: v }),
    [],
  );
  const setUnderlineLinks = useCallback(
    (v: Prefs['underlineLinks']) =>
      dispatch({ type: 'SET_UNDERLINE_LINKS', payload: v }),
    [],
  );
  const setReduceMotion = useCallback(
    (v: Prefs['reduceMotion']) =>
      dispatch({ type: 'SET_REDUCE_MOTION', payload: v }),
    [],
  );
  const setDyslexiaFont = useCallback(
    (v: Prefs['dyslexiaFont']) =>
      dispatch({ type: 'SET_DYSLEXIA_FONT', payload: v }),
    [],
  );
  const resetA11y = useCallback(() => dispatch({ type: 'RESET_A11Y' }), []);

  return {
    prefs: state.prefs,
    resolved: resolvePrefs(state.prefs, state.system),
    setTheme,
    setLang,
    setTextStep,
    setHighContrast,
    setUnderlineLinks,
    setReduceMotion,
    setDyslexiaFont,
    resetA11y,
  };
}
