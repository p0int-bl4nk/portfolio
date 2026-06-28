import { useEffect, useRef, useState } from 'react';

interface Options {
  decimals?: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  steps?: number;
  motion?: boolean;
}

export function useCountUp(target: number, options: Options = {}) {
  const {
    decimals = 0,
    suffix = '',
    prefix = '',
    duration = 1400,
    steps = 40,
    motion = false,
  } = options;
  const final = `${prefix}${target.toFixed(decimals)}${suffix}`;
  const [display, setDisplay] = useState(`${prefix}0${suffix}`);
  const triggered = useRef(false);
  const iv = useRef<ReturnType<typeof setInterval> | undefined>(undefined);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || triggered.current) return;
        triggered.current = true;
        observer.disconnect();
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
      { threshold: 0.3 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target, decimals, suffix, prefix, duration, steps, final, motion]);

  useEffect(() => {
    return () => {
      if (iv.current !== undefined) clearInterval(iv.current);
    };
  }, []);

  return { display, ref };
}
