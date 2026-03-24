import { Injectable } from '@nestjs/common';

import { ColorsRepository } from '../contract/colors-repository.contract';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaColorsRepository implements ColorsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findMany() {
    return this.prismaService.color.findMany();
  }
}
