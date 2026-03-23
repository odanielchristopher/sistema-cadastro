import { CircleX } from 'lucide-react';

import { cn } from '@app/lib/utils';

export function FieldError({
  message,
  className,
}: {
  message: string;
  className?: string;
}) {
  return (
    <div className={cn('mt-1 flex items-center gap-1', className)}>
      <CircleX className="h-4 w-4 text-red-500" />
      <span className="text-[14px] text-red-500">{message}</span>
    </div>
  );
}
