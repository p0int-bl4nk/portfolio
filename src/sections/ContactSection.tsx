import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { usePortfolio } from '../context/PortfolioContext';

const EMAIL = 'skv860254262@gmail.com';
const PHONE = '+91 98278 86094';
const LINKEDIN_HANDLE = 'in/sachin-verma-16041999';
const LINKEDIN_URL = 'https://linkedin.com/in/sachin-verma-16041999';

export function ContactSection() {
  const { t } = useTranslation();
  const { showToast } = usePortfolio();
  const [copied, setCopied] = useState(false);

  function copyEmail() {
    navigator.clipboard
      .writeText(EMAIL)
      .then(() => {
        setCopied(true);
        showToast(t('ui.copied'));
        setTimeout(() => setCopied(false), 1600);
      })
      .catch(() => {});
  }

  const headLines = t('contact.head').split('\n');

  return (
    <section
      id='contact'
      className='border-t border-border py-[90px] px-6 max-xs:px-4'
    >
      {/* Section header */}
      <div className='flex items-center gap-3 mb-[60px]'>
        <span className='text-[12px] tracking-[2px] text-muted-foreground'>
          [ 06 / {t('sec.contact')} ]
        </span>
        <span className='flex-1 h-px bg-border' />
      </div>

      {/* Big heading */}
      <h2
        style={{ fontSize: 'clamp(40px, 8vw, 110px)' }}
        className='font-black leading-[.86] tracking-[-0.045em] mb-[60px]'
      >
        {headLines.map((line, i) => (
          <span key={i} className='block'>
            {line}
          </span>
        ))}
      </h2>

      {/* Contact grid */}
      <div className='grid grid-cols-1 md:grid-cols-2 border-t border-l border-border mb-[60px]'>
        {/* EMAIL */}
        <div className='border-r border-b border-border p-6'>
          <div className='text-[11px] text-muted-foreground tracking-[2px] mb-3'>
            {t('contact.email_l')}
          </div>
          <div className='text-[14px]'>
            <button
              onClick={copyEmail}
              className='cursor-pointer hover:text-muted-foreground transition-colors duration-150'
            >
              {EMAIL}{' '}
              <span className='text-[11px] text-muted-foreground ml-2'>
                {copied ? t('ui.copied') : t('ui.copy')}
              </span>
            </button>
          </div>
        </div>

        {/* PHONE */}
        <div className='border-r border-b border-border p-6'>
          <div className='text-[11px] text-muted-foreground tracking-[2px] mb-3'>
            {t('contact.phone_l')}
          </div>
          <div className='text-[14px]'>
            <a
              href={`tel:${PHONE.replace(/\s/g, '')}`}
              className='hover:text-muted-foreground transition-colors duration-150'
            >
              {PHONE}
            </a>
          </div>
        </div>

        {/* LINKEDIN */}
        <div className='border-r border-b border-border p-6'>
          <div className='text-[11px] text-muted-foreground tracking-[2px] mb-3'>
            LINKEDIN
          </div>
          <div className='text-[14px]'>
            <a
              href={LINKEDIN_URL}
              target='_blank'
              rel='noopener noreferrer'
              className='hover:text-muted-foreground transition-colors duration-150'
            >
              {LINKEDIN_HANDLE} ↗
            </a>
          </div>
        </div>

        {/* LOCATION */}
        <div className='border-r border-b border-border p-6'>
          <div className='text-[11px] text-muted-foreground tracking-[2px] mb-3'>
            {t('contact.loc_l')}
          </div>
          <div className='text-[14px]'>Gurugram, Haryana, India</div>
        </div>
      </div>

      {/* Footer */}
      <div className='flex justify-between items-center text-[11px] text-muted-foreground'>
        <span>© 2025 SACHIN VERMA — BUILT IN JETBRAINS MONO</span>
        <span>↑↑↓↓←→←→BA</span>
      </div>
    </section>
  );
}
