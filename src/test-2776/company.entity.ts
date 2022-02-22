import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity({ schema : '*' })
export class Company{
    
    @PrimaryKey()
    id! : number;
    
    @Property()
    name! : string;
}