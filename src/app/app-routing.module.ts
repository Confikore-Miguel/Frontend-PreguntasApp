import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';


const routes: Routes = [
  {
    path:'login',
    loadChildren:()=>import('../app/login/login.module').then(m=> m.LoginModule)
  },
  {
    path:'sesion',
    loadChildren:()=>import('../app/sesion/sesion.module').then(m=> m.SesionModule),
    canActivate:[AuthGuard],
    canLoad:[AuthGuard],
  },
  {
    path:'**',
    redirectTo:'login'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
