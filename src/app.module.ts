import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TenantsModule } from './modules/tenants/tenants.module';
import { TenancyModule } from './modules/tenancy/tenancy.module';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { ClientesModule } from './modules/clientes/clientes.module';
import { OrganizacionModule } from './modules/organizacion/organizacion.module';
import { TenancyMiddleware, ExistTenantMiddleware } from './modules/tenancy/tenancy.middleware';

@Module({
  imports: [
    MikroOrmModule.forRoot(),
    TenantsModule, 
    TenancyModule, 
    ClientesModule, 
    OrganizacionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        TenancyMiddleware,
        ExistTenantMiddleware
      )
      .exclude(
        { path : 'tenants/create/base', method : RequestMethod.GET }
      )
      .forRoutes('*')
  }
}
