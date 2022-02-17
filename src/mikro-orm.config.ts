import { Options } from '@mikro-orm/core';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import * as Path from 'path';

//TODO cambiar la conf por variables de entorno .env
const config : Options = {
    entities : [ 'dist/database/models/global/**/*.entity.js' ],
    entitiesTs : [ 'src/database/models/global/**/*.entity.ts' ],//podemos especificar las rutas *no es necesario
    metadataProvider : TsMorphMetadataProvider,
    migrations : {
        path : 'dist/database/global/migrations',
        pathTs : Path.join( __dirname, './database/global/migrations'),
        glob : '!(*.d).{js,ts}',
        // transactional : true,
    },
    seeder : {
        path : 'src/database/global/seeders',
        defaultSeeder : 'GlobalSeeder'
    }
}

export default config;