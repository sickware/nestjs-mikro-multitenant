import { Organizacion } from './../../database/models/structure/public/organizacion.entity';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { ClientesController } from './clientes.controller';
import { ClientesService } from './clientes.service';
import { Cliente } from '../../database/models/global/empresa/cliente.entity';

@Module({
  imports : [
    MikroOrmModule.forFeature([ Cliente, Organizacion ])
  ],
  controllers: [ClientesController],
  providers: [ClientesService]
})
export class ClientesModule {}
