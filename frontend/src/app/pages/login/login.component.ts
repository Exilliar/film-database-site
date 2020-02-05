import { Component  } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { LoginValue } from 'src/app/models/login-value.model';

import { AuthService } from 'src/app/services/authService/auth.service';

@Component({
  selector: 'page-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss']
})
export class LoginComponent {

  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(
    public authService: AuthService,
    public router: Router,
    private fb: FormBuilder,
  ) {
    this.createForm();
  }

  createForm(): void {
    this.loginForm = this.fb.group({
      email: ['', Validators.required ],
      password: ['',Validators.required]
    });
  }

  tryGoogleLogin(): void {
    this.authService.GoogleLogin()
    .then(res => {
      this.router.navigate(['/blurays']);
    });
  }

  tryLogin(value: LoginValue): void {
    this.authService.Login(value)
    .then(res => {
      this.router.navigate(['/blurays']);
    }, err => {
      console.log(err);
      this.errorMessage = err.message;
    });
  }
}
