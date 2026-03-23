import { SquareChartGanttIcon } from 'lucide-react';

import { cn } from '@app/lib/utils';

interface ILogoProps {
  classNames?: {
    root?: string;
    icon?: string;
    title?: string;
  };
  variant?: 'long' | 'short';
}

export function Logo({ classNames, variant = 'long' }: ILogoProps) {
  return (
    <div
      className={cn(
        'flex items-center gap-2',
        variant === 'short' &&
          'bg-primary-600 flex size-12 items-center justify-center rounded-full',
        classNames?.root,
      )}
    >
      <SquareChartGanttIcon className={cn('size-6', classNames?.icon)} />

      {variant === 'long' && (
        <span className={cn('text-xl font-semibold', classNames?.title)}>
          Neddo
        </span>
      )}
    </div>
  );
}
