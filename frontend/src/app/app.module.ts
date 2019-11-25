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

// Firebase authentication
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { AuthGuard } from './auth/guard/auth.guard';
import { AuthService } from './auth/authService/auth.service';
import { UserService } from './auth/userService/user.service';

// Forms
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

// Services
import { ThemeService } from './services/theme/theme.service';

// Charts
import { FusionChartsModule } from 'angular-fusioncharts';
import * as FusionCharts from 'fusioncharts';
import * as Charts from 'fusioncharts/fusioncharts.charts';

FusionChartsModule.fcRoot(FusionCharts, Charts);

import { NgxChartsModule } from '@swimlane/ngx-charts';

// Components
import { AddFilmDialogComponent } from './components/add-film-dialog/add-film-dialog.component';
import { BluraysComponent } from './pages/blurays/blurays.component';
import { HeaderComponent } from './components/header/header.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { GraphsComponent } from './pages/graphs/graphs.component';


@NgModule({
  declarations: [
    AppComponent,
    BluraysComponent,
    LoginComponent,
    RegisterComponent,
    AddFilmDialogComponent,
    PageNotFoundComponent,
    HeaderComponent,
    GraphsComponent
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
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    FusionChartsModule,
    NgxChartsModule
  ],
  providers: [AuthService, UserService, AuthGuard, ThemeService],
  bootstrap: [AppComponent],
  entryComponents: [AddFilmDialogComponent],
})
export class AppModule { }
