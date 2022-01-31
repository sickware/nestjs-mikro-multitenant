import { Entity, Property } from '@mikro-orm/core';
import { AbstractEntity } from '../abstract.entity';

@Entity({ schema : '*' })
export class Sucursal extends AbstractEntity{

    @Property()
    nombreSucursal : string;

    @Property()
    usuarioEncargado : string;
    
}
