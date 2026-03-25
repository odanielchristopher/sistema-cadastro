import type { Client } from '@app/entities/Client';
import type { IPaginatedResponse } from '@app/types/IPaginatedResponse';
import { sleep } from '@app/utils/sleep';

import { httpClient } from '../httpClient';

export type GetAllClientsInput = {
  page: number;
  perPage: number;
};

export async function getAll({ page, perPage }: GetAllClientsInput) {
  await sleep(2000);

  const { data } = await httpClient.get<IPaginatedResponse<Client>>(
    '/clients',
    {
      params: {
        page,
        perPage,
      },
    },
  );

  return data;
}
