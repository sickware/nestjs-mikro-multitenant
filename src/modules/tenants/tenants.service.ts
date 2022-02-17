import { toSnake } from './../../database/helpers/utils';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';
import { MikroORM } from '@mikro-orm/core';

import configPublic from '../../mikro-orm.config.public';
import configEmpresa from '../../mikro-orm.config.empresa';
import configSucursal from '../../mikro-orm.config.sucursal';

import { sucursalRelations, empresaRelations } from '../../database/relations/relations';
import { addRelations, injectSchemas } from '../../database/helpers/addRelations';
import { Relation, Schemas } from '../../database/relations/relation.interface';
import { TenantEmpresa } from '../../database/models/global/public/tenantEmpresa.entity';
import { TenantSucursal } from '../../database/models/global/public/tenantSucursal.entity';

@Injectable()
export class TenantsService {

    constructor( 
        @InjectRepository(TenantEmpresa) private readonly tenantEmpresaRepo : EntityRepository<TenantEmpresa>,
        @InjectRepository(TenantSucursal) private readonly tenantSucursalRepo : EntityRepository<TenantSucursal>,        // @InjectRepository(Tenant) private readonly tenantRepository : EntityRepository<Tenant> ,
        private readonly em : EntityManager,
        private readonly or : MikroORM
    ){}


    /**
     * Obtener empresas existentes en el sistema
     * @returns Array de empresas
     */
    async getTenantsEmpresa() : Promise<TenantEmpresa[]> {
        return await this.tenantEmpresaRepo.findAll();
    }

    /**
     * Obtener sucursales de una determinada sucursal
     * @param uuid - id de la empresa a consultar 
     * @returns - Empresa con su array de sucursales
     */
    async getSucursalesByEmpresa( uuid : string ) : Promise<TenantEmpresa> {
        return await this.tenantEmpresaRepo.findOne({ uuid },{ populate  : [ 'sucursales' ] });
    }


    /**
     * TODO - mejorar la respuest cuando el schema public es creado
     * @returns mensaje si el schema se ha creado
     */
    async makeSchemaBase(){
        const schemas = await this.em.execute(`SELECT * FROM information_schema.tables WHERE table_schema = 'public'`);
        if( schemas.length ) {
            return 'El schema ya existe';
        }

        await this.em.execute(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`);

        const or2 = await MikroORM.init({
            ...configPublic
        });

        const connectionManager = await or2.connect();
        const schemaGenPublic = or2.getSchemaGenerator();
        await schemaGenPublic.createSchema({ schema : 'public' });

        await connectionManager.getConnection().close();

        return 'schema creado';
    }


    /**
     * Crea una nueva empresa (schema y relaciones)
     * @param name - Nombre de la empresa
     * @returns 
     */
    async makeSchemaEmpresa( name : string ){  
        try {

            const tenantEmpresa = this.tenantEmpresaRepo.create({ name });

            await this.tenantEmpresaRepo.persistAndFlush( tenantEmpresa );

            const or2 = await MikroORM.init({
                ...configEmpresa
            });
    
            const schema = `empresa_${toSnake(tenantEmpresa.uuid)}`;

            const connectionManager2 = await or2.connect();
            const schemaGenEmpresa = or2.getSchemaGenerator();
            await schemaGenEmpresa.createSchema({ schema });
            
            await connectionManager2.close();
    
            const schemas : Schemas = {
                public : 'public',
                empresa : schema,
                sucursal : ''
            }
    
            const relationsEmpresa : Relation[]  = injectSchemas( empresaRelations, schemas );
            const queryEmpresa =  addRelations( relationsEmpresa )
            await this.em.execute(queryEmpresa);

            return schema;
        } catch (error) {
            console.log(error);
            return 'error al crear el schema'
        }
    }


    /**
     * @param name - nombre de la sucursal
     * @param idTenantEmpresa - id de la empresa a la que pertenece la sucursal
     * 
     * TODO
     * -helper para validar si el idTenantEmpresa existe
     * -validar si se creo el schema??
     */
    async makeSchemaSucursal( name : string, idTenantEmpresa : string ){

        try {
            const sucursal = this.tenantSucursalRepo.create({ name, idTenantEmpresa });
            await this.tenantSucursalRepo.persistAndFlush( sucursal );
    
            const or2 = await MikroORM.init({
                ...configSucursal
            });
    
            const schema = `sucursal_${toSnake(sucursal.uuid)}`;
            const schemaEmpresa = `empresa_${toSnake(idTenantEmpresa)}`
            const schemaGenSucursal = or2.getSchemaGenerator();
            await schemaGenSucursal.createSchema({ schema : schema })
            await or2.close();
    
            const schemas : Schemas = {
                public : 'public',
                empresa : schemaEmpresa,
                sucursal : schema
            }
    
            const relationsSucursal : Relation[]  = injectSchemas( sucursalRelations, schemas );
            const queryEmpresa =  addRelations( relationsSucursal )
            await this.em.execute(queryEmpresa);
    
            return schema;
        } catch (error) {
            return 'Error al crear el schema'
        }
    }
}
