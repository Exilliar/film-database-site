import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Containers
import { BluraysPageComponent } from './containers/blurays-page/blurays-page.component';

const routes: Routes = [
    {
        path: '',
        component: BluraysPageComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class BluraysRoutingModule { }