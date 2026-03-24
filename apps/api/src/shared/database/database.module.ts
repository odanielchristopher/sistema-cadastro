import { Global, Module } from '@nestjs/common';

import { ColorsRepository } from './contract/colors-repository.contract';
import { ClientsRepository } from './contract/clients-repository.contract';
import { PrismaService } from './prisma.service';
import { PrismaColorsRepository } from './repositories/prisma-colors.repository';
import { PrismaClientsRepository } from './repositories/prisma-clients.repository';

@Global()
@Module({
  providers: [
    PrismaService,
    { provide: ColorsRepository, useClass: PrismaColorsRepository },
    { provide: ClientsRepository, useClass: PrismaClientsRepository },
  ],
  exports: [
    PrismaService,
    { provide: ColorsRepository, useClass: PrismaColorsRepository },
    { provide: ClientsRepository, useClass: PrismaClientsRepository },
  ],
})
export class DatabaseModule {}
