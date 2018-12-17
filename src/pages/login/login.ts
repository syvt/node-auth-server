import { Component } from '@angular/core';
import { NavController, Events, LoadingController, ToastController } from 'ionic-angular';
import { FormGroup, FormBuilder } from '@angular/forms';
import { RegisterPage } from '../register/register';
import { SettingPage } from '../setting/setting';
import { ApiAuthService } from '../../services/apiAuthService';
import { ApiStorageService } from '../../services/apiStorageService';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  public myFromGroup: FormGroup;
  public isImageViewer: boolean = false;
  public resourceImages: { imageViewer: any, file: any, name: string }[] = [];
  public serverKeyPublic: any; //PUBLIC_KEY
  public serverTokenUserInfo: any;  //token for login ok
  public isShowInfo: boolean = false;

  constructor(public navCtrl: NavController,
    private formBuilder: FormBuilder,
    private loadingCtrl: LoadingController,
    private apiStorageService: ApiStorageService,
    private toastCtrl: ToastController,
    private events: Events,
    private apiService: ApiAuthService) { }

  ngOnInit() {
    this.reset();
  }


  reset(){

    if (this.apiStorageService.getToken()){
      this.apiService.pushToken(this.apiStorageService.getToken());
    }

    this.apiService.getServerPublicRSAKey()
      .then(pk => {
        this.serverKeyPublic = pk;
        this.serverTokenUserInfo = this.apiService.getUserInfo();
        if (this.serverTokenUserInfo){
          this.isShowInfo=true; //da login truoc do roi nhe
        }else{
          this.isShowInfo=false;
        }

      })
      .catch(err => {
        console.log('err get Public Key:')
        console.log(err)
      });

    this.myFromGroup = this.formBuilder.group({
      user: 'cuongdq',
      pass: '123'
    });
  }

  onSubmit() {
    var passEncrypted = '';
    try {
      passEncrypted = this.serverKeyPublic.encrypt(this.myFromGroup.get('pass').value, 'base64', 'utf8');

      var formData: FormData = new FormData();
      formData.append("username", this.myFromGroup.get('user').value);
      formData.append("password", passEncrypted);

      //gui lenh login 
      let loading = this.loadingCtrl.create({
        content: 'Saving user info...'
      });
      loading.present();

      this.apiService.login(formData)
        .then(token => {
          if (token) {

            this.serverTokenUserInfo = this.apiService.getUserInfo();
            this.isShowInfo = true;
            //luu vao may de phien sau su dung khong can login
            this.apiStorageService.saveToken(token);

            loading.dismiss();

            this.toastCtrl.create({
              message: "Thank you "+ this.serverTokenUserInfo.username+" and welcome to our system",
              duration: 3000,
              position: 'middle'
            }).present();

            //chuyen su kien login ve parent
            this.events.publish('listenLogin',{ 
                                                user:this.apiService.getUserInfo(),
                                                token: this.apiStorageService.getToken() 
                                              });

          } else {
            throw 'No Token after login!'
          }
        })
        .catch(err => {
          loading.dismiss();
          
          console.log(err);          
          //error 
          this.toastCtrl.create({
            message: "Check again username & password!",
            duration: 5000,
            position: 'bottom'
          }).present();

        }
        );

    } catch (err) {
      console.log(err);
    }

  }

  callRegister() {
    this.navCtrl.push(RegisterPage);
  }

  callLogout() {
    this.apiService.logout()
    .then(d=>{
      this.reset();
    })
    .catch(e=>{});
  }

  callEdit() {
    this.apiService.getEdit()
      .then(user => {
        this.navCtrl.push(SettingPage);
      })
      .catch(err => {
        this.toastCtrl.create({
          message: "err get API: : " + JSON.stringify(err),
          duration: 5000,
          position: 'bottom'
        }).present();
      });
  }

  callChat(){
    this.navCtrl.setRoot('ChatRoomPage', { 
                                        user:this.apiService.getUserInfo(),
                                        token: this.apiStorageService.getToken() 
                                      });
  }
}
