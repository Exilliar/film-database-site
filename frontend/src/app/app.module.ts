import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';

import {CdkTableModule} from '@angular/cdk/table';

import { FlexLayoutModule } from '@angular/flex-layout';

import { ServiceWorkerModule } from '@angular/service-worker';

import { environment } from '../environments/environment';

// Material modules
import { MaterialModule } from './material.module';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

// Firebase authentication
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { AuthGuard } from './core/guards/auth/auth.guard';
import { AuthService } from './core/services/authService/auth.service';
import { UserService } from './core/services/userService/user.service';

// Forms
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

// Services
import { ThemeService } from './core/services/theme/theme.service';

// Components
import { AddFilmDialogComponent } from './core/components/add-film-dialog/add-film-dialog.component';
import { HeaderComponent } from './core/components/header/header.component';
import { PageNotFoundComponent } from './core/components/page-not-found/page-not-found.component';


@NgModule({
  declarations: [
    AppComponent,
    AddFilmDialogComponent,
    PageNotFoundComponent,
    HeaderComponent,
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
    BrowserAnimationsModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
  ],
  providers: [AuthService, UserService, AuthGuard, ThemeService],
  bootstrap: [AppComponent],
  entryComponents: [AddFilmDialogComponent],
})
export class AppModule { }
