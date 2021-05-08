import { IPersona } from "./IPersonaResponse";
import { IRol } from "./IRolResponse";

export interface IUsuario{
   id : number;
   usuario : string;
   rol : IRol;
   persona: IPersona;
}
