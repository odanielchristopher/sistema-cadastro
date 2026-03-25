/* eslint-disable @typescript-eslint/unbound-method */
import { ConflictException, NotFoundException } from '@nestjs/common';

import { ColorsRepository } from '@shared/database/contract/colors-repository.contract';

import { ColorsService } from './colors.service';

describe('ColorsService', () => {
  let service: ColorsService;
  let colorsRepository: jest.Mocked<ColorsRepository>;

  const color = {
    id: 'color-1',
    name: 'Azul',
    hex: '#0000ff',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(() => {
    colorsRepository = {
      findMany: jest.fn(),
      findByName: jest.fn(),
      findById: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    } as unknown as jest.Mocked<ColorsRepository>;

    service = new ColorsService(colorsRepository);
  });

  describe('create', () => {
    it('creates a color when the name is available', async () => {
      const input = { name: 'Azul', hex: '#0000ff' };

      colorsRepository.findByName.mockResolvedValue(null);
      colorsRepository.create.mockResolvedValue(color);

      await expect(service.create(input)).resolves.toEqual(color);

      expect(colorsRepository.findByName).toHaveBeenCalledWith(input.name);
      expect(colorsRepository.create).toHaveBeenCalledWith(input);
    });

    it('throws when the name is already in use', async () => {
      const input = { name: 'Azul', hex: '#0000ff' };

      colorsRepository.findByName.mockResolvedValue(color);

      await expect(service.create(input)).rejects.toBeInstanceOf(
        ConflictException,
      );

      expect(colorsRepository.create).not.toHaveBeenCalled();
    });
  });

  describe('update', () => {
    it('updates a color when the data is valid', async () => {
      const input = { name: 'Azul Claro', hex: '#3333ff' };
      const updatedColor = { ...color, ...input };

      colorsRepository.findById.mockResolvedValue(color);
      colorsRepository.findByName.mockResolvedValue(null);
      colorsRepository.update.mockResolvedValue(updatedColor);

      await expect(service.update(color.id, input)).resolves.toEqual(
        updatedColor,
      );

      expect(colorsRepository.findById).toHaveBeenCalledWith(color.id);
      expect(colorsRepository.findByName).toHaveBeenCalledWith(input.name);
      expect(colorsRepository.update).toHaveBeenCalledWith({
        id: color.id,
        ...input,
      });
    });

    it('throws when the color does not exist', async () => {
      const input = { name: 'Azul Claro', hex: '#3333ff' };

      colorsRepository.findById.mockResolvedValue(null);

      await expect(service.update(color.id, input)).rejects.toBeInstanceOf(
        NotFoundException,
      );

      expect(colorsRepository.update).not.toHaveBeenCalled();
    });

    it('throws when the new name is already in use', async () => {
      const input = { name: 'Verde', hex: '#00ff00' };

      colorsRepository.findById.mockResolvedValue(color);
      colorsRepository.findByName.mockResolvedValue({
        ...color,
        name: 'Verde',
      });

      await expect(service.update(color.id, input)).rejects.toBeInstanceOf(
        ConflictException,
      );

      expect(colorsRepository.update).not.toHaveBeenCalled();
    });
  });

  describe('delete', () => {
    it('deletes a color when it exists', async () => {
      colorsRepository.findById.mockResolvedValue(color);
      colorsRepository.delete.mockResolvedValue(undefined);

      await expect(service.delete(color.id)).resolves.toBeUndefined();

      expect(colorsRepository.findById).toHaveBeenCalledWith(color.id);
      expect(colorsRepository.delete).toHaveBeenCalledWith(color.id);
    });

    it('throws when trying to delete a missing color', async () => {
      colorsRepository.findById.mockResolvedValue(null);

      await expect(service.delete(color.id)).rejects.toBeInstanceOf(
        NotFoundException,
      );

      expect(colorsRepository.delete).not.toHaveBeenCalled();
    });
  });
});
