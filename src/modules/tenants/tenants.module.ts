import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';

import { TenantsController } from './tenants.controller';
import { TenantsService } from './tenants.service';

@Module({
  imports: [
    MikroOrmModule.forFeature([])
  ],
  controllers: [TenantsController],
  providers: [TenantsService]
})
export class TenantsModule {}
