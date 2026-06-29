import { useEffect, useRef, useState } from 'react';

export function useActiveSection(ids: string[]): string {
  const [active, setActive] = useState(ids[0] ?? '');
  const intersecting = useRef<Set<string>>(new Set());

  useEffect(() => {
    if (!ids.length) return;

    // rootMargin shifts the detection line to ~42% from the top, matching the old scroll logic.
    const observer = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            intersecting.current.add(entry.target.id);
          } else {
            intersecting.current.delete(entry.target.id);
          }
        }
        // Pick the first id in document order that is currently intersecting.
        const next = ids.find(id => intersecting.current.has(id));
        if (next) setActive(next);
      },
      { rootMargin: '-42% 0px -58% 0px' },
    );

    const elements = ids
      .map(id => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];
    elements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, [ids]);

  return active;
}
