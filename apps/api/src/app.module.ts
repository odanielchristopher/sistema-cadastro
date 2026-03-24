import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';

import { ClientsModule } from '@modules/clients/clients.module';
import { DatabaseModule } from '@shared/database/database.module';

import { PaginatedResponseInterceptor } from './core/interceptors/paginated-response.interceptor';
import { ColorsModule } from './modules/colors/colors.module';

@Module({
  imports: [DatabaseModule, ColorsModule, ClientsModule],
  providers: [
    { provide: APP_INTERCEPTOR, useClass: PaginatedResponseInterceptor },
  ],
})
export class AppModule {}
