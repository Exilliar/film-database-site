import {NgModule} from '@angular/core';
import {
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    MatFormFieldModule
} from '@angular/material';

import { MatInputModule, MatPaginatorModule, MatProgressSpinnerModule, MatSortModule, MatTableModule } from "@angular/material";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

@NgModule ({
    imports: [
        MatSidenavModule,
        MatToolbarModule,
        MatIconModule,
        MatListModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule, 
        MatPaginatorModule, 
        MatProgressSpinnerModule, 
        MatSortModule, 
        MatTableModule,
        BrowserAnimationsModule
    ],
    exports: [
        MatSidenavModule,
        MatToolbarModule,
        MatIconModule,
        MatListModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule, 
        MatPaginatorModule, 
        MatProgressSpinnerModule, 
        MatSortModule, 
        MatTableModule,
        BrowserAnimationsModule
    ]
})

export class MaterialModule {}