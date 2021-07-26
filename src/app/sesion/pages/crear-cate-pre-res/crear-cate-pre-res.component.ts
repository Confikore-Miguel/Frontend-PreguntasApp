import { Component, OnInit } from '@angular/core';
import { PreguntasService } from '../../services/preguntas.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Categoria, Opciones } from '../../interfaces/categoria';
import { PreguntaGet, PreguntaIdGet } from '../../interfaces/pregunta';

@Component({
  selector: 'app-crear-cate-pre-res',
  templateUrl: './crear-cate-pre-res.component.html',
  styleUrls: ['./crear-cate-pre-res.component.css']
})
export class CrearCatePreResComponent implements OnInit {

  flag:boolean=true;
  
  opcionesCategoria:Opciones[]=[];
  opcionesPregunta:Opciones[]=[];
  correcta=[
    {label:'Si',value:true},
    {label:'No',value:false}
  ]

  constructor(private ps:PreguntasService,
              private fb: FormBuilder) { }

    miFormularioCategoria:FormGroup= this.fb.group({
      nom_categoria:['',[Validators.required,Validators.minLength(3)]]
    });

    miFormularioPregunta:FormGroup= this.fb.group({
      contenido:['',[Validators.required,Validators.minLength(12)]],
      categoria_id:['',[Validators.required]]
    });

    miFormularioRespuesta:FormGroup= this.fb.group({
      contenido:['',[Validators.required]],
      correcta:['',[Validators.required]],
      resp_categoria_id:['',[Validators.required]],
      pregunta_id:['',[Validators.required]]
    });

  ngOnInit(): void {
    this.ps.obtenerCategoriaPorCreador()
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

  crearCategoria(){
    const { nom_categoria } = this.miFormularioCategoria.value;
    const data = {nom_categoria:nom_categoria.toLowerCase()}
    this.ps.crearCategoria(data)
        .subscribe(resp=>{
          if(resp.ok){
            Swal.fire('Respuesta','Se ha creado una categoria','success');
            const cate = this.opcionesCategoria.filter(categoria =>{
              if(categoria.value !== resp.categoria.id){
                return { label:resp.categoria.nom_categoria, value:resp.categoria.id}
              }
              return;
            });
            this.opcionesCategoria.push(cate[0]);
            this.miFormularioCategoria.reset();
            return
          }
          console.log(resp);
          Swal.fire('Respuesta',resp.error.errors[0].msg,'error');
    })
  }


  crearPregunta(){
    const data = this.miFormularioPregunta.value;
    this.ps.crearPregunta(data)
        .subscribe(resp=>{
          if(resp.ok === true){            
           Swal.fire('Respuesta',`Se ha creado una pregunta '${data.contenido}'`,'success');
           this.miFormularioPregunta.reset();
           return
          }
          console.log(resp);
          Swal.fire('Respuesta',resp.error.errors[0].msg,'error');
        })
  }
  
  buscarPreguntasPorCategoria(){
    const { resp_categoria_id } = this.miFormularioRespuesta.value;    

    this.ps.obtenerPreguntas(resp_categoria_id)
        .subscribe((resp:PreguntaGet)=>{
          this.opcionesPregunta=[];
          if(resp.ok === true && resp.preguntas.length > 0){
            this.flag= false;   
            resp.preguntas.forEach((element:any) => {    
              if(this.opcionesPregunta.filter(resp=> resp.value === element.id).length > 0){
                return
              }    
              this.opcionesPregunta.push({label:element.contenido,value:element.id});
            });          
          return
          }else{
            this.flag= true;   
            Swal.fire('Opppss...','Al parecere no existe ninguna pregunta asociada a la categoria seleccionada','error');      
          }    
    });
  }

  crearRespuesta(){    
    const {pregunta_id}= this.miFormularioRespuesta.value;
    const data = this.miFormularioRespuesta.value;
    this.ps.obtenerPreguntaId(pregunta_id)
        .subscribe((resp:PreguntaIdGet) =>{
          if(resp.ok === true){
            const {pregunta}= resp;
            console.log(resp);
            const { respuestas } =pregunta[0];
            if( respuestas.length >= 4){
              Swal.fire('Opppss...','Solo se pueden agregar 4 respuestas a una pregunta','error');
              return
            }
          }      
          this.ps.crearRespuesta(data)
                .subscribe(resp =>{
                  if(resp.ok === true){
                    Swal.fire('Respuesta',resp.msg,'success');
                    return;
                  }
                  Swal.fire('Oppss...',resp.error.errors[0].msg,'error');
                });   
        });
  }
}
