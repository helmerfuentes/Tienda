import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Columns } from 'ngx-easy-table';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css']
})
export class ListarComponent implements OnInit {
  @ViewChild('actionTpl', { static: true }) actionTpl: TemplateRef<any>;
  public RutaApi:string="producto";

  public Columns: Columns[];
  constructor(private router:Router) { }

  ngOnInit(): void {
    this.Columns = [
      { key: 'nombre', title: 'Nombre',width:"20%" },
      { key: 'categoria', title: 'Categoria',width:"20%" },
      { key: 'precio', title: 'Precio',width:"10%"},
      { key: 'porcentajeMaxDescuento', title: '% Descuento',width:"10%" },
      { key: 'cantidadDisponible', title: 'Disponible',width:"10%" },
      { key: 'opciones', title: 'Opciones',cellTemplate: this.actionTpl,width:"10%"},
    ];
  }

  actualizar(Producto:any){
    console.log(Producto);
    this.router.navigate(['/RegistrarProducto',Producto.id]);

  }

}
