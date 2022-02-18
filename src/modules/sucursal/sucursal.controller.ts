import { Controller, Get, Headers } from '@nestjs/common';
import { SucursalService } from './sucursal.service';

@Controller('sucursal')
export class SucursalController {
    
    constructor( private readonly sucursalService : SucursalService ){}

    @Get()
    getSucursal(@Headers('x-tenant-id') tenant : string){
        // return this.sucursalService.getSucursal( tenant );
        return this.sucursalService.getSucursalQueryBuilder( tenant );
    }

}
