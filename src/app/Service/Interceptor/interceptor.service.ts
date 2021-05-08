import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { NotificacionService } from '../notificacion.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor  {

  constructor(private notificacion: NotificacionService) { }


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token=localStorage.getItem('token');
    // localStorage.getItem('token');
    console.log(token);

    req = req.clone({
      setHeaders: {
        'Authorization':`Bearer ${token}`
      }
  } );

    return next.handle(req)
    .pipe(
      tap(event=>{
      }),
      catchError(err=>{
        this.MensajeError(err);
        return of(err);

      })
    )
  }


  MensajeError(error: HttpErrorResponse){
      if (error.status==0) {
        this.notificacion.error("Intente mas tarde","Error al conectar con el servidor");
      }
      if (error.status==500) {
        this.notificacion.error("Intente mas tarde","Error interno Servidor");
      }
      if (error.status==400) {
        this.notificacion.error("Error",error.error.message);
      }
      if (error.status==404) {

        this.notificacion.error('Error',error.error.message)
      }
      if (error.status==401) {
        this.notificacion.error('Error','No tiene permiso para esta petición')
      }

    return throwError('error personalizado')
  }


}

