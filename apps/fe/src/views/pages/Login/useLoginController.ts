import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { type LoginData, loginSchema } from './schema';

export function useLoginController() {
  const {
    handleSubmit: hookFormHandleSubmit,
    register,
    formState: { errors },
  } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
  });

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    try {
      console.log(data);
    } catch {
      toast.error('Credenciais inválidas!');
    }
  });

  return {
    errors,
    isLoading: false,
    register,
    handleSubmit,
  };
}
