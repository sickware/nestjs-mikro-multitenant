import { Controller, Get } from '@nestjs/common';
import { TenantsService } from './tenants.service';

import { injectSchemas, addRelations } from './../../database/helpers/addRelations';
import { sucursalRelations } from '../../database/relations/relations';
import { Relation, Schemas } from './../../database/relations/relation.interface';

@Controller('tenants')
export class TenantsController {

    constructor(private readonly tenantService : TenantsService){}

    @Get()
    getConnection(){
        // return this.tenantService.getConnection();    
        // return this.tenantService.runMigrations();
        return this.tenantService.makeRelations();
        
    }

    @Get('/create')
    createTenant(){
        return this.tenantService.createEntity();
    }
}
