import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Columns } from 'ngx-easy-table';

@Component({
  selector: 'app-listar-venta',
  templateUrl: './listar-venta.component.html',
  styleUrls: ['./listar-venta.component.css']
})
export class ListarVentaComponent implements OnInit {
  @ViewChild('actionTpl', { static: true }) actionTpl: TemplateRef<any>;
  public Columns: Columns[];
  public RutaApi:string="Factura/venta";
  constructor() { }

  ngOnInit(): void {
    this.Columns = [
      { key: 'persona.documento', title: 'Documento',width:"10%" },
      { key: 'persona.nombres', title: 'Nombres',width:"10%" },
      { key: 'persona.apellidos', title: 'Fecha',width:"10%" },
      { key: 'valor', title: 'Valor Venta',width:"10%" },
      { key: 'fecha', title: 'Fecha',width:"10%" },
      { key: 'opciones', title: 'Opciones',cellTemplate: this.actionTpl,width:"10%"},
    ];
  }

}
