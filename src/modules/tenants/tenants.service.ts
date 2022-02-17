import { toSnake } from './../../database/helpers/utils';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';
import { MikroORM } from '@mikro-orm/core';

import configPublic from '../../mikro-orm.config.public';
import configEmpresa from '../../mikro-orm.config.empresa';
import configSucursal from '../../mikro-orm.config.sucursal';

import { getTenantConnection } from '../tenancy/tenancy.util';
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

    async getTenantsEmpresa() : Promise<TenantEmpresa[]> {
        return await this.tenantEmpresaRepo.findAll();
    }

    async getTenantsSucursal( schemaEmpresa : string ) : Promise<TenantSucursal[]>{
        return await this.tenantSucursalRepo.find({ idTenantEmpresa : schemaEmpresa },{ populate : true });
    }

    getConnection(){
        // const connection : Connection = this.em.getConnection();
        // console.log(connection);
        getTenantConnection('tenant_id', this.em );
        return "ok";        
    }

    async createEntity(){

        // //Public
        // const connectionManager = await this.or.connect();
        // console.log(connectionManager.getConnection().getConnectionOptions());

        // const schemaGenPublic = this.or.getSchemaGenerator();
        // const resp1 = await schemaGenPublic.createSchema({ schema : 'public' });
        // // console.log(resp1);

        // await connectionManager.getConnection().close() 


        //Empresa    
        const or2 = await MikroORM.init({
            ...configEmpresa
        });

        const connectionManager2 = await or2.connect();
        console.log(connectionManager2.getConnection().getConnectionOptions());

        const schemaGenEmpresa = or2.getSchemaGenerator();
        const resp2 = await schemaGenEmpresa.createSchema({ schema : 'empresa8'});
        // console.log(resp2);

        await connectionManager2.close();

        //Sucursal
        const or3 = await MikroORM.init({
            ...configSucursal
        });

        const schemaGenSucursal = or3.getSchemaGenerator()

        const resp3 = await schemaGenSucursal.createSchema({ schema : 'sucursal8' })
        // console.log(resp3);

        await or3.close();
        
        return 'schemas creados';
    }

    //TODO
    //Se debe de crear manualmente con migraciones los schemas base?
    //Crear el schema public si no existe
    async makeSchemaBase(){
        // const schemas = await this.em.execute(`select schema_name as name from information_schema.schemata where schema_name = 'public';`);

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
     * 
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

    async makeRelations( schemaEmpresa : string, schemaSucursal : string ){
        const schemas : Schemas = {
            public : 'public',
            empresa : schemaEmpresa,
            sucursal : schemaSucursal
        }

        const relationsEmpresa : Relation[]  = injectSchemas( empresaRelations, schemas );
        const relationsSucursal : Relation[]  = injectSchemas( sucursalRelations, schemas );

        const queryEmpresa =  addRelations( relationsEmpresa );
        const querySucursal = addRelations( relationsSucursal );

        try {
            const resp = await this.em.execute(queryEmpresa+querySucursal);
            return resp;
        } catch (error) {
            console.log(error);
            return 'error al crear la relacion, revise si ya existe'
        }
    }


}
