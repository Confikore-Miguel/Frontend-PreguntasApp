import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { Categoria, Opciones, OpcionesRespuesta } from '../../interfaces/categoria';
import { PreguntasService } from '../../services/preguntas.service';
import { Router } from '@angular/router';
import { PreguntaGet } from '../../interfaces/pregunta';
import { RespuestaGetPorId } from '../../interfaces/respuesta';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent implements OnInit {

  labelMenu=[
    {label:'Categoria'},
    {label:'Pregunta'},
    {label:'Respuesta'},
  ];
  correcta=[
    {label:'Si',value:true},
    {label:'No',value:false}
  ]
  opcionesCategoria:Opciones[]=[];
  opcionesPregunta:Opciones[]=[];
  opcionesRespuesta:OpcionesRespuesta[]=[];

  categoria:boolean=false;
  pregunta:boolean=true;
  respuesta:boolean=true;

  // editarPregunta:boolean=true;

  constructor( private ps:PreguntasService,
              private fb:FormBuilder,
              private router:Router) { }

  miFormularioCategoria:FormGroup= this.fb.group({
    id:['',[Validators.required]],
    nom_categoria:['',[Validators.required,Validators.minLength(3)]],
  });

  miFormularioPregunta:FormGroup= this.fb.group({
    contenido:['',[Validators.required,Validators.minLength(12)]],
    categoria_id:['',[Validators.required]],
    pregunta_id:['',[Validators.required]],
  });

  miFormularioRespuesta:FormGroup= this.fb.group({
    contenido:['',[Validators.required]],
    correcta:['',[Validators.required]],
    categoria_id:['',[Validators.required]],
    pregunta_id:['',[Validators.required]],
    id:['',[Validators.required]]
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

  nombres(evento:any, fomulario:string){
    const nombre = evento.target.innerText;
    if( nombre === '-- seleccione --'){
      return;
    }
    if( fomulario === 'formCa'){
      this.miFormularioCategoria.get('nom_categoria')?.setValue(nombre);
      return;
    }
    if( fomulario === 'formPre'){
      this.miFormularioPregunta.get('contenido')?.setValue(nombre);
      return;
    }
    if( fomulario === 'formRes'){
      this.miFormularioRespuesta.get('contenido')?.setValue(nombre);
      return;
    }
  }

  menu(label:string){
    if(label === 'Categoria'){
      this.categoria=false;
      this.pregunta=true;
      this.respuesta=true;
      return
    }
    if(label === 'Pregunta'){
      this.pregunta=false;
      this.categoria=true;
      this.respuesta=true;
      return
    }
    if(label === 'Respuesta'){
      this.respuesta=false;
      this.pregunta=true;
      this.categoria=true;
      return
    }
  }

  editarCategoria(){
    const data = this.miFormularioCategoria.value;   
    this.ps.editarCategoria({nom_categoria:data.nom_categoria},data.id)
        .subscribe(resp =>{
          if(resp.ok === true){
            Swal.fire('Respuesta','Se ha actualizado la categoria','success');
            this.opcionesCategoria.forEach(opcion=>{
              if(opcion.value === data.id){
                opcion.label = data.nom_categoria;
              }
            }) 
            this.miFormularioCategoria.reset();
            return
          }
          Swal.fire('Opsss...',resp.error.msg,'error');
        })
  }

  eliminarCategoria(){
    const data = this.miFormularioCategoria.value;  
    if( !data.id ){
      Swal.fire('Opsss...','Al parecer no has elegido una categoria para eliminar','error');
      return;
    }   
    Swal.fire({
      title: '¿Estas seguro?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'var(--green-400)',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.ps.eliminarCategoria(data.id)
        .subscribe(resp =>{
          if(resp.categoria){
            Swal.fire('Respuesta','Se ha eliminado correctamente','success');
            const newArray = this.opcionesCategoria.filter((element)=>{
              if(element.value !== data.id ){
                return element
              }  
              return;
            });
            this.opcionesCategoria = newArray;  
            this.miFormularioCategoria.reset();
            return
          }
          Swal.fire('Opsss...',resp.error.errors[0].msg,'error');
        })
      }
    });
  }

  buscarPreguntas(form:string){
    let data:any={}
    if(form === 'respuesta'){
      data = this.miFormularioRespuesta.value;
    }else{
      data = this.miFormularioPregunta.value;
    }
    this.ps.obtenerPreguntas(data.categoria_id)
    .subscribe((resp:PreguntaGet)=>{
      this.opcionesPregunta=[];    
      if(resp.ok === true && resp.preguntas.length > 0){  
        resp.preguntas.forEach((element:any) => {    
          if(this.opcionesPregunta.filter(resp=> resp.value === element.id).length > 0){
            return
          }    
          this.opcionesPregunta.push({label:element.contenido,value:element.id});
          Swal.fire('Respuesta','Ya puedes ver las preguntas','success');
        });          
      return
      }else{
        Swal.fire('Opppss...','Al parecere no existe ninguna pregunta asociada a la categoria seleccionada','error');      
      }    
      });
  }

  editarPregunta(){
    const data = this.miFormularioPregunta.value;    
    this.ps.editarPregunta({contenido:data.contenido},data.pregunta_id)
        .subscribe(resp =>{
          if(resp.ok === true){            
            Swal.fire('Respuesta','Se ha actualizado la pregunta','success');
            this.opcionesPregunta.forEach(opcion=>{
              if(opcion.value === data.pregunta_id){
                opcion.label = data.contenido;
              }
            }) 
            this.miFormularioPregunta.reset();
            return
          }
          Swal.fire('Opsss...',resp.error.msg,'error');
        })
  }

  eliminarPregunta(){
    const data = this.miFormularioPregunta.value;  
    if( !data.pregunta_id ){
      Swal.fire('Opsss...','Al parecer no has elegido una pregunta para eliminar','error');
      return;
    }   
    Swal.fire({
      title: '¿Estas seguro?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'var(--green-400)',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, elimina lo !!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.ps.eliminarPregunta(data.pregunta_id)
        .subscribe(resp =>{
          if(resp.pregunta){
            Swal.fire('Respuesta','Se ha eliminado correctamente','success');
            const newArray = this.opcionesPregunta.filter((element)=>{
              if(element.value !== data.pregunta_id ){
                return element
              }  
              return;
            });
            this.opcionesPregunta= newArray;  
            this.miFormularioPregunta.reset();
            return
          }
          Swal.fire('Opsss...',resp.error.errors[0].msg,'error');
        })
      }
    });
  }

  buscarRespuestas(){
    const data = this.miFormularioRespuesta.value; 
    this.ps.obtenerRespuestaIdPregunta(data.pregunta_id)
    .subscribe((resp:any)=>{
      this.opcionesRespuesta=[];
      if(resp.ok === true && resp.respuestas.length > 0){  
        resp.respuestas.forEach((element:any) => {    
          this.opcionesRespuesta.push({label:element.contenido,value:[element.id,element.correcta]});
          Swal.fire('Respuesta','Ya puedes ver las respuestas','success');
        });          
      return
      }else{
        Swal.fire('Opppss...','Al parecere no existe ninguna pregunta asociada a la categoria seleccionada','error');      
      }    
      });
  }

  seleccinarRepuesta(){
    const data = this.miFormularioRespuesta.get('id')?.value;
    this.miFormularioRespuesta.get('correcta')?.setValue(data[1]);    
  }
  
  editarRespuesta(){
    const {contenido,correcta ,...data} = this.miFormularioRespuesta.value;    
    this.ps.editarRespuesta({contenido,correcta},data.id[0])
        .subscribe(resp =>{          
          if(resp.ok === true){            
            Swal.fire('Respuesta','Se ha actualizado la pregunta','success');
            this.opcionesRespuesta.forEach(opcion=>{
              if(opcion.value[0] === data.id[0]){
                opcion.label = contenido;
              }
            }) 
            this.miFormularioRespuesta.reset();
            return
          }
          Swal.fire('Opsss...',resp.error.msg,'error');
        })
  }

  eliminarRespuesta(){
    const data = this.miFormularioRespuesta.value;  
    if( !data.id ){
      Swal.fire('Opsss...','Al parecer no has elegido una repuesta para eliminar','error');
      return;
    }   
    Swal.fire({
      title: '¿Estas seguro?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'var(--green-400)',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, elimina lo !!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.ps.eliminarRespuesta(data.id[0])
        .subscribe(resp =>{
          if(resp.respuesta){
            Swal.fire('Respuesta','Se ha eliminado correctamente','success');
            const newArray = this.opcionesRespuesta.filter((element)=>{
              if(element.value[0] !== data.id[0] ){
                return element
              }  
              return;
            });
            this.opcionesRespuesta= newArray;  
            this.miFormularioRespuesta.reset();
            return
          }
          Swal.fire('Opsss...',resp.error.errors[0].msg,'error');
        })
      }
    });
  }
}
