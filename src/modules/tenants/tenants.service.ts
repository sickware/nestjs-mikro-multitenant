import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';
import { MikroORM } from '@mikro-orm/core';

import { Tenant } from '../../database/models/public/tenant.entity';
import { getTenantConnection } from '../tenancy/tenancy.util';
import configEmpresa from '../../mikro-orm.config.empresa';
import configSucursal from '../../mikro-orm.config.sucursal';
import { sucursalRelations, empresaRelations } from '../../database/relations/relations';
import { addRelations, injectSchemas } from '../../database/helpers/addRelations';
import { Relation, Schemas } from '../../database/relations/relation.interface';

@Injectable()
export class TenantsService {

    constructor( 
        @InjectRepository(Tenant) private readonly tenantRepository : EntityRepository<Tenant> ,
        private readonly em : EntityManager,
        private readonly or : MikroORM
    ){}

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
        const resp2 = await schemaGenEmpresa.createSchema({ schema : 'empresa6'});
        // console.log(resp2);

        await connectionManager2.close();

        //Sucursal
        const or3 = await MikroORM.init({
            ...configSucursal
        });

        const schemaGenSucursal = or3.getSchemaGenerator()

        const resp3 = await schemaGenSucursal.createSchema({ schema : 'sucursal6' })
        // console.log(resp3);

        await or3.close();
        
        return 'schemas creados';
    }

    async makeRelations(){
        const schemas : Schemas = {
            public : 'public',
            empresa : 'empresa6',
            sucursal : 'sucursal6'
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
