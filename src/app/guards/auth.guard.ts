import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../login/services/auth.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private authService:AuthService,
              private router:Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean > | boolean {
    return this.authService.renovarToken()
                .pipe(
                  tap( (valido) =>{
                    if(!valido){
                      this.router.navigateByUrl('/login/auth');
                    }
                  })
                )
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean > | boolean{
      return this.authService.renovarToken()
      .pipe(
        tap( valido =>{
          if(!valido){
            this.router.navigateByUrl('/login/auth');
          }
        })
      )
  }
}
