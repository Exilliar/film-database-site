import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BluraysComponent } from './pages/blurays/blurays.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'blurays',
    pathMatch: 'full'
  }, {
    path: 'blurays',
    component: BluraysComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
