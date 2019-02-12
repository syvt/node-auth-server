import { Component, ViewChild } from '@angular/core';
import { MenuController, Nav, Events, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { ApiAuthService } from '../services/apiAuthService';
import { ApiStorageService } from '../services/apiStorageService';
import { LoginPage } from '../pages/login/login';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) navCtrl: Nav;

  rootPage:any;
  isWeb: boolean = false; //cua thiet bi
  isLogin:boolean = false;
  user:any;   //ghi login
  rooms:any; // ghi menu
  //public static token;

  constructor(private platform: Platform, 
              private statusBar: StatusBar, 
              private events: Events,
              private menuCtrl: MenuController,
              private apiStorageService: ApiStorageService,
              private apiService: ApiAuthService,
              private splashScreen: SplashScreen
            ) {
  }

  ngOnInit() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      if (  this.platform.is('mobileweb') 
         || this.platform.platforms()[0] == 'core'){
        //version web
        this.isWeb = true;
      }
      this.viewDidLoad();
    });
  }

  viewDidLoad() {
    this.rootPage = LoginPage;
  }
  

}

