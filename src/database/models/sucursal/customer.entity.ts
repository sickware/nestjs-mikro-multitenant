import { Entity, Property } from '@mikro-orm/core';
import { AbstractEntity } from '../abstract.entity';

@Entity({ schema : '*' })
export class Customer extends AbstractEntity{
    @Property()
    name : string;

    @Property()
    email : string;
    
    @Property({ type : 'uuid' })
    idCompanyUuid : string;
}