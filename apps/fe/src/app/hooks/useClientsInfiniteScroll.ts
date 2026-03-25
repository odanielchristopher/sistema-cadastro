import { CLIENTS_QUERY_KEY } from '@app/config/constants';
import type { Client } from '@app/entities/Client';
import { useInfiniteScroll } from '@app/hooks/useInfiniteScroll';
import { clientsService } from '@app/services/clientsService';

export function useClientsInfiniteScroll() {
  const { data, isFetching, ...query } = useInfiniteScroll<Client>({
    queryKey: CLIENTS_QUERY_KEY(),
    perPage: 1,
    infiniteLoader: clientsService.getAll,
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
