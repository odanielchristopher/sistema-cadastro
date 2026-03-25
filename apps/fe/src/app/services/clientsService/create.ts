import type { Client } from '@app/entities/Client';

import { httpClient } from '../httpClient';

export type CreateClientInput = {
  name: string;
  email: string;
  cpf: string;
  colorId: string;
  observations?: string;
};

export async function create(input: CreateClientInput) {
  const { data } = await httpClient.post<Client>('/clients', input);

  return data;
}
