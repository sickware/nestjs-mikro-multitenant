import { Relation } from "./relation.interface";

export const empresaRelations : Relation[] = [
    {
        "tableForeign" : "empresa.cliente",
        "foreign" : "idOrgnanizacion"   ,
        "tablePrimary" : "public.organizacion",
        "primary" : "uuid"
    }
]

export const sucursalRelations : Relation[] = [
    {
        "tableForeign" : "sucursal.sucursal",
        "foreign" : "idClienteAsignado"   ,
        "tablePrimary" : "empresa.cliente",
        "primary" : "uuid"
    },
    {
        "tableForeign" : "sucursal.sucursal",
        "foreign" : "idOrganizacion"   ,
        "tablePrimary" : "public.organizacion",
        "primary" : "uuid"
    }
]