import * as React from 'react';

import { cn } from '@app/lib/utils';

import { FieldError } from './FieldError';

interface IInputProps extends React.ComponentProps<'input'> {
  name: string;
  error?: string;
}

export function Input({
  id,
  name,
  placeholder,
  error,
  className,
  type,
  ...props
}: IInputProps) {
  const inputId = id ?? name;

  return (
    <div className="relative w-full">
      <input
        type={type}
        data-slot="input"
        name={name}
        id={inputId}
        className={cn(
          'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input peer flex h-12 w-full min-w-0 rounded-md border px-3 py-1 pt-4 text-sm outline-none transition-all file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder-shown:pt-0 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
          'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
          'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
          className,
        )}
        placeholder=" "
        {...props}
      />

      <label
        htmlFor={inputId}
        className="text-muted-foreground pointer-events-none absolute left-[13px] top-2 text-xs transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm"
      >
        {placeholder}
      </label>

      {error && <FieldError message={error} />}
    </div>
  );
}
