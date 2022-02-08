import { Entity, Property } from '@mikro-orm/core';
import { AbstractEntity } from "../abstract.entity";

@Entity({ schema : '*' })
export class TenantsEmpresa extends AbstractEntity{

    @Property()
    name : string
}