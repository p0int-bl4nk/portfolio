import { useEffect, useRef } from 'react';

const SEQUENCE = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'b',
  'a',
];

export function useKonami(onMatch: () => void) {
  const buf = useRef<string[]>([]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      buf.current.push(e.key);
      if (buf.current.length > SEQUENCE.length) buf.current.shift();
      if (
        buf.current.join(',').toLowerCase() === SEQUENCE.join(',').toLowerCase()
      ) {
        buf.current = [];
        onMatch();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onMatch]);
}
