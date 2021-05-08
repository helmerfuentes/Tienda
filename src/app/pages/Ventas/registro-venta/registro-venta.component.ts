import { TemplateRef } from '@angular/core';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TablaComponent } from 'app/components/tabla/tabla.component';
import { IProducto } from 'app/Models/Response/IProductoResponse';
import { NotificacionService } from 'app/Service/notificacion.service';
import { ServiceGeneric } from 'app/Service/serviceGeneric.service';
import { Columns } from 'ngx-easy-table';
import { ICategoria } from '../../../Models/Response/IcategoriaResponse';
import { IResponseHttp } from '../../../Models/Response/IResponseHttp';
import { IPersona } from '../../../Models/Response/IPersonaResponse';
import { concatMap } from 'rxjs/operators';

@Component({
  selector: 'app-registro-venta',
  templateUrl: './registro-venta.component.html',
  styleUrls: ['./registro-venta.component.css']
})
export class RegistroVentaComponent implements OnInit {
  @ViewChild('actionTpl', { static: true }) actionTpl: TemplateRef<any>;
  @ViewChild(TablaComponent) tabla: TablaComponent;
  public Columns: Columns[];

  form: FormGroup;

  public Categorias:ICategoria[];
  public Productos: IProducto[]=[];
  public ExistePersona:boolean=true;
  public valorFactura:number=0;

  constructor(private formBuilder: FormBuilder,
    private readonly serviceGeneric:ServiceGeneric,
    private readonly notificacionService:NotificacionService,
    private router:Router) { }

  ngOnInit(): void {
    this.buildForm();
    this.Columns = [
      { key: 'nombre', title: 'Producto',width:"10%" },
      { key: 'precioUnitario', title: 'Precio Unitario',width:"10%" },
      { key: 'cantidad', title: 'Cantidad',width:"10%" },
      { key: 'descuento', title: '% Descuento',width:"10%" },
      { key: 'costo', title: 'Precio total',width:"10%" },
      { key: 'opciones', title: 'Opciones',cellTemplate: this.actionTpl,width:"10%"},
    ];

    this.serviceGeneric.getRemove<IResponseHttp<ICategoria>>(null,'categoria')
    .subscribe(res=>{
      this.Categorias=res.data as ICategoria[];
    })
  }

  buildForm() {
    this.form = this.formBuilder.group({
      personaId:[''],
      persona:this.formBuilder.group({
        documento:['',Validators.required],
        nombres:['',Validators.required],
        apellidos:['',Validators.required],
        telefono:['',Validators.required],
        direccion:['',Validators.required]
      }),
      detalle:this.formBuilder.group({
        productoId:[''],
        cantidad: ['',Validators.required],
        precioUnitario:['',Validators.required],
        descuento:['',Validators.required],
        nombre:[''],
        costo:[''],
      }),
      detallesProducto: this.formBuilder.array([],Validators.required)
    });
  }
  get Detalles():FormArray{
    return this.form.get("detallesProducto") as FormArray;
  }

  buscarPersona(){
    var documento:string=this.persona.get('documento').value;
    if (documento==='') {
      this.notificacionService.error("Documento",'Ingrese documento');
      return;
    }
    this.serviceGeneric.getRemove<IResponseHttp<IPersona>>(null,'persona',{documento})
    .subscribe(res=>{
      this.notificacionService.informacion(res.message)
      if (res.state) {
        this.persona.patchValue(res.data as IPersona);
        this.personaId.setValue((res.data as IPersona).id);
        // Object.assign(this.persona.patchValue,res.data as IPersona);
        console.log(this.persona.value);
      }else{
        this.ExistePersona=false;
        this.persona.reset();
      }

    })
  }

  NuevoDetalle():FormGroup{
    return this.formBuilder.group({
      productoId:[''],
      cantidad: ['',Validators.required],
      precioUnitario:['',Validators.required],
      descuento:['',Validators.required],
      nombre:[''],
      costo:[''],
    })
  }

  AgregarDetalle(){
    if (this.detalle.valid) {
      this.calcularTotal();
      this.Detalles.push(this.detalle);
      this.tabla.data=this.detalleProductos.value
      this.form.removeControl('detalle');
      this.form.addControl('detalle',this.NuevoDetalle());
    }else{
      this.notificacionService.error("Formulario Invalido","Formulario");
      this.detalle.markAsTouched();
    }
  }

  calcularTotal(){
    var cantidad=this.detalle.get('cantidad').value;
    var precio=this.detalle.get('precioUnitario').value;
    var porcentaje=this.detalle.get('descuento').value;
   var total= (cantidad*precio)-((cantidad*precio)*(porcentaje/100));
   this.valorFactura+=total;
   this.detalle.get('costo').setValue(total);


  }

  onSubmit(){
    if(this.ExistePersona && this.form.get('personaId').value==''){
      this.notificacionService.error("Error en","Los datos del cliente");
      return;
    }

    if (!this.ExistePersona && this.persona.invalid) {
      this.notificacionService.error("Error en","Ingrese datos del cliente");
      return;
    }

    if(this.tabla.data.length==0){
      this.notificacionService.error("Error en","Agregue al menos 1 producto");
      return;
    }

    if (this.ExistePersona) {
      this.serviceGeneric.postPatch<IResponseHttp<any>>('factura/venta',this.form.value)
      .subscribe(res=>{
        this.notificacionService.exitoso(res.message);
        this.form.reset();
      })
    }else{
      this.serviceGeneric.postPatch<IResponseHttp<IPersona>>('persona',this.persona.value,null,'post')
    .pipe(
      concatMap(val=>{
        var id=(val.data as IPersona).id;
        this.form.get('personaId').setValue(id)
      return this.serviceGeneric.postPatch<IResponseHttp<any>>('usuario/registrar',this.detalleProductos.value,null,'post')
      })
    )
    .subscribe(res=>{
      this.notificacionService.exitoso('Transación exitosa', res.message);
      this.router.navigate(['/Ventas']);
    })

    }


  }

  EliminarDetalle(row:any){
    console.log(row);
    this.valorFactura-=row.costo;
    this.Detalles.removeAt(row);
    this.tabla.data=this.detalleProductos.value
  }

  MostrarCategoria(id:number){
    if (id==0) {
      this.notificacionService.informacion("Categoria","Debe seleccionar una categoria");
    return;
    }
    this.serviceGeneric.getRemove<IResponseHttp<IProducto>>(null,'producto/porCategoria',{id})
    .subscribe(res=>{
      console.log(res.data);
      this.Productos=res.data as IProducto[];
    })


  }
  MostrarProducto(productoId:number){
    if (productoId!=0)
    this.detalle.get('nombre').setValue(this.Productos.find(x=>x.id==productoId).nombre);
  }

  get detalle() { return this.form.get('detalle'); }
  get persona() { return this.form.get('persona'); }
  get personaId() { return this.form.get('personaId'); }
  get detalleProductos() { return this.form.get('detallesProducto'); }

}
