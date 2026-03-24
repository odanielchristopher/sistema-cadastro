import { Module } from '@nestjs/common';

import { DatabaseModule } from '@shared/database/database.module';
import { ColorsModule } from './modules/colors/colors.module';

@Module({
  imports: [DatabaseModule, ColorsModule],
  providers: [],
})
export class AppModule {}
