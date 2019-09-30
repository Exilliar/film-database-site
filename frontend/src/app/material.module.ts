import {NgModule} from '@angular/core';
import {
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    MatFormFieldModule,
    MatCardModule,
    MatInputModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatTableModule,
    MatSnackBarModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatDialogModule,
} from '@angular/material';

import {  } from "@angular/material";
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
        BrowserAnimationsModule,
        MatCardModule,
        MatSnackBarModule,
        MatSlideToggleModule,
        MatSelectModule,
        MatDialogModule,
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
        BrowserAnimationsModule,
        MatCardModule,
        MatSnackBarModule,
        MatSlideToggleModule,
        MatSelectModule,
        MatDialogModule,
    ],
})

export class MaterialModule {}