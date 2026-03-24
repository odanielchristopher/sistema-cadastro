import { Global, Module } from '@nestjs/common';

import { ClientsRepository } from './contract/clients-repository.contract';
import { ColorsRepository } from './contract/colors-repository.contract';
import { UsersRepository } from './contract/users-repository.contract';
import { PrismaService } from './prisma.service';
import { PrismaClientsRepository } from './repositories/prisma-clients.repository';
import { PrismaColorsRepository } from './repositories/prisma-colors.repository';
import { PrismaUsersRepository } from './repositories/prisma-users.repository';

@Global()
@Module({
  providers: [
    PrismaService,
    { provide: ColorsRepository, useClass: PrismaColorsRepository },
    { provide: ClientsRepository, useClass: PrismaClientsRepository },
    { provide: UsersRepository, useClass: PrismaUsersRepository },
  ],
  exports: [
    PrismaService,
    { provide: ColorsRepository, useClass: PrismaColorsRepository },
    { provide: ClientsRepository, useClass: PrismaClientsRepository },
    { provide: UsersRepository, useClass: PrismaUsersRepository },
  ],
})
export class DatabaseModule {}
