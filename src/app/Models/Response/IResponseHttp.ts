export interface IResponseHttp<T>{
  message:string;
  code:string;
  state:boolean;
  data: T | T[];
}
