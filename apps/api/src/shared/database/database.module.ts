import { Global, Module } from '@nestjs/common';

import { ColorsRepository } from './contract/colors-repository.contract';
import { PrismaService } from './prisma.service';
import { PrismaColorsRepository } from './repositories/prisma-colors.repository';

@Global()
@Module({
  providers: [
    PrismaService,
    { provide: ColorsRepository, useClass: PrismaColorsRepository },
  ],
  exports: [
    PrismaService,
    { provide: ColorsRepository, useClass: PrismaColorsRepository },
  ],
})
export class DatabaseModule {}
