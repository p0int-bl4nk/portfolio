import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { SectionLabel } from '@/components/section';
import { usePortfolio } from '@/context/portfolio-context';
import { useTypingEffect, useCountUp } from '@/hooks';

export function HeroSection() {
  const { t } = useTranslation();
  const { motion } = usePortfolio();

  const words = useMemo(
    () => t('typed', { returnObjects: true }) as string[],
    [t],
  );
  const typed = useTypingEffect(words, motion);

  const years = useCountUp(5, { suffix: '+', duration: 1400, motion });
  const awards = useCountUp(2, { suffix: '×', duration: 1400, motion });
  const coverage = useCountUp(94, { suffix: '%', duration: 1400, motion });

  return (
    <section
      id='home'
      className='min-h-screen flex flex-col justify-center pt-24 md:pt-13.5 px-6 max-xs:px-4'
    >
      {/* Meta row */}
      <div className='flex flex-wrap justify-between gap-2 text-xs tracking-2 text-muted-foreground border-b border-border pb-5 mb-10'>
        <span>{t('hero.role')}</span>
        <span>{t('hero.disc')}</span>
        <span>{t('hero.loc')}</span>
        <span>EST. 2021</span>
      </div>

      <SectionLabel no='00' label={t('sec.index')} className='mb-8' />

      {/* Hero name */}
      <h1
        className='font-black leading-display tracking-heading mb-10'
        style={{ fontSize: 'clamp(56px, 12.5vw, 184px)' }}
      >
        SACHIN
        <br />
        VERMA
      </h1>

      {/* Lead + stats row */}
      <div className='flex flex-col md:flex-row gap-10 mb-16 border-border border-t'>
        <div className='max-w-[560px]'>
          <p
            className='text-base leading-body-lg pt-5 mb-0'
            dangerouslySetInnerHTML={{ __html: t('hero.lead') }}
          />
          <div className='mt-4.5 text-sm text-muted-foreground'>
            $ {t('hero.building')}{' '}
            <span className='text-foreground whitespace-nowrap'>{typed}</span>
            <span
              className='inline-block w-[8px] h-[15px] bg-foreground align-[-2px] ml-px'
              style={{
                animation: motion ? 'none' : 'blink 1s step-end infinite',
              }}
            />
          </div>
        </div>

        {/* Stats */}
        <div className='flex gap-9 items-start pt-5'>
          {[
            { hook: years, label: 'YEARS' },
            { hook: awards, label: 'AWARDS' },
            { hook: coverage, label: 'COVERAGE' },
          ].map(({ hook, label }) => (
            <div key={label} ref={hook.ref} className='cursor-default'>
              <div className='text-4xl font-bold leading-none'>
                {hook.display}
              </div>
              <div className='text-xs text-muted-foreground tracking-1 mt-1'>
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll hint */}
      <div className='flex items-center gap-3 text-xs text-muted-foreground tracking-2 pb-8'>
        <span className='inline-block w-px h-[26px] bg-muted-foreground' />
        {t('hero.scroll')}
      </div>
    </section>
  );
}
