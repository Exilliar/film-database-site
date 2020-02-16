import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from 'src/app/material.module';

import { AdminRoutingModule } from './admin-routing.module';

// Containers
import { AdminPageComponent } from './containers/admin-page/admin-page.component';
import { ViewTablePageComponent } from './containers/view-table-page/view-table-page.component';

@NgModule({
  declarations: [AdminPageComponent, ViewTablePageComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule,
  ]
})
export class AdminModule { }
