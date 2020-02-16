import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterRoutingModule } from './register-routing.module';

import { MaterialModule } from 'src/app/material.module';

// Forms
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

// Containers
import { RegisterPageComponent } from './containers/register-page/register-page.component';

@NgModule({
  declarations: [RegisterPageComponent],
  imports: [
    CommonModule,
    RegisterRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
  ]
})
export class RegisterModule { }
