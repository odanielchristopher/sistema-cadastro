import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { ClientsRepository } from '@shared/database/contract/clients-repository.contract';
import { ColorsRepository } from '@shared/database/contract/colors-repository.contract';

import { CreateClientDto } from './dtos/create-client.dto';
import { FindManyClientsDto } from './dtos/find-many-clients.dto';
import { UpdateClientDto } from './dtos/update-client.dto';

@Injectable()
export class ClientsService {
  constructor(
    private readonly clientsRepository: ClientsRepository,
    private readonly colorsRepository: ColorsRepository,
  ) {}

  findAll(findManyClientsDto: FindManyClientsDto) {
    return this.clientsRepository.findMany(findManyClientsDto);
  }

  async create(createClientDto: CreateClientDto) {
    const { cpf, email, colorId } = createClientDto;

    await this.validateCpfConflict(cpf);
    await this.validateEmailConflict(email);
    await this.validateColorExists(colorId);

    return this.clientsRepository.create(createClientDto);
  }

  async update(clientId: string, updateClientDto: UpdateClientDto) {
    const client = await this.findById(clientId);
    const { cpf, email, colorId } = updateClientDto;

    if (client.cpf !== cpf) await this.validateCpfConflict(cpf);
    if (client.email !== email) await this.validateEmailConflict(email);
    if (client.colorId !== colorId) await this.validateColorExists(colorId);

    return this.clientsRepository.update({
      id: client.id,
      ...updateClientDto,
    });
  }

  async delete(clientId: string) {
    await this.findById(clientId);

    await this.clientsRepository.delete(clientId);
  }

  private async findById(clientId: string) {
    const client = await this.clientsRepository.findById(clientId);

    if (!client) throw new NotFoundException('Client is not found.');

    return client;
  }

  private async validateCpfConflict(cpf: string) {
    const cpfAlreadyExists = await this.clientsRepository.findByCpf(cpf);

    if (cpfAlreadyExists) {
      throw new ConflictException('This CPF is already in use');
    }
  }

  private async validateEmailConflict(email: string) {
    const emailAlreadyExists = await this.clientsRepository.findByEmail(email);

    if (emailAlreadyExists) {
      throw new ConflictException('This email is already in use');
    }
  }

  private async validateColorExists(colorId: string) {
    const color = await this.colorsRepository.findById(colorId);

    if (!color) throw new NotFoundException('Color is not found.');
  }
}
