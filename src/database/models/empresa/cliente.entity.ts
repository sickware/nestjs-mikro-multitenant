import { Entity, Property, ManyToOne } from '@mikro-orm/core';
import { AbstractEntity } from '../abstract.entity';
// import { Organizacion } from '../public/organizacion.entity';

/**
 * TODO CREAR UNA CONFIGURACION GLOBAL QUE DESCUBRA A TODAS LAS ENTIDADES
 * esta configuracion permitira manejar las relaciones con mikro en distintos
 * niveles.
 * Cabe aclarar que esta configuracion estara por default independiente de la configuracion
 * para los niveles public, empresa y sucursal.
*/

@Entity({ schema : '*' })
export class Cliente extends AbstractEntity{

    @Property()
    email : string;

    @Property()
    telefono : string;

    @Property()
    observacionCliente : string;

    // @ManyToOne({ entity : () => Organizacion, fieldName : 'uuid' })
    // idOrganizacion! : Organizacion;

    @Property({ type : 'uuid' })
    idOrganizacion : string;
}
