import { Component, } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Platform, NavParams, ViewController, NavController, LoadingController } from 'ionic-angular';
import { ApiHttpPublicService } from '../../services/apiHttpPublicServices';
import { ApiAuthService } from '../../services/apiAuthService';

@Component({
  selector: 'page-dynamic-form-web',
  templateUrl: 'dynamic-form-web.html',
})
export class DynamicFormWebPage {

  dynamicForm: any;
  initValues = [];
  callback: any; // ham goi lai khai bao o trang root gui (neu co)
  step: any;     // buoc thuc hien xuat phat trang root goi (neu co)
  parent:any;    // Noi goi this

  password_type: string = 'password';
  eye: string = "eye";



  constructor(private platform: Platform
    , private authService: ApiAuthService
    , private pubService: ApiHttpPublicService
    , private viewCtrl: ViewController
    , private navCtrl: NavController
    , private loadingCtrl: LoadingController
    , private navParams: NavParams
  ) { }

  ngOnInit() {

    this.dynamicForm = this.navParams.get("form") ? this.navParams.get("form") : this.pubService.getDemoForm();

    if (this.dynamicForm.items) {
      this.dynamicForm.items.forEach((el, idx) => {
        this.initValues.push({
          idx: idx,
          value: el.value
        })
      })
    }

    this.callback = this.navParams.get("callback");
    this.step = this.navParams.get("step");
    this.parent = this.navParams.get("parent");

  }

  resetForm() {
    if (this.dynamicForm.items) {
      this.dynamicForm.items.forEach((el, idx) => {
        if (el.value !== undefined) {
          if (this.initValues.find(x => x.idx == idx).value === undefined) {
            el.value = '';
          } else {
            el.value = this.initValues.find(x => x.idx == idx).value;
          }
        }
      })
    }
  }

  // btn ẩn hiện mật khẩu
  togglePasswordMode() {
    this.eye = this.eye === 'eye' ? 'eye-off' : 'eye';
    this.password_type = this.password_type === 'text' ? 'password' : 'text';
  }

  // Xử lý sự kiện click button theo id
  onClick(btn) {

    //console.log('command', btn.url, btn.command);
    
    let valid = false;
    let results = []; //id,value
    let keyResults = {}; //{key:value}

    //chi nhung action xu ly du lieu form moi check
    if (
      btn.next === 'CALLBACK'
      || btn.next === 'NEXT'
    ) {
      this.dynamicForm.items.some(el => {
        let validatorFns = [];
        if (el.validators) {
          el.validators.forEach(req => {
            if (req.required) validatorFns.push(Validators.required);
            if (req.min) validatorFns.push(Validators.minLength(req.min));
            if (req.max) validatorFns.push(Validators.maxLength(req.max));
            if (req.pattern) validatorFns.push(Validators.pattern(req.pattern));
          })
        }
        let control = new FormControl(el.value, validatorFns);
        el.invalid = control.invalid;
        valid = !el.invalid;

        if (valid
          && el.key
          && el.value
        ) {
          Object.defineProperty(keyResults, el.key, { value: el.value, writable: false, enumerable: true });
        } else if (valid
          && el.id
          && el.value
          && el.type !== "title"
          && el.type !== "image"
          && el.type !== "avatar"
          && el.type !== "button"
        ) {
          results.push({
            id: el.id,
            value: el.value
          })
        }
        //console.log(el.name, el.id, el.value, 'control:', control.invalid, control.valid);
        return el.invalid;
      });
    }else{
      this.next(btn);
      return;
    }

    if (valid) {

      if (btn.url) {

        if (btn.token && keyResults) {

          let loading = this.loadingCtrl.create({
            content: 'Đang xử lý dữ liệu từ máy chủ ....'
          });
          loading.present();

          this.authService.postDynamicForm(btn.url, keyResults, btn.token)
            .then(data => {
              //console.log('data --> next', data, btn.next);
              btn.next_data = {
                step: this.step,
                data: data
              }
              this.next(btn);
              loading.dismiss();
            })
            .catch(err => {
              //console.log('err', err);
              btn.next_data = {
                step: this.step,
                error: err
              }
              this.next(btn);
              loading.dismiss();
            });

        } else if (keyResults) {

          let loading = this.loadingCtrl.create({
            content: 'Đang xử lý dữ liệu từ máy chủ ....'
          });
          loading.present();

          this.pubService.postDynamicForm(btn.url, keyResults)
            .then(data => {
              //console.log('data --> next', data, btn.next);
              btn.next_data = {
                step: this.step,
                data: data
              }
              this.next(btn);
              loading.dismiss();
            })
            .catch(err => {
              //console.log('err', err);
              btn.next_data = {
                step: this.step,
                error: err
              }
              this.next(btn);
              loading.dismiss();
            });

        }

      } else {

        btn.next_data = {
          step: this.step,
          data: keyResults
        }
        this.next(btn);

      }

    } else {
      //console.log('Form Invalid!');
    }

  }

  next(btn) {

    if (btn) {
      if (btn.next == 'EXIT') {
        this.platform.exitApp();
      } else if (btn.next == 'RESET') {
        this.resetForm();
      } else if (btn.next == 'CLOSE') {
        try{this.viewCtrl.dismiss(btn.next_data)}catch(e){}
      } else if (btn.next == 'BACK') {
        try{this.navCtrl.pop()}catch(e){}
        //if (this.navCtrl.length() > 1) this.navCtrl.pop();      //goback 1 step
      } else if (btn.next == 'CALLBACK') {
        if (this.callback) {
          this.callback(this.parent,btn.next_data)
            .then(nextStep => this.next(nextStep));
        } else {
          try{this.navCtrl.pop()}catch(e){}
        }
      } else if (btn.next == 'NEXT' && btn.next_data && btn.next_data.data) {
        btn.next_data.callback = this.callback; //gan lai cac function object
        btn.next_data.parent = this.parent;     //gan lai cac function object
        btn.next_data.form = btn.next_data.data; //gan du lieu tra ve tu server
        this.navCtrl.push(DynamicFormWebPage, btn.next_data);
      }
    }

  }

}
