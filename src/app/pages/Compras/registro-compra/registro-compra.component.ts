import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Columns } from 'ngx-easy-table';
import { IProovedor } from '../../../Models/Response/IProovedorResponse';
import { ServiceGeneric } from '../../../Service/serviceGeneric.service';
import { IResponseHttp } from '../../../Models/Response/IResponseHttp';
import { IProducto } from '../../../Models/Response/IProductoResponse';
import { forkJoin } from 'rxjs';
import { NotificacionService } from '../../../Service/notificacion.service';
import { TablaComponent } from 'app/components/tabla/tabla.component';
import { Router } from '@angular/router';

interface datoProducto{

}

@Component({
  selector: 'app-registro-compra',
  templateUrl: './registro-compra.component.html',
  styleUrls: ['./registro-compra.component.css']
})
export class RegistroCompraComponent implements OnInit {
  @ViewChild('actionTpl', { static: true }) actionTpl: TemplateRef<any>;
  @ViewChild(TablaComponent) tabla: TablaComponent;
  form: FormGroup;
  public Columns: Columns[];
  public Proovedores:IProovedor[]=[];
  public Productos: IProducto[]=[];
  public ProovedorSelecionado:IProovedor;
  public ProductoSeleccionado:IProducto;

  constructor(private formBuilder: FormBuilder,
    private readonly serviceGeneric:ServiceGeneric,
    private readonly notificacionService:NotificacionService,
    private router:Router) { }

  ngOnInit(): void {
    this.buildForm();
    this.Columns = [
      { key: 'nombre', title: 'Producto',width:"10%" },
      { key: 'categoria', title: 'Categoria',width:"10%" },
      { key: 'costo', title: 'Costo',width:"10%" },
      { key: 'cantidad', title: 'Cantidad',width:"10%" },
      { key: 'opciones', title: 'Opciones',cellTemplate: this.actionTpl,width:"10%"},
    ];

    forkJoin(
      [
        this.serviceGeneric.getRemove<IResponseHttp<IProovedor>>(null,'proovedor'),
        this.serviceGeneric.getRemove<IResponseHttp<IProducto>>(null,'producto')
      ]
    )
    .subscribe(res=>{
      this.Proovedores=res[0].data as IProovedor[];
      this.Productos=res[1].data as IProducto[];
    })
  }
  buildForm() {
    this.form = this.formBuilder.group({
      proovedorId: ['',Validators.required],
      detalle:this.formBuilder.group({
        nombre:[''],
        categoria: [''],
        productoId:['',Validators.required],
        cantidad:['',Validators.required],
        costo:['',Validators.required]
      }),
      detallesCompra: this.formBuilder.array([],Validators.required)
    });
  }

  get Detalles():FormArray{
    return this.form.get("detallesCompra") as FormArray;
  }

  NuevoDetalle():FormGroup{
    return this.formBuilder.group({
      nombre:[''],
      categoria:[''],
      productoId:['',Validators.required],
      cantidad:['',Validators.required],
      costo:['',Validators.required]
    })
  }

  AgregarDetalle(){
    if (this.detalle.valid) {
      this.Detalles.push(this.detalle);
      this.tabla.data=this.detallesCompra.value
      this.form.removeControl('detalle');
      this.form.addControl('detalle',this.NuevoDetalle());
    }else{
      this.notificacionService.error("Formulario Invalido","Formulario");
      this.detalle.markAsTouched();
    }
  }

  EliminarDetalle(i:number){
    this.Detalles.removeAt(i);
    this.tabla.data=this.detallesCompra.value

  }

  MostrarProovedor(proovedorId:number){
    if(proovedorId!=0){
      this.ProovedorSelecionado=this.Proovedores.find(x=>x.id==proovedorId);
    }

  }

  MostrarProducto(productoId:number){
    if (productoId!=0) {
      this.ProductoSeleccionado=this.Productos.find(x=>x.id==productoId);
      this.detalle.get('categoria').setValue(this.ProductoSeleccionado.categoria)
      this.detalle.get('nombre').setValue(this.ProductoSeleccionado.nombre)
      // console.log();
    }
  }

  onSubmit(){
    if (this.tabla.data.length==0) {
      this.notificacionService.error("Debe agregar al menos un producto","Error");
      return;
    }
    this.form.removeControl('detalle');
    if (this.form.invalid) {

      this.notificacionService.error("Debe seleccionar un proovedor","Error");
      return;
    }

    console.log(this.form.value);

    this.serviceGeneric.postPatch<IResponseHttp<any>>('factura/compra',this.form.value,null,'post')
    .subscribe(res=>{
      this.notificacionService.exitoso("Transación exitosa",res.message);
      this.router.navigate(["/ListadoCompras"]);

    })

  }

  get detalle() { return this.form.get('detalle'); }
  get detallesCompra() { return this.form.get('detallesCompra'); }
  get proovedor() { return this.form.get('proovedorId'); }
}
