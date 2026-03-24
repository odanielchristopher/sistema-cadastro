import { Module } from '@nestjs/common';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';

import { AuthGuard } from '@modules/auth/auth.guard';
import { AuthModule } from '@modules/auth/auth.module';
import { ClientsModule } from '@modules/clients/clients.module';
import { UsersModule } from '@modules/users/users.module';
import { DatabaseModule } from '@shared/database/database.module';

import { PaginatedResponseInterceptor } from './core/interceptors/paginated-response.interceptor';
import { ColorsModule } from './modules/colors/colors.module';

@Module({
  imports: [
    DatabaseModule,
    ColorsModule,
    ClientsModule,
    UsersModule,
    AuthModule,
  ],
  providers: [
    { provide: APP_INTERCEPTOR, useClass: PaginatedResponseInterceptor },
    { provide: APP_GUARD, useClass: AuthGuard },
  ],
})
export class AppModule {}
