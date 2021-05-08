import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import {  ServiceGeneric } from './serviceGeneric.service';
import { NgxRolesService } from 'ngx-permissions';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public token: string = '';
  public modulos: any[] = [];
  public DatosBasicos: any = {}

  constructor(private router: Router,
    private _serviceGeneric:ServiceGeneric,
    private rolesService: NgxRolesService)
   { }


   login(username: string, password: string) {

    // return this._serviceGeneric.postPatch<ResponseHttp<any>>('usuario/auth/login', { username, password })
    //   .pipe(
    //     map(async res => {
    //       sessionStorage.setItem('token', res.data.token);
    //       this.token=res.data.token;
    //       // console.log(this.jwtHelperService.decodeToken(this.token));
    //       return await this.obtenerFuncionalidades().toPromise();
    //     })
    //   )

  }

  ObtenerFuncionalidades(){

  }

  GuardarPermisos(){

  }

  CargarStorage(){

  }

  Autenticado(){

  }

  CerrarSesion(){

  }

}
