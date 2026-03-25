import { LockIcon } from 'lucide-react';
import { FormProvider } from 'react-hook-form';
import { Link } from 'react-router';

import { routes } from '@app/Router/routes';
import { Stepper } from '@views/components/app/Stepper';
import { Button } from '@views/components/ui/Button';

import { OthersInfo } from './steps/OthersInfo';
import { ProfileInfo } from './steps/ProfileInfo';
import { useClientFormController } from './useClientFormController';

export function ClientForm() {
  const { form, isLoading, stepperKey, handleSubmit } =
    useClientFormController();

  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center px-6">
      <Button
        type="button"
        variant="outline"
        size="sm"
        className="absolute right-4 top-6 rounded-md"
        asChild
      >
        <Link to={routes.dashboard}>
          <LockIcon />

          <span className="leading-3">Ir para o painel</span>
        </Link>
      </Button>

      <header className="flex flex-col items-center">
        <h1 className="mb-5 text-center text-3xl font-bold">
          Sistema de Cadastro
        </h1>
        <p className="text-center">
          Bem-vindo ao sistema de cadastro de clientes. Faça já o seu cadastro!
        </p>
      </header>

      <main className="mt-10 w-full max-w-[600px]">
        <FormProvider {...form}>
          <form onSubmit={handleSubmit} className="min-h-[340px] space-y-3">
            <Stepper
              key={stepperKey}
              initialStep={0}
              steps={[
                {
                  label: 'Informações de pessoais',
                  content: <ProfileInfo />,
                },
                {
                  label: 'Outras informações',
                  content: <OthersInfo isLoading={isLoading} />,
                },
              ]}
            />
          </form>
        </FormProvider>
      </main>
    </div>
  );
}
