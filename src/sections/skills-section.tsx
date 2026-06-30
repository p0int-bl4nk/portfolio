import { useTranslation } from 'react-i18next';

import { AnimateNumber } from '@/components/animate-number';
import { Section, SectionLabel } from '@/components/section';
import { usePortfolio } from '@/context/portfolio-context';
import { SKILL_GROUPS } from '@/lib/constants';

export function SkillsSection() {
  const { t } = useTranslation();
  const { motion } = usePortfolio();

  return (
    <Section id='skills'>
      <SectionLabel no='02' label={t('sec.skills')} className='mb-5' />
      <p className='text-xs text-muted-foreground mb-11.5 cursor-default'>
        <AnimateNumber
          target={40}
          suffix='+'
          duration={1400}
          reducedMotion={motion}
          className='text-foreground font-black'
        />
        {t('skills.intro')}
      </p>
      <div className='grid grid-cols-1 md:grid-cols-2'>
        {SKILL_GROUPS.map(({ no, key, items }) => (
          <div
            key={key}
            className='grid grid-cols-1 sm:grid-cols-[140px_1fr] border-b border-border py-4 gap-3'
          >
            <div className='text-xs'>
              <span className='text-muted-foreground'>{no}</span>{' '}
              <span className='font-black'>{t(key)}</span>
            </div>
            <div className='flex flex-wrap gap-2 items-start'>
              {items.map(item => (
                <span
                  key={item}
                  className='text-xs border border-border px-2.75 py-1.5 cursor-default transition-colors duration-150 hover:bg-foreground hover:text-background hover:border-foreground'
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
