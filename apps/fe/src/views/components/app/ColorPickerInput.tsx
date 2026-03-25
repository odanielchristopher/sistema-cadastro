import { ChevronDownIcon } from 'lucide-react';

import { cn } from '@app/lib/utils';
import {
  ColorPickerArea,
  ColorPickerContent,
  ColorPickerEyeDropper,
  ColorPickerHueSlider,
  ColorPicker as ColorPickerRoot,
  ColorPickerTrigger,
} from '@views/components/ui/ColorPicker';
import { FieldError } from '@views/components/ui/FieldError';

type ColorPickerInputProps = {
  name: string;
  value?: string;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  className?: string;
  onChange(value: string): void;
};

export function ColorPickerInput({
  name,
  value,
  placeholder = 'Selecione uma cor',
  error,
  disabled,
  className,
  onChange,
}: ColorPickerInputProps) {
  const selectedValue = value ?? '#000000';
  const isSelected = Boolean(value);

  return (
    <div className={cn('relative w-full', className)}>
      <ColorPickerRoot
        name={name}
        value={selectedValue}
        onValueChange={onChange}
        defaultValue="#000000"
        disabled={disabled}
      >
        <ColorPickerTrigger asChild disabled={disabled}>
          <button
            type="button"
            className={cn(
              'border-input dark:bg-input/30 relative flex h-12 w-full items-center rounded-md border bg-transparent px-3 pt-4 text-left text-sm outline-none transition-all',
              'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
              'aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40',
              error && 'aria-invalid:border-destructive',
            )}
            aria-invalid={Boolean(error)}
          >
            <span
              className={cn(
                'text-muted-foreground pointer-events-none absolute left-[13px] top-2 text-xs transition-all',
              )}
            >
              {placeholder}
            </span>

            <span className="flex w-full items-center gap-2 pr-9">
              {isSelected && (
                <>
                  <span className="font-medium">{selectedValue}</span>
                </>
              )}
            </span>

            {selectedValue && (
              <span
                className="border-border absolute right-3 top-1/2 h-8 w-8 shrink-0 -translate-y-1/2 rounded-full border shadow-sm"
                style={{ backgroundColor: selectedValue }}
              />
            )}

            {!selectedValue && (
              <ChevronDownIcon className="text-muted-foreground absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2" />
            )}
          </button>
        </ColorPickerTrigger>

        <ColorPickerContent className="z-[100] w-[360px]">
          <div className="flex items-center justify-between gap-3">
            <ColorPickerEyeDropper
              type="button"
              size="icon"
              variant="outline"
            />
          </div>

          <ColorPickerArea />
          <ColorPickerHueSlider />
        </ColorPickerContent>
      </ColorPickerRoot>

      {error && <FieldError message={error} />}
    </div>
  );
}
