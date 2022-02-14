import { Entity, Property, ManyToOne } from '@mikro-orm/core';
import { AbstractEntity } from '../abstract.entity';
import { Organizacion } from '../public/organizacion.entity';

@Entity({ schema : '*' })
export class Cliente extends AbstractEntity{

    @Property()
    email : string;

    @Property()
    telefono : string;

    @Property()
    observacionCliente : string;

    @ManyToOne({ entity : () => Organizacion })
    idOrganizacion : Organizacion;

}
