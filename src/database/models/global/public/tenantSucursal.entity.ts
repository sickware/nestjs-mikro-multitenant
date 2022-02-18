import { Entity, Property, ManyToOne } from '@mikro-orm/core';
import { AbstractEntity } from "../abstract.entity";
import { TenantEmpresa } from './tenantEmpresa.entity';

@Entity({ schema : '*' })
export class TenantSucursal extends AbstractEntity{

    @Property()
    name : string

    @Property()
    schemaName : string;

    @ManyToOne()
    idTenantEmpresa : TenantEmpresa;

}