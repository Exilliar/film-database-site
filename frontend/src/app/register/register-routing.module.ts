import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Containers
import { RegisterPageComponent } from './containers/register-page/register-page.component';

const routes: Routes = [
    {
        path: '',
        component: RegisterPageComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RegisterRoutingModule { }