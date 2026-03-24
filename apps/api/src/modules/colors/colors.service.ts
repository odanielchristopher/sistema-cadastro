import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { ColorsRepository } from '@shared/database/contract/colors-repository.contract';

import { CreateColorDto } from './dtos/create-color.dto';
import { UpdateColorDto } from './dtos/update-color.dto';

@Injectable()
export class ColorsService {
  constructor(private readonly colorsRepository: ColorsRepository) {}

  findAll() {
    return this.colorsRepository.findMany();
  }

  async create(createColorDto: CreateColorDto) {
    const { name, hex } = createColorDto;

    await this.validateNameConflict(name);

    return this.colorsRepository.create({ hex, name });
  }

  async update(colorId: string, updateColorDto: UpdateColorDto) {
    const { name, hex } = updateColorDto;

    const color = await this.findById(colorId);

    if (color.name !== name) await this.validateNameConflict(name);

    return this.colorsRepository.update({ id: color.id, name, hex });
  }

  async delete(colorId: string) {
    await this.findById(colorId);

    await this.colorsRepository.delete(colorId);
  }

  private async findById(colorId: string) {
    const color = await this.colorsRepository.findById(colorId);

    if (!color) throw new NotFoundException('Color is not found.');

    return color;
  }

  private async validateNameConflict(name: string) {
    const nameAlreadyExists = await this.colorsRepository.findByName(name);

    if (nameAlreadyExists)
      throw new ConflictException('This name is already in use');
  }
}
