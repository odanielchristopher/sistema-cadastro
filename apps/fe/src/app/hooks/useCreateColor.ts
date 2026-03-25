import { useMutation, useQueryClient } from '@tanstack/react-query';

import { COLORS_QUERY_KEY } from '@app/config/constants';
import { colorsService } from '@app/services/colorsService';

export function useCreateColor() {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: colorsService.create,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: COLORS_QUERY_KEY(),
      });
    },
  });

  return {
    createColor: mutateAsync,
    isLoading: isPending,
  };
}
