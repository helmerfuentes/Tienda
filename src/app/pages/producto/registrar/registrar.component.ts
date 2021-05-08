import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IResponseHttp } from 'app/Models/Response/IResponseHttp';
import { ICategoria } from '../../../Models/Response/IcategoriaResponse';
import { ServiceGeneric } from '../../../Service/serviceGeneric.service';
import { NotificacionService } from '../../../Service/notificacion.service';
import { IProducto } from '../../../Models/Response/IProductoResponse';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']
})
export class RegistrarComponent implements OnInit {
  public id;
  public accion;
  form: FormGroup;
  public Categorias:ICategoria;

  constructor(
    private router:Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private serviceGeneric:ServiceGeneric,
    private notificacionSetvice:NotificacionService) {

    activatedRoute.params.subscribe(params => {
      this.id = params.id;
    })

    console.log(this.id);

    if(this.id==='nuevo'){
      this.accion="Registrar Producto"
      console.log('es nuevo');

    }else{
      this.accion="Actualizar Producto"
      console.log('actualizar');
    }
  }

  ngOnInit(): void {
    this.buildForm();
    this.serviceGeneric.getRemove<IResponseHttp<ICategoria>>(null,'categoria')
    .subscribe(res=>{
      this.Categorias=res.data as ICategoria;
    })
  }

  buildForm() {
    this.form = this.formBuilder.group({
      id: [''],
      nombre: ['', [Validators.required]],
      codigo: ['', [Validators.required]],
      porcentajeMaxDescuento : ['', [Validators.required]],
      precio : ['', [Validators.required]],
      categoriaId: ['', [Validators.required]]
    });
  }


  submit(){
    console.log(this.form.value);
    if(this.form.valid){
      this.serviceGeneric.postPatch<IResponseHttp<IProducto>>('Producto',this.form.value,null,'post')
      .subscribe(res=>{
        this.notificacionSetvice.exitoso("Exitoso",res.message);
        this.router.navigate(['/Productos']);
      })
      return;
    }
    this.notificacionSetvice.error("Fomurlario Invalido","");
    this.form.markAllAsTouched();

  }

}
