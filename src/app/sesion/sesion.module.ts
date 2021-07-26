import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SesionRoutingModule } from './sesion-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { CrearResponderComponent } from './pages/crear-responder/crear-responder.component';
import { ResponderComponent } from './pages/responder/responder.component';
import { Top10Component } from './pages/top10/top10.component';
import { CrearCatePreResComponent } from './pages/crear-cate-pre-res/crear-cate-pre-res.component';
import { SharedModule } from '../shared/shared.module';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { EditarComponent } from './pages/editar/editar.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    HomeComponent, 
    CrearResponderComponent, 
    ResponderComponent, 
    Top10Component, 
    CrearCatePreResComponent, EditarComponent
  ],
  imports: [
    CommonModule,
    SesionRoutingModule,
    SharedModule,
    PrimeNgModule,
    ReactiveFormsModule
  ]
})
export class SesionModule { }
