import { Options } from '@mikro-orm/core';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import * as Path from 'path';

const configEmpresa : Options = {
    entities : [ 'dist/database/models/empresa/*.entity.js' ],
    entitiesTs : [ 'src/database/models/empresa/*.entity.ts' ],//podemos especificar las rutas *no es necesario
    migrations : {
        path : 'dist/database/migrations/empresa',
        pathTs : Path.join( __dirname, './database/migrations/empresa'),
        glob : '!(*.d).{js,ts}',
        // transactional : true,
    },
    seeder : {
        path : 'src/database/seeders/empresa',
        defaultSeeder : 'DatabaseSeeder/empresa'
    }
}

export default configEmpresa;