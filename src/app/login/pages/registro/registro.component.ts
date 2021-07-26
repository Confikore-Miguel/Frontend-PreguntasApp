import { Component, OnInit } from '@angular/core';
import {MenuItem} from 'primeng/api';
import { UsuarioService } from '../../services/usuario.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Opciones } from '../../../sesion/interfaces/categoria';
import { Rol } from '../../interfaces/rol';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  items!: MenuItem[];
  activeItem!: MenuItem;

  roles:Opciones[]=[];
  
  emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";

  constructor( private usuarioService:UsuarioService,
               private router:Router,
               private fb:FormBuilder) { }

  miFormulario:FormGroup= this.fb.group({
    name:['',[Validators.required,Validators.minLength(3)]],
    last_name:['',[Validators.required,Validators.minLength(3)]],
    email:['',[Validators.required,Validators.pattern(this.emailPattern)]],
    rol_id:['',[Validators.required]],
    password:['',[Validators.required,Validators.minLength(6)]]
  })
  
  ngOnInit(): void {
    this.usuarioService.obtenerRoles()
        .subscribe(resp =>{
          console.log(resp);
          
          if(resp.ok === true){
            const { roles} = resp;
            roles.forEach((rol:Rol) => {
              const data ={ label:rol.nom_rol, value:rol.id};
              this.roles.push(data);
            });
          }
        })

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

      this.activeItem= this.items[1];
  }

  crearUsuario(){
    
    const data = this.miFormulario.value;
    this.usuarioService.crearUsuario(data)
        .subscribe(resp =>{
          console.log(resp);
          if(resp.ok === true){
            this.router.navigateByUrl('/sesion');
            Swal.fire('Bienvendio','Usuario creado','success');
            sessionStorage.setItem('token',resp.token);
            return
          }
          Swal.fire('Oppsss...', resp.error.errors[0].msg,'error');
        })
  }
  tieneError( campo : string): boolean{
    return this.miFormulario.get(campo)?.touched 
        && this.miFormulario.get(campo)?.invalid || false
  }
}
