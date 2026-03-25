import { useMutation, useQueryClient } from '@tanstack/react-query';

import { CLIENTS_QUERY_KEY } from '@app/config/constants';
import { clientsService } from '@app/services/clientsService';

export function useCreateClient() {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: clientsService.create,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: CLIENTS_QUERY_KEY(),
        exact: false,
        refetchType: 'all',
      });
    },
  });

  return {
    createClient: mutateAsync,
    isLoading: isPending,
  };
}
