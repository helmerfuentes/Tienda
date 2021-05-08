import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from '../../Service/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;

  constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private authenticationService: UsuarioService,
  ) {

  }

  ngOnInit() {
      this.loginForm = this.formBuilder.group({
          username: ['', Validators.required],
          password: ['', Validators.required]
      });

      if(this.authenticationService.Autenticado){
        this.authenticationService.CargarStorage();
        // window.location.reload();
        this.router.navigate(['/']);
      }

  }
  get f() { return this.loginForm.controls; }

  onSubmit(){
    console.log(this.loginForm.value);
    this.authenticationService.login(this.loginForm.get('username').value,this.loginForm.get('password').value)
  }

}
