import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';

import { useAuth } from '@app/hooks/useAuth';
import { useLogin } from '@app/hooks/useLogin';
import { routes } from '@app/Router/routes';

import { type LoginData, loginSchema } from './schema';

export function useLoginController() {
  const {
    handleSubmit: hookFormHandleSubmit,
    register,
    formState: { errors },
  } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
  });

  const { isLoading, login } = useLogin();
  const { signin } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    try {
      const { accessToken } = await login(data);

      signin(accessToken);
      navigate(`/${routes.dashboard}`);
    } catch {
      toast.error('Credenciais inválidas!');
    }
  });

  return {
    errors,
    isLoading,
    register,
    handleSubmit,
  };
}
