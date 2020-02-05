import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { BluraysComponent } from './pages/blurays/blurays.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { AdminComponent } from './pages/admin/admin.component';

// Guards
import { AuthGuard } from './guards/auth/auth.guard';
import { LoginGuard } from './guards/login/login.guard';
import { AdminGuard } from './guards/admin/admin.guard';
import { ViewTableComponent } from './pages/viewTable/view-table.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/blurays',
    pathMatch: 'full'
  }, {
    path: 'login',
    component: LoginComponent,
    canActivate: [LoginGuard]
  }, {
    path: 'register',
    component: RegisterComponent,
    canActivate: [LoginGuard]
  }, {
    path: 'blurays',
    component: BluraysComponent,
    canActivate: [AuthGuard]
  }, {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard, AdminGuard]
  }, {
    path: 'viewTable/:uid',
    component: ViewTableComponent,
    canActivate: [AuthGuard, AdminGuard]
  }, {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
