import { useClientsInfiniteScroll } from '@app/hooks/useClientsInfiniteScroll';

export function useClientsAccordionController() {
  const query = useClientsInfiniteScroll();

  return {
    clients: query.clients,
    infiniteScroll: {
      nextPage: query.fetchNextPage,
      hasNextPage: Boolean(query.hasNextPage),
      isFetchingNextPage: query.isFetchingNextPage,
    },
    isLoading: query.isLoading,
  };
}
