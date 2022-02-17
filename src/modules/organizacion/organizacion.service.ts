import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { EntityRepository } from '@mikro-orm/postgresql';

import { Organizacion } from '../../database/models/global/public/organizacion.entity';
import { OrganizacionDto } from './dto/organizacion.dto';

@Injectable()
export class OrganizacionService {

    constructor(
        @InjectRepository(Organizacion) private readonly organizacionRepo : EntityRepository<Organizacion>
    ){}

    async saveOrganizacion( data : OrganizacionDto, schema : string ){
        const organizacion = this.organizacionRepo.create( data );
        return await this.organizacionRepo.createQueryBuilder().insert( organizacion ).withSchema( schema );
    }
}
