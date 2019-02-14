import { Component, } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Platform, NavParams, ViewController, NavController, LoadingController } from 'ionic-angular';
import { ApiHttpPublicService } from '../../services/apiHttpPublicServices';
import { ApiAuthService } from '../../services/apiAuthService';

@Component({
  selector: 'page-dynamic-form-mobile',
  templateUrl: 'dynamic-form-mobile.html',
})
export class DynamicFormMobilePage {

  dynamicForm: any = {
    title: "Đăng ký"
    , items: [
      {        name: "Thông tin cá nhân avatar", hint: "Avatar", type: "avatar", url: "https://www.w3schools.com/howto/img_forest.jpg" }
      , { id: 1, name: "Check hay không chọn?", type: "check", value: true }
      , { id: 2, name: "Thanh Trượt", type: "range", value: 50, min: 0, max: 100 }
      , { id: 3, name: "Chọn hay không chọn Toggle?", icon: "plane", type: "toggle" }
      , { id: 4, name: "Chọn radio cái nào", type: "radio", icon: "plane", value: 2, options: [{ name: "Tùy chọn 1", value: 1 }, { name: "Tùy chọn 2", value: 2 }] }
      , { id: 5, name: "Chọn 1 cái nào", type: "select", value: 2, options: [{ name: "Tùy chọn 1", value: 1 }, { name: "Tùy chọn 2", value: 2 }] }
      , { id: 6, name: "Chọn nhiều cái nào", type: "select_multiple", value: 2, options: [{ name: "Tùy chọn 1", value: 1 }, { name: "Tùy chọn 2", value: 2 }] }
      , {        name: "Ảnh cá nhân", hint: "image viewer", type: "image", url: "https://www.w3schools.com/howto/img_forest.jpg" }
      , { id: 8, key: "username", name: "username", hint: "Số điện thoại di động 9 số bỏ số 0 ở đầu", type: "text", input_type: "userName", icon: "information-circle", validators: [{ required: true, min: 9, max: 9, pattern: "^[0-9]*$" }]}
      , { id: 9, key: "password", name: "password", hint: "Mật khẩu phải có chữ hoa, chữ thường, ký tự đặc biệt, số", type: "password", input_type: "password", icon: "information-circle", validators: [{ required: true, min: 6, max: 20}]}
      , { id: 10, name: "Họ và tên", type: "text", input_type: "text", icon: "person" }
      , { id: 11, name: "Điện thoại", hint: "Yêu cầu định dạng số điện thoại nhé", type: "text", input_type: "tel", icon: "call", validators: [{ pattern: "^[0-9]*$" }]}
      , { id: 12, name: "email", hint: "Yêu cầu định dạng email nhé", type: "text", input_type: "email", icon: "mail", validators: [{ pattern: "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" }]}
      , { id: 13, name: "Ngày bắt đầu", hint: "Chọn ngày", type: "datetime", display:"DD/MM/YYYY", picker:"DD MM YYYY"}
      , { id: 14, name: "Thời gian bắt đầu", hint: "Chọn thời gian", type: "datetime", display:"HH:mm:ss", picker:"HH:mm:ss"}
      , { id: 15, name: "Nội dung nhập", hint: "Nhập nhiều dòng", type: "text_area"}
      , {          name: "Thông tin cá nhân", type: "title"}
      , { type:"details",
          details: [
              {
              name:"Mã khách hàng",
              value: "R012234949883"
              },
              {
              name:"Tên khách hàng",
              value: "Nguyễn Văn B"
              },
              {
              name:"Địa chỉ",
              value: "263 Nguyễn Văn Linh, Đà nẵng, Việt Nam"
              },
              {
              name:"Hình thức thanh toán",
              value: "Tiền mặt"
              },
          ]
       }
      , 
      { 
          type: "button"
        , options: [
          { name: "Reset", next: "RESET" }
          , { name: "Exit", next: "EXIT" }
          , { name: "Close", next: "CLOSE" }
          , { name: "Back", next: "BACK"}
          , { name: "Continue", next: "CONTINUE"}
          , { name: "Register", next: "BACK", url: "https://chonsoc3.mobifone.vn/ionic/", command: "USER_LOGIN_REDIRECT" }
          , { name: "LOGIN", next: "CONTINUE" , url: "https://chonsoc3.mobifone.vn/ionic/", command: "USER_CHECK_EXISTS", token: true }
        ]
      }]
};
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

    this.dynamicForm = this.navParams.get("form") ? this.navParams.get("form") : this.dynamicForm;

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
            content: 'Đang xử lý dữ liệu từ máy chủ token....'
          });
          loading.present();

          this.authService.postDynamicForm(btn.url, keyResults, btn.token)
            .then(data => {
              btn.next_data = {
                step: this.step,
                data: data
              }
              console.log('data token --> next btn', btn);
              this.next(btn);
              loading.dismiss();
            })
            .catch(err => {
              console.log('err token', err);
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
              console.log('data --> next', data, btn.next);
              btn.next_data = {
                step: this.step,
                data: data
              }
              this.next(btn);
              loading.dismiss();
            })
            .catch(err => {
              console.log('err', err);
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
          button: btn, //chuyen dieu khien nut cho ben ngoai
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
        try { this.viewCtrl.dismiss(btn.next_data) } catch (e) { }
      } else if (btn.next == 'BACK') {
        try { this.navCtrl.pop() } catch (e) { }
      } else if (btn.next == 'CALLBACK') {
        //console.log(btn,this.callback);
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
        this.navCtrl.push(DynamicFormMobilePage, btn.next_data);
      }
    }

  }

}
