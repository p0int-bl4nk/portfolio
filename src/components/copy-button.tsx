import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { cn } from '../lib/utils';

interface CopyButtonProps {
  content: string;
  className?: string;
}

export function CopyButton({ content, className }: CopyButtonProps) {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard
      .writeText(content)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 1600);
      })
      .catch(() => {});
  }

  return (
    <button
      onClick={handleCopy}
      className={cn(
        'cursor-pointer transition-colors duration-150 hover:text-muted-foreground',
        className,
      )}
    >
      {content}
      <span className='text-[11px] text-muted-foreground ml-2'>
        {copied ? t('ui.copied') : t('ui.copy')}
      </span>
    </button>
  );
}
