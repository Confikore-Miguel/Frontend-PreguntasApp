import { Component, Input, OnInit } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  ocultarBoton:boolean=true;
  constructor(private router:Router) { }

  ngOnInit(): void {
    if(this.router.url.includes('home')){
      this.ocultarBoton=false;
    }
    this.router.events.subscribe(resp =>{
      if ( resp instanceof NavigationEnd){
        if(this.router.url.includes('home')){
         
          this.ocultarBoton=false;
          return;
        }else{
          this.ocultarBoton=true;
        }
      }
    });
  }

}
