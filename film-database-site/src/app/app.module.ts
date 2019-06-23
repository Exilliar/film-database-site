import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';

// Material modules
import { MaterialModule } from './material.module';

import {CdkTableModule} from '@angular/cdk/table';

// Page components
import { BluraysComponent } from './pages/blurays/blurays.component';

import { FlexLayoutModule } from '@angular/flex-layout';

// General components
import { AddFilmDialogComponent } from './components/add-film-dialog/add-film-dialog.component';

// Firebase authentication
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';

import { AuthGuard } from './auth/auth.guard';
import { AuthService } from './auth/auth.service';
import { UserService } from './auth/user.service';

// Forms
import { ReactiveFormsModule } from '@angular/forms';
import { UserComponent } from './pages/user/user.component';
import { FormsModule } from '@angular/forms';

import {
  MatDialogModule,
} from '@angular/material/dialog';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';


@NgModule({
  declarations: [
    AppComponent,
    BluraysComponent,
    LoginComponent,
    RegisterComponent,
    UserComponent,
    AddFilmDialogComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CdkTableModule,
    HttpClientModule,
    MaterialModule,
    FlexLayoutModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features
    ReactiveFormsModule,
    FormsModule,
    HttpModule,
    MatDialogModule,
  ],
  providers: [AuthService, UserService, AuthGuard,/* AddFilmDialogComponent, {provide: MatDialogRef, useValue: {}}*/],
  bootstrap: [AppComponent],
  entryComponents: [AddFilmDialogComponent],
})
export class AppModule { }
