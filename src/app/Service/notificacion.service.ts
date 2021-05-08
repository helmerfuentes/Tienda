import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotificacionService {

  constructor(private toastr: ToastrService) { }

  public exitoso(titulo="Exitoso",descripcion="peticion exitosa"){
    this.toastr.success(
      `<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message"> <b>${titulo}</b> - ${descripcion}.</span>`,
      "",
      {
        timeOut: 4000,
        closeButton: true,
        enableHtml: true,
        toastClass: "alert alert-success alert-with-icon",
        positionClass: "toast-top-right"
      }
    );
  }

  public informacion(titulo="Información",descripcion=""){
    this.toastr.info(
      `<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message"> <b>${titulo}</b> - ${descripcion}.</span>`,
      "",
      {
        timeOut: 4000,
        closeButton: true,
        enableHtml: true,
        toastClass: "alert alert-warning alert-with-icon",
        positionClass: "toast-top-right"
      }
    );
  }

  public error(titulo="Error",descripcion="Ahhh ocurrido un error"){
    this.toastr.error(
      `<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message"> <b>${titulo}</b> - ${descripcion}.</span>`,
      "",
      {
        timeOut: 6000,
        closeButton: true,
        enableHtml: true,
        toastClass: "alert alert-danger alert-with-icon",
        positionClass: "toast-top-right"
      }
    );
  }
}
