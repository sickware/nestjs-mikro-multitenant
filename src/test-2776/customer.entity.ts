import { Entity, PrimaryKey, Property, ManyToOne, OnLoad, wrap, OnInit } from '@mikro-orm/core';
import { Company } from './company.entity';

@Entity({ schema : '*' })
export class Customer{

    constructor( private readonly parentSchema : string ){}

    @PrimaryKey()
    id! : number;

    @Property()
    name! : string;

    @ManyToOne({ entity : () => Company })
    company! : Company;

    // @OnLoad()
    // cargarSchema(){
    //     wrap(this.company).setSchema('s1');
    // }
    
}