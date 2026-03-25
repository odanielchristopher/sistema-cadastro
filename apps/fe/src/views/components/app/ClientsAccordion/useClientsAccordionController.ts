import { useClientsInfiniteScroll } from '@app/hooks/useClientsInfiniteScroll';

export function useClientsAccordionController() {
  const { clients, isLoading, infiniteScroll } = useClientsInfiniteScroll();

  return {
    clients,
    infiniteScroll,
    isLoading,
  };
}
