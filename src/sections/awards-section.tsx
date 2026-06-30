import { useTranslation } from 'react-i18next';

import { Section, SectionLabel } from '@/components/section';

export function AwardsSection() {
  const { t } = useTranslation();
  return (
    <Section id='awards'>
      <SectionLabel no='04' label={t('sec.awards')} className='mb-14' />
      <div className='border border-border'>
        <div className='grid grid-cols-1 md:grid-cols-2'>
          {[
            {
              date: 'SEP 2024',
              title: 'Extra Mile Award',
              sub: 'H1 2024 · Policybazaar',
            },
            {
              date: 'MAR 2023',
              title: 'Rising Star Award',
              sub: 'H2 2022 · Policybazaar',
            },
          ].map(({ date, title, sub }, i) => (
            <div
              key={i}
              className='p-6 border-b border-border [&:nth-child(odd)]:border-r [&:nth-child(odd)]:md:border-r'
            >
              <div className='text-xs text-muted-foreground tracking-1 mb-2'>
                {date}
              </div>
              <div className='text-xl font-bold mb-1'>{title}</div>
              <div className='text-sm text-muted-foreground'>{sub}</div>
            </div>
          ))}
        </div>
        <div className='p-6 border-t border-border'>
          <div className='text-xs text-muted-foreground tracking-1 mb-6'>
            {t('awards.certs')}
          </div>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-x-8'>
            {[
              { name: 'Google Cybersecurity', org: 'Coursera', year: '2023' },
              { name: 'Data Modelling', org: 'MongoDB Univ.', year: '2022' },
              { name: 'Full Stack Web Dev', org: 'U. Helsinki', year: '2022' },
              { name: 'JS Algorithms & DS', org: 'freeCodeCamp', year: '2021' },
            ].map(({ name, org, year }) => (
              <div
                key={name}
                className='flex justify-between items-center py-3 border-b border-border text-sm'
              >
                <span>
                  {name} <span className='text-muted-foreground'>· {org}</span>
                </span>
                <span className='text-muted-foreground'>{year}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
