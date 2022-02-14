import { ClientesService } from './clientes.service';
import { Body, Controller, Post, Headers, Get, Put, Param, Delete } from '@nestjs/common';
import { ClienteDto } from './dto/cliente.dto';

@Controller('clientes')
export class ClientesController {
    constructor(
        private readonly clienteService : ClientesService
    ){}

    @Post()
    saveCliente(@Body() body : ClienteDto,  @Headers('x-tenant-id') tenant : string ){
        return this.clienteService.saveCliente( body, tenant );
    }

    //TODO recuperar nombre del schema desde middleware
    @Get()
    getClientes(@Headers('x-tenant-id') tenant : string){
        return this.clienteService.getClientes( tenant );
    }

    @Get('/all')
    getClientesRelations(@Headers('x-tenant-id') tenant : string){
        return this.clienteService.getClientesRelations( tenant );
    }   

    @Put(':id')
    updateCliente(@Param('id') uuid : string, @Body() dataCliente : Partial<ClienteDto>, @Headers('x-tenant-id') tenant : string ){
        return this.clienteService.updateCliente( uuid, dataCliente, tenant );
    }

    @Delete(':id')
    deleteCliente(@Param('id') uuid : string, @Headers('x-tenant-id') tenant : string){
        return this.clienteService.deleteCliente( uuid, tenant );
    }
    
}