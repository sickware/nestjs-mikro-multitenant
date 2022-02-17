import { Options } from '@mikro-orm/core';
import * as Path from 'path';

const configSucursal : Options = {
    entities : [ 'dist/database/models/structure/sucursal/*.entity.js' ],
    entitiesTs : [ 'src/database/models/structure/sucursal/*.entity.ts' ],//podemos especificar las rutas *no es necesario
    migrations : {
        path : 'dist/database/migrations/structure/sucursal',
        pathTs : Path.join( __dirname, './database/migrations/structure/sucursal'),
        glob : '!(*.d).{js,ts}',
        // transactional : true,
    },
    seeder : {
        path : 'src/database/seeders/structure/sucursal',
        defaultSeeder : 'SucursalSeeder'
    }
}

export default configSucursal;