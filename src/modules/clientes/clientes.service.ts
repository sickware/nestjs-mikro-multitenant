import { wrap } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';

import { ClienteDto } from './dto/cliente.dto';
import { Cliente } from '../../database/models/global/empresa/cliente.entity';
import { Organizacion } from '../../database/models/structure/public/organizacion.entity';

@Injectable()
export class ClientesService {
    
    constructor(
        @InjectRepository(Cliente) private readonly clienteRepo : EntityRepository<Cliente>,
        @InjectRepository(Organizacion) private readonly organizacionRepo : EntityRepository<Organizacion>
    ){}

    async getClientes( schema : string ) : Promise<Cliente[]>{
        const clientes = await this.clienteRepo.findAll({ schema });

        const idOrganizacion = clientes[0].idOrganizacion.uuid;
        const organizacion = await this.organizacionRepo.findOne( idOrganizacion, { schema : 'public'} );

        Object.assign(clientes[1].idOrganizacion, organizacion );
        console.log(clientes);

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
