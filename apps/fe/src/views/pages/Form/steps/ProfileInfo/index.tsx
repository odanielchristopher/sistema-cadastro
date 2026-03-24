import { Controller, useFormContext } from 'react-hook-form';

import { useStepper } from '@app/hooks/useStepper';
import { StepperNextButton } from '@views/components/app/Stepper';
import { Input } from '@views/components/ui/Input';
import { InputFormatted } from '@views/components/ui/InputFormatted';

import type { ClientFormData } from '../..';

export function ProfileInfo() {
  const { register, formState, ...form } = useFormContext<ClientFormData>();

  const { nextStep } = useStepper();

  async function handleNextStep() {
    const isValid = await form.trigger('profileInfo', {
      shouldFocus: true,
    });

    if (isValid) {
      nextStep();
    }
  }

  return (
    <>
      <div className="space-y-3">
        <Input
          placeholder="Nome*"
          {...register('profileInfo.name')}
          error={formState.errors.profileInfo?.name?.message}
        />

        <Controller
          control={form.control}
          name="profileInfo.cpf"
          render={({ field: { value, onChange } }) => (
            <InputFormatted
              placeholder="CPF*"
              type="text"
              name="cpf"
              value={value}
              format="###.###.###-##"
              onValueChange={(event) => onChange(event.value)}
              error={formState.errors.profileInfo?.cpf?.message}
            />
          )}
        />

        <Input
          placeholder="E-mail*"
          {...register('profileInfo.email')}
          error={formState.errors.profileInfo?.email?.message}
        />
      </div>

      <div className="mt-8 flex w-full items-center justify-end">
        <StepperNextButton
          type="button"
          className="basis-1/2"
          onClick={handleNextStep}
        >
          Próximo
        </StepperNextButton>
      </div>
    </>
  );
}
