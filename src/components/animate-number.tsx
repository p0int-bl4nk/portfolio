'use client';
import { animate, useInView } from 'motion/react';
import { useEffect, useRef, useState } from 'react';

type AnimateNumberProps = {
  target: number;
  decimals?: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  reducedMotion?: boolean;
  className?: string;
};

export function AnimateNumber({
  target,
  decimals = 0,
  suffix = '',
  prefix = '',
  duration = 1400,
  reducedMotion = false,
  className,
}: AnimateNumberProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const [display, setDisplay] = useState(`${prefix}0${suffix}`);

  useEffect(() => {
    if (!inView) return;
    if (reducedMotion) {
      setDisplay(`${prefix}${target.toFixed(decimals)}${suffix}`);
      return;
    }
    const controls = animate(0, target, {
      duration: duration / 1000,
      ease: [0, 0, 0.2, 1],
      onUpdate: v => setDisplay(`${prefix}${v.toFixed(decimals)}${suffix}`),
    });
    return () => controls.stop();
  }, [inView, target, decimals, suffix, prefix, duration, reducedMotion]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
