import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

import { SECTIONS } from '@/lib/constants';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function scrollTo(id: string, motion: boolean) {
  if (id === SECTIONS.home) {
    window.scrollTo({ top: 0, behavior: motion ? 'auto' : 'smooth' });
    return;
  }
  const el = document.getElementById(id);
  if (!el) return;
  const y = el.getBoundingClientRect().top + window.scrollY - 54;
  window.scrollTo({ top: y, behavior: motion ? 'auto' : 'smooth' });
}
