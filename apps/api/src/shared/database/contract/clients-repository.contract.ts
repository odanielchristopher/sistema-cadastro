import { Client } from '@modules/clients/entities/client.entity';
import {
  PaginatedResponse,
  UncheckedPaginatedResponseMeta,
} from '@shared/@types/paginated-response.type';

export abstract class ClientsRepository {
  abstract findMany(
    dto: FindManyClientsDto,
  ): Promise<PaginatedResponse<Client, UncheckedPaginatedResponseMeta>>;
  abstract findById(id: string): Promise<Client | null>;
  abstract findByCpf(cpf: string): Promise<Client | null>;
  abstract findByEmail(email: string): Promise<Client | null>;
  abstract create(client: CreateClientInput): Promise<Client>;
  abstract update(client: UpdateClientInput): Promise<Client>;
  abstract delete(id: string): Promise<void>;
}

export type FindManyClientsDto = {
  page: number;
  perPage: number;
  color?: string;
};

export type CreateClientInput = {
  name: string;
  email: string;
  cpf: string;
  colorId: string;
  observations?: string | null;
};

export type UpdateClientInput = CreateClientInput & {
  id: string;
};
