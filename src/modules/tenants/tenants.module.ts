import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';

import { TenantsController } from './tenants.controller';
import { TenantsService } from './tenants.service';
import { TenantEmpresa } from '../../database/models/global/public/tenantEmpresa.entity';
import { TenantSucursal } from '../../database/models/global/public/tenantSucursal.entity';

@Module({
  imports: [
    MikroOrmModule.forFeature([ TenantSucursal, TenantEmpresa])
  ],
  controllers: [TenantsController],
  providers: [TenantsService]
})
export class TenantsModule {}
