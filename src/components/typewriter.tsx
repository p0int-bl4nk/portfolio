'use client';
import { animate, motion } from 'motion/react';
import { useEffect, useState } from 'react';

type TypewriterProps = {
  words: string[];
  reducedMotion?: boolean;
  className?: string;
};

export function Typewriter({
  words,
  reducedMotion = false,
  className,
}: TypewriterProps) {
  const [text, setText] = useState(words[0] ?? '');

  useEffect(() => {
    if (!words.length) return;

    if (reducedMotion) {
      setText(words[0] ?? '');
      return;
    }

    let cancelled = false;
    let w = 0;

    async function cycle() {
      while (!cancelled) {
        const word = words[w] ?? '';

        await animate(0, word.length, {
          duration: word.length * 0.07,
          ease: 'linear',
          onUpdate: v => {
            if (!cancelled) setText(word.slice(0, Math.round(v)));
          },
        });

        await new Promise<void>(r => setTimeout(r, 1400));
        if (cancelled) break;

        await animate(word.length, 0, {
          duration: word.length * 0.035,
          ease: 'linear',
          onUpdate: v => {
            if (!cancelled) setText(word.slice(0, Math.round(v)));
          },
        });

        await new Promise<void>(r => setTimeout(r, 250));
        if (cancelled) break;

        w = (w + 1) % words.length;
      }
    }

    void cycle();
    return () => {
      cancelled = true;
    };
  }, [words, reducedMotion]);

  return (
    <span className={className}>
      {text}
      <motion.span
        className='inline-block w-2 h-3.75 bg-foreground align-[-2px] ml-px'
        animate={reducedMotion ? {} : { opacity: [1, 0] }}
        transition={{
          duration: 0.5,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'linear',
        }}
      />
    </span>
  );
}
