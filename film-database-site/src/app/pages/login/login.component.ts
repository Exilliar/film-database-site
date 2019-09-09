import { Component  } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UserService } from '../../auth/user.service';
import { SignedInService } from '../../core/services/signed-in/signed-in.service';

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

  createForm() {
    this.loginForm = this.fb.group({
      email: ['', Validators.required ],
      password: ['',Validators.required]
    });
  }

  tryGoogleLogin(){
    this.authService.GoogleLogin()
    .then(res => {
      this.router.navigate(['/blurays']);
    })
  }

  tryLogin(value){
    this.authService.Login(value)
    .then(res => {
      this.router.navigate(['/blurays']);
    }, err => {
      console.log(err);
      this.errorMessage = err.message;
    })
  }

  printUser(event) {
    console.log("event", event);
    this.userService.updateCurrentUser(event)
    .then(res => {
      this.router.navigate(['/blurays']);
    })
    .catch(err => {
      console.log(err);
    })
    

    // this.authService.Login(event)
    // .then(res => {
    //   this.router.navigate(['/blurays']);
    //   console.log("should have redirected");
    // })
    // .catch(err => {
    //   console.log(err);
    // })
  }
  printError(event) {
    console.error(event);
  }
}
