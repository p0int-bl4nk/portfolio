import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { usePortfolio } from '@/context/portfolio-context';
import { cn } from '@/lib/utils';

interface CopyButtonProps {
  content: string;
  className?: string;
}

export function CopyButton({ content, className }: CopyButtonProps) {
  const { t } = useTranslation();
  const { showToast } = usePortfolio();
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard
      .writeText(content)
      .then(() => {
        setCopied(true);
        showToast('// ' + t('ui.copied'));
        setTimeout(() => setCopied(false), 1600);
      })
      .catch(() => {});
  }

  return (
    <button
      onClick={handleCopy}
      className={cn(
        'text-xs text-muted-foreground cursor-pointer transition-colors duration-150 hover:text-foreground',
        className,
      )}
    >
      {copied ? t('ui.copied') : t('ui.copy')}
    </button>
  );
}
