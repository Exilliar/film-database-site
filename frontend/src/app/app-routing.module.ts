import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { PageNotFoundComponent } from './core/components/page-not-found/page-not-found.component';

// Guards
import { AuthGuard } from './core/guards/auth/auth.guard';
import { LoginGuard } from './core/guards/login/login.guard';
import { AdminGuard } from './core/guards/admin/admin.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/blurays',
    pathMatch: 'full'
  }, {
    path: 'login',
    canActivate: [LoginGuard],
    loadChildren: () =>
      import('./login/login.module').then(m => m.LoginModule)
  }, {
    path: 'register',
    canActivate: [LoginGuard],
    loadChildren: () =>
      import('./register/register.module').then(m => m.RegisterModule)
  }, {
    path: 'blurays',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./blurays/blurays.module').then(m => m.BluraysModule)
  }, {
    path: 'admin',
    canActivate: [AuthGuard, AdminGuard],
    loadChildren: () =>
      import('./admin/admin.module').then(m => m.AdminModule)
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
