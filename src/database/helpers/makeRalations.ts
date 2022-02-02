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

export const makeRelations = ( schema : string ) => {
    
}