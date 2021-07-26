import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { RolGet } from '../interfaces/rol';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private apiUrl:string = environment.apiUrl;

  constructor(private http:HttpClient) { }

  crearUsuario(data:{}){    
    return this.http.post(this.apiUrl+`/user`,data)
                .pipe(
                  catchError(e => of(e))
                )
  }

  obtenerRoles(){
    return this.http.get<RolGet>(this.apiUrl+`/rol`)
               .pipe(
                 catchError(e => of(e))
               )
  }
}
