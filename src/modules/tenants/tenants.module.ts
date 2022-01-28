import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';

import { TenantsController } from './tenants.controller';
import { TenantsService } from './tenants.service';
import { Tenant } from './../../database/models/public/tenant.entity';

@Module({
  imports: [
    MikroOrmModule.forFeature([Tenant])
  ],
  controllers: [TenantsController],
  providers: [TenantsService]
})
export class TenantsModule {}
