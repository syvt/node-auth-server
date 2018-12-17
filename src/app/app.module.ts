import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpClientModule } from '@angular/common/http';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { SettingPage } from '../pages/setting/setting';


import { StorageServiceModule } from 'angular-webstorage-service';
import { ApiStorageService } from '../services/apiStorageService';

import { ApiAuthService } from '../services/apiAuthService';
import { ApiImageService } from '../services/apiImageService';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { RequestInterceptor } from '../interceptors/requestInterceptor';
import { ResponseInterceptor } from '../interceptors/responseInterceptor';

import { SocketIoModule, SocketIoConfig } from 'ng-socket-io';
//const socketIOConfig: SocketIoConfig = { url: 'http://localhost:9235', options: {} };
const socketIOConfigOnline: SocketIoConfig = { url: 'http://localhost:9235/app-online', options: {} };

@NgModule({
  declarations: [
    MyApp,
    RegisterPage,
    LoginPage,
    SettingPage
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    StorageServiceModule,
    IonicModule.forRoot(MyApp),
    //SocketIoModule.forRoot(socketIOConfig),
    SocketIoModule.forRoot(socketIOConfigOnline)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    RegisterPage,
    LoginPage,
    SettingPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ApiAuthService,
    ApiImageService,
    ApiStorageService,
    RequestInterceptor,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ResponseInterceptor,
      multi: true
    },
    {
      provide: ErrorHandler, 
      useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
