import { useCallback, useEffect, useRef, useState } from 'react';

interface Options {
  decimals?: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  steps?: number;
}

export function useCountUp(target: number, options: Options = {}) {
  const {
    decimals = 0,
    suffix = '',
    prefix = '',
    duration = 1400,
    steps = 40,
  } = options;
  const final = `${prefix}${target.toFixed(decimals)}${suffix}`;
  const [display, setDisplay] = useState(`${prefix}0${suffix}`);
  const triggered = useRef(false);
  const iv = useRef<ReturnType<typeof setInterval> | undefined>(undefined);

  const start = useCallback(
    (motion: boolean) => {
      if (triggered.current) return;
      triggered.current = true;
      if (motion) {
        setDisplay(final);
        return;
      }
      let i = 0;
      iv.current = setInterval(() => {
        i++;
        const t = Math.min(1, i / steps);
        const e = 1 - Math.pow(1 - t, 3);
        setDisplay(`${prefix}${(target * e).toFixed(decimals)}${suffix}`);
        if (t >= 1) {
          clearInterval(iv.current);
          setDisplay(final);
        }
      }, duration / steps);
    },
    [target, decimals, suffix, prefix, duration, steps, final],
  );

  useEffect(() => {
    return () => {
      if (iv.current !== undefined) clearInterval(iv.current);
    };
  }, []);

  return { display, start };
}
