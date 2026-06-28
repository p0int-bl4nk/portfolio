import { useTranslation } from 'react-i18next';

import { Section, SectionLabel } from '@/components/section';

export function AboutSection() {
  const { t } = useTranslation();
  return (
    <Section id='about'>
      <SectionLabel no='01' label={t('sec.about')} className='mb-14' />
      <div className='grid grid-cols-1 md:grid-cols-[1fr_1.4fr] gap-[60px]'>
        <div>
          <p className='text-[26px] font-bold leading-[1.35] tracking-[-0.02em]'>
            {t('about.big')}
          </p>
        </div>
        <div>
          <p className='text-[15px] leading-[1.95] mb-[18px]'>
            {t('about.p1')}
          </p>
          <p className='text-[15px] leading-[1.95] text-muted-foreground mb-[34px]'>
            {t('about.p2')}
          </p>
          {/* 2×2 fact grid */}
          <div className='grid grid-cols-2 border-t border-l border-border'>
            {[
              {
                label: t('about.current_l'),
                value: 'SDE II · Policybazaar',
                valueClass: '',
              },
              {
                label: t('about.focus_l'),
                value: t('about.focus_v'),
                valueClass: '',
              },
              {
                label: t('about.based_l'),
                value: t('about.based_v'),
                valueClass: '',
              },
              {
                label: t('about.status_l'),
                value: t('about.status_v'),
                dot: true,
                valueClass: '',
              },
            ].map(({ label, value, dot }, i) => (
              <div key={i} className='border-r border-b border-border p-[14px]'>
                <div className='text-[11px] text-muted-foreground tracking-[1px] mb-1'>
                  {label}
                </div>
                <div className='text-[14px] flex items-center gap-[7px]'>
                  {dot && (
                    <span className='size-[7px] rounded-full bg-accent-green shrink-0' />
                  )}
                  {value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
