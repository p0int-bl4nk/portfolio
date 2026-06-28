import { usePortfolio } from '../context/PortfolioContext';
import { cn } from '../lib/utils';

export function Toast() {
  const { toast } = usePortfolio();
  if (!toast) return null;
  return (
    <div
      className={cn(
        'fixed bottom-[80px] left-1/2 -translate-x-1/2 z-[200] pointer-events-none',
        'bg-foreground text-background border border-foreground',
        'px-5 py-3 text-[12px] tracking-[1px]',
      )}
    >
      {toast}
    </div>
  );
}
