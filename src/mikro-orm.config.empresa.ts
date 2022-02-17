import { Options } from '@mikro-orm/core';
import * as Path from 'path';

const configEmpresa : Options = {
    entities : [ 'dist/database/models/structure/empresa/*.entity.js' ],
    entitiesTs : [ 'src/database/models/structure/empresa/*.entity.ts' ],//podemos especificar las rutas *no es necesario
    migrations : {
        path : 'dist/database/migrations/structure/empresa',
        pathTs : Path.join( __dirname, './database/migrations/structure/empresa'),
        glob : '!(*.d).{js,ts}',
        // transactional : true,
    },
    seeder : {
        path : 'src/database/seeders/structure/empresa',//TODO verificar si realmente es necesario realizarlos en structura
        defaultSeeder : 'EmpresaSeeder'
    }
}

export default configEmpresa;