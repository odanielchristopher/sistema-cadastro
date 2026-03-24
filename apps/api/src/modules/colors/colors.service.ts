import { ConflictException, Injectable } from '@nestjs/common';

import { ColorsRepository } from '@shared/database/contract/colors-repository.contract';

import { CreateColorDto } from './dtos/create-color.dto';

@Injectable()
export class ColorsService {
  constructor(private readonly colorsRepository: ColorsRepository) {}

  findAll() {
    return this.colorsRepository.findMany();
  }

  async create(createColorDto: CreateColorDto) {
    const { name, hex } = createColorDto;

    const nameAlreadyExists = await this.colorsRepository.findByName(name);

    if (nameAlreadyExists)
      throw new ConflictException('This name is already in use');

    return this.colorsRepository.create({ hex, name });
  }
}
