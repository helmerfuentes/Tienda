import { TemplateRef, ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Columns } from 'ngx-easy-table';

@Component({
  selector: 'app-listado-compra',
  templateUrl: './listado-compra.component.html',
  styleUrls: ['./listado-compra.component.css']
})
export class ListadoCompraComponent implements OnInit {
  @ViewChild('actionTpl', { static: true }) actionTpl: TemplateRef<any>;
  public RutaApi:string="Factura/compra";

  public Columns: Columns[];
  constructor() { }

  ngOnInit(): void {
    this.Columns = [
      { key: 'provedor.nombre', title: 'Provedor',width:"10%" },
      { key: 'provedor.razonSocial', title: 'Razon Soial',width:"10%" },
      { key: 'valor', title: 'Valor Factura',width:"10%" },
      { key: 'fecha', title: 'Fecha',width:"10%" },
      { key: 'opciones', title: 'Opciones',cellTemplate: this.actionTpl,width:"10%"},
    ];
  }

}
