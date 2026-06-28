import { type ReactNode } from 'react';

import { cn } from '@/lib/utils';

interface SectionProps {
  id: string;
  children: ReactNode;
  className?: string;
}

export function Section({ id, children, className }: SectionProps) {
  return (
    <section
      id={id}
      className={cn('py-20 px-6 max-xs:px-4 border-t border-border', className)}
    >
      {children}
    </section>
  );
}

interface SectionLabelProps {
  no: string;
  label: string;
  className?: string;
}

export function SectionLabel({ no, label, className }: SectionLabelProps) {
  return (
    <div
      className={cn(
        'flex items-center gap-4 text-[12px] tracking-[2px] text-muted-foreground',
        className,
      )}
    >
      [ {no} / {label} ]
      <span className='flex-1 h-px bg-border' />
    </div>
  );
}
