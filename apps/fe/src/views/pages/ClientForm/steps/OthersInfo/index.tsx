import { Controller, useFormContext } from 'react-hook-form';

import { ColorDropdownInput } from '@views/components/app/ColorDropdownInput';
import { StepperPreviousButton } from '@views/components/app/Stepper';
import { Button } from '@views/components/ui/Button';
import { Textarea } from '@views/components/ui/Textarea';

import type { ClientFormData } from '../../useClientFormController';

export function OthersInfo({ isLoading }: { isLoading?: boolean }) {
  const { register, control, formState } = useFormContext<ClientFormData>();

  return (
    <div className="flex flex-col p-4">
      <div className="flex w-full flex-col items-center">
        <div className="mt-8 w-full space-y-3">
          <Controller
            control={control}
            name="othersInfo.colorId"
            render={({ field }) => (
              <ColorDropdownInput
                placeholder="Selecione uma cor*"
                value={field.value}
                onChange={field.onChange}
                className="dark:bg-input/30 bg-white"
                error={formState.errors.othersInfo?.colorId?.message}
              />
            )}
          />

          <Textarea
            placeholder="Observação (opcional)"
            className="dark:bg-input/30 bg-white"
            {...register('othersInfo.observations')}
            error={formState.errors.othersInfo?.observations?.message}
          />
        </div>
      </div>

      <div className="mt-8 flex w-full items-center justify-end gap-3">
        <StepperPreviousButton
          type="button"
          className="flex-1/2 dark:bg-secondary dark:hover:bg-secondary/80 bg-white"
        >
          Anterior
        </StepperPreviousButton>
        <Button
          type="submit"
          className="flex-1/2 rounded-md"
          disabled={!formState.isValid || isLoading}
          isLoading={isLoading}
        >
          Enviar
        </Button>
      </div>
    </div>
  );
}
