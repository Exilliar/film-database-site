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

import { CoreModule } from './core/core.module';

// General components
import { AddFilmDialogComponent } from './components/add-film-dialog/add-film-dialog.component';

// Firebase authentication
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';

import { AuthGuard } from './auth/guard/auth.guard';
import { AuthService } from './auth/service/auth.service';
import { UserService } from './auth/user/user.service';

// Forms
import { ReactiveFormsModule } from '@angular/forms';
import { UserComponent } from './pages/user/user.component';
import { FormsModule } from '@angular/forms';

import {
  MatDialogModule,
} from '@angular/material/dialog';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { HeaderComponent } from './components/header/header.component';


@NgModule({
  declarations: [
    AppComponent,
    BluraysComponent,
    LoginComponent,
    RegisterComponent,
    UserComponent,
    AddFilmDialogComponent,
    PageNotFoundComponent,
    HeaderComponent
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
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    CoreModule,
  ],
  providers: [AuthService, UserService, AuthGuard],
  bootstrap: [AppComponent],
  entryComponents: [AddFilmDialogComponent],
})
export class AppModule { }
