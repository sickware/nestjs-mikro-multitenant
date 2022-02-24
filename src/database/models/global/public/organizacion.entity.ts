import { Entity, Property } from '@mikro-orm/core';
import { AbstractEntity } from '../abstract.entity';

const schemaName = global.globalString ? `${global.globalString}.organizacion` : 'dont';

@Entity({ schema : schemaName })
export class Organizacion extends AbstractEntity {

    @Property()
    nombre : string;

    @Property()
    telefono : string;

    @Property()
    pagina_web : string;

    @Property()
    logo : string;

    @Property()
    email : string;

    @Property()
    activo : boolean;

    @Property()
    habilitado : boolean;
}
