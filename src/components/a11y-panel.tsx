import { useTranslation } from 'react-i18next';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { usePortfolio } from '@/context/portfolio-context';
import { cn } from '@/lib/utils';

const ZOOM_MAP: Record<number, string> = {
  '-1': '90%',
  0: '100%',
  1: '112%',
  2: '125%',
  3: '140%',
};

function PillToggle({
  on,
  onToggle,
  labelOn,
  labelOff,
}: {
  on: boolean;
  onToggle: () => void;
  labelOn: string;
  labelOff: string;
}) {
  return (
    <button
      onClick={onToggle}
      className={cn(
        'text-xs px-[10px] py-[4px] border border-border cursor-pointer transition-colors duration-150',
        on
          ? 'bg-foreground text-background border-foreground'
          : 'bg-transparent text-foreground',
      )}
    >
      {on ? labelOn : labelOff}
    </button>
  );
}

export function A11yPanel() {
  const { t } = useTranslation();
  const {
    textStep,
    setTextStep,
    themeDark,
    toggleTheme,
    hc,
    setHc,
    ul,
    setUl,
    motion,
    setMotion,
    dys,
    setDys,
    resetA11y,
  } = usePortfolio();

  const rows = [
    {
      label: t('a11y.text'),
      control: (
        <div className='flex items-center gap-2'>
          <button
            onClick={() => setTextStep(textStep - 1)}
            disabled={textStep <= -1}
            className='border border-border text-xs px-2 py-1 cursor-pointer disabled:opacity-30'
          >
            A−
          </button>
          <span className='text-xs text-muted-foreground w-8 text-center'>
            {ZOOM_MAP[textStep]}
          </span>
          <button
            onClick={() => setTextStep(textStep + 1)}
            disabled={textStep >= 3}
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
        <div className='flex gap-2'>
          <button
            onClick={() => {
              if (themeDark) toggleTheme();
            }}
            className={cn(
              'text-xs px-[10px] py-[4px] border border-border cursor-pointer transition-colors duration-150',
              !themeDark && 'bg-foreground text-background',
            )}
          >
            LIGHT
          </button>
          <button
            onClick={() => {
              if (!themeDark) toggleTheme();
            }}
            className={cn(
              'text-xs px-[10px] py-[4px] border border-border cursor-pointer transition-colors duration-150',
              themeDark && 'bg-foreground text-background',
            )}
          >
            DARK
          </button>
        </div>
      ),
    },
    {
      label: t('a11y.contrast'),
      control: (
        <PillToggle
          on={hc}
          onToggle={() => setHc(!hc)}
          labelOn='ON'
          labelOff='OFF'
        />
      ),
    },
    {
      label: t('a11y.underline'),
      control: (
        <PillToggle
          on={ul}
          onToggle={() => setUl(!ul)}
          labelOn='ON'
          labelOff='OFF'
        />
      ),
    },
    {
      label: t('a11y.motion'),
      control: (
        <PillToggle
          on={motion}
          onToggle={() => setMotion(!motion)}
          labelOn='ON'
          labelOff='OFF'
        />
      ),
    },
    {
      label: t('a11y.font'),
      control: (
        <PillToggle
          on={dys}
          onToggle={() => setDys(!dys)}
          labelOn='ON'
          labelOff='OFF'
        />
      ),
    },
  ];

  return (
    <Popover>
      <PopoverTrigger
        className='fixed left-4.5 bottom-4.5 z-[90] size-12.5 rounded-full border border-border bg-background text-foreground text-xs font-bold shadow-nav cursor-pointer hover:bg-foreground hover:text-background transition-colors duration-150 flex items-center justify-center'
        aria-label='Accessibility options'
      >
        A11Y
      </PopoverTrigger>
      <PopoverContent
        side='top'
        align='start'
        className='w-[304px] p-0 border-border rounded-none shadow-toast'
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
