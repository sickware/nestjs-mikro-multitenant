import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';

import { Cliente } from '../../database/models/empresa/cliente.entity';

@Injectable()
export class ClientesService {
    
    constructor(
        @InjectRepository(Cliente) private readonly clienteRepo : EntityRepository<Cliente>
    ){}

    async saveCliente(){
        
    }
}
