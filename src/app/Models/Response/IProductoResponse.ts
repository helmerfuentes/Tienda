import { ICategoria } from './IcategoriaResponse';
export interface IProducto{
  id:number;
  nombre:string;
  porcentajeMaxDescuento:number;
  Precio:number;
  cantidadDisponible:number;
  categoria:string;
  porcentajeUtilidad:number;
  fecha:Date;
}
