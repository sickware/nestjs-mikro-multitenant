import { Options } from '@mikro-orm/core';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import * as Path from 'path';

//TODO cambiar la conf por variables de entorno .env
const config : Options = {
    entities : [ 'dist/**/*.entity.js' ],
    entitiesTs : [ 'src/**/*.entity.ts' ],//podemos especificar las rutas *no es necesario
    metadataProvider : TsMorphMetadataProvider,
    migrations : {
        path : 'dist/database/migrations',
        pathTs : Path.join( __dirname, './database/migrations'),
        glob : '!(*.d).{js,ts}',
        // transactional : true,
    },
    seeder : {
        path : 'src/database/seeders',
        defaultSeeder : 'PublicSeeder'
    }
}

export default config;