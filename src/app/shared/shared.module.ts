import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MsgErrorDirective } from './directivas/msg-error.directive';
import { MenuComponent } from './menu/menu.component';
import { FooterComponent } from './footer/footer.component';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';

@NgModule({
  declarations: [
   MsgErrorDirective,
   MenuComponent,
   FooterComponent,
  ],
  exports:[
   MsgErrorDirective, 
   MenuComponent,
   FooterComponent,
  ],
  imports: [
    CommonModule,
    PrimeNgModule
  ]
})
export class SharedModule { }
