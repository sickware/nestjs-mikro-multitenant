import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository, EntityManager } from '@mikro-orm/postgresql';
import { wrap } from '@mikro-orm/core';
import { Injectable, NotFoundException } from '@nestjs/common';

import { ClienteDto } from './dto/cliente.dto';
import { Cliente } from '../../database/models/global/empresa/cliente.entity';
import { Organizacion } from '../../database/models/structure/public/organizacion.entity';

@Injectable()
export class ClientesService {
    
    constructor(
        @InjectRepository(Cliente) private readonly clienteRepo : EntityRepository<Cliente>,
        @InjectRepository(Organizacion) private readonly organizacionRepo : EntityRepository<Organizacion>,
        private readonly em : EntityManager
    ){}

    async getClientes( schema : string ) : Promise<Cliente[]>{
        const clientes = await this.clienteRepo.findAll({ schema });
        return clientes;
    }

    async getClientesTest1( schema : string ){//query por cada registro
        const clientes = await this.clienteRepo.findAll({ schema });

        const clientesOrganizacion : Cliente[]  = await Promise.all( clientes.map( async c => {
            const { ...org } = await this.organizacionRepo.findOne( c.idOrganizacion.uuid );
            c.idOrganizacion = org;
            return c;
        }));

        // console.log(clientesOrganizacion)

        return clientesOrganizacion;
    }

    async getClientesTest2 ( schema : string ) { //2 querys
        const clientes = await this.clienteRepo.findAll({ schema });
        
        const idsOrg = clientes.map( c => {
            return c.idOrganizacion.uuid
        })
        const filter = new Set(idsOrg);
        const result = [...filter];
        
        const organizaciones = await this.organizacionRepo.find(result);

        const clientesOrg = clientes.map( c => {
            const {...org} = organizaciones.find( org => org.uuid === c.idOrganizacion.uuid)
            c.idOrganizacion = org;
            return c;
        });

        return clientesOrg;        
    }

    async getClientesTest3 ( schema : string ) {//querybuilder
        const knex = this.em.getKnex();
        return await knex(knex.ref('cliente').withSchema( schema ).as('c'))
                    .leftJoin((knex.ref('organizacion').withSchema('public').as('o')), 'c.id_organizacion_uuid','=', 'o.uuid' )
                    .select('*');
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

    async saveClienteWrap( data : ClienteDto, schema : string ) : Promise<Cliente>{
        const cliente = this.clienteRepo.create(data);
        wrap(cliente).setSchema(schema);
        await this.clienteRepo.persistAndFlush(cliente);
        return cliente;
    }

    async updateClienteWrap( uuid : string, data : Partial<ClienteDto>, schema : string ) : Promise<Cliente>{
        const cliente = await this.clienteRepo.findOne( uuid, { schema } );

        if( !cliente ){
            throw new NotFoundException('El id del cliente no existe');
        }

        wrap(cliente).assign(data);

        await this.clienteRepo.persistAndFlush(cliente);
        return cliente;
    }

    async deleteClienteWrap( uuid: string, schema : string ) : Promise<Cliente>{
        const cliente = await this.clienteRepo.findOne( uuid, { schema });
        if( !cliente ){
            throw new NotFoundException('El id del cliente no existe');
        }
        await this.clienteRepo.removeAndFlush( cliente );
        return cliente;
    }

}
