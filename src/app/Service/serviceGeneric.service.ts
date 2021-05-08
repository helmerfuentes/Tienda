import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment.prod';
import { Observable } from 'rxjs';

interface QueryParams {
  [key: string]: string | number;
}

@Injectable({
  providedIn: 'root'
})
export class ServiceGeneric {

  private readonly END_POINT: string;
  constructor(private readonly http: HttpClient){
    this.END_POINT = environment.URL_SERVICIO;
  }

  private correctFormatForQueryUrl(qp: QueryParams): string{
      if (qp === null) { return ''; }
      const qpAsStr = this.mapQueryParamsToUrl(qp);
      return qpAsStr.length === 0 ? '' : `?${qpAsStr.join('&')}`;

  }
  private mapQueryParamsToUrl(qp: QueryParams): Array<string> {
    return Object.keys(qp).map((key: string) => {
      return `${key}=${qp[key]}`;
    });
  }

  getRemove<returnType>(
    id: string | null | number,
    route: string,
    qp: QueryParams = {},
    method: 'get' | 'delete' = 'get'
  ): Observable<returnType> {
    const cfqu = this.correctFormatForQueryUrl(qp);
    return this.http[method](
      `${this.END_POINT}${route}${id ? '/' + id : ''}${cfqu}`
    ) as Observable<returnType>;
  }

  postPatch<returnType>(
    route: string,
    data: any,
    id: number = null,
    method: 'post' | 'put' = 'post',
    qp: QueryParams = {}
  ): Observable<returnType> {
    const cfqu = this.correctFormatForQueryUrl(qp);
    return this.http[method](
      `${this.END_POINT}${route}${id ? '/' + id : ''}${cfqu}`,
      data
    ) as Observable<returnType>;
  }


  getDeleteObject<ResponseHttp>(
    route: string,
    data: any,
    method: 'get' | 'delete' = 'get'
  ): Observable<ResponseHttp> {
    return this.http[method](
      `${this.END_POINT}${route}`, data
    ) as unknown  as Observable<ResponseHttp>;
  }


}
