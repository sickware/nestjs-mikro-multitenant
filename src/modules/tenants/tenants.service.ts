import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Tenant } from './../../database/models/public/tenant.entity';
import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';
import { Connection } from '@mikro-orm/core';
import { getTenantConnection } from '../tenancy/tenancy.util';

@Injectable()
export class TenantsService {

    constructor( 
        @InjectRepository(Tenant) private readonly tenantRepository : EntityRepository<Tenant> ,
        private readonly em : EntityManager
    ){}

    getConnection(){
        // const connection : Connection = this.em.getConnection();
        // console.log(connection);
        getTenantConnection('hola', this.em );
        return "ok";        
    }
}
