import { EntityRepository } from '@mikro-orm/postgresql';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { Customer } from '../../database/global-models/sucursal/customer.entity';

@Injectable()
export class CustomerService {
    constructor(
        @InjectRepository(Customer) private readonly customerRepo : EntityRepository<Customer>
    ){}

    async getCustomers( schema : string ){
        return await this.customerRepo.find({},{ schema, populate : true });
        // return await this.customerRepo.findAll({ populate : ['idCompany'] , schema });
    }

}
