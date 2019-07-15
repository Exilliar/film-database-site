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
} from '@angular/material';
// import { MatButtonToggleModule } from '@angular/material/button-toggle';

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
        MatSlideToggleModule,
        MatSelectModule,
        // MatButtonToggleModule,
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
        MatSnackBarModule,
        MatSlideToggleModule,
        MatSelectModule,
    ],
    // providers: [MatDialogRef]
})

export class MaterialModule {}