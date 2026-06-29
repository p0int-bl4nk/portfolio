import { useEffect, useState } from 'react';

export function useTypingEffect(words: string[], motion: boolean): string {
  const [text, setText] = useState(motion ? (words[0] ?? '') : '');

  useEffect(() => {
    if (!words.length) return;
    if (motion) {
      setText(words[0]);
      return;
    }

    const controller = new AbortController();
    const { signal } = controller;
    let w = 0,
      c = 0,
      deleting = false;
    let timer: ReturnType<typeof setTimeout>;

    const tick = () => {
      if (signal.aborted) return;

      const word = words[w] ?? '';
      setText(word.slice(0, c));

      if (!deleting) {
        if (c < word.length) {
          c++;
          timer = setTimeout(tick, 70);
        } else {
          deleting = true;
          timer = setTimeout(tick, 1400);
        }
      } else {
        if (c > 0) {
          c--;
          timer = setTimeout(tick, 35);
        } else {
          deleting = false;
          w = (w + 1) % words.length;
          timer = setTimeout(tick, 250);
        }
      }
    };
    tick();

    return () => {
      controller.abort();
      clearTimeout(timer);
    };
  }, [words, motion]);

  return text;
}
