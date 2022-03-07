import { Entity, PrimaryKey, Property, ManyToOne } from '@mikro-orm/core';
import { Company } from './company.entity';

let nameSchema = '*';

export const setSchemaCustomer = ( schema ) => {
    nameSchema = schema;
    console.log('ok',schema,nameSchema);
}
@Entity({ schema : nameSchema })
export class Customer{

    @PrimaryKey()
    id! : number;

    @Property()
    name! : string;

    @ManyToOne({ entity : () => Company })
    company! : Company;

}