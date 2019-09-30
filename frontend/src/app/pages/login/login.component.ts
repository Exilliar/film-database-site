import { Component  } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from 'src/app/auth/authService/auth.service';
import { UserService } from 'src/app/auth/userService/user.service';

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
    private userService: UserService,
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

  tryLogin(value): void {
    this.authService.Login(value)
    .then(res => {
      this.router.navigate(['/blurays']);
    }, err => {
      console.log(err);
      this.errorMessage = err.message;
    });
  }

  printUser(event): void {
    this.userService.updateCurrentUser(event)
    .then(res => {
      this.router.navigate(['/blurays']);
    })
    .catch(err => {
      console.log(err);
    });
  }

  printError(event) {
    console.error(event);
  }
}
