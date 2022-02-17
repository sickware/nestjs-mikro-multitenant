import { Options } from '@mikro-orm/core';
import * as Path from 'path';

const configPublic : Options = {
    entities : [ 'dist/database/models/structure/public/*.entity.js' ],
    entitiesTs : [ 'src/database/models/structure/public/*.entity.ts' ],//podemos especificar las rutas *no es necesario
    migrations : {
        path : 'dist/database/migrations/structure/public',
        pathTs : Path.join( __dirname, './database/migrations/structure/public'),
        glob : '!(*.d).{js,ts}',
        // transactional : true,
    },
    seeder : {
        path : 'src/database/seeders/structure/public',
        defaultSeeder : 'PublicSeeder'
    }
}

export default configPublic;