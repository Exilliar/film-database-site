import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from 'src/app/material.module';

import { BluraysRoutingModule } from './blurays-routing.module';

// Containers
import { BluraysPageComponent } from './containers/blurays-page/blurays-page.component';

@NgModule({
  declarations: [BluraysPageComponent],
  imports: [
    CommonModule,
    MaterialModule,
    BluraysRoutingModule,
  ]
})
export class BluraysModule { }
