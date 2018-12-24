import { Component, ViewChild } from '@angular/core';
import { MenuController, Nav, Events, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';

import { ApiAuthService } from '../services/apiAuthService';
import { ApiStorageService } from '../services/apiStorageService';

import chatConfig from '../assets/chat/chat-config';
import Log from '../assets/log/log-debug';


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
  
  //sau khi login xong 
  //trang login se cho biet user va token
  setUserInfo(data){
    if (data&&data.token&&data.user){
      this.isLogin = true;
      this.user = data.user;
      //MyApp.token = data.token; 

    }else{
      this.isLogin = false;
      this.user = null;
    }
  }

  viewDidLoad() {

    this.rootPage = LoginPage;

     //khoi tao public key
     this.apiService.getServerPublicRSAKey()
     .then(pk => {})
     .catch(err=>{})

    //kiem tra token da cap chua neu co thi lay user
    if (this.apiStorageService.getToken()){
      //yeu cau server xac thuc neu dung thi da login, sai thi bo qua
      this.apiService.authorize(this.apiStorageService.getToken())
      .then(status=>{
        if (status){
          this.isLogin = true;
          this.user = this.apiService.getUserInfo();
        }
      });
    }

    
    this.events.subscribe(chatConfig.event_register_room, ((rooms) => {
      Log.put('App rooms: ', rooms);
      this.rooms = rooms;
    }));
    
    this.events.subscribe(chatConfig.event_logout, ((data) => {
      Log.put('App logout: ', data);
      this.user = null;
      this.rooms = null;
      this.isLogin = false;
      this.rootPage = LoginPage;
    }));

    this.events.subscribe(chatConfig.event_login, ((data) => {
      Log.put('App login: ', data);
      this.setUserInfo(data);
    }));
    
  }
  
  /**
   * Mo mot room ra de chatting
   * @param room 
   */
  openRoom(room){
    Log.put('App open room: ', room);
    this.events.publish(chatConfig.event_change_room,room);
    this.menuCtrl.close();
  }
  
  
  callSettings(){
    Log.put('App call setting: ');
    this.events.publish(chatConfig.event_chat_setting);
    this.menuCtrl.close();
  }

  goSearch(){
    this.events.publish(chatConfig.event_chat_search);
    this.menuCtrl.close();
  }

  callAddGroup(){
    this.events.publish(chatConfig.event_chat_add_group);
    this.menuCtrl.close();
  }

  openMenu() {
    this.menuCtrl.open();
  }
 
  closeMenu() {
    this.menuCtrl.close();
  }
 
  toggleMenu() {
    this.menuCtrl.toggle();
  }

}

