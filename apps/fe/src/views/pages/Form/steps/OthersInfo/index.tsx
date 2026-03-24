import { useFormContext } from 'react-hook-form';

import { StepperPreviousButton } from '@views/components/app/Stepper';
import { Button } from '@views/components/ui/Button';
import { Textarea } from '@views/components/ui/Textarea';

import type { ClientFormData } from '../..';

export function OthersInfo({ isLoading }: { isLoading?: boolean }) {
  const { register, formState } = useFormContext<ClientFormData>();

  return (
    <div className="flex flex-col p-4">
      <div className="flex w-full flex-col items-center">
        <div className="mt-8 w-full space-y-3">
          <Textarea
            placeholder="Observação (opcional)"
            {...register('othersInfo.observation')}
            error={formState.errors.othersInfo?.observation?.message}
          />
        </div>
      </div>

      <div className="mt-8 flex w-full items-center justify-end gap-3">
        <StepperPreviousButton type="button" className="flex-1/2">
          Anterior
        </StepperPreviousButton>
        <Button
          type="submit"
          className="flex-1/2 rounded-md"
          disabled={!formState.isValid || isLoading}
          isLoading={isLoading}
        >
          Criar conta
        </Button>
      </div>
    </div>
  );
}
