import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { AuthComponent } from './pages/auth/auth.component';
import { RegistroComponent } from './pages/registro/registro.component';

const routes: Routes = [
  {
    path:'',
    component:MainComponent,
    children:[
      {
        path:'auth',
        component:AuthComponent
      },
      {
        path:'registro',
        component:RegistroComponent
      },
      {
        path:'**',
        redirectTo:'auth'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
