import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsuarioService } from '../usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private _usuarioService: UsuarioService, private router: Router) {
  }

  canActivate() {
    if (!this._usuarioService.Autenticado()) {
      console.log('logout');
      this.router.navigate(['/login']);
      return false;
    }
    this._usuarioService.CargarStorage();
    // this.router.navigate(['/']);
    return true;
  }

}
