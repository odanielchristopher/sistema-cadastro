import { Button } from '@views/components/ui/Button';
import { Input } from '@views/components/ui/Input';

import { useLoginController } from './useLoginController';

export function Login() {
  const { errors, isLoading, register, handleSubmit } = useLoginController();

  return (
    <>
      <header className="flex flex-col items-center gap-4">
        <h1 className="dark:text-foreground text-2xl font-semibold tracking-[-1px] text-gray-800">
          Entre em sua conta
        </h1>
      </header>

      <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-4">
        <Input
          placeholder="E-mail"
          error={errors.email?.message}
          {...register('email')}
        />

        <Input
          type="password"
          placeholder="Senha"
          error={errors.password?.message}
          {...register('password')}
        />

        <Button type="submit" className="mt-2 rounded-md" isLoading={isLoading}>
          Entrar
        </Button>
      </form>
    </>
  );
}
