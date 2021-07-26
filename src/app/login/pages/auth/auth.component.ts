import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {MenuItem} from 'primeng/api';
import Swal from 'sweetalert2';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  items!: MenuItem[];
  activeItem!: MenuItem;

  emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";

  constructor(private authService:AuthService,
              private fb:FormBuilder,
              private router:Router) { }
  
  miFormulario:FormGroup= this.fb.group({
    email:['',[Validators.pattern(this.emailPattern),Validators.required]],
    password:['',[Validators.required,Validators.minLength(6)]],
  })

  ngOnInit(): void {
    this.items = [
      {
        label: 'Login',
        icon: 'pi pi-fw pi-sign-in',
        routerLink:'/login/auth'
      },
      {
        label: 'Registrarse',
        icon: 'pi pi-fw pi-calendar',
        routerLink:'/login/registro'
      }];

      this.activeItem= this.items[0];
  }

  login(){
    const data = this.miFormulario.value;
    this.authService.login(data)
        .subscribe(resp=>{
          if(resp.token){
            sessionStorage.setItem('token', resp.token)
            this.router.navigateByUrl('/sesion');
            return
          }          
          Swal.fire('Opsss...',resp.error.msg,'error')
        })
  }
  tieneError( campo : string): boolean{
    return this.miFormulario.get(campo)?.touched 
        && this.miFormulario.get(campo)?.invalid || false
  }

}
