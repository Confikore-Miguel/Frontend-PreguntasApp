import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../login/services/auth.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PermitirUsuarioGuard implements CanActivate {

  constructor(private AuthService:AuthService,
              private router:Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean > | boolean {
    return this.AuthService.permitirRol()
                .pipe(
                  tap(valido =>{
                    if(!valido){
                      this.router.navigateByUrl('/sesion/home');
                    }
                  })
                )
  }
  
}
