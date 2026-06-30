import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { usePortfolio } from '@/context/portfolio-context';
import { config } from '@/lib/config';
import { SECTIONS } from '@/lib/constants.ts';
import { scrollTo } from '@/lib/utils.ts';

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
    {
      id: SECTIONS.home,
      hint: '00',
      run() {
        scrollTo(this.id, motion);
      },
    },
    {
      id: SECTIONS.about,
      hint: '01',
      run() {
        scrollTo(this.id, motion);
      },
    },
    {
      id: SECTIONS.skills,
      hint: '02',
      run() {
        scrollTo(this.id, motion);
      },
    },
    {
      id: SECTIONS.experience,
      hint: '03',
      run() {
        scrollTo(this.id, motion);
      },
    },
    {
      id: SECTIONS.awards,
      hint: '04',
      run() {
        scrollTo(this.id, motion);
      },
    },
    {
      id: SECTIONS.education,
      hint: '05',
      run() {
        scrollTo(this.id, motion);
      },
    },
    {
      id: SECTIONS.contact,
      hint: '06',
      run() {
        scrollTo(this.id, motion);
      },
    },
  ];

  const actionCommands = [
    {
      id: 'copy-email',
      hint: 'mail',
      run: () => {
        navigator.clipboard
          .writeText(config.EMAIL)
          .then(() => {
            showToast('email copied');
          })
          .catch(() => {});
      },
    },
    {
      id: 'copy-phone',
      hint: 'tel',
      run: () => {
        navigator.clipboard
          .writeText(config.PHONE)
          .then(() => {
            showToast('phone copied');
          })
          .catch(() => {});
      },
    },
    {
      id: 'linkedin',
      hint: '↗',
      run: () => window.open(config.LINKEDIN_URL, '_blank'),
    },
    {
      id: 'github',
      hint: '↗',
      run: () => window.open(config.GITHUB_URL, '_blank'),
    },
    {
      id: 'source',
      hint: '↗',
      run: () => window.open(config.SOURCE_URL, '_blank'),
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
