

export interface RespuestaGetPorId{
    ok:boolean,
    respuestas:[],
    total:number
}
export interface Respuesta{
    contenido:string,
    correcta:string,
    pregunta:PreguntaEnRespuesta
}
interface PreguntaEnRespuesta{
    contenido:string
}