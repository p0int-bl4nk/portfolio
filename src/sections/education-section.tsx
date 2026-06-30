import { useTranslation } from 'react-i18next';

import { Section, SectionLabel } from '@/components/section';

export function EducationSection() {
  const { t } = useTranslation();
  return (
    <Section id='education'>
      <SectionLabel no='05' label={t('sec.education')} className='mb-14' />
      <div>
        {[
          {
            dates: '2020–2021',
            degree: t('edu.d1'),
            inst: 'Awadhesh Pratap Singh University, Rewa, M.P.',
            score: '9.67',
            unit: t('edu.gpa'),
          },
          {
            dates: '2017–2020',
            degree: t('edu.d2'),
            inst: 'Government Model Science College, Rewa, M.P.',
            score: '69%',
            unit: '',
          },
        ].map(({ dates, degree, inst, score, unit }) => (
          <div
            key={dates}
            className='grid grid-cols-1 sm:grid-cols-[120px_1fr_auto] gap-4 py-6 border-b border-border items-start'
          >
            <div className='text-xs text-muted-foreground'>{dates}</div>
            <div>
              <div className='text-lg font-bold mb-1'>{degree}</div>
              <div className='text-sm text-muted-foreground'>{inst}</div>
            </div>
            <div className='text-right'>
              <div className='text-2xl font-bold'>{score}</div>
              <div className='text-xs text-muted-foreground tracking-1'>
                {unit}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
