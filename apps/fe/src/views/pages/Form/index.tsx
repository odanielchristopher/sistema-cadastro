import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import z from 'zod';

import { Button } from '@views/components/ui/Button';
import { Input } from '@views/components/ui/Input';
import { InputFormatted } from '@views/components/ui/InputFormatted';

const schema = z.object({
  name: z
    .string()
    .nonempty('O nome é obrigatório')
    .min(2, 'O nome deve ter mais de 2 caracteres'),
  cpf: z
    .string()
    .min(11, 'O CPF deve ser válido')
    .nonempty('O CPF é obrigatório'),
  email: z
    .string()
    .email('O e-mail deve ser válido')
    .nonempty('O e-mail é obrigatório'),
  colorId: z.string().uuid().nonempty('A cor é obrigatória.'),
  observation: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export function Form() {
  const form = useForm<FormData>({
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

      <main className="bg-card mt-10 w-full max-w-[600px] rounded-xl border p-4">
        <header>
          <strong className="text-lg">Cadastro</strong>
          <p className="mt-1">Preencha com os dados do cliente.</p>
        </header>

        <form onSubmit={handleSubmit} className="mt-8 space-y-3">
          <Input
            placeholder="Nome*"
            {...form.register('name')}
            error={form.formState.errors.name?.message}
          />

          <Controller
            control={form.control}
            name="cpf"
            render={({ field: { value, onChange } }) => (
              <InputFormatted
                placeholder="CPF*"
                type="text"
                name="cpf"
                value={value}
                format="###.###.###-##"
                onValueChange={(event) => onChange(event.value)}
                error={form.formState.errors.cpf?.message}
              />
            )}
          />

          <Input
            placeholder="E-mail*"
            {...form.register('email')}
            error={form.formState.errors.email?.message}
          />

          <Button className="mt-6 w-full" type="submit">
            Cadastrar
          </Button>
        </form>
      </main>
    </div>
  );
}
