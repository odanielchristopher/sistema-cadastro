import { CLIENTS_QUERY_KEY } from '@app/config/constants';
import { useInfiniteScroll } from '@app/hooks/useInfiniteScroll';
import { clientsService } from '@app/services/clientsService';
import type { GetAllClientsFilters } from '@app/services/clientsService/getAll';

export function useClientsInfiniteScroll(input: GetAllClientsFilters = {}) {
  const clientName = input.clientName?.trim() || undefined;
  const colorId = input.colorId?.trim() || undefined;

  const { data, isFetching, ...query } = useInfiniteScroll({
    queryKey: CLIENTS_QUERY_KEY(colorId, clientName),
    perPage: 20,
    infiniteLoader: ({ page, perPage }) =>
      clientsService.getAll({
        page,
        perPage,
        clientName,
        colorId,
      }),
  });

  const clients = data?.pages.flatMap((page) => page.data) ?? [];

  return {
    clients,
    isLoading: isFetching,
    infiniteScroll: {
      nextPage: query.fetchNextPage,
      hasNextPage: query.hasNextPage,
      isFetchingNextPage: query.isFetchingNextPage,
    },
  };
}
