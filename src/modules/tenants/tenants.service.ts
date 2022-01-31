import { Injectable } from '@nestjs/common';
import { InjectRepository, MikroOrmModule } from '@mikro-orm/nestjs';
import { Tenant } from './../../database/models/public/tenant.entity';
import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';
import { MikroORM } from '@mikro-orm/core';
import { getTenantConnection } from '../tenancy/tenancy.util';
import configEmpresa from '../../mikro-orm.config.empresa';
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
        // await this.em.execute('CREATE SCHEMA IF NOT EXISTS schemaPrueba');

        // const schemaGen = await this.or.getSchemaGenerator();

        // const newSchema = await schemaGen.createSchema({ schema : 'public' });

        // console.log( (await this.or.connect()).getConnection() );
        
        const connectionManager = await this.or.connect();
        console.log(connectionManager.getConnection().getConnectionOptions());

        const schemaGenPublic = this.or.getSchemaGenerator();
        await schemaGenPublic.createSchema({ schema : 'public' });

        await connectionManager.getConnection().close() 

        
        const or2 = await MikroORM.init({
            ...configEmpresa
        });

        const connectionManager2 = await or2.connect();
        console.log(connectionManager2.getConnection().getConnectionOptions());

        const schemaGenEmpresa = or2.getSchemaGenerator();
        await schemaGenEmpresa.createSchema({ schema : 'empresa1'});

        await connectionManager2.close();


        // const migrator = await this.or.getMigrator();
        // console.log(migrator);
        // const migracion = await migrator.createMigration(); 
        // const resp = await migrator.up('20220106200228');
        
        // console.log(resp);
        // await this.tenantRepository.createQueryBuilder().insert({ name : 'schemaPrueba'}).withSchema('schemaPrueba');
        return 'ok';
    }

}
