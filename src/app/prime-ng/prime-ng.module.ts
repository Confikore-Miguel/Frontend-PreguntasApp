import { NgModule } from '@angular/core';

import {ButtonModule} from 'primeng/button';
import {DividerModule} from 'primeng/divider';
import {DropdownModule} from 'primeng/dropdown';
import {InputTextModule} from 'primeng/inputtext';
import {PasswordModule} from 'primeng/password';
import {TabMenuModule} from 'primeng/tabmenu';
@NgModule({
  declarations: [],
  exports:[
    ButtonModule,
    DividerModule,
    DropdownModule,
    InputTextModule,
    PasswordModule,
    TabMenuModule,
  ]
})
export class PrimeNgModule { }
