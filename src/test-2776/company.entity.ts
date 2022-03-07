import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

let nameSchema = '*';

export const setSchemaCompany = ( schema ) => {
    nameSchema = schema;
    console.log('ok',schema,nameSchema);
}

@Entity({ schema : nameSchema })
export class Company{
    
    @PrimaryKey()
    id! : number;
    
    @Property()
    name! : string;
}