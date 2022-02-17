import { Collection, Entity, OneToMany, Property } from '@mikro-orm/core';
import { AbstractEntity } from "../abstract.entity";
import { TenantSucursal } from '../../models/public/tenantSucursal.entity';

@Entity({ schema : '*' })
export class TenantEmpresa extends AbstractEntity{

    @Property()
    name : string

    @OneToMany( () => TenantSucursal, tenantSucursal => tenantSucursal.idTenantEmpresa )
    sucursales = new Collection<TenantSucursal>(this);

}