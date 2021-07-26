import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PreguntasService {

  private apiUrl:string= environment.apiUrl
  private headers = new HttpHeaders()
          .set('x-token',sessionStorage.getItem('token') || '')
  constructor( private http:HttpClient) { }

  // TODO: todo lo relacionado con categoria

  crearCategoria(data:{}){
    return this.http.post(this.apiUrl+`/categoria`,data,{headers:this.headers})
               .pipe(
                 catchError(e => of(e))
               )
  }
  obtenerCategoria(){
    return this.http.get(this.apiUrl+`/categoria`,{headers:this.headers})
               .pipe(
                 catchError(e => of(e))
               )
  }
  obtenerCategoriaPorCreador(){
    return this.http.get(this.apiUrl+`/categoria/categorias-creador`,{headers:this.headers})
               .pipe(
                 catchError(e => of(e))
               )
  }
  editarCategoria(data:{},id:string){
    return this.http.put(this.apiUrl+`/categoria/${id}`,data,{headers:this.headers})
               .pipe(
                 catchError(e => of(e))
               )
  }
  eliminarCategoria(id:string){
    return this.http.delete(this.apiUrl+`/categoria/${id}`,{headers:this.headers})
               .pipe(
                 catchError(e => of(e))
               )
  }

  // TODO: todo lo relacionado con pregunta



  crearPregunta(data:{}){
    return this.http.post(this.apiUrl+`/pregunta`,data,{headers:this.headers})
               .pipe(
                 catchError(e => of(e))
               )
  }
  obtenerPreguntas(categoria_id:number){
    return this.http.get(this.apiUrl+`/pregunta/${categoria_id}`,{headers:this.headers})
               .pipe(
                 catchError(e => of(e))
               )
  }
  obtenerPreguntaId(id:number){
    return this.http.get(this.apiUrl+`/pregunta/pregunta-id/${id}`,{headers:this.headers})
               .pipe(
                 catchError(e => of(e))
               )
  }
   
  editarPregunta(data:{},id:string){
    return this.http.put(this.apiUrl+`/pregunta/${id}`,data,{headers:this.headers})
               .pipe(
                 catchError(e => of(e))
               )
  }
  eliminarPregunta(id:string){
    return this.http.delete(this.apiUrl+`/pregunta/${id}`,{headers:this.headers})
               .pipe(
                 catchError(e => of(e))
               )
  }
  // TODO: todo lo relacionado con respuesta
  crearRespuesta(data:{}){
    return this.http.post(this.apiUrl+`/respuesta`,data,{headers:this.headers})
               .pipe(
                 catchError(e => of(e))
               )
  }
  obtenerRespuestaIdPregunta(id:number){
    return this.http.get(this.apiUrl+`/respuesta/${id}`,{headers:this.headers})
               .pipe(
                 catchError(e => of(e))
               )
  }
  editarRespuesta(data:{},id:string){
    return this.http.put(this.apiUrl+`/respuesta/${id}`,data,{headers:this.headers})
               .pipe(
                 catchError(e => of(e))
               )
  }
  eliminarRespuesta(id:string){
    return this.http.delete(this.apiUrl+`/respuesta/${id}`,{headers:this.headers})
               .pipe(
                 catchError(e => of(e))
               )
  }

  //TODO: todo lo relacionado con voto

  crearVoto(data:{}){
    return this.http.post(this.apiUrl+`/voto`,data,{headers:this.headers})
               .pipe(
                 catchError(e => of(e))
               )
  }
  obtenerVotos(categoria_id:number){
    return this.http.get(this.apiUrl+`/voto/${categoria_id}`,{headers:this.headers})
               .pipe(
                 catchError(e => of(e))
               )
  }
}
