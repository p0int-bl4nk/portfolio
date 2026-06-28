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
        'text-[11px] text-muted-foreground cursor-pointer transition-colors duration-150 hover:text-foreground',
        className,
      )}
    >
      {copied ? t('ui.copied') : t('ui.copy')}
    </button>
  );
}
