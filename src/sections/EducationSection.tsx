import { useTranslation } from 'react-i18next';

export function EducationSection() {
  const { t } = useTranslation();
  return (
    <section
      id='education'
      className='py-[90px] px-6 max-xs:px-4 border-t border-border'
    >
      <div className='flex items-center gap-4 text-[12px] tracking-[2px] text-muted-foreground mb-14'>
        [ 05 / {t('sec.education')} ]
        <span className='flex-1 h-px bg-border' />
      </div>
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
            unit: t('edu.score'),
          },
        ].map(({ dates, degree, inst, score, unit }) => (
          <div
            key={dates}
            className='grid grid-cols-1 sm:grid-cols-[120px_1fr_auto] gap-4 py-6 border-b border-border items-start'
          >
            <div className='text-[12px] text-muted-foreground'>{dates}</div>
            <div>
              <div className='text-[18px] font-bold mb-1'>{degree}</div>
              <div className='text-[14px] text-muted-foreground'>{inst}</div>
            </div>
            <div className='text-right'>
              <div className='text-[22px] font-bold'>{score}</div>
              <div className='text-[11px] text-muted-foreground tracking-[1px]'>
                {unit}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
