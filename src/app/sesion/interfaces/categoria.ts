export interface CategoriaGet{
    categorias:Categoria[],
    ok:boolean,
    total:number
}

export interface Categoria{
    id:number,
    nom_categoria:string
}

export interface Opciones{
    label:string,
    value:number
}
export interface OpcionesRespuesta{
    label:string,
    value:[number,boolean],
}