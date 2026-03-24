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

  findById(id: string): Promise<Color | null> {
    return this.prismaService.color.findUnique({ where: { id } });
  }

  findByName(name: string): Promise<Color | null> {
    return this.prismaService.color.findUnique({ where: { name } });
  }

  create(color: Pick<Color, 'name' | 'hex'>) {
    return this.prismaService.color.create({
      data: {
        name: color.name,
        hex: color.hex,
      },
    });
  }

  update(color: Omit<Color, 'createdAt' | 'updatedAt'>): Promise<Color> {
    if (!color.id) throw Error('Cannot update color without a valid id');

    return this.prismaService.color.update({
      where: { id: color.id },
      data: {
        name: color.name,
        hex: color.hex,
      },
    });
  }

  async delete(id: string): Promise<void> {
    await this.prismaService.color.delete({ where: { id } });
  }
}
