import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Containers
import { AdminPageComponent } from './containers/admin-page/admin-page.component';
import { ViewTablePageComponent } from './containers/view-table-page/view-table-page.component';

const routes: Routes = [
    {
        path: '',
        component: AdminPageComponent
    }, {
        path: 'viewTable/:uid',
        component: ViewTablePageComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule { }