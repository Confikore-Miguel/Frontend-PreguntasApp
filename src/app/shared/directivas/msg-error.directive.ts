import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[msg-error]'
})
export class MsgErrorDirective {

  private _color:string= 'red';
  private _mensaje:string= 'Hola';
  
  
  htmlRef: ElementRef<HTMLElement>;


  @Input() set colores(color:string){
    this.htmlRef.nativeElement.style.color= color;
    this._color = color
  }
  @Input() set mensaje( mensaje:string){
    this.htmlRef.nativeElement.innerText = mensaje;
    this._mensaje=mensaje;
  }

  constructor( private el:ElementRef<HTMLElement>) { 
    this.htmlRef = this.el;
  }

  ngOnInit(): void {
    this.setColor();
    this.setMensaje();
  }

  setColor(){
    this.htmlRef.nativeElement.style.color= this._color;
  }
  setMensaje(){
    this.htmlRef.nativeElement.innerText = this._mensaje;
  }

}
