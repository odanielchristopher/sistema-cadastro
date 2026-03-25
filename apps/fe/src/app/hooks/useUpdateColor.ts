import { useMutation, useQueryClient } from '@tanstack/react-query';

import { COLORS_QUERY_KEY } from '@app/config/constants';
import { colorsService } from '@app/services/colorsService';

export function useUpdateColor() {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: colorsService.update,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: COLORS_QUERY_KEY(),
      });
    },
  });

  return {
    updateColor: mutateAsync,
    isLoading: isPending,
  };
}
