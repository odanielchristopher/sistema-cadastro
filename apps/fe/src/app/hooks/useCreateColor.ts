import { useMutation, useQueryClient } from '@tanstack/react-query';

import { COLORS_QUERY_KEY } from '@app/config/constants';
import type { Color } from '@app/entities/Color';
import { colorsService } from '@app/services/colorsService';

export function useCreateColor() {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: colorsService.create,
    onSuccess: async (color) => {
      queryClient.setQueriesData(
        {
          queryKey: COLORS_QUERY_KEY(),
          exact: false,
        },
        (prevColors: Color[]) => [...prevColors, color],
      );
    },
  });

  return {
    createColor: mutateAsync,
    isLoading: isPending,
  };
}
