import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';

import { MaterialModule } from './material.module';

import {CdkTableModule} from '@angular/cdk/table';
import { BluraysComponent } from './pages/blurays/blurays.component';



@NgModule({
  declarations: [
    AppComponent,
    BluraysComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CdkTableModule,
    HttpClientModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
