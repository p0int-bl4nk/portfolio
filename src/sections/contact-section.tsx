import { useTranslation } from 'react-i18next';

import { CopyButton } from '@/components/copy-button';
import { Section, SectionLabel } from '@/components/section';
import { config } from '@/lib/config';

export function ContactSection() {
  const { t } = useTranslation();
  const headLines = t('contact.head').split('\n');

  return (
    <Section id='contact'>
      <SectionLabel no='06' label={t('sec.contact')} className='mb-15' />

      <h2
        style={{ fontSize: 'clamp(40px, 8vw, 110px)' }}
        className='font-black leading-display tracking-heading mb-15'
      >
        {headLines.map((line, i) => (
          <span key={i} className='block'>
            {line}
          </span>
        ))}
      </h2>

      <div className='grid grid-cols-1 md:grid-cols-2 border-t border-l border-border mb-15'>
        <div className='border-r border-b border-border p-6'>
          <div className='text-xs text-muted-foreground tracking-2 mb-3'>
            {t('contact.email_l')}
          </div>
          <div className='flex items-center gap-3 text-sm'>
            <a
              href={`mailto:${config.EMAIL}`}
              className='hover:text-muted-foreground transition-colors duration-150'
            >
              {config.EMAIL}
            </a>
            <CopyButton content={config.EMAIL} />
          </div>
        </div>

        <div className='border-r border-b border-border p-6'>
          <div className='text-xs text-muted-foreground tracking-2 mb-3'>
            {t('contact.phone_l')}
          </div>
          <div className='flex items-center gap-3 text-sm'>
            <a
              href={`tel:${config.PHONE.replace(/\s/g, '')}`}
              className='hover:text-muted-foreground transition-colors duration-150'
            >
              {config.PHONE}
            </a>
            <CopyButton content={config.PHONE} />
          </div>
        </div>

        <div className='border-r border-b border-border p-6'>
          <div className='text-xs text-muted-foreground tracking-2 mb-3'>
            LINKEDIN
          </div>
          <div className='text-sm'>
            <a
              href={config.LINKEDIN_URL}
              target='_blank'
              rel='noopener noreferrer'
              className='hover:text-muted-foreground transition-colors duration-150'
            >
              {config.LINKEDIN_HANDLE} ↗
            </a>
          </div>
        </div>

        <div className='border-r border-b border-border p-6'>
          <div className='text-xs text-muted-foreground tracking-2 mb-3'>
            GITHUB
          </div>
          <div className='text-sm'>
            <a
              href={config.GITHUB_URL}
              target='_blank'
              rel='noopener noreferrer'
              className='hover:text-muted-foreground transition-colors duration-150'
            >
              {config.GITHUB_HANDLE} ↗
            </a>
          </div>
        </div>

        <div className='border-r border-b border-border p-6'>
          <div className='text-xs text-muted-foreground tracking-2 mb-3'>
            {t('contact.loc_l')}
          </div>
          <div className='text-sm'>{config.LOCATION}</div>
        </div>
      </div>

      <div className='flex gap-1 justify-between items-center text-xs text-muted-foreground'>
        <span>
          © {new Date().getFullYear()} {config.NAME} — BUILT IN JETBRAINS MONO
        </span>
        <span>↑↑↓↓←→←→BA</span>
      </div>
    </Section>
  );
}
