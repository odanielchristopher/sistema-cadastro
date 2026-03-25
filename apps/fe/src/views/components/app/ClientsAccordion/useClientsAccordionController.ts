import { useClientsInfiniteScroll } from '@app/hooks/useClientsInfiniteScroll';

export function useClientsAccordionController() {
  const { clients, isLoading, infiniteScroll } = useClientsInfiniteScroll();

  const hasClients = clients.length > 0;

  return {
    clients,
    hasClients,
    infiniteScroll,
    isLoading,
  };
}
