import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity({ schema : '*' })
export class Customer{

    @PrimaryKey()
    id! : number;

    @Property()
    name! : string;

    @Property()
    companyId! : number;

}