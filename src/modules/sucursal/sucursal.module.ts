import { Sucursal } from './../../database/models/global/sucursal/sucursal.entity';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { SucursalController } from './sucursal.controller';
import { SucursalService } from './sucursal.service';

@Module({
  imports : [
    MikroOrmModule.forFeature([ Sucursal ])
  ],
  controllers: [SucursalController],
  providers: [SucursalService]
})
export class SucursalModule {}
