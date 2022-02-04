import { Organizacion } from './../../database/models/public/organizacion.entity';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { OrganizacionController } from './organizacion.controller';
import { OrganizacionService } from './organizacion.service';

@Module({
  imports : [
    MikroOrmModule.forFeature([ Organizacion ])
  ],
  controllers: [OrganizacionController],
  providers: [OrganizacionService]
})
export class OrganizacionModule {}
