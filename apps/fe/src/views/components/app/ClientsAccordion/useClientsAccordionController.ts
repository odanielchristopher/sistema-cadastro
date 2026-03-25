import { useClientsInfiniteScroll } from '@app/hooks/useClientsInfiniteScroll';

import type { GetAllClientsFilters } from '@app/services/clientsService/getAll';

type UseClientsAccordionControllerParams = GetAllClientsFilters;

export function useClientsAccordionController({
  clientName,
  colorId,
}: UseClientsAccordionControllerParams = {}) {
  const { clients, isLoading, infiniteScroll } = useClientsInfiniteScroll({
    clientName,
    colorId,
  });

  const hasClients = clients.length > 0;

  return {
    clients,
    hasClients,
    infiniteScroll,
    isLoading,
  };
}
