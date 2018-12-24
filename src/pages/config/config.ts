import { Component } from '@angular/core';
import { NavController, Events, ToastController } from 'ionic-angular';
import { SampleIconsPage } from '../sample-icons/sample-icons';

import { ApiAuthService } from '../../services/apiAuthService';
import { ApiStorageService } from '../../services/apiStorageService';

import Log from '../../assets/log/log-debug';

@Component({
  selector: 'page-config',
  templateUrl: 'config.html'
})

export class ConfigPage {
  
  constructor(private navCtrl: NavController, 
              private apiStorageService: ApiStorageService,
              private apiService: ApiAuthService,
              private events: Events,
              private toastCtrl: ToastController) {}

  ngOnInit() {    
   
  }

  reset(){
    location.href= '/';
  }

  selectIcon(){
    this.navCtrl.push(SampleIconsPage);
  }

  callSendLog(){
    Log.put('TEST');
    Log.print();
  }

  callLogout() {
    this.apiService.logout()
    .then(d=>{
      this.reset();
    })
    .catch(e=>{});
  }
}