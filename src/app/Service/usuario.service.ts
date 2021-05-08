import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import {  ServiceGeneric } from './serviceGeneric.service';
import { NgxPermissionsService, NgxRolesService } from 'ngx-permissions';
import { IResponseHttp } from '../Models/Response/IResponseHttp';
import { ILogin } from '../Models/Response/ILoginResponse';
import { IRol } from 'app/Models/Response/IRolResponse';
import { IPermiso } from '../Models/Response/IPermisoResponse';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public Token: string = '';
  public Permisos: string[];
  public Usuario: string;
  public Rol: string;
  public Credenciales:ILogin;

  constructor(private router: Router,
    private _serviceGeneric:ServiceGeneric,
    private rolesService: NgxRolesService,
    private permissionsService: NgxPermissionsService)
   {
    this.CargarStorage();
   }


   login(username: string, password: string) {

    this._serviceGeneric.postPatch<IResponseHttp<ILogin>>('usuario/login',{username,password})
    .subscribe(res=>{
      this.Credenciales=res.data as ILogin;
      console.log(this.Credenciales);

      this.GudarLocalStorage(this.Credenciales.rol,this.Credenciales.token,this.Credenciales.usuario);
      // this.router.navigate(["/"]);
      window.location.href = '#/dashboard'
    })

  }

   GudarLocalStorage(rol: IRol, token: string, usuario: string) {
    this.Token=token;
    this.Usuario=usuario;
    this.Rol=rol.nombre;
    this.Permisos= rol.permisos.map(x=>x.codigo);
    localStorage.setItem("usuario",usuario);
    localStorage.setItem("token",token);
    localStorage.setItem("rol",rol.nombre);
    this.Permisos=this.ObtenerPermisos(rol.permisos);
    localStorage.setItem("permiso",JSON.stringify(this.Permisos));
    this.rolesService.addRoleWithPermissions(this.Rol,this.Permisos);

  }

  ObtenerPermisos(permisos:IPermiso[]){
    var codigoPermisos:string[]=[];
    permisos.forEach(function(value){
      codigoPermisos.push(value.codigo);
    })
    return codigoPermisos;

  }


  CargarStorage(){
      console.log("cargar storage");
    if (localStorage.getItem('token')) {
     this.Usuario= localStorage.getItem("usuario");
    this.Token= localStorage.getItem("token");
    this.Rol= localStorage.getItem("rol");
    this.Permisos=JSON.parse(localStorage.getItem("permiso"));
    this.rolesService.addRoleWithPermissions(this.Rol,this.Permisos);
    console.log(this.rolesService.getRoles);
  }else {
    this.Token = '';
    this.Rol='';
    this.Permisos = null;
  }
  }

  Autenticado(){
    console.log(this.Token);

    return (this.Token?.length > 5) ? true : false;
  }

  CerrarSesion(){
    this.Token = '';
    this.rolesService.removeRole(this.Rol);
    this.Rol = '';
    localStorage.removeItem('token');
    localStorage.removeItem('rol');
    localStorage.removeItem('permiso');
    localStorage.removeItem('usuario');
    this.Permisos = [];
    this.router.navigate(['/login']);
  }

}

