import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { ClientesController } from './clientes.controller';
import { ClientesService } from './clientes.service';
import { Cliente } from './../../database/models/empresa/cliente.entity';
import { Cliente as ClienteR } from '../../database/global-models/empresa/cliente.entity';

@Module({
  imports : [
    MikroOrmModule.forFeature([Cliente, ClienteR])
  ],
  controllers: [ClientesController],
  providers: [ClientesService]
})
export class ClientesModule {}
