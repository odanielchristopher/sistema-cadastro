import * as React from 'react';

import { cn } from '@app/lib/utils';

import { FieldError } from './FieldError';

interface ITextareaProps extends React.ComponentProps<'textarea'> {
  name: string;
  error?: string;
}

function Textarea({
  id,
  name,
  placeholder,
  error,
  className,
  ...props
}: ITextareaProps) {
  const textareaId = id ?? name;

  return (
    <div className="relative w-full">
      <textarea
        data-slot="textarea"
        name={name}
        id={textareaId}
        className={cn(
          'field-sizing-content border-input placeholder:text-muted-foreground dark:bg-input/30 peer flex min-h-20 w-full min-w-0 rounded-md border px-3 py-4 pt-6 text-sm outline-none transition-all disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
          'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
          'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
          'placeholder-shown:pt-4',
          className,
        )}
        placeholder=" "
        {...props}
      />

      <label
        htmlFor={textareaId}
        className="text-muted-foreground pointer-events-none absolute left-[13px] top-2 text-xs transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm"
      >
        {placeholder}
      </label>

      {error && <FieldError message={error} />}
    </div>
  );
}

export { Textarea };
