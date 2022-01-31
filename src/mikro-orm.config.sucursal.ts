import { Options } from '@mikro-orm/core';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import * as Path from 'path';

const configSucursal : Options = {
    type : 'postgresql',
    dbName : 'multitenant',
    user : 'postgres',
    password : '13051997ec',
    entities : [ 'dist/database/models/sucursal/*.entity.js' ],
    entitiesTs : [ 'src/database/models/sucursal/*.entity.ts' ],//podemos especificar las rutas *no es necesario
    metadataProvider : TsMorphMetadataProvider,
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