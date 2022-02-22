import { Entity, PrimaryKey, Property, ManyToOne } from '@mikro-orm/core';
import { Company } from './company.entity';

@Entity({ schema : '*' })
export class Customer{

    @PrimaryKey()
    id! : number;

    @Property()
    name! : string;

    @ManyToOne({ entity : () => Company })
    company! : Company;

}