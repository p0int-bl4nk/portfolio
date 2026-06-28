import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
  Command,
  CommandInput,
  CommandList,
  CommandGroup,
  CommandItem,
  CommandEmpty,
} from '@/components/ui/command';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { usePortfolio } from '@/context/portfolio-context';

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

export function CommandPalette() {
  const { t } = useTranslation();
  const { motion, toggleTheme, showToast } = usePortfolio();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setOpen(prev => !prev);
      }
      if (
        e.key === '/' &&
        document.activeElement?.tagName !== 'INPUT' &&
        document.activeElement?.tagName !== 'TEXTAREA'
      ) {
        e.preventDefault();
        setOpen(true);
      }
    };
    const onEvent = () => setOpen(true);
    window.addEventListener('keydown', onKey);
    document.addEventListener('open-palette', onEvent);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.removeEventListener('open-palette', onEvent);
    };
  }, []);

  const navCommands = [
    { id: 'home', hint: '00', run: () => scrollTo('home', motion) },
    { id: 'about', hint: '01', run: () => scrollTo('about', motion) },
    { id: 'skills', hint: '02', run: () => scrollTo('skills', motion) },
    { id: 'experience', hint: '03', run: () => scrollTo('experience', motion) },
    { id: 'awards', hint: '04', run: () => scrollTo('awards', motion) },
    { id: 'education', hint: '05', run: () => scrollTo('education', motion) },
    { id: 'contact', hint: '06', run: () => scrollTo('contact', motion) },
  ];

  const actionCommands = [
    {
      id: 'copy',
      hint: 'mail',
      run: () => {
        navigator.clipboard
          .writeText('skv860254262@gmail.com')
          .then(() => {
            showToast('email copied');
          })
          .catch(() => {});
      },
    },
    {
      id: 'linkedin',
      hint: '↗',
      run: () =>
        window.open('https://linkedin.com/in/sachin-verma-16041999', '_blank'),
    },
    { id: 'theme', hint: '◑', run: toggleTheme },
  ];

  function runCommand(fn: () => void) {
    setOpen(false);
    fn();
  }

  return (
    <Dialog open={open} onOpenChange={o => setOpen(o)}>
      <DialogContent
        showCloseButton={false}
        className='p-0 border-foreground rounded-none shadow-palette top-[14vh] translate-y-0 max-w-[min(960px,92vw)]'
        size='xl'
      >
        <DialogTitle className='sr-only'>Command Palette</DialogTitle>
        <Command>
          <CommandInput
            placeholder={t('palette.placeholder')}
            className='text-sm'
          />
          <CommandList>
            <CommandEmpty className='py-5 text-center text-sm text-muted-foreground'>
              No results.
            </CommandEmpty>
            <CommandGroup heading='Navigation'>
              {navCommands.map(({ id, hint, run }) => (
                <CommandItem
                  key={id}
                  onSelect={() => runCommand(run)}
                  className='flex justify-between text-sm px-4.5 py-2.75'
                >
                  <span>{t(`cmd.${id}`)}</span>
                  <span className='text-xs text-muted-foreground'>{hint}</span>
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandGroup heading='Actions'>
              {actionCommands.map(({ id, hint, run }) => (
                <CommandItem
                  key={id}
                  onSelect={() => runCommand(run)}
                  className='flex justify-between text-sm px-4.5 py-2.75'
                >
                  <span>{t(`cmd.${id}`)}</span>
                  <span className='text-xs text-muted-foreground'>{hint}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
          <div className='flex gap-4 px-4.5 py-2.75 border-t border-border text-xs text-muted-foreground tracking-1'>
            <span>↑↓ NAVIGATE</span>
            <span>↵ SELECT</span>
            <span>ESC CLOSE</span>
          </div>
        </Command>
      </DialogContent>
    </Dialog>
  );
}
