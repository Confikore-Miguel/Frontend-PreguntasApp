export interface VotoGet{
    ok:boolean,
    total:number,
    votos:Voto[]
}

export interface Voto{
    categoria_voto:string,
    correctas:number,
    incorrectas:number,
    usuario:Usuario,
    tiempo:string
}
export interface Usuario{
    last_name:string,
    name:string
}