import { useQuery } from '@tanstack/react-query';

import { COLORS_QUERY_KEY } from '@app/config/constants';
import { colorsService } from '@app/services/colorsService';

export function useColors() {
  const { data, isFetching } = useQuery({
    queryKey: COLORS_QUERY_KEY(),
    queryFn: colorsService.getAll,
    staleTime: Infinity,
  });

  return {
    colors: data ?? [],
    isLoading: isFetching,
  };
}
