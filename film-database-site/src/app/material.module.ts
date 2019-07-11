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
} from '@angular/material';

// import {
//     MatDialogModule,
// } from '@angular/material/dialog';

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
        // MatDialogModule,
        MatCardModule,
        MatSnackBarModule,
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
        // MatDialogModule,
        MatCardModule,
    ],
    // providers: [MatDialogRef]
})

export class MaterialModule {}