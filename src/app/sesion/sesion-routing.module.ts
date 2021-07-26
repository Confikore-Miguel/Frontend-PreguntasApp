import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CrearResponderComponent } from './pages/crear-responder/crear-responder.component';
import { CrearCatePreResComponent } from './pages/crear-cate-pre-res/crear-cate-pre-res.component';
import { ResponderComponent } from './pages/responder/responder.component';
import { Top10Component } from './pages/top10/top10.component';
import { EditarComponent } from './pages/editar/editar.component';
import { PermitirUsuarioGuard } from '../guards/permitir-usuario.guard';

const routes: Routes = [
  {
    path:'',
    component:HomeComponent,
    children:[
      {path:'home',component:CrearResponderComponent},
      {
        path:'crear',
        component:CrearCatePreResComponent,
        canActivate:[PermitirUsuarioGuard]
      },
      {path:'responder',component:ResponderComponent},
      {path:'top',component:Top10Component},
      {
        path:'editar',
        component:EditarComponent,
        canActivate:[PermitirUsuarioGuard]
      },
      {path:'**',redirectTo:'home'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SesionRoutingModule { }
