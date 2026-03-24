import { Injectable } from '@nestjs/common';
import { Prisma } from 'generated/prisma/client';

import { Client } from '@modules/clients/entities/client.entity';
import {
  PaginatedResponse,
  UncheckedPaginatedResponseMeta,
} from '@shared/@types/paginated-response.type';

import {
  ClientsRepository,
  type CreateClientInput,
  type FindManyClientsDto,
  type UpdateClientInput,
} from '../contract/clients-repository.contract';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaClientsRepository implements ClientsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findMany(
    dto: FindManyClientsDto,
  ): Promise<PaginatedResponse<Client, UncheckedPaginatedResponseMeta>> {
    const page = Math.max(1, dto.page || 1);
    const perPage = Math.max(1, dto.perPage || 12);
    const skip = (page - 1) * perPage;

    const where: Prisma.ClientWhereInput | undefined = dto.color
      ? {
          OR: [
            { colorId: dto.color },
            {
              color: {
                name: {
                  contains: dto.color,
                  mode: 'insensitive',
                },
              },
            },
          ],
        }
      : undefined;

    const [total, data] = await this.prismaService.$transaction([
      this.prismaService.client.count({ where }),
      this.prismaService.client.findMany({
        where,
        skip,
        take: perPage,
        orderBy: { createdAt: 'desc' },
        include: { color: true },
      }),
    ]);

    return {
      data,
      meta: {
        page,
        perPage,
        total,
      },
    };
  }

  findById(id: string): Promise<Client | null> {
    return this.prismaService.client.findUnique({
      where: { id },
      include: { color: true },
    });
  }

  findByCpf(cpf: string): Promise<Client | null> {
    return this.prismaService.client.findUnique({
      where: { cpf },
      include: { color: true },
    });
  }

  findByEmail(email: string): Promise<Client | null> {
    return this.prismaService.client.findUnique({
      where: { email },
      include: { color: true },
    });
  }

  create(client: CreateClientInput) {
    return this.prismaService.client.create({
      data: {
        name: client.name,
        email: client.email,
        cpf: client.cpf,
        colorId: client.colorId,
        ...(client.observations !== undefined
          ? { observations: client.observations }
          : {}),
      },
      include: { color: true },
    });
  }

  update(client: UpdateClientInput): Promise<Client> {
    if (!client.id) throw Error('Cannot update client without a valid id');

    return this.prismaService.client.update({
      where: { id: client.id },
      data: {
        name: client.name,
        email: client.email,
        cpf: client.cpf,
        colorId: client.colorId,
        ...(client.observations !== undefined
          ? { observations: client.observations }
          : {}),
      },
      include: { color: true },
    });
  }

  async delete(id: string): Promise<void> {
    await this.prismaService.client.delete({ where: { id } });
  }
}
