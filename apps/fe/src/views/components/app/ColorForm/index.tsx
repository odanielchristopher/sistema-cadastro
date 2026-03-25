import { ColorPickerInput } from '@views/components/app/ColorPickerInput';
import { Button } from '@views/components/ui/Button';
import { Input } from '@views/components/ui/Input';

import type { ColorFormValues } from './schema';
import { useColorFormController } from './useColorFormController';

type ColorFormProps = {
  defaultValues?: Partial<ColorFormValues>;
  submitLabel: string;
  isLoading?: boolean;
  onSubmit(values: ColorFormValues): Promise<void> | void;
  onCancel?(): void;
};

export function ColorForm({
  defaultValues,
  submitLabel,
  isLoading,
  onSubmit,
  onCancel,
}: ColorFormProps) {
  const { form, hex } = useColorFormController({ defaultValues });

  return (
    <form
      className="space-y-4"
      onSubmit={form.handleSubmit(async (values) => {
        await onSubmit(values);
      })}
    >
      <Input
        placeholder="Nome da cor*"
        {...form.register('name')}
        error={form.formState.errors.name?.message}
      />

      <ColorPickerInput
        name="hex"
        value={hex}
        onChange={(nextHex) => {
          form.setValue('hex', nextHex, { shouldValidate: true });
        }}
        error={form.formState.errors.hex?.message}
        placeholder="Selecione uma cor*"
      />

      <div className="flex items-center justify-end gap-3 pt-2">
        {onCancel && (
          <Button
            type="button"
            variant="outline"
            className="rounded-sm"
            onClick={onCancel}
          >
            Cancelar
          </Button>
        )}

        <Button
          type="submit"
          className="rounded-sm"
          isLoading={isLoading}
          disabled={isLoading || !form.formState.isValid}
        >
          {submitLabel}
        </Button>
      </div>
    </form>
  );
}
