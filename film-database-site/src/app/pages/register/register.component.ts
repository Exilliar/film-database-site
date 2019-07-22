import { Component, OnInit } from '@angular/core';

import { AuthService } from './../../auth/auth.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

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

  ngOnInit() {
  }

  createForm() {
    this.registerForm = this.fb.group({
      email: ['', Validators.required],
      password: ['',Validators.required]
    });
  }

  tryRegister(value){
    this.authService.Register(value)
    .then(res => {
      this.errorMessage = "";
      this.successMessage = "Your account has been created";
      this.router.navigate(['/blurays']);
    }, err => {
      console.log(err);
      this.errorMessage = err.message;
      this.successMessage = "";
    })
  }

  tryGoogleLogin(){
    this.authService.GoogleLogin()
    .then(res =>{
      this.router.navigate(['/blurays']);
    }, err => console.log(err)
    )
  }

}
