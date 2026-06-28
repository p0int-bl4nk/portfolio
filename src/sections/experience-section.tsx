import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Section, SectionLabel } from '@/components/section';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from '@/components/ui/accordion';
import { usePortfolio } from '@/context/portfolio-context';
import { useCountUp } from '@/hooks/use-count-up';
import { cn } from '@/lib/utils';

function Metric({
  prefix = '',
  target,
  decimals = 0,
  suffix = '',
  label,
  motion,
}: {
  prefix?: string;
  target: number;
  decimals?: number;
  suffix: string;
  label: string;
  motion: boolean;
}) {
  const { display, ref } = useCountUp(target, {
    prefix,
    decimals,
    suffix,
    motion,
  });
  return (
    <div ref={ref} className='py-[22px] px-[18px] cursor-default'>
      <div className='text-[38px] font-black leading-none'>{display}</div>
      <div className='text-[11px] text-muted-foreground tracking-[1px] mt-1'>
        {label}
      </div>
    </div>
  );
}

const BULLETS_R1 = [
  'exp.r1b1',
  'exp.r1b2',
  'exp.r1b3',
  'exp.r1b4',
  'exp.r1b5',
  'exp.r1b6',
  'exp.r1b7',
];
const BULLETS_R2 = ['exp.r2b1', 'exp.r2b2', 'exp.r2b3', 'exp.r2b4'];

export function ExperienceSection() {
  const { t } = useTranslation();
  const { motion } = usePortfolio();
  const [open, setOpen] = useState<string[]>(['role-1']);

  return (
    <Section id='experience'>
      <SectionLabel no='03' label={t('sec.experience')} className='mb-[46px]' />

      {/* Metrics band */}
      <div className='grid grid-cols-2 sm:grid-cols-4 border-y border-foreground mb-[60px]'>
        {[
          { prefix: '↓', target: 90, suffix: '%', labelKey: 'exp.manual' },
          { prefix: '↓', target: 60, suffix: '%', labelKey: 'exp.latency' },
          { prefix: '', target: 94, suffix: '%', labelKey: 'exp.coverage' },
          { prefix: '', target: 100, suffix: '%', labelKey: 'exp.typesafe' },
        ].map(({ prefix, target, suffix, labelKey }, i) => (
          <div key={labelKey} className={cn(i < 3 && 'border-r border-border')}>
            <Metric
              prefix={prefix}
              target={target}
              suffix={suffix}
              label={t(labelKey)}
              motion={motion}
            />
          </div>
        ))}
      </div>

      {/* Accordion */}
      <Accordion
        multiple
        value={open}
        onValueChange={value => setOpen(value as string[])}
      >
        {[
          {
            value: 'role-1',
            date: t('exp.r1date'),
            title: t('exp.r1title'),
            employer: 'Policybazaar · Gurugram, Haryana',
            bullets: BULLETS_R1,
          },
          {
            value: 'role-2',
            date: t('exp.r2date'),
            title: t('exp.r2title'),
            employer: 'Agami Technologies Pvt. Ltd.',
            bullets: BULLETS_R2,
          },
        ].map(({ value, date, title, employer, bullets }) => (
          <AccordionItem
            key={value}
            value={value}
            className='border-b border-border'
          >
            {/* Custom trigger row */}
            <div className='grid grid-cols-1 sm:grid-cols-[120px_1fr_auto] gap-3 py-5 items-start'>
              <div className='text-[12px] text-muted-foreground'>{date}</div>
              <div>
                <div className='text-[22px] font-bold'>{title}</div>
                <div className='text-[14px] text-muted-foreground mt-1'>
                  {employer}
                </div>
              </div>
              <button
                onClick={() =>
                  setOpen(prev =>
                    prev.includes(value)
                      ? prev.filter(v => v !== value)
                      : [...prev, value],
                  )
                }
                className={cn(
                  'text-[11px] border border-border px-[12px] py-[7px] transition-colors duration-150 cursor-pointer',
                  'hover:bg-foreground hover:text-background hover:border-foreground',
                )}
              >
                {open.includes(value) ? '− HIDE' : '+ DETAILS'}
              </button>
            </div>
            <AccordionContent>
              <div className='grid grid-cols-1 sm:grid-cols-[120px_1fr] gap-3 pb-6'>
                <div />
                <div className='flex flex-col gap-3'>
                  {bullets.map(key => (
                    <div
                      key={key}
                      className='flex gap-[14px] text-[14px] leading-[1.7]'
                    >
                      <span className='text-muted-foreground shrink-0 mt-[1px]'>
                        →
                      </span>
                      <span dangerouslySetInnerHTML={{ __html: t(key) }} />
                    </div>
                  ))}
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </Section>
  );
}
