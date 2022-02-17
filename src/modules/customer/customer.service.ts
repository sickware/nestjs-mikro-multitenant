import { EntityRepository } from '@mikro-orm/postgresql';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { Customer } from '../../database/global-models/sucursal/customer.entity';
import { Company } from '../../database/models/empresa/company.entity';

@Injectable()
export class CustomerService {
    constructor(
        @InjectRepository(Customer) private readonly customerRepo : EntityRepository<Customer>,
        @InjectRepository(Company) private readonly companyRepo : EntityRepository<Company>
    ){}

    async getCustomers( schema : string ){
        // return await this.customerRepo.find({},{ schema, populate : true });
        // return await this.customerRepo.findAll({ populate : ['idCompany'] , schema });
        const customers = this.customerRepo.findAll({ schema });
        // const company = this.companyRepo.findAll();

    }

}
