import { Component } from '@angular/core';
import { NavController, Platform, NavParams, ViewController, LoadingController } from 'ionic-angular';
import { ApiAuthService } from '../../services/apiAuthService';
import { ApiHttpPublicService } from '../../services/apiHttpPublicServices';

@Component({
  selector: 'page-dynamic-card-social',
  templateUrl: 'dynamic-card-social.html'
})
export class DynamicCardSocialPage {

  dynamicCards: any; 
  dynamicCardsOrigin: any;
  callback: any; 
  step: any;  
  parent:any;
  
  isSearch: boolean = false;
  searchString: string = '';
  shouldShowCancel: boolean = false;

  isMobile: boolean = false;

  constructor(  private platform: Platform
              , private authService: ApiAuthService
              , private pubService: ApiHttpPublicService
              , private viewCtrl: ViewController
              , private navCtrl: NavController
              , private loadingCtrl: LoadingController
              , private navParams: NavParams
             ) {}

  ngOnInit(){

    this.dynamicCardsOrigin = this.navParams.get("list") ? this.navParams.get("list") : this.pubService.getDemoCard();
    this.refresh();
    
    this.callback = this.navParams.get("callback");
    this.step = this.navParams.get("step");
    this.parent = this.navParams.get("parent");
    let call_waiting_data = this.navParams.get("call_waiting_data");
    
    if (call_waiting_data){
      call_waiting_data()
      .then(list=>{
        this.refresh(list);
      })
    }
  }

  refresh(newList?:any){
    if (newList) this.dynamicCardsOrigin = newList;
    this.isMobile = (this.platform.platforms()[0]==='mobile');
    this.dynamicCards = this.dynamicCardsOrigin;

    console.log('cards', this.dynamicCardsOrigin);
  }

  //Su dung search
  //---------------------
  goSearch(){
    this.isSearch = true;
  }

  searchEnter(){
    this.isSearch = false;
  }

  onInput(e){
    console.log(this.searchString);
  }


  onClickMedia(idx,item){

    console.log(idx,item);

    let viewItems = [];
    let itemDetail:any = {
                          short_detail: item.short_detail
                          , results: item.results
                          , actions: item.actions
                          , content:{title: item.title, note: item.note}

                        };

    let paragraphs = [];

    item.medias.forEach(el=>{
      paragraphs.push({
                  h1: el.h1
                  ,h2: el.h2
                  ,p: el.p
                  ,medias: [el]
      })
    });

    itemDetail.content.paragraphs = paragraphs;

    viewItems.push(itemDetail);

    let btn = {next:"NEXT"
              ,next_data:{
                  data:{
                        title: "Tin chi tiết"
                        , buttons: [
                            {color:"primary", icon:"close", next:"CLOSE"}
                          ]
                        , items: viewItems
                        }
              }
        }

    this.processCommand(btn); 
  }

  onClickHeader(btn){
    console.log(btn);
    this.processCommand(btn); 
  }
  
  onClickShortDetails(btn,item){
    console.log(btn, item);
    this.processCommand(btn); 
  }

  onClickActions(btn,item){
    console.log(btn, item);
    this.processCommand(btn); 
  }

  processCommand(btn){

    if (btn.url){
      if (btn.method==='GET'){
        let loading = this.loadingCtrl.create({
          content: 'Đang xử lý dữ liệu từ máy chủ ....'
        });
        loading.present();

        let httpOptions;
        if (btn.next === 'FILE') httpOptions = {'responseType'  : 'blob' as 'json'}
        this.pubService.getDynamicForm(btn.url,httpOptions)
        .then(data=>{
          //console.log(data);
          loading.dismiss();

          btn.next_data = {
            step: this.step,
            data: data,
            next: btn.next,
            item: btn.item
          }
          this.next(btn);

        })
        .catch(err=>{
          console.log('err getDynamicForm',err);
          loading.dismiss();
        })
      } else {
        this.next(btn);
      }

    } else {
      console.log('do nothing',btn);
      this.next(btn);
    }
  }

  next(btn) {

    if (btn) {
      if (btn.next == 'EXIT') {
        this.platform.exitApp();
      } else if (btn.next == 'REFRESH') {
        this.refresh(btn.next_data);
      } else if (btn.next == 'CLOSE') {
        try { this.viewCtrl.dismiss(btn.next_data) } catch (e) { }
      } else if (btn.next == 'BACK') {
        try { this.navCtrl.pop() } catch (e) { }
      } else if (
        btn.next == 'ADD' 
      || btn.next == 'SETTINGS' 
      || btn.next == 'FRIENDS' 
      || btn.next == 'NOTIFY' 
      || btn.next == 'LIKE' 
      || btn.next == 'COMMENT' 
      || btn.next == 'SHARE' 
      || btn.next == 'MORE' ) {
        if (this.callback) {
          this.callback(btn.next_data)
            .then(nextStep => this.next(nextStep));
        }
      } else if (btn.next == 'NEXT' && btn.next_data && btn.next_data.data) {
        btn.next_data.callback = this.callback; //gan lai cac function object
        btn.next_data.parent = this.parent;     //gan lai cac function object
        btn.next_data.form = btn.next_data.data; //gan du lieu tra ve tu server
        this.navCtrl.push(DynamicCardSocialPage, btn.next_data);
      }
    }
  }

}
