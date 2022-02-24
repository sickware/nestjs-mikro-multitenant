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
    async getClientes(@Headers('x-tenant-id') tenant : string){
        // return this.clienteService.getClientes( tenant );

        // return this.clienteService.getClientesTest1( tenant );

        return this.clienteService.getClientesTest2( tenant );
    }

    @Put(':id')
    updateCliente(@Param('id') uuid : string, @Body() dataCliente : Partial<ClienteDto>, @Headers('x-tenant-id') tenant : string ){
        return this.clienteService.updateCliente( uuid, dataCliente, tenant );
    }

    @Delete(':id')
    deleteCliente(@Param('id') uuid : string, @Headers('x-tenant-id') tenant : string){
        return this.clienteService.deleteCliente( uuid, tenant );
    }

    //wrap
    @Post('/wrap')
    saveClienteWrap(@Body() body : ClienteDto, @Headers('x-tenant-id') tenant : string ){
        return this.clienteService.saveClienteWrap( body, tenant );
    }
    
    @Put('/wrap/:id')
    updateClienteWrap(@Param('id') uuid : string, @Body() data : Partial<ClienteDto>, @Headers('x-tenant-id') tenant : string ){
        return this.clienteService.updateClienteWrap( uuid, data, tenant );
    }

    @Delete('/wrap/:id')
    deleteClienteWrap(@Param('id') uuid : string, @Headers('x-tenant-id') tenant : string){
        return this.clienteService.deleteClienteWrap( uuid, tenant );
    }
}