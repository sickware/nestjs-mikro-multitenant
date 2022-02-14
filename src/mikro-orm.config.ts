import { Options } from '@mikro-orm/core';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';

//TODO cambiar la conf por variables de entorno .env
const config : Options = {
    entities : [ 'dist/database/global-models/**/*.entity.js' ],
    entitiesTs : [ 'src/database/global-models/**/*.entity.ts' ],//podemos especificar las rutas *no es necesario
    metadataProvider : TsMorphMetadataProvider
}

export default config;