import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';

// Material modules
import { MaterialModule } from './material.module';

import {CdkTableModule} from '@angular/cdk/table';

// Page components
import { BluraysComponent } from './pages/blurays/blurays.component';

import { FlexLayoutModule } from '@angular/flex-layout';

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

// Firebase UI
import { NgxAuthFirebaseUIModule } from 'ngx-auth-firebaseui';
import { tryParse } from 'selenium-webdriver/http';

@NgModule({
  declarations: [
    AppComponent,
    BluraysComponent,
    LoginComponent,
    RegisterComponent,
    UserComponent
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
    NgxAuthFirebaseUIModule.forRoot(
            {
            apiKey: environment.firebase.apiKey,
            authDomain: environment.firebase.authDomain,
            projectId: environment.firebase.projectId
            },
            () => 'Film Database',
            {
              enableFirestoreSync: true,
              toastMessageOnAuthSuccess: false,
              toastMessageOnAuthError: false
            })
  ],
  providers: [AuthService, UserService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
