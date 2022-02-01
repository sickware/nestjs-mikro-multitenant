import { Injectable } from '@nestjs/common';
import { InjectRepository, MikroOrmModule } from '@mikro-orm/nestjs';
import { Tenant } from './../../database/models/public/tenant.entity';
import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';
import { MikroORM } from '@mikro-orm/core';
import { getTenantConnection } from '../tenancy/tenancy.util';
import configEmpresa from '../../mikro-orm.config.empresa';
import configSucursal from '../../mikro-orm.config.sucursal';
// import { Migration20220106200228 } from '../../database/migrations/Migration20220106200228';


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

        //Public
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
        const resp2 = await schemaGenEmpresa.createSchema({ schema : 'empresa2'});
        // console.log(resp2);

        await connectionManager2.close();

        //Sucursal
        const or3 = await MikroORM.init({
            ...configSucursal
        });

        const schemaGenSucursal = or3.getSchemaGenerator()

        const resp3 = await schemaGenSucursal.createSchema({ schema : 'sucursal2' })
        // console.log(resp3);

        await or3.close();


        
        return 'schemas creados';
    }

}
