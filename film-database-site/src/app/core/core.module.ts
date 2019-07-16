import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from './services/theme.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    ThemeService
  ],
  exports: [
    CommonModule
  ]
})
export class CoreModule { }
