import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Containers
import { LoginPageComponent } from './containers/login-page/login-page.component';

const routes: Routes = [
    {
        path: '',
        component: LoginPageComponent
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LoginRoutingModule { }