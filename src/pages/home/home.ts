import { Component } from '@angular/core';
import { NavController, ModalController, Platform, LoadingController, AlertController } from 'ionic-angular';

import { DynamicFormMobilePage } from '../dynamic-form-mobile/dynamic-form-mobile';
import { ApiHttpPublicService } from '../../services/apiHttpPublicServices';
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
              ) {
                //console.log('1. Constructor Home');
              }

  ngOnInit(){
    //console.log('2. ngOnInit Home');
    
  }

  ionViewDidLoad() {
    //console.log('3. ionViewDidLoad Home');

  }


   /**
    *  ham goi lai gui ket qua new button next
    * 
    * @param that chinh la this cua parent callback
    * @param res 
    */
  callbackFunction(this,res?:{step?:string,data?:any,error?:any}){
    
    return new Promise((resolve, reject) => {

      console.log('parent:',this);

      resolve();
    
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
