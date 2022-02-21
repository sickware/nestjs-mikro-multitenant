import { PrimaryKey, Property } from "@mikro-orm/core";

export abstract class AbstractEntity {
    @PrimaryKey({ type : 'uuid', defaultRaw : 'uuid_generate_v4()' })
    uuid! : string;
    
    @Property({ type : 'timestamp' })
    createdAt = new Date();

    @Property({ type : 'timestamp', onUpdate : () => new Date() })
    updatedAt = new Date();

}