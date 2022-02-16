import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository, EntityManager } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';

import { ClienteDto } from './dto/cliente.dto';
import { Cliente } from '../../database/models/empresa/cliente.entity';

@Injectable()
export class ClientesService {
    
    constructor(
        @InjectRepository(Cliente) private readonly clienteRepo : EntityRepository<Cliente>,
        private readonly em  : EntityManager
    ){}

    async getClientes( schema : string ) : Promise<Cliente[]> {
        // return await this.clienteRepo.find({},{ populate : ['idOrganizacion'], schema })
        return await this.clienteRepo.findAll({ populate : true , schema  });
        // const clientes = await this.clienteRepo.findAll({ schema });
        // return await this.clienteRepo.populate ( clientes , true );
        // return await this.em.find(Cliente,{},{ schema, populate : true });
    }

    async getClientesRelations( schema : string ){
        // return await this.rClienteRepo.find({},{ schema, populate : true });
        return await this.clienteRepo.createQueryBuilder('c').select('*').join('c.idOrganizacion','o');
    }

    async saveCliente( data : ClienteDto, schema : string ){
        const cliente = this.clienteRepo.create( data );
        const resp = await this.clienteRepo.createQueryBuilder().insert( cliente ).withSchema( schema );

        if( !resp ){
            throw new Error('Error al guardar el cliente');
        }

        return cliente;
    }

    async updateCliente( uuid : string, data : Partial<ClienteDto>, schema : string ){
        return await this.clienteRepo.createQueryBuilder().update( data ).where({ uuid }).withSchema( schema );
    }

    async deleteCliente( uuid : string, schema : string){
        return await this.clienteRepo.createQueryBuilder().delete().where({ uuid }).withSchema( schema );
    }

}
