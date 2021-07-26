import { Rol } from './rol';
export interface UsuarioGet{
    data:Usuario,
    token:string
}

export interface Renovar{
    ok:boolean,
    name:string,
    last_name:string,
    token:string,
    rol_id:number
}

export interface Usuario{
    name:string,
    last_name:string,
    id?:number,
    email?:string,
    rol_id?:number
}
