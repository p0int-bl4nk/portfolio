import { useTranslation } from 'react-i18next';
import { usePortfolio } from '../context/portfolio-context';
import { useCountUp } from '../hooks/use-count-up';
import { useTypingEffect } from '../hooks/use-typing-effect';

function SectionLabel({ no, label }: { no: string; label: string }) {
  return (
    <div className='flex items-center gap-4 text-[12px] tracking-[2px] text-muted-foreground mb-8'>
      [ {no} / {label} ]
      <span className='flex-1 h-px bg-border' />
    </div>
  );
}

export function HeroSection() {
  const { t } = useTranslation();
  const { motion } = usePortfolio();

  const words = t('typed', { returnObjects: true }) as string[];
  const typed = useTypingEffect(words, motion);

  const years = useCountUp(5, { suffix: '+', duration: 1400 });
  const awards = useCountUp(2, { suffix: '×', duration: 1400 });
  const coverage = useCountUp(94, { suffix: '%', duration: 1400 });

  return (
    <section
      id='home'
      className='min-h-screen flex flex-col justify-center pt-[54px] px-6 max-xs:px-4'
    >
      {/* Meta row */}
      <div className='flex flex-wrap justify-between gap-2 text-[12px] tracking-[2px] text-muted-foreground border-b border-border pb-5 mb-10'>
        <span>{t('hero.role')}</span>
        <span>{t('hero.disc')}</span>
        <span>{t('hero.loc')}</span>
        <span>EST. 2021</span>
      </div>

      <SectionLabel no='00' label={t('sec.index')} />

      {/* Hero name */}
      <h1
        className='font-black leading-[.86] tracking-[-0.045em] mb-10'
        style={{ fontSize: 'clamp(56px, 12.5vw, 184px)' }}
      >
        SACHIN
        <br />
        VERMA
      </h1>

      {/* Lead + stats row */}
      <div className='flex flex-col md:flex-row gap-10 mb-16'>
        <div className='max-w-[560px]'>
          <p
            className='text-[15px] leading-[1.85] border-t border-border pt-5 mb-0'
            dangerouslySetInnerHTML={{ __html: t('hero.lead') }}
          />
          <div className='mt-[18px] text-[14px] text-muted-foreground'>
            $ <span>{t('hero.building')}</span>{' '}
            <span className='text-foreground'>{typed}</span>
            <span
              className='inline-block w-[8px] h-[15px] bg-foreground align-[-2px] ml-[1px]'
              style={{
                animation: motion ? 'none' : 'blink 1s step-end infinite',
              }}
            />
          </div>
        </div>

        {/* Stats */}
        <div className='flex gap-9 items-start pt-5'>
          {(
            [
              { hook: years, label: 'YEARS' },
              { hook: awards, label: 'AWARDS' },
              { hook: coverage, label: 'COVERAGE' },
            ] as const
          ).map(({ hook, label }) => (
            <div
              key={label}
              className='cursor-default'
              onMouseEnter={() => hook.start(motion)}
            >
              <div className='text-[34px] font-bold leading-none'>
                {hook.display}
              </div>
              <div className='text-[11px] text-muted-foreground tracking-[1px] mt-1'>
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll hint */}
      <div className='flex items-center gap-3 text-[11px] text-muted-foreground tracking-[2px]'>
        <span className='inline-block w-px h-[26px] bg-muted-foreground' />
        {t('hero.scroll')}
      </div>
    </section>
  );
}
