import * as RdxDropdownMenu from '@radix-ui/react-dropdown-menu';
import { ChevronDownIcon } from 'lucide-react';

import { useColors } from '@app/hooks/useColors';
import { cn } from '@app/lib/utils';
import { ColorIcon } from '@views/assets/icons/ColorIcon';

import { FieldError } from '../ui/FieldError';
import { Spinner } from '../ui/Spinner';

interface IColorsDropdownInputProps {
  className?: string;
  error?: string;
  value?: string;
  placeholder?: string;
  disabled?: boolean;
  onChange?(value: string): void;
}

function getTintFromHex(hex: string) {
  const normalizedHex = hex.replace('#', '');

  if (normalizedHex.length !== 6) return '#ffffff';

  const red = Number.parseInt(normalizedHex.slice(0, 2), 16);
  const green = Number.parseInt(normalizedHex.slice(2, 4), 16);
  const blue = Number.parseInt(normalizedHex.slice(4, 6), 16);

  if ([red, green, blue].some(Number.isNaN)) return '#ffffff';

  const mix = (channel: number) =>
    Math.round(channel + (255 - channel) * 0.9)
      .toString(16)
      .padStart(2, '0');

  return `#${mix(red)}${mix(green)}${mix(blue)}`;
}

export function ColorDropdownInput({
  className,
  error,
  value,
  placeholder = 'Selecione uma cor',
  disabled,
  onChange,
}: IColorsDropdownInputProps) {
  const { colors, isLoading } = useColors();
  const selectedColor = colors.find((color) => color.id === value) ?? null;
  const isDisabled = disabled || isLoading;

  function handleSelect(colorId: string) {
    onChange?.(colorId);
  }

  return (
    <div>
      <RdxDropdownMenu.Root>
        <RdxDropdownMenu.Trigger asChild disabled={isDisabled}>
          <button
            type="button"
            className={cn(
              'focus-visible:border-ring focus-visible:ring-ring/50 relative h-[52px] w-full rounded-md border bg-transparent px-3 text-left text-sm outline-none transition-all focus-visible:ring-[3px]',
              'border-input dark:bg-input/30 dark:text-foreground',
              'pt-5',
              error && 'aria-invalid:border-destructive',
              isDisabled && 'cursor-not-allowed',
              className,
            )}
            aria-invalid={Boolean(error)}
          >
            <span
              className={cn(
                'text-muted-foreground pointer-events-none absolute left-[13px] top-2 text-xs transition-all',
                selectedColor ? 'text-xs' : 'top-1/2 -translate-y-1/2 text-sm',
              )}
            >
              {placeholder}
            </span>

            <span className="flex items-center gap-2 pr-10">
              {selectedColor && (
                <span className="font-medium">{selectedColor.name}</span>
              )}
            </span>

            {selectedColor && !isLoading && (
              <ColorIcon
                bg={getTintFromHex(selectedColor.hex)}
                color={selectedColor.hex}
                className="absolute right-3 top-1/2 h-[27px] w-[28px] -translate-y-1/2"
              />
            )}
            {!selectedColor && !isLoading && (
              <ChevronDownIcon className="text-muted-foreground absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2" />
            )}
            {isLoading && (
              <Spinner className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2" />
            )}
          </button>
        </RdxDropdownMenu.Trigger>

        <RdxDropdownMenu.Portal>
          <RdxDropdownMenu.Content
            className={cn(
              'bg-popover z-[99] grid max-h-72 w-[var(--radix-dropdown-menu-trigger-width)] grid-cols-4 gap-2 overflow-y-auto rounded-md border p-2 shadow-[0px_11px_20px_0px_rgba(0,0,0,0.10)]',
              'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=top]:slide-in-from-bottom-2',
              'dark:bg-card dark:border-accent',
            )}
          >
            {colors.length > 0 ? (
              colors.map((color) => (
                <RdxDropdownMenu.Item
                  key={color.id}
                  onSelect={() => handleSelect(color.id)}
                  className={cn(
                    'hover:bg-accent focus:bg-accent focus:text-accent-foreground flex min-h-11 cursor-pointer items-center justify-center rounded-xl px-2 py-2 outline-none transition-colors',
                    value === color.id && 'bg-accent',
                  )}
                >
                  <ColorIcon bg={getTintFromHex(color.hex)} color={color.hex} />
                </RdxDropdownMenu.Item>
              ))
            ) : (
              <div className="text-muted-foreground col-span-2 px-2 py-3 text-sm">
                Nenhuma cor disponível
              </div>
            )}
          </RdxDropdownMenu.Content>
        </RdxDropdownMenu.Portal>
      </RdxDropdownMenu.Root>

      {error && <FieldError message={error} />}
    </div>
  );
}
