import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { MainComponent } from './pages/main/main.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { AuthComponent } from './pages/auth/auth.component';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';

import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [MainComponent, RegistroComponent, AuthComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    PrimeNgModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class LoginModule { }
