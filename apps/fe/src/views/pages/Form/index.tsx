import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import z from 'zod';

import { Stepper } from '@views/components/app/Stepper';

import { OthersInfo } from './steps/OthersInfo';
import { othersInfoSchema } from './steps/OthersInfo/schema';
import { ProfileInfo } from './steps/ProfileInfo';
import { profileInfoSchema } from './steps/ProfileInfo/schema';

const schema = z.object({
  profileInfo: profileInfoSchema,
  othersInfo: othersInfoSchema,
});

export type ClientFormData = z.infer<typeof schema>;

export function Form() {
  const form = useForm<ClientFormData>({
    resolver: zodResolver(schema),
  });

  const handleSubmit = form.handleSubmit((data) => console.log(data));

  return (
    <div className="flex h-full w-full flex-col items-center justify-center px-6">
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
          <form onSubmit={handleSubmit} className="mt-8 space-y-3">
            <Stepper
              initialStep={0}
              steps={[
                {
                  label: 'Informações de pessoais',
                  content: <ProfileInfo />,
                },
                { label: 'Outras informações', content: <OthersInfo /> },
              ]}
            />
          </form>
        </FormProvider>
      </main>
    </div>
  );
}
