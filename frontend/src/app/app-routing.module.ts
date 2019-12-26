import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { BluraysComponent } from './pages/blurays/blurays.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';

// Guards
import { AuthGuard } from './auth/guard/auth.guard';
import { LoginGuard } from './auth/login/login.guard';
import { AdminComponent } from './pages/admin/admin.component';

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
    canActivate: [AuthGuard] // Include admin guard in here
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
