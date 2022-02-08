import { ClientesService } from './clientes.service';
import { Body, Controller, Post, Headers, Get } from '@nestjs/common';
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

    @Get()
    getClientes(){
        return 'ok';
    }
    
}