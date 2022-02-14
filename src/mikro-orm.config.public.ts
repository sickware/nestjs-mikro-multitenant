import { Options } from '@mikro-orm/core';
import * as Path from 'path';

const configPublic : Options = {
    entities : [ 'dist/database/models/public/*.entity.js' ],
    entitiesTs : [ 'src/database/models/public/*.entity.ts' ],//podemos especificar las rutas *no es necesario
    migrations : {
        path : 'dist/database/migrations/public',
        pathTs : Path.join( __dirname, './database/migrations/public'),
        glob : '!(*.d).{js,ts}',
        // transactional : true,
    },
    seeder : {
        path : 'src/database/seeders/public',
        defaultSeeder : 'DatabaseSeeder/public'
    }
}

export default configPublic;