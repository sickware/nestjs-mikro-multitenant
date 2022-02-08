import { Body, Controller, Get, Post } from '@nestjs/common';
import { TenantsService } from './tenants.service';

@Controller('tenants')
export class TenantsController {

    constructor(private readonly tenantService : TenantsService){}

    @Get()
    getConnection(){
        // return this.tenantService.getConnection();    
        // return this.tenantService.runMigrations();
        // return this.tenantService.makeRelations();
        
    }

    @Get('/create')
    createTenant(){
        return this.tenantService.createEntity();
    }

    @Get('/public')
    createSchemaBase(){
        return this.tenantService.makeSchemaBase();
    }

    @Post('/create/empresa')
    createSchemaEmpresa(@Body('schema') nameSchema : string ){
        return this.tenantService.makeSchemaEmpresa(nameSchema)
    }
}
