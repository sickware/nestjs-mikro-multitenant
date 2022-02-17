import { Entity, Property, ManyToOne } from '@mikro-orm/core';
import { AbstractEntity } from '../abstract.entity';
import { Company } from '../empresa/company.entity';

@Entity({ schema : '*' })
export class Customer extends AbstractEntity{
    @Property()
    name : string;

    @Property()
    email : string;
    
    @ManyToOne()
    idCompany : Company;
}