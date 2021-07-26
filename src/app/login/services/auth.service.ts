import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Usuario, UsuarioGet, Renovar } from '../interfaces/usuario';
import { PermitirRol } from '../interfaces/rol';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl:string = environment.apiUrl;
  private usuarioAutenticado!:Usuario;

  constructor(private http:HttpClient) { }

  get usuario(){
    return this.usuarioAutenticado;
  }

  login(data:{}){
    return this.http.post<UsuarioGet>(this.apiUrl+`/auth`,data)
               .pipe(
                 tap(resp =>{    
                   if(resp.token.length >0){
                      sessionStorage.setItem('token',resp.token);          
                      this.usuarioAutenticado = resp.data;
                      return;
                   }                   
                 }),
                 catchError(e => of(e))
               )
  }
  renovarToken(){
    const headers = new HttpHeaders()
        .set('x-token',sessionStorage.getItem('token')||'');
    return this.http.get<Renovar>(this.apiUrl+`/auth/renovar`,{headers})
                .pipe(
                  tap(resp =>{
                    sessionStorage.setItem('token',resp.token);
                    const data = { name:resp.name,last_name:resp.last_name,rol_id:resp.rol_id};
                    this.usuarioAutenticado = data;
                  }),
                  map(resp =>{
                    return resp.ok
                  })
                )
  }
  permitirRol(){
    const headers = new HttpHeaders()
          .set('x-token',sessionStorage.getItem('token')||'');
    return this.http.get<PermitirRol>(this.apiUrl+`/auth/permitir-rol`,{headers})
                .pipe(
                  map( resp =>{
                    return resp.ok
                  })
                )
  }
}
