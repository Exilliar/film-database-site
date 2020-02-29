import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from 'src/app/material.module';

import { AdminRoutingModule } from './admin-routing.module';

// Containers
import { AdminPageComponent } from './containers/admin-page/admin-page.component';
import { ViewTablePageComponent } from './containers/view-table-page/view-table-page.component';

// Services
import { RolesService } from './services/roles/roles.service';

@NgModule({
  declarations: [AdminPageComponent, ViewTablePageComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule,
  ],
  providers: [RolesService]
})
export class AdminModule { }
