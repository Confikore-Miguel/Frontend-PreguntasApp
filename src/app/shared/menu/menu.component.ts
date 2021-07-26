import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../login/services/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  @Input() ocultarBoton!:boolean;

  constructor( private router:Router,
               private authService:AuthService) { }

  get usuario(){
    return this.authService.usuario;
  }

  ngOnInit(): void {
  }

  logout(){
    sessionStorage.clear();
    this.router.navigateByUrl('/login');
  }

  regresar(){
    this.router.navigateByUrl('/sesion/home')
  }

}
