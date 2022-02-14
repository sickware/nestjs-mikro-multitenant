import { camelToSnakeCase } from '../helpers/utils';
import { Relation, Schemas } from '../relations/relation.interface';

/**
 * @param relations - Array de relaciones de los schemas
 * @param schemas - nombres de los schemas(public,sucursal,empresa)
 */
export const injectSchemas = ( relations : Relation[], schemas : Schemas ) : Relation[] => {

    const newRelations = JSON.parse(JSON.stringify(relations));

    newRelations.map( ({ foreign, reference }) => {
        return (
            foreign.lvlSchema = schemas[foreign.lvlSchema],
            foreign.field = camelToSnakeCase(foreign.field),
            reference.lvlSchema = schemas[reference.lvlSchema],
            reference.field = camelToSnakeCase(reference.field)
        )
    });

    return newRelations;
}

export const addRelations = ( relations : Relation[] ) : string  => {

    let query = '';

    relations.map( ({ foreign , reference }) => {
        query += `ALTER TABLE ${ foreign.lvlSchema+'.'+camelToSnakeCase( foreign.table ) }
        ADD CONSTRAINT ${camelToSnakeCase(foreign.table)}_id_${camelToSnakeCase(reference.table)}_uuid_foreign
        FOREIGN KEY(${ foreign.field })
        REFERENCES ${ reference.lvlSchema + '.' + camelToSnakeCase( reference.table ) }(${ reference.field }); \n`
    });

    return query;
}
