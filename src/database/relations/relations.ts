import { Relation } from "./relation.interface";

/**
 * @param table - justo como en la BD 'sucursal_clientes' 
 * @param field - nombre definido en Mikro
 */

export const empresaRelations : Relation[] = [
    {
        'foreign' : {
            'lvlSchema' : 'empresa',
            'table' : 'cliente',
            'field' : 'idOrganizacionUuid'
        },
        'reference' : {
            'lvlSchema' : 'public',
            'table' : 'organizacion',
            'field' : 'uuid'
        }        
    }
]

export const sucursalRelations : Relation[] = [
    {
        'foreign' : {
            'lvlSchema' : 'sucursal',
            'table' : 'sucursal',
            'field' : 'idClienteAsignadoUuid'
        },
        'reference' : {
            'lvlSchema' : 'empresa',
            'table' : 'cliente',
            'field' : 'uuid'
        }   
    },
    {
        'foreign' : {
            'lvlSchema' : 'sucursal',
            'table' : 'sucursal',
            'field' : 'idOrganizacionUuid'
        },
        'reference' : {
            'lvlSchema' : 'public',
            'table' : 'organizacion',
            'field' : 'uuid'
        } 
    }
]