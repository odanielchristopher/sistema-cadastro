/* eslint-disable @typescript-eslint/unbound-method */
import { ConflictException, NotFoundException } from '@nestjs/common';

import { ClientsRepository } from '@shared/database/contract/clients-repository.contract';
import { ColorsRepository } from '@shared/database/contract/colors-repository.contract';

import { ClientsService } from './clients.service';

describe('ClientsService', () => {
  let service: ClientsService;
  let clientsRepository: jest.Mocked<ClientsRepository>;
  let colorsRepository: jest.Mocked<ColorsRepository>;

  const color = {
    id: 'color-1',
    name: 'Azul',
    hex: '#0000ff',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const existingClient = {
    id: 'client-1',
    name: 'Maria Silva',
    email: 'maria@example.com',
    cpf: '12345678901',
    colorId: color.id,
    observations: 'Cliente recorrente',
    createdAt: new Date(),
    updatedAt: new Date(),
    color,
  };

  beforeEach(() => {
    clientsRepository = {
      findMany: jest.fn(),
      findById: jest.fn(),
      findByCpf: jest.fn(),
      findByEmail: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    } as unknown as jest.Mocked<ClientsRepository>;

    colorsRepository = {
      findMany: jest.fn(),
      findByName: jest.fn(),
      findById: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    } as unknown as jest.Mocked<ColorsRepository>;

    service = new ClientsService(clientsRepository, colorsRepository);
  });

  describe('create', () => {
    it('creates a client when cpf, email and color are valid', async () => {
      const input = {
        name: 'Maria Silva',
        email: 'maria@example.com',
        cpf: '12345678901',
        colorId: color.id,
        observations: 'Cliente recorrente',
      };

      clientsRepository.findByCpf.mockResolvedValue(null);
      clientsRepository.findByEmail.mockResolvedValue(null);
      colorsRepository.findById.mockResolvedValue(color);
      clientsRepository.create.mockResolvedValue(existingClient);

      await expect(service.create(input)).resolves.toEqual(existingClient);

      expect(clientsRepository.findByCpf).toHaveBeenCalledWith(input.cpf);
      expect(clientsRepository.findByEmail).toHaveBeenCalledWith(input.email);
      expect(colorsRepository.findById).toHaveBeenCalledWith(input.colorId);
      expect(clientsRepository.create).toHaveBeenCalledWith(input);
    });

    it('throws when cpf is already in use', async () => {
      const input = {
        name: 'Maria Silva',
        email: 'maria@example.com',
        cpf: '12345678901',
        colorId: color.id,
      };

      clientsRepository.findByCpf.mockResolvedValue(existingClient);

      await expect(service.create(input)).rejects.toBeInstanceOf(
        ConflictException,
      );

      expect(clientsRepository.findByEmail).not.toHaveBeenCalled();
      expect(colorsRepository.findById).not.toHaveBeenCalled();
      expect(clientsRepository.create).not.toHaveBeenCalled();
    });

    it('throws when email is already in use', async () => {
      const input = {
        name: 'Maria Silva',
        email: 'maria@example.com',
        cpf: '12345678901',
        colorId: color.id,
      };

      clientsRepository.findByCpf.mockResolvedValue(null);
      clientsRepository.findByEmail.mockResolvedValue(existingClient);

      await expect(service.create(input)).rejects.toBeInstanceOf(
        ConflictException,
      );

      expect(colorsRepository.findById).not.toHaveBeenCalled();
      expect(clientsRepository.create).not.toHaveBeenCalled();
    });

    it('throws when the selected color does not exist', async () => {
      const input = {
        name: 'Maria Silva',
        email: 'maria@example.com',
        cpf: '12345678901',
        colorId: color.id,
      };

      clientsRepository.findByCpf.mockResolvedValue(null);
      clientsRepository.findByEmail.mockResolvedValue(null);
      colorsRepository.findById.mockResolvedValue(null);

      await expect(service.create(input)).rejects.toBeInstanceOf(
        NotFoundException,
      );

      expect(clientsRepository.create).not.toHaveBeenCalled();
    });
  });

  describe('update', () => {
    it('updates a client when the data is valid', async () => {
      const newColor = {
        ...color,
        id: 'color-2',
        name: 'Verde',
        hex: '#00ff00',
      };

      const input = {
        name: 'Maria Souza',
        email: 'maria.souza@example.com',
        cpf: '98765432100',
        colorId: newColor.id,
        observations: 'Atualizado manualmente',
      };

      const updatedClient = {
        ...existingClient,
        ...input,
      };

      clientsRepository.findById.mockResolvedValue(existingClient);
      clientsRepository.findByCpf.mockResolvedValue(null);
      clientsRepository.findByEmail.mockResolvedValue(null);
      colorsRepository.findById.mockResolvedValue(newColor);
      clientsRepository.update.mockResolvedValue(updatedClient);

      await expect(service.update(existingClient.id, input)).resolves.toEqual(
        updatedClient,
      );

      expect(clientsRepository.findById).toHaveBeenCalledWith(
        existingClient.id,
      );
      expect(clientsRepository.findByCpf).toHaveBeenCalledWith(input.cpf);
      expect(clientsRepository.findByEmail).toHaveBeenCalledWith(input.email);
      expect(colorsRepository.findById).toHaveBeenCalledWith(input.colorId);
      expect(clientsRepository.update).toHaveBeenCalledWith({
        id: existingClient.id,
        ...input,
      });
    });

    it('throws when the client does not exist', async () => {
      const input = {
        name: 'Maria Souza',
        email: 'maria.souza@example.com',
        cpf: '98765432100',
        colorId: color.id,
      };

      clientsRepository.findById.mockResolvedValue(null);

      await expect(
        service.update(existingClient.id, input),
      ).rejects.toBeInstanceOf(NotFoundException);

      expect(clientsRepository.update).not.toHaveBeenCalled();
    });

    it('throws when cpf conflicts with another client', async () => {
      const input = {
        name: 'Maria Souza',
        email: 'maria.souza@example.com',
        cpf: '98765432100',
        colorId: color.id,
      };

      clientsRepository.findById.mockResolvedValue(existingClient);
      clientsRepository.findByCpf.mockResolvedValue(existingClient);

      await expect(
        service.update(existingClient.id, input),
      ).rejects.toBeInstanceOf(ConflictException);

      expect(clientsRepository.update).not.toHaveBeenCalled();
    });

    it('throws when the new color does not exist', async () => {
      const input = {
        name: existingClient.name,
        email: existingClient.email,
        cpf: existingClient.cpf,
        colorId: 'color-2',
      };

      clientsRepository.findById.mockResolvedValue(existingClient);
      clientsRepository.findByCpf.mockResolvedValue(null);
      clientsRepository.findByEmail.mockResolvedValue(null);
      colorsRepository.findById.mockResolvedValue(null);

      await expect(
        service.update(existingClient.id, input),
      ).rejects.toBeInstanceOf(NotFoundException);

      expect(clientsRepository.update).not.toHaveBeenCalled();
    });
  });

  describe('delete', () => {
    it('deletes a client when it exists', async () => {
      clientsRepository.findById.mockResolvedValue(existingClient);
      clientsRepository.delete.mockResolvedValue(undefined);

      await expect(service.delete(existingClient.id)).resolves.toBeUndefined();

      expect(clientsRepository.findById).toHaveBeenCalledWith(
        existingClient.id,
      );
      expect(clientsRepository.delete).toHaveBeenCalledWith(existingClient.id);
    });

    it('throws when trying to delete a missing client', async () => {
      clientsRepository.findById.mockResolvedValue(null);

      await expect(service.delete(existingClient.id)).rejects.toBeInstanceOf(
        NotFoundException,
      );

      expect(clientsRepository.delete).not.toHaveBeenCalled();
    });
  });
});
