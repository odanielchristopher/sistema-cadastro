import { zodResolver } from '@hookform/resolvers/zod';
import { AxiosError } from 'axios';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import z from 'zod';

import { useCreateClient } from '@app/hooks/useCreateClient';

import { othersInfoSchema } from './steps/OthersInfo/schema';
import { profileInfoSchema } from './steps/ProfileInfo/schema';

const schema = z.object({
  profileInfo: profileInfoSchema,
  othersInfo: othersInfoSchema,
});

export type ClientFormData = z.infer<typeof schema>;

export function useClientFormController() {
  const form = useForm<ClientFormData>({
    resolver: zodResolver(schema),
  });

  const { createClient, isLoading } = useCreateClient();

  const handleSubmit = form.handleSubmit(async (formData) => {
    const { profileInfo, othersInfo } = formData;

    try {
      await createClient({
        ...profileInfo,
        ...othersInfo,
      });

      toast.success('Cadastro realizado com sucesso!');
    } catch (error) {
      if (error instanceof AxiosError && error.status === 409) {
        toast.error('Cliente já cadastrado');
        return;
      }

      toast.error(
        'Ocorreu um erro ao enviar seu cadastro. Por favor, cheque suas informações',
      );
    }
  });

  return {
    isLoading,
    form,
    handleSubmit,
  };
}
