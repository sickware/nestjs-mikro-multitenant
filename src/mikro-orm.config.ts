import { Options } from '@mikro-orm/core';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import * as Path from 'path';

const config : Options = {
    type : 'postgresql',
    dbName : 'multitenant',
    user : 'postgres',
    password : '13051997ec',
    entities : [ 'dist/database/models/public/*.entity.js' ],
    entitiesTs : [ 'src/database/models/public/*.entity.ts' ],//podemos especificar las rutas *no es necesario
    metadataProvider : TsMorphMetadataProvider,
    migrations : {
        path : 'dist/database/migrations/public',
        pathTs : Path.join( __dirname, './database/migrations/public'),
        glob : '!(*.d).{js,ts}',
        // transactional : true,
    },
    seeder : {
        path : 'src/database/seeders/public',
        defaultSeeder : 'PublicSeeder'
    }
}

export default config;