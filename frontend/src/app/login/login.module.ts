import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';

import { MaterialModule } from 'src/app/material.module';

// Forms
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

// Containers
import { LoginPageComponent } from './containers/login-page/login-page.component';

@NgModule({
  declarations: [LoginPageComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
  ]
})
export class LoginModule { }
