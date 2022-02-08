import { Entity, Property, ManyToOne } from '@mikro-orm/core';
import { AbstractEntity } from "../abstract.entity";
import { TenantsEmpresa } from './tenantsEmpresa.entity';

@Entity({ schema : '*' })
export class TenantsSucursal extends AbstractEntity{

    @Property()
    name : string

    @ManyToOne()
    idTenantEmpresa : TenantsEmpresa

}