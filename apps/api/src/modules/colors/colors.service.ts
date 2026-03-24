import { Injectable } from '@nestjs/common';

import { ColorsRepository } from '@shared/database/contract/colors-repository.contract';

@Injectable()
export class ColorsService {
  constructor(private readonly colorsRepository: ColorsRepository) {}

  findAll() {
    return this.colorsRepository.findMany();
  }
}
