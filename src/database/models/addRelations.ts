/**
 * schemaPrimary = $empresa || $sucursal || $public
 * tablaPrimary = Organizacion -> id || uuid
 * 
 * schemaForeign = $empresa || sucursal || public 
 * tablaForeign = Cliente -> id_organizacion
 * 
 * 
 * podria enviarse separado (tenant_12546, organizacion, )
 * o todo junto (tenant123154.organizacion,)./
 */

export const addRelations = ( tablaPrimary : string, tablaForeign : string ) : string  => {
    
    const query = `alter table NOMBRETABLA1
    add constraint NOMBRERESTRICCION
    foreign key (CAMPOCLAVEFORANEA)
    references NOMBRETABLA2 (CAMPOCLAVEPRIMARIA);`

    return 'sd'
}