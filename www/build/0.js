webpackJsonp([0],{

/***/ 536:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChatRoomPageModule", function() { return ChatRoomPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__chat_room__ = __webpack_require__(537);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var ChatRoomPageModule = /** @class */ (function () {
    function ChatRoomPageModule() {
    }
    ChatRoomPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__chat_room__["a" /* ChatRoomPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__chat_room__["a" /* ChatRoomPage */]),
            ],
        })
    ], ChatRoomPageModule);
    return ChatRoomPageModule;
}());

//# sourceMappingURL=chat-room.module.js.map

/***/ }),

/***/ 537:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChatRoomPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ng_socket_io__ = __webpack_require__(162);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ng_socket_io___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_ng_socket_io__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__login_login__ = __webpack_require__(70);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var ChatRoomPage = /** @class */ (function () {
    function ChatRoomPage(navCtrl, navParams, socket, toastCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.socket = socket;
        this.toastCtrl = toastCtrl;
        this.messages = [];
        this.nickname = '';
        this.message = '';
        this.rooms = [
            {
                title: 'Noi bo',
            },
            {
                title: 'Gia dinh',
            },
        ];
        this.unreadCount = 0;
    }
    ChatRoomPage.prototype.ngOnInit = function () {
        var _this = this;
        this.user = this.navParams.get('user'); //dung de view nguoi dung len 
        this.token = this.navParams.get('token'); //dung bao mat du lieu kenh truyen
        if (!this.token) {
            this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__login_login__["a" /* LoginPage */]);
            return;
        }
        //ket noi lai session
        this.socket.connect();
        //gui token de xac thuc gan voi id
        this.socket.emit('set-user-token', this.token);
        this.getMessages().subscribe(function (message) {
            _this.messages.push(message);
        });
        this.getUsers().subscribe(function (data) {
            var user = data['user'];
            if (data['event'] === 'left') {
                _this.showToast('User left: ' + user);
            }
            else {
                _this.showToast('User joined: ' + user);
            }
        });
    };
    ChatRoomPage.prototype.openRoom = function (room) {
        //
    };
    ChatRoomPage.prototype.listUnread = function () {
    };
    ChatRoomPage.prototype.sendMessage = function () {
        this.socket.emit('add-message', { text: this.message });
        this.message = '';
    };
    ChatRoomPage.prototype.getMessages = function () {
        var _this = this;
        var observable = new __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__["Observable"](function (observer) {
            _this.socket.on('message', function (data) {
                observer.next(data);
            });
        });
        return observable;
    };
    ChatRoomPage.prototype.getUsers = function () {
        var _this = this;
        var observable = new __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__["Observable"](function (observer) {
            _this.socket.on('users-changed', function (data) {
                observer.next(data);
            });
        });
        return observable;
    };
    ChatRoomPage.prototype.ionViewWillLeave = function () {
        this.socket.disconnect();
    };
    ChatRoomPage.prototype.showToast = function (msg) {
        var toast = this.toastCtrl.create({
            message: msg,
            duration: 2000
        });
        toast.present();
    };
    ChatRoomPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-chat-room',template:/*ion-inline-start:"D:\IONIC\ionic-token-oracle-c3\src\pages\chat-rom\chat-room.html"*/'<ion-header>\n\n  <ion-navbar>\n\n          <button ion-button menuToggle color="primary">\n\n            <ion-icon name="menu"></ion-icon>\n\n          </button>\n\n          <ion-buttons start>\n\n              <img src="assets/imgs/logo.png">\n\n          </ion-buttons>\n\n          <ion-buttons end>\n\n              <button ion-button icon-only color="royal" (click)="listUnread()">\n\n                <ion-icon name="notifications" ios="ios-notifications" md="md-notifications"></ion-icon>\n\n                <ion-badge color="danger" *ngIf="unreadCount > 0">{{ unreadCount }}</ion-badge>\n\n              </button>\n\n          </ion-buttons>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content>\n\n  <ion-grid>\n\n    <ion-row *ngFor="let message of messages">\n\n      \n\n      <ion-col col-9 *ngIf="message.from !== nickname" class="message" [ngClass]="{\'my_message\': message.from === nickname, \'other_message\': message.from !== nickname}">\n\n        <span class="user_name">{{ message.from }}:</span><br>\n\n        <span>{{ message.text }}</span>\n\n        <div class="time">{{message.created | date:\'dd.MM hh:MM\'}}</div>\n\n      </ion-col>\n\n \n\n      <ion-col offset-3 col-9 *ngIf="message.from === nickname" class="message" [ngClass]="{\'my_message\': message.from === nickname, \'other_message\': message.from !== nickname}">\n\n        <span class="user_name">{{ message.from }}:</span><br>\n\n        <span>{{ message.text }}</span>\n\n        <div class="time">{{message.created | date:\'dd.MM hh:MM\'}}</div>\n\n      </ion-col>\n\n \n\n    </ion-row>\n\n  </ion-grid>\n\n \n\n</ion-content>\n\n \n\n<ion-footer>\n\n  <ion-toolbar>\n\n    <ion-row class="message_row">\n\n      <ion-col col-9>\n\n        <ion-item no-lines>\n\n          <ion-input type="text" placeholder="Message" [(ngModel)]="message"></ion-input>\n\n        </ion-item>\n\n      </ion-col>\n\n      <ion-col col-3>\n\n        <button ion-button clear color="primary" (click)="sendMessage()" [disabled]="message === \'\'">\n\n        Send\n\n      </button>\n\n      </ion-col>\n\n    </ion-row>\n\n  </ion-toolbar>\n\n</ion-footer>\n\n'/*ion-inline-end:"D:\IONIC\ionic-token-oracle-c3\src\pages\chat-rom\chat-room.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2_ng_socket_io__["Socket"],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ToastController */]])
    ], ChatRoomPage);
    return ChatRoomPage;
}());

//# sourceMappingURL=chat-room.js.map

/***/ })

});
//# sourceMappingURL=0.js.map