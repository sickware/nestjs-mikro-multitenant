import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { OrganizacionController } from './organizacion.controller';
import { OrganizacionService } from './organizacion.service';
import { Organizacion } from '../../database/models/global/public/organizacion.entity';

@Module({
  imports : [
    MikroOrmModule.forFeature([ Organizacion ])
  ],
  controllers: [OrganizacionController],
  providers: [OrganizacionService]
})
export class OrganizacionModule {}
