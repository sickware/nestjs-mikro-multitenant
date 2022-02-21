import { PrimaryKey, Property } from "@mikro-orm/core";

export abstract class AbstractEntity {
    @PrimaryKey({ type : 'uuid', defaultRaw : 'uuid_generate_v4()' })
    uuid! : string;
    
    @Property({ type : 'timestamps' })
    createdAt = new Date();

    @Property({ type : 'timestamps', onUpdate : () => new Date() })
    updatedAt = new Date();

}