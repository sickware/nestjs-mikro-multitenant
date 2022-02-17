import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { Sucursal } from '../../database/models/global/sucursal/sucursal.entity';

@Injectable()
export class SucursalService {
    
    constructor(
        @InjectRepository(Sucursal) private readonly sucursalRepo : EntityRepository<Sucursal>
    ){}

    async getSucursal( schema : string ): Promise<Sucursal[]>{
        return await this.sucursalRepo.findAll({ schema });
    }
}
