import { Entity, Property } from '@mikro-orm/core';
import { AbstractEntity } from '../abstract.entity';

@Entity({ schema : '*' })
export class Company extends AbstractEntity{
    @Property()
    name : string;

    @Property()
    website : string;

    @Property()
    email : string;

    @Property()
    active : boolean;
}