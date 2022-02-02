import { addRelations } from '../helpers/addRelations';
import { Relation } from './relation.interface';
import { empresaRelations, sucursalRelations } from './relations';

/**
 * $EMPRESA.CLIENTE(Foreign)
 * $id_schema_empresa.cliente.idOrganizacion
 * 
 * $PUBLIC.ORGANIZACION(Primary)
 * $id_schema_public.organizacion.uuid
 */

export const makeRelationsEmpresa = () => {
    console.log(empresaRelations);    
}

export const makeRelationsSucursal = () => {
    console.log(sucursalRelations);
}

export const makeRelations = ( publicSchema : string, empresaSchema : string, sucursalSchema : string ) => {
 
    /**
     * hacer un slice de las propiedades tableForeign y tablePrimary para 
     * dividir los nombres de los schemas y las tablas
     * 
     * reemplazar el nombre del schema *podria ahorrarse con la funcion addSchema
     * 
     * devolver el nuevo string con ayuda de la funcion add relations 
     * 
     * una vez devuelto los strings ejecutarlos con query builder
     * */
}