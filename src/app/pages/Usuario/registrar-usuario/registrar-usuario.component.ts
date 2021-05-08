import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IResponseHttp } from 'app/Models/Response/IResponseHttp';
import { NotificacionService } from 'app/Service/notificacion.service';
import { ServiceGeneric } from 'app/Service/serviceGeneric.service';
import { IRol } from '../../../Models/Response/IRolResponse';
import { IPermiso } from '../../../Models/Response/IPermisoResponse';
import { IUsuario } from '../../../Models/Response/IUsuarioResponse';
import { IPersona } from '../../../Models/Response/IPersonaResponse';
import { concatMap } from 'rxjs/operators';

@Component({
  selector: 'app-registrar-usuario',
  templateUrl: './registrar-usuario.component.html',
  styleUrls: ['./registrar-usuario.component.css']
})
export class RegistrarUsuarioComponent implements OnInit {

  form: FormGroup;
  public Roles:IRol[];
  public RolSeleccionado:IRol;
  public Proceso:boolean=true;
  constructor(private formBuilder: FormBuilder,
    private readonly serviceGeneric:ServiceGeneric,
    private readonly notificacionService:NotificacionService,
    private router:Router) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      usuario: this.formBuilder.group({
        usuario:['',Validators.required],
        password:[''],
        rolId:['',Validators.required],
        personaId:[''],
      }),
      persona:this.formBuilder.group({
        nombres:['',Validators.required],
        documento: ['',Validators.required],
        apellidos:['',Validators.required],
        telefono:['',Validators.required],
        direccion:['',Validators.required]
      })
    });

    this.serviceGeneric.getRemove<IResponseHttp<IRol>>(null,'rol')
    .subscribe(res=>{
      this.Roles=res.data as IRol[];
    })
  }

  onSubmit(){
    if (this.form.invalid) {
      this.notificacionService.error("Formulario","Datos erroneos");
      this.form.markAllAsTouched();
      return;
    }

    this.serviceGeneric.postPatch<IResponseHttp<IPersona>>('persona',this.persona.value,null,'post')
    .pipe(
      concatMap(val=>{
        var id=(val.data as IPersona).id;
        console.log('persona id '+id);

        this.usuario.get('personaId').setValue(id)
      return this.serviceGeneric.postPatch<IResponseHttp<IUsuario>>('usuario/registrar',this.usuario.value,null,'post')
      })
    )
    .subscribe(res=>{
      this.notificacionService.exitoso('Transación exitosa', res.message);
      this.router.navigate(['/Usuarios']);
    })
  }

  rolSeleccionado(rolId:number){
    if (rolId!=0)
      this.RolSeleccionado=this.Roles.find(x=>x.id==rolId);

  }

  get usuario() { return this.form.get('usuario'); }
  get persona() { return this.form.get('persona'); }

}
