import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { BluraysComponent } from './pages/blurays/blurays.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';

import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  }, {
    path: 'login',
    component: LoginComponent,
    // canActivate: [AuthGuard]
  }, {
    path: 'register',
    component: RegisterComponent,
    canActivate: [AuthGuard]
  }, {
    path: 'blurays',
    component: BluraysComponent,
    canActivate: [AuthGuard]
  }, {
    path: 'user',
    redirectTo: '/blurays',
    pathMatch: 'full' // this is just a temp fix, somewhere is linking to /user when the user is logged in
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
