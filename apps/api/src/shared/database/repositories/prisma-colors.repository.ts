import { Injectable } from '@nestjs/common';

import { Color } from '@modules/colors/entities/color.entity';

import { ColorsRepository } from '../contract/colors-repository.contract';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaColorsRepository implements ColorsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  findMany() {
    return this.prismaService.color.findMany();
  }

  findByName(name: string): Promise<Color | null> {
    return this.prismaService.color.findUnique({ where: { name } });
  }

  async create(color: Pick<Color, 'name' | 'hex'>) {
    return this.prismaService.color.create({
      data: {
        name: color.name,
        hex: color.hex,
      },
    });
  }
}
