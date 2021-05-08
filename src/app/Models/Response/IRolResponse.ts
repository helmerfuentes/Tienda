import { IPermiso } from './IPermisoResponse';
export interface IRol{
  id:number;
  nombre:string;
  permisos:IPermiso[];
}
