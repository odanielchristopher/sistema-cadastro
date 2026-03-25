import { useMutation, useQueryClient } from '@tanstack/react-query';

import { COLORS_QUERY_KEY } from '@app/config/constants';
import type { Color } from '@app/entities/Color';
import { colorsService } from '@app/services/colorsService';

export function useDeleteColor(colorId?: string) {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: colorsService.remove,
    onSuccess: async () => {
      queryClient.setQueriesData(
        {
          queryKey: COLORS_QUERY_KEY(),
          exact: false,
        },
        (prevColors: Color[]) =>
          prevColors.filter((color) => color.id !== colorId),
      );
    },
  });

  return {
    deleteColor: mutateAsync,
    isLoading: isPending,
  };
}
