import { Component, ViewChild } from '@angular/core';
import { Nav, Events, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';

import { ApiAuthService } from '../services/apiAuthService';
import { ApiStorageService } from '../services/apiStorageService';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) navCtrl: Nav;

  rootPage:any;
  isWeb: boolean = false; //cua thiet bi
  isLogin:boolean = false;
  user:any;

  constructor(private platform: Platform, 
              private statusBar: StatusBar, 
              public events: Events,
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
  
  //sau khi login xong 
  //trang login se cho biet user va token
  setUserInfo(data){
    // console.log('login xong nhan du lieu');
    // console.log(data);
    //kiem tra token da cap chua neu co thi lay user
    if (data&&data.token&&data.user){
      this.isLogin = true;
      //set user in login
      this.user = data.user;
    }else{
      this.isLogin = false;
      this.user = null;
    }
  }

  viewDidLoad() {

    this.rootPage = LoginPage;

    //kiem tra token da cap chua neu co thi lay user
    if (this.apiStorageService.getToken()){
      this.apiService.pushToken(this.apiStorageService.getToken());
      this.isLogin = true;
      //set user in login
      this.user = this.apiService.getUserInfo();
      // console.log(this.user);

    }else{
      this.isLogin = false;
       //cho login xong se lang nghe su kien login nay
      this.events.subscribe('listenLogin', ((data) => {
        this.setUserInfo(data);
      }));
    }

   

    

    //khoi tao public key
    this.apiService.getServerPublicRSAKey()
      .then(pk => {})
      .catch(err=>{})
  }

  goSearch(){

  }

  openRoom(room){

  }
}

