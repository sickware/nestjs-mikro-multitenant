import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';

import { ClienteDto } from './dto/cliente.dto';
import { wrap, MikroORM } from '@mikro-orm/core';

export let schemaPublic;
import { Cliente } from '../../database/models/global/empresa/cliente.entity';
import config from '../../mikro-orm.config'

@Injectable()
export class ClientesService {
    
    constructor(
        @InjectRepository(Cliente) private readonly clienteRepo : EntityRepository<Cliente>,
        private readonly orm : MikroORM
    ){}

    async getClientes( schema : string ) : Promise<Cliente[]>{
        console.log(global.globalSchema);
        global.globalSchema = 'public';
        console.log(global.globalSchema);

        const or = await MikroORM.init({
            ...config
        });

        const rep = or.em.getRepository(Cliente);
        const clientes = rep.findAll({ schema, populate : true })
        // const clientes = await this.clienteRepo.findAll({ schema, populate : true });
        return clientes;
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
