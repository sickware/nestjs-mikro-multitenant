import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import config from './mikro-orm.config';
import { TenantsModule } from './modules/tenants/tenants.module';
import { TenancyModule } from './modules/tenancy/tenancy.module';
import { MikroOrmModule } from '@mikro-orm/nestjs';

@Module({
  imports: [
    MikroOrmModule.forRoot(),
    TenantsModule, 
    TenancyModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
