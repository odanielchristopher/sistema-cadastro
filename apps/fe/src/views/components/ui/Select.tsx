import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react';
import { Select as RdxSelect } from 'radix-ui';
import { useState } from 'react';

import { cn } from '@app/lib/utils';

import { FieldError } from './FieldError';

interface ISelectProps {
  error?: string;
  className?: string;
  placeholder?: string;
  options: {
    value: string;
    label: string;
  }[];
  value?: string;
  onChange?(value: string): void;
}

export function Select({
  error,
  value,
  options,
  className,
  placeholder,
  onChange,
}: ISelectProps) {
  const [selectedValue, setSelectedValue] = useState(value ?? '');

  function handleSelect(newValue: string) {
    setSelectedValue(newValue);
    onChange?.(newValue);
  }

  return (
    <div>
      <div className="relative">
        <label
          className={cn(
            'text-muted-foreground pointer-events-none absolute left-3 top-[26px] z-10 -translate-y-1/2 transition-all',
            selectedValue && 'left-[13px] top-2 translate-y-0 text-xs',
          )}
        >
          {placeholder}
        </label>

        <RdxSelect.Root value={selectedValue} onValueChange={handleSelect}>
          <RdxSelect.Trigger
            className={cn(
              'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex min-w-0 rounded-md px-3 py-1 pt-5 text-sm outline-none transition-all file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
              'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
              'dark:border-accent dark:text-foreground h-[52px] w-full rounded-lg border border-gray-500 bg-white text-gray-700',
              error && '!border-red-900',
              className,
            )}
          >
            <RdxSelect.Value />
            <RdxSelect.Icon className="absolute right-3 top-1/2 -translate-y-1/2">
              <ChevronDownIcon className="dark:text-popover-foreground h-6 w-6 text-gray-800" />
            </RdxSelect.Icon>
          </RdxSelect.Trigger>

          <RdxSelect.Portal>
            <RdxSelect.Content
              className={cn(
                'dark:bg-popover z-[99] overflow-hidden rounded-md border bg-white shadow-[0px_11px_20px_0px_rgba(0,0,0,0.10)]',
                'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
              )}
            >
              <RdxSelect.ScrollUpButton className="flex h-[25px] cursor-default items-center justify-center bg-white text-gray-800">
                <ChevronUpIcon />
              </RdxSelect.ScrollUpButton>

              <RdxSelect.Viewport className="p-2">
                {options.map((option) => (
                  <RdxSelect.Item
                    key={option.value}
                    value={option.value}
                    data-slot="select-item"
                    className={cn(
                      'dark:text-popover-foreground rounded-lg p-2 text-sm text-gray-800 outline-none',
                      'hover:bg-accent focus:bg-accent focus:text-accent-foreground cursor-pointer data-[state=checked]:font-bold',
                      'dark:data-[highlighted]:bg-accent data-[highlighted]:bg-gray-50',
                    )}
                  >
                    <RdxSelect.ItemText>{option.label}</RdxSelect.ItemText>
                  </RdxSelect.Item>
                ))}
              </RdxSelect.Viewport>

              <RdxSelect.ScrollDownButton className="flex h-[25px] cursor-default items-center justify-center bg-white text-gray-800">
                <ChevronDownIcon />
              </RdxSelect.ScrollDownButton>
            </RdxSelect.Content>
          </RdxSelect.Portal>
        </RdxSelect.Root>
      </div>

      {error && <FieldError message={error} />}
    </div>
  );
}
