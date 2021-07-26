import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../login/services/auth.service';

@Component({
  selector: 'app-crear-responder',
  templateUrl: './crear-responder.component.html',
  styleUrls: ['./crear-responder.component.css']
})
export class CrearResponderComponent implements OnInit {


  labelButtons:any[]=[]                      
  constructor(private router:Router,
              private authService:AuthService) { }
    get usuario(){
      return this.authService.usuario
    }

  ngOnInit(): void {
    if( this.usuario.rol_id! === 2){
      this.labelButtons=[
        {label:'Quiero responder preguntas',ruta:'/sesion/responder'},
        {label:'Quiero ver los top 10',ruta:'/sesion/top'},
      ]  
      return;
    }
    this.labelButtons=[
      {label:'Quiero responder preguntas',ruta:'/sesion/responder'},
      {label:'Quiero crear preguntas',ruta:'/sesion/crear'},
      {label:'Quiero ver los top 10',ruta:'/sesion/top'},
      {label:'Quiero editar',ruta:'/sesion/editar'},
    ]  
  }

  rutas(ruta:string){
    this.router.navigateByUrl(ruta);
  }

}
