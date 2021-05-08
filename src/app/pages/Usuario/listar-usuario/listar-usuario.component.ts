import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Columns } from 'ngx-easy-table';
import { Router } from '@angular/router';
import { IUsuario } from '../../../Models/Response/IUsuarioResponse';

@Component({
  selector: 'app-listar-usuario',
  templateUrl: './listar-usuario.component.html',
  styleUrls: ['./listar-usuario.component.css']
})
export class ListarUsuarioComponent implements OnInit {
  @ViewChild('actionTpl', { static: true }) actionTpl: TemplateRef<any>;
  public Columns: Columns[];
  public RutaApi:string="usuario";



  constructor(private router:Router) { }

  ngOnInit(): void {
    this.Columns = [
      { key: 'persona.nombres', title: 'Nombres',width:"15%" },
      { key: 'persona.apellidos', title: 'Apellidos',width:"15%" },
      { key: 'persona.documento', title: 'Documento',width:"10%"},
      { key: 'rol.nombre', title: 'Rol',width:"10%" },
      { key: 'usuario', title: 'Usuario',width:"10%" },
      { key: 'opciones', title: 'Opciones',cellTemplate: this.actionTpl,width:"10%"},
    ];
  }

  actualizar(row:IUsuario){
    this.router.navigate(["/RegistrarUsuarios",row.id])
  }

}
