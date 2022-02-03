export interface Schemas {
    public : string,
    empresa : string,
    sucursal : string
}

export interface Relation {
    foreign : propsTable,
    reference : propsTable
} 

interface propsTable{
    lvlSchema : string,
    table : string,
    field : string
}