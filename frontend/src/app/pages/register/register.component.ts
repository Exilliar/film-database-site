import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { LoginValue } from 'src/app/models/login-value.model';

import { AuthService } from 'src/app/auth/authService/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  registerForm: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    public authService: AuthService,
    public router: Router,
    private fb: FormBuilder,
    ) {
       this.createForm();
    }

  createForm(): void {
    this.registerForm = this.fb.group({
      email: ['', Validators.required],
      password: ['',Validators.required]
    });
  }

  tryRegister(value: LoginValue): void {
    this.authService.Register(value)
    .then(res => {
      this.errorMessage = "";
      this.successMessage = "Your account has been created";
      this.router.navigate(['/blurays']);
    }, err => {
      console.log(err);
      this.errorMessage = err.message;
      this.successMessage = "";
    });
  }

  tryGoogleLogin(): void {
    this.authService.GoogleLogin()
    .then(res =>{
      this.router.navigate(['/blurays']);
    }, err => console.log(err)
    );
  }
}
