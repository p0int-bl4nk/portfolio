import { useTranslation } from 'react-i18next';

export function AwardsSection() {
  const { t } = useTranslation();
  return (
    <section
      id='awards'
      className='py-[90px] px-6 max-xs:px-4 border-t border-border'
    >
      <div className='flex items-center gap-4 text-[12px] tracking-[2px] text-muted-foreground mb-14'>
        [ 04 / {t('sec.awards')} ]
        <span className='flex-1 h-px bg-border' />
      </div>
      <div className='border border-border'>
        {/* Awards 2-up */}
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
              <div className='text-[11px] text-muted-foreground tracking-[1px] mb-2'>
                {date}
              </div>
              <div className='text-[20px] font-bold mb-1'>{title}</div>
              <div className='text-[13px] text-muted-foreground'>{sub}</div>
            </div>
          ))}
        </div>
        {/* Certifications */}
        <div className='p-6 border-t border-border'>
          <div className='text-[11px] text-muted-foreground tracking-[1px] mb-6'>
            {t('awards.certs')}
          </div>
          <div className='grid grid-cols-1 sm:grid-cols-2'>
            {[
              { name: 'Google Cybersecurity', org: 'Coursera', year: '2023' },
              { name: 'Data Modelling', org: 'MongoDB Univ.', year: '2022' },
              { name: 'Full Stack Web Dev', org: 'U. Helsinki', year: '2022' },
              { name: 'JS Algorithms & DS', org: 'freeCodeCamp', year: '2021' },
            ].map(({ name, org, year }) => (
              <div
                key={name}
                className='flex justify-between items-center py-3 border-b border-border text-[14px]'
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
    </section>
  );
}
