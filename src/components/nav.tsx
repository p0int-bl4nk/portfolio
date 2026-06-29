import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { usePortfolio } from '@/context/portfolio-context';
import { useActiveSection } from '@/hooks';
import { cn } from '@/lib/utils';

const SECTION_IDS = [
  'home',
  'about',
  'skills',
  'experience',
  'awards',
  'education',
  'contact',
];
const LANG_DEFS = [
  ['en', 'English'],
  ['hi', 'हिन्दी'],
  ['es', 'Español'],
  ['fr', 'Français'],
] as const;
const LANG_CODE: Record<string, string> = {
  en: 'EN',
  hi: 'हिं',
  es: 'ES',
  fr: 'FR',
};

function scrollTo(id: string, motion: boolean) {
  if (id === 'home') {
    window.scrollTo({ top: 0, behavior: motion ? 'auto' : 'smooth' });
    return;
  }
  const el = document.getElementById(id);
  if (!el) return;
  const y = el.getBoundingClientRect().top + window.scrollY - 54;
  window.scrollTo({ top: y, behavior: motion ? 'auto' : 'smooth' });
}

function useClock() {
  const [time, setTime] = useState('');
  useEffect(() => {
    const update = () => {
      setTime(
        new Date().toLocaleTimeString('en-GB', {
          timeZone: 'Asia/Kolkata',
          hour12: false,
        }),
      );
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

export function Nav() {
  const { t } = useTranslation();
  const { lang, setLang, toggleTheme, themeDark, motion } = usePortfolio();
  const active = useActiveSection(SECTION_IDS);
  const clock = useClock();

  const NAV_LINKS = [
    { id: 'about', label: t('nav.about'), no: '01' },
    { id: 'skills', label: t('nav.skills'), no: '02' },
    { id: 'experience', label: t('nav.work'), no: '03' },
    { id: 'awards', label: t('nav.awards'), no: '04' },
    { id: 'education', label: t('nav.edu'), no: '05' },
    { id: 'contact', label: t('nav.contact'), no: '06' },
  ];

  return (
    <nav className='fixed top-0 left-0 right-0 h-13.5 z-50 border-b border-border bg-background/90 backdrop-blur-[6px] backdrop-saturate-[180%]'>
      <div className='mx-auto max-w-310 h-full px-6 flex items-center justify-between gap-4'>
        <button
          onClick={() => scrollTo('home', motion)}
          className='flex items-center gap-2 shrink-0 cursor-pointer bg-transparent border-0 p-0'
        >
          <span className='flex items-center justify-center size-5.5 border-[1.5px] border-foreground text-xs font-bold leading-none'>
            SV
          </span>
          <span className='text-xs font-bold tracking-1'>SACHIN VERMA</span>
        </button>

        <div className='hidden md:flex items-center gap-5'>
          {NAV_LINKS.map(({ id, label, no }) => (
            <button
              key={id}
              onClick={() => scrollTo(id, motion)}
              className={cn(
                'text-xs text-foreground transition-opacity duration-200 cursor-pointer bg-transparent border-0 p-0',
                active === id ? 'opacity-100' : 'opacity-50 hover:opacity-100',
              )}
            >
              <span className='text-muted-foreground'>{no}</span> {label}
            </button>
          ))}
        </div>

        <div className='flex items-center gap-2 shrink-0'>
          {clock && (
            <span className='hidden sm:block text-xs text-muted-foreground tabular-nums'>
              IST {clock}
            </span>
          )}

          <DropdownMenu>
            <DropdownMenuTrigger
              aria-label='Select language'
              className='border border-border text-xs px-2.25 py-1.25 bg-transparent cursor-pointer'
            >
              {LANG_CODE[lang] ?? 'EN'} ▾
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end' className='min-w-30'>
              {LANG_DEFS.map(([code, label]) => (
                <DropdownMenuItem
                  key={code}
                  onClick={() => setLang(code)}
                  className={cn('text-xs', lang === code && 'bg-muted')}
                >
                  {label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <button
            onClick={toggleTheme}
            className='border border-border text-xs px-2.25 py-1.25 bg-transparent cursor-pointer'
          >
            {themeDark ? 'LIGHT' : 'DARK'}
          </button>

          <button
            aria-label='Open command palette'
            onClick={() =>
              document.dispatchEvent(new CustomEvent('open-palette'))
            }
            className='hidden xs:block border border-border text-xs px-2.25 py-1.25 bg-transparent cursor-pointer'
          >
            ⌘K
          </button>
        </div>
      </div>
    </nav>
  );
}
