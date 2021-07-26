import { Categoria } from './categoria';


export interface PreguntaGet{
    ok:boolean,
    preguntas:Pregunta[],
    total:number
}
export interface PreguntaIdGet{
    ok:boolean,
    pregunta:Pregunta[]
}
export interface Pregunta{
    id:number,
    contenido:string,
    categoria:string,
    respuestas:Respuesta[] 
}
export interface Respuesta{
    contenido:string,
    correcta:boolean
}
