import { Component } from '@angular/core';
import { NavController, ModalController, Platform, LoadingController, AlertController } from 'ionic-angular';

import { DynamicFormMobilePage } from '../dynamic-form-mobile/dynamic-form-mobile';
import { ApiHttpPublicService } from '../../services/apiHttpPublicServices';
import { DynamicFormWebPage } from '../dynamic-form-web/dynamic-form-web';
import { TabsPage } from '../tabs/tabs';
import { ApiStorageService } from '../../services/apiStorageService';
import { ApiResourceService } from '../../services/apiResourceServices';
import { ApiAuthService } from '../../services/apiAuthService';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  
  constructor(private navCtrl: NavController
            , private pubService: ApiHttpPublicService
            , private auth : ApiAuthService
            , private resources : ApiResourceService
            , private apiStorageService: ApiStorageService
            , private platform: Platform
            , private modalCtrl: ModalController
            , private loadingCtrl: LoadingController
            , private alertCtrl: AlertController
              ) {}

  ngOnInit(){
    
    //console.log('2. ngOnInit Home');
    //hien thi kieu popup info -- dissmiss
    //this.openModal(data);

    if (this.apiStorageService.getToken()){

      let loading = this.loadingCtrl.create({
        content: 'Đang kiểm tra xác thực ....'
      });
      loading.present();

      this.auth.authorize
      (this.apiStorageService.getToken())
      .then(status=>{

        loading.dismiss();

          this.auth.getServerPublicRSAKey()
          .then(pk => {
            
            let userInfo = this.auth.getUserInfo();
            
            console.log('Save token user', userInfo);
            
            //kiem tra token chua khai nickname, va image thi phai nhay vao slide khai thong tin
            if (
              userInfo
              // &&userInfo.image
              // &&userInfo.nickname
              )
            //cho phep truy cap thi gui token kem theo
            this.auth.injectToken(); //Tiêm token cho các phiên làm việc lấy số liệu cần xác thực

            this.navCtrl.setRoot(TabsPage);

          })
          .catch(err=>{
            console.log('Public key err', err);
          });

      })
      .catch(err=>{
        loading.dismiss();
        //console.log('Token invalid: ', err);
        this.auth.deleteToken();
      });
    }

  }

  ionViewDidLoad() {
    //console.log('3. ionViewDidLoad Home');

    this.pubService.getDataForm('form-phone.json')
      .then(data=>{
    if (this.platform.platforms()[0] === 'core'){
      
          setTimeout(()=>{
            this.navCtrl.push(DynamicFormWebPage
              ,{
              that: this, //bind this for call
              callback: this.callbackFunction,
              step: 'form-phone',
              form: data
              });
          },1000);
      
    }else{

          this.navCtrl.push(DynamicFormMobilePage
            ,{
            parent: this, //bind this for call
            callback: this.callbackFunction,
            step: 'form-phone',
            form: data
            });

    }
  })
  .catch(err=> console.log("err ngOnInit()",err)) 
  }


   /**
    *  ham goi lai gui ket qua new button next
    * 
    * @param that chinh la this cua parent callback
    * @param res 
    */
  callbackFunction(that,res?:{step?:string,data?:any,error?:any}){
    
    return new Promise((resolve, reject) => {

      //console.log('parent:',that);
      //console.log('this:',this);

      if (res&&res.error&&res.error.error){
        //console.log('callback error:', res.error.error);
        that.presentAlert('Lỗi:<br>' + JSON.stringify(res.error.error.error));
        resolve();
      } else if (res&&res.step==='form-phone'&&res.data){
        console.log('forward data:', res.data.database_out);
        if (res.data.database_out&&res.data.database_out.status===0){
           that.presentAlert('Chú ý:<br>' + JSON.stringify(res.data.database_out.message));
        }
        //gui nhu mot button forward
        resolve({
          next:"NEXT" //mo form tiep theo
          , next_data:{
            step: 'form-key',
            data: //new form 
                  {
                    items: [
                      { name: "Nhập mã OTP",type: "title"}
                      , { key: "key", name: "Mã OTP", hint: "Nhập mã OTP gửi đến điện thoại",type: "text", input_type: "text", validators: [{ required: true, min: 6, max: 6, pattern: "^[0-9A-Z]*$" }]}
                      , { type: "button"
                        , options: [
                            { name: "Trở về", next: "BACK"}
                            , { name: "Xác nhận OTP", next: "CALLBACK", url: "https://c3.mobifone.vn/api/ext-auth/confirm-key", token: res.data.token}
                        ]
                      }]
                }
          }
        });
      } else if (res&&res.step==='form-key'&&res.data.token){
        //lay duoc token
        //ktra token co user, image thi pass new ko thi gui ...
        console.log('token verified:', res.data.token);
        // neu nhu gai quyet xong
        let loading = that.loadingCtrl.create({
          content: 'Đang xử lý dữ liệu từ máy chủ ....'
        });
        loading.present();

        that.resources.authorizeFromResource(res.data.token)
        .then(login=>{
          console.log('data',login);
          if (login.status
            &&login.user_info
            &&login.token
            ){
              that.apiStorageService.saveToken(res.data.token);
              that.navCtrl.setRoot(TabsPage);
          }else{
            that.presentAlert('Dữ liệu xác thực không đúng <br>' + JSON.stringify(login))
          }

          loading.dismiss();
          resolve();
        })
        .catch(err=>{
          console.log('err',err);
          that.presentAlert('Lỗi xác thực - authorizeFromResource')
          loading.dismiss();
          resolve();
        })
      } else {
        resolve();
      }
      
    });
  }

  openModal(data) {
    let modal = this.modalCtrl.create(DynamicFormMobilePage, data);
    modal.present();
  }

  presentAlert(msg) {
    let alert = this.alertCtrl.create({
      title: 'For Administrator',
      subTitle: msg,
      buttons: ['Dismiss']
    }).present();
  }

}
