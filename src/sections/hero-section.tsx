import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { AnimateNumber } from '@/components/animate-number';
import { SectionLabel } from '@/components/section';
import { Typewriter } from '@/components/typewriter';
import { usePreference } from '@/context/portfolio-context';
import { STATS } from '@/lib/constants';

export function HeroSection() {
  const { t } = useTranslation();
  const { resolved } = usePreference();

  const words = useMemo(
    () => t('typed', { returnObjects: true }) as string[],
    [t],
  );

  return (
    <section
      id='home'
      className='min-h-screen flex flex-col justify-center pt-24 md:pt-13.5 px-6 max-xs:px-4'
    >
      <div className='flex flex-wrap justify-between gap-2 text-xs tracking-2 text-muted-foreground border-b border-border pb-5 mb-10'>
        <span>{t('hero.role')}</span>
        <span>{t('hero.disc')}</span>
        <span>{t('hero.loc')}</span>
        <span>EST. 2021</span>
      </div>

      <SectionLabel no='00' label={t('sec.index')} className='mb-8' />

      <h1
        className='font-black leading-display tracking-heading mb-10'
        style={{ fontSize: 'clamp(56px, 12.5vw, 184px)' }}
      >
        SACHIN
        <br />
        VERMA
      </h1>

      <div className='flex flex-col md:flex-row gap-10 mb-16 border-border border-t'>
        <div className='max-w-140'>
          <p
            className='text-base leading-body-lg pt-5 mb-0'
            dangerouslySetInnerHTML={{ __html: t('hero.lead') }}
          />
          <div className='mt-4.5 text-sm text-muted-foreground'>
            $ {t('hero.building')}{' '}
            <Typewriter
              words={words}
              reducedMotion={resolved.reduceMotion}
              className='text-foreground whitespace-nowrap'
            />
          </div>
        </div>

        <div className='flex gap-9 items-start pt-5'>
          {STATS.map(({ target, suffix, label }) => (
            <div key={label} className='cursor-default'>
              <div className='text-4xl font-bold leading-none'>
                <AnimateNumber
                  target={target}
                  suffix={suffix}
                  duration={1400}
                  reducedMotion={resolved.reduceMotion}
                />
              </div>
              <div className='text-xs text-muted-foreground tracking-1 mt-1'>
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className='flex items-center gap-3 text-xs text-muted-foreground tracking-2 pb-8'>
        <span className='inline-block w-px h-6.5 bg-muted-foreground' />
        {t('hero.scroll')}
      </div>
    </section>
  );
}
