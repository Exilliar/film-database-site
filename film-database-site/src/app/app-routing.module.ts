import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { BluraysComponent } from './pages/blurays/blurays.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { UserComponent } from './pages/user/user.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';

// Guards
import { AuthGuard } from './auth/auth.guard';
import { LoginGuard } from './auth/login.guard';

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
    path: 'user',
    component: UserComponent
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
