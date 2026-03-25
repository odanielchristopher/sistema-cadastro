import type { Client } from '@app/entities/Client';
import type { IPaginatedResponse } from '@app/types/IPaginatedResponse';

import { httpClient } from '../httpClient';

export type GetAllClientsInput = {
  colorId?: string;
  clientName?: string;
  page: number;
  perPage: number;
};

export type GetAllClientsFilters = Omit<GetAllClientsInput, 'page' | 'perPage'>;

export async function getAll({
  page,
  perPage,
  clientName,
  colorId,
}: GetAllClientsInput) {
  const { data } = await httpClient.get<IPaginatedResponse<Client>>(
    '/clients',
    {
      params: {
        page,
        perPage,
        clientName,
        color: colorId,
      },
    },
  );

  return data;
}
