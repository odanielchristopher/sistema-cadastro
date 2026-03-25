import { useMutation, useQueryClient } from '@tanstack/react-query';

import { COLORS_QUERY_KEY } from '@app/config/constants';
import type { Color } from '@app/entities/Color';
import { colorsService } from '@app/services/colorsService';

export function useUpdateColor() {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: colorsService.update,
    onSuccess: async (updatedColor) => {
      queryClient.setQueriesData(
        {
          queryKey: COLORS_QUERY_KEY(),
          exact: false,
        },
        (prevColors: Color[]) =>
          prevColors.map((color) =>
            color.id === updatedColor.id ? updatedColor : color,
          ),
      );
    },
  });

  return {
    updateColor: mutateAsync,
    isLoading: isPending,
  };
}
