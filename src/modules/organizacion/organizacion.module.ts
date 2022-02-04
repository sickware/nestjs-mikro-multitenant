import { Module } from '@nestjs/common';
import { OrganizacionController } from './organizacion.controller';
import { OrganizacionService } from './organizacion.service';

@Module({
  controllers: [OrganizacionController],
  providers: [OrganizacionService]
})
export class OrganizacionModule {}
