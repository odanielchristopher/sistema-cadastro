import { useMutation } from '@tanstack/react-query';

import { clientsService } from '@app/services/clientsService';

export function useCreateClient() {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: clientsService.create,
  });

  return {
    createClient: mutateAsync,
    isLoading: isPending,
  };
}
