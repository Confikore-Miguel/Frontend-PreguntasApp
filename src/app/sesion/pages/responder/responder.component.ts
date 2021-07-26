import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Categoria, Opciones } from '../../interfaces/categoria';
import { PreguntaGet, Pregunta } from '../../interfaces/pregunta';
import { PreguntasService } from '../../services/preguntas.service';
import { Router } from '@angular/router';
 
@Component({
  selector: 'app-responder',
  templateUrl: './responder.component.html',
  styleUrls: ['./responder.component.css']
})
export class ResponderComponent implements OnInit {

  preguntas!:Pregunta[];
  opcionesCategoria:Opciones[]=[];

  tiempo:any;
  segundos:number =0;
  minute:number=0;
  restar!:any;
  
  
  ocultarBoton:boolean=false;
  respuestas:boolean[]=[];
  algo:boolean= false;
  
  categoria!:number;
  cantidadPreguntas:number=0
  indexPreguntas:number=0;

  labelButton:string="Siguiente Pregunta";


  constructor(private ps:PreguntasService,
              private router:Router) { }
    

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


  seleccionar(id:number){
    this.buscarPreguntas(id);
    this.tiempo= setInterval(()=>{
      this.segundos = this.segundos +1; 
      if( this.segundos === 60){
        this.minute=this.minute +1;  
        this.segundos = 0;
      }
    },1000);
  }

  buscarPreguntas(id:number){
    this.categoria=id;
    this.ps.obtenerPreguntas(id)
    .subscribe((resp:PreguntaGet)=>{ 
      if(resp.ok === true && resp.preguntas.length > 0){  
        const { preguntas }= resp;
        this.cantidadPreguntas= preguntas.length;
        this.preguntas= preguntas;
        return;
      }else{
        Swal.fire('Opppss...','Al parecere no existe ninguna pregunta asociada a la categoria seleccionada','error');      
      }    
      });
  }

  responder(respuesta:boolean){
    this.respuestas[this.indexPreguntas]= respuesta;
  }

  siguiente(){
    if(this.indexPreguntas+1 >= this.cantidadPreguntas){
      Swal.fire({
        title: '¿Deseas terminar la prueba?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: 'var(--green-400)',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, estoy seguro'
      }).then((result) => {
        if (result.isConfirmed) {
          this.restar= Date.now();
          let correctas:number=0;
          let incorrectas:number=0;
      
          this.respuestas.forEach(respuesta =>{
            if(respuesta){
              correctas=correctas+1;
            }else{
              incorrectas=incorrectas+1
            }
          });
          clearInterval(this.tiempo);
          let resultadoTiempo = this.minute+':'+this.segundos  ;        
          const data={ 
            correctas, 
            incorrectas, 
            categoria_id:this.categoria,
            tiempo: resultadoTiempo
          };   
               
          this.ps.crearVoto(data).
              subscribe(resp =>{
                if(resp.ok === true){
                  Swal.fire('Has terminado la prueba, felicitaciones !!',
                            `-- Preguntas -- <br> 
                                Tiempo: ${resultadoTiempo} <br> 
                                Correctas:${correctas} <br> 
                                Incorrectas:${incorrectas}`,
                            'success');
                  this.router.navigateByUrl('/sesion/top');
                  return      
                }                
                Swal.fire('Opsss...',resp.error.errors[0].msg,'error');
              })
        }
      });
      return
    }
    if(this.indexPreguntas+2 >= this.cantidadPreguntas){
      this.labelButton="Terminar";
    }
    this.indexPreguntas=this.indexPreguntas+1;    
  }

  anterior(){
    this.labelButton="Siguiente Pregunta";
    this.indexPreguntas=this.indexPreguntas-1;
  }
}
