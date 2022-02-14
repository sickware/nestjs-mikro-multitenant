import { PrimaryKey, Property } from "@mikro-orm/core";

export abstract class AbstractEntity {
    @PrimaryKey({ type : 'uuid', defaultRaw : 'uuid_generate_v4()' })
    uuid! : string;
    
    @Property()
    createdAt = new Date();

    @Property({ onUpdate : () => new Date() })
    updatedAt = new Date();

}