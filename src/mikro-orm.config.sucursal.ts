import { Options } from '@mikro-orm/core';
import * as Path from 'path';

const configSucursal : Options = {
    entities : [ 'dist/database/models/sucursal/*.entity.js' ],
    entitiesTs : [ 'src/database/models/sucursal/*.entity.ts' ],//podemos especificar las rutas *no es necesario
    migrations : {
        path : 'dist/database/migrations/sucursal',
        pathTs : Path.join( __dirname, './database/migrations/sucursal'),
        glob : '!(*.d).{js,ts}',
        // transactional : true,
    },
    seeder : {
        path : 'src/database/seeders/sucursal',
        defaultSeeder : 'DatabaseSeeder/sucursal'
    }
}

export default configSucursal;