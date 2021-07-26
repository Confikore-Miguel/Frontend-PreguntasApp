import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Categoria, Opciones } from '../../interfaces/categoria';
import { PreguntasService } from '../../services/preguntas.service';
import { Voto, VotoGet } from '../../interfaces/voto';

@Component({
  selector: 'app-top10',
  templateUrl: './top10.component.html',
  styleUrls: ['./top10.component.css']
})
export class Top10Component implements OnInit {

  opcionesCategoria:Opciones[]=[];
  top10:Voto[]=[];
  
  constructor(private ps:PreguntasService) { }

  ngOnInit(): void {
    this.ps.obtenerCategoria()
    .subscribe(resp=>{
      if(resp.ok === true){
        resp.categorias.forEach((categoria:Categoria) => {
          const data = {label:categoria.nom_categoria,value:categoria.id}
          this.opcionesCategoria.push(data);
        });
        return
      }              
      Swal.fire('Opppss...','Al parecere no existe ninguna categoria','error');      
    });
  }

  buscarVotos(id_categoria:number){
    this.ps.obtenerVotos(id_categoria)
        .subscribe((resp:VotoGet) =>{
          if( resp.ok === true  && resp.votos.length !== 0){
            const { votos } = resp;
            this.top10 = votos;
            return;
          }
          Swal.fire('Opppss...','Al parecere no hay respuestas','error'); 
        })
  }

}
