import { useTranslation } from 'react-i18next';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { usePreferences } from '@/hooks/use-preferences';
import type { TriStatePref, Prefs } from '@/hooks/use-preferences';
import { cn } from '@/lib/utils';

const ZOOM_MAP: Record<number, string> = {
  '-1': '90%',
  0: '100%',
  1: '112%',
  2: '125%',
  3: '140%',
};

function SegmentControl<T extends string>({
  value,
  options,
  onChange,
}: {
  value: T;
  options: { value: T; label: string }[];
  onChange: (v: T) => void;
}) {
  return (
    <div className='flex'>
      {options.map(opt => (
        <button
          key={opt.value}
          onClick={() => onChange(opt.value)}
          className={cn(
            'text-xs px-2.5 py-1 border-y border-r border-border first:border-l cursor-pointer transition-colors duration-150',
            value === opt.value
              ? 'bg-foreground text-background'
              : 'bg-transparent text-foreground hover:bg-muted',
          )}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

const THEME_OPTIONS: { value: Prefs['theme']; label: string }[] = [
  { value: 'light', label: 'LIGHT' },
  { value: 'system', label: 'SYS' },
  { value: 'dark', label: 'DARK' },
];

const TRISTATE_OPTIONS: { value: TriStatePref; label: string }[] = [
  { value: 'off', label: 'OFF' },
  { value: 'system', label: 'SYS' },
  { value: 'on', label: 'ON' },
];

const ON_OFF_OPTIONS = [
  { value: 'off', label: 'OFF' },
  { value: 'on', label: 'ON' },
];

export function A11yPanel() {
  const { t } = useTranslation();
  const {
    prefs,
    setTheme,
    setTextStep,
    setHighContrast,
    setUnderlineLinks,
    setReduceMotion,
    setDyslexiaFont,
    resetA11y,
  } = usePreferences();

  const rows = [
    {
      label: t('a11y.text'),
      control: (
        <div className='flex items-center gap-2'>
          <button
            onClick={() => setTextStep(prefs.textStep - 1)}
            disabled={prefs.textStep <= -1}
            className='border border-border text-xs px-2 py-1 cursor-pointer disabled:opacity-30'
          >
            A−
          </button>
          <span className='text-xs text-muted-foreground w-8 text-center'>
            {ZOOM_MAP[prefs.textStep]}
          </span>
          <button
            onClick={() => setTextStep(prefs.textStep + 1)}
            disabled={prefs.textStep >= 3}
            className='border border-border text-xs px-2 py-1 cursor-pointer disabled:opacity-30'
          >
            A+
          </button>
        </div>
      ),
    },
    {
      label: t('a11y.theme'),
      control: (
        <SegmentControl
          value={prefs.theme}
          options={THEME_OPTIONS}
          onChange={setTheme}
        />
      ),
    },
    {
      label: t('a11y.contrast'),
      control: (
        <SegmentControl
          value={prefs.highContrast}
          options={TRISTATE_OPTIONS}
          onChange={setHighContrast}
        />
      ),
    },
    {
      label: t('a11y.underline'),
      control: (
        <SegmentControl
          value={prefs.underlineLinks ? 'on' : 'off'}
          options={ON_OFF_OPTIONS}
          onChange={v => setUnderlineLinks(v === 'on')}
        />
      ),
    },
    {
      label: t('a11y.motion'),
      control: (
        <SegmentControl
          value={prefs.reduceMotion}
          options={TRISTATE_OPTIONS}
          onChange={setReduceMotion}
        />
      ),
    },
    {
      label: t('a11y.font'),
      control: (
        <SegmentControl
          value={prefs.dyslexiaFont ? 'on' : 'off'}
          options={ON_OFF_OPTIONS}
          onChange={v => setDyslexiaFont(v === 'on')}
        />
      ),
    },
  ];

  return (
    <Popover>
      <PopoverTrigger
        className='fixed left-4.5 bottom-4.5 z-90 size-12.5 rounded-full border border-border bg-background text-foreground text-xs font-bold shadow-nav cursor-pointer hover:bg-foreground hover:text-background transition-colors duration-150 flex items-center justify-center'
        aria-label='Accessibility options'
      >
        A11Y
      </PopoverTrigger>
      <PopoverContent
        side='top'
        align='start'
        className='w-76 p-0 border-border rounded-none shadow-toast'
      >
        <div className='px-4 py-3 border-b border-border text-xs tracking-1 font-bold'>
          {t('a11y.title')}
        </div>
        {rows.map(({ label, control }) => (
          <div
            key={label}
            className='flex justify-between items-center px-4 py-3 border-b border-border'
          >
            <span className='text-xs text-muted-foreground'>{label}</span>
            {control}
          </div>
        ))}
        <div className='px-4 py-3'>
          <button
            onClick={resetA11y}
            className='w-full text-xs border border-border py-2 cursor-pointer hover:bg-foreground hover:text-background transition-colors duration-150'
          >
            {t('a11y.reset')}
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
