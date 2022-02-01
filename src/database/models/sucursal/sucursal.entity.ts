import { Entity, Property, ManyToOne } from '@mikro-orm/core';
import { AbstractEntity } from '../abstract.entity';
import { Cliente } from '../empresa/cliente.entity';
import { Organizacion } from '../public/organizacion.entity';

@Entity({ schema : '*' })
export class Sucursal extends AbstractEntity{

    @Property()
    nombreSucursal : string;

    @Property()
    usuarioEncargado : string;

    @ManyToOne({ entity : () => Cliente, fieldName : 'uuid' })
    idClienteAsignado : Cliente;

    @ManyToOne({ entity : () => Organizacion, fieldName : 'uuid'})
    idOrganizacion : Organizacion;
}
