webpackJsonp([0],{

/***/ 136:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RequestInterceptor; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var token;
var RequestInterceptor = /** @class */ (function () {
    function RequestInterceptor() {
    }
    RequestInterceptor.prototype.intercept = function (request, next) {
        if (token) {
            //console.log('request with token interceptor!')
            request = request.clone({
                setHeaders: {
                    Authorization: 'Bearer ' + token
                }
            });
        }
        return next.handle(request);
    };
    RequestInterceptor.prototype.setRequestToken = function (tk) {
        if (tk) {
            token = tk;
        }
        else {
            token = '';
        }
    };
    RequestInterceptor = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [])
    ], RequestInterceptor);
    return RequestInterceptor;
}());

//# sourceMappingURL=requestInterceptor.js.map

/***/ }),

/***/ 153:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ApiResourceService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__apiStorageService__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__interceptors_requestInterceptor__ = __webpack_require__(136);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ApiResourceService = /** @class */ (function () {
    function ApiResourceService(httpClient, reqInterceptor //muon thay doi token gui kem thi ghi token moi
    ) {
        this.httpClient = httpClient;
        this.reqInterceptor = reqInterceptor; //muon thay doi token gui kem thi ghi token moi
        this.resourceServer = __WEBPACK_IMPORTED_MODULE_2__apiStorageService__["a" /* ApiStorageService */].resourceServer;
    }
    /**
     * Tao file pdf de in an
     * trả về danh mục các file hóa đơn đã tạo trên máy chủ
     * [{201901_print_all.pdf}]
     * @param billCycle
     */
    ApiResourceService.prototype.createPdfInvoices = function (billCycle) {
        return this.httpClient.post(this.resourceServer + '/db/pdf-invoices', JSON.stringify({
            bill_cycle: billCycle.bill_cycle,
            cust_id: billCycle.cust_id,
            background: billCycle.background
        }))
            .toPromise()
            .then(function (data) {
            var rtn;
            rtn = data;
            return rtn;
        });
    };
    /**
     * get hoa don (phai tao truoc, neu khong se không có file)
     * @param yyyymm_cust_id
     */
    ApiResourceService.prototype.getPdfInvoices = function (yyyymm_cust_id) {
        var httpOptions = {
            'responseType': 'arraybuffer'
            //'responseType'  : 'blob' as 'json'        //This also worked
        };
        return this.httpClient.get(this.resourceServer + '/db/pdf-invoices/' + yyyymm_cust_id, httpOptions)
            .toPromise()
            .then(function (data) {
            var rtn;
            rtn = data;
            return rtn;
        });
    };
    /**
     * billCycle =
     * {
     * bill_cycle:
     * bill_date:
     * invoice_no:
     * cust_id:
     * }
     */
    ApiResourceService.prototype.createInvoices = function (billCycle) {
        return this.httpClient.post(this.resourceServer + '/db/create-invoices', JSON.stringify({
            bill_cycle: billCycle.bill_cycle,
            bill_date: billCycle.bill_date,
            invoice_no: billCycle.invoice_no,
            cust_id: billCycle.cust_id
        }))
            .toPromise()
            .then(function (data) {
            var rtn;
            rtn = data;
            return rtn;
        });
    };
    /**
     * yyyymm_custId = 201901 hoac 201901/R000000001
     */
    ApiResourceService.prototype.getInvoices = function (yyyymm_custId) {
        return this.httpClient.get(this.resourceServer + '/db/json-invoices/' + yyyymm_custId)
            .toPromise()
            .then(function (data) {
            var rtn;
            rtn = data;
            return rtn;
        });
    };
    /**
     * lay ky cuoc da tao trong csdl
     */
    ApiResourceService.prototype.getBillCycle = function () {
        return this.httpClient.get(this.resourceServer + '/db/json-bill-cycles')
            .toPromise()
            .then(function (data) {
            var rtn;
            rtn = data;
            return rtn;
        });
    };
    ApiResourceService.prototype.getAllCutomers = function () {
        return this.httpClient.get(this.resourceServer + '/db/json-customers')
            .toPromise()
            .then(function (data) {
            var rtn;
            rtn = data;
            return rtn;
        });
    };
    ApiResourceService.prototype.getParamters = function () {
        return this.httpClient.get(this.resourceServer + '/db/json-parameters')
            .toPromise()
            .then(function (data) {
            var rtn;
            rtn = data;
            return rtn;
        });
    };
    /**
     * truyen len {token:'...'}
     * @param jsonString
     */
    ApiResourceService.prototype.authorizeFromResource = function (token) {
        var _this = this;
        this.reqInterceptor.setRequestToken(token); //neu thanh cong thi cac phien sau se gan them bear
        return this.httpClient.post(this.resourceServer + '/auth/authorize-token', JSON.stringify({ check: true }))
            .toPromise()
            .then(function (data) {
            var rtn;
            rtn = data;
            _this.token = token;
            return rtn;
        })
            .catch(function (err) {
            _this.token = null;
            _this.reqInterceptor.setRequestToken(null);
            throw err;
        });
    };
    ApiResourceService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_common_http__["b" /* HttpClient */],
            __WEBPACK_IMPORTED_MODULE_3__interceptors_requestInterceptor__["a" /* RequestInterceptor */] //muon thay doi token gui kem thi ghi token moi
        ])
    ], ApiResourceService);
    return ApiResourceService;
}());

//# sourceMappingURL=apiResourceServices.js.map

/***/ }),

/***/ 154:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DynamicFormMobilePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_apiHttpPublicServices__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_apiAuthService__ = __webpack_require__(37);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var DynamicFormMobilePage = /** @class */ (function () {
    function DynamicFormMobilePage(platform, authService, pubService, viewCtrl, navCtrl, loadingCtrl, navParams) {
        this.platform = platform;
        this.authService = authService;
        this.pubService = pubService;
        this.viewCtrl = viewCtrl;
        this.navCtrl = navCtrl;
        this.loadingCtrl = loadingCtrl;
        this.navParams = navParams;
        this.initValues = [];
        this.password_type = 'password';
        this.eye = "eye";
    }
    DynamicFormMobilePage_1 = DynamicFormMobilePage;
    DynamicFormMobilePage.prototype.ngOnInit = function () {
        var _this = this;
        this.dynamicForm = this.navParams.get("form") ? this.navParams.get("form") : this.pubService.getDemoForm();
        if (this.dynamicForm.items) {
            this.dynamicForm.items.forEach(function (el, idx) {
                _this.initValues.push({
                    idx: idx,
                    value: el.value
                });
            });
        }
        this.callback = this.navParams.get("callback");
        this.step = this.navParams.get("step");
        this.parent = this.navParams.get("parent");
    };
    DynamicFormMobilePage.prototype.resetForm = function () {
        var _this = this;
        if (this.dynamicForm.items) {
            this.dynamicForm.items.forEach(function (el, idx) {
                if (el.value !== undefined) {
                    if (_this.initValues.find(function (x) { return x.idx == idx; }).value === undefined) {
                        el.value = '';
                    }
                    else {
                        el.value = _this.initValues.find(function (x) { return x.idx == idx; }).value;
                    }
                }
            });
        }
    };
    // btn ẩn hiện mật khẩu
    DynamicFormMobilePage.prototype.togglePasswordMode = function () {
        this.eye = this.eye === 'eye' ? 'eye-off' : 'eye';
        this.password_type = this.password_type === 'text' ? 'password' : 'text';
    };
    // Xử lý sự kiện click button theo id
    DynamicFormMobilePage.prototype.onClick = function (btn) {
        //console.log('command', btn.url, btn.command);
        var _this = this;
        var valid = false;
        var results = []; //id,value
        var keyResults = {}; //{key:value}
        //chi nhung action xu ly du lieu form moi check
        if (btn.next === 'CALLBACK'
            || btn.next === 'NEXT') {
            this.dynamicForm.items.some(function (el) {
                var validatorFns = [];
                if (el.validators) {
                    el.validators.forEach(function (req) {
                        if (req.required)
                            validatorFns.push(__WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].required);
                        if (req.min)
                            validatorFns.push(__WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].minLength(req.min));
                        if (req.max)
                            validatorFns.push(__WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].maxLength(req.max));
                        if (req.pattern)
                            validatorFns.push(__WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].pattern(req.pattern));
                    });
                }
                var control = new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["a" /* FormControl */](el.value, validatorFns);
                el.invalid = control.invalid;
                valid = !el.invalid;
                if (valid
                    && el.key
                    && el.value) {
                    Object.defineProperty(keyResults, el.key, { value: el.value, writable: false, enumerable: true });
                }
                else if (valid
                    && el.id
                    && el.value
                    && el.type !== "title"
                    && el.type !== "image"
                    && el.type !== "avatar"
                    && el.type !== "button") {
                    results.push({
                        id: el.id,
                        value: el.value
                    });
                }
                //console.log(el.name, el.id, el.value, 'control:', control.invalid, control.valid);
                return el.invalid;
            });
        }
        else {
            this.next(btn);
            return;
        }
        if (valid) {
            if (btn.url) {
                if (btn.token && keyResults) {
                    var loading_1 = this.loadingCtrl.create({
                        content: 'Đang xử lý dữ liệu từ máy chủ token....'
                    });
                    loading_1.present();
                    this.authService.postDynamicForm(btn.url, keyResults, btn.token)
                        .then(function (data) {
                        btn.next_data = {
                            step: _this.step,
                            data: data
                        };
                        console.log('data token --> next btn', btn);
                        _this.next(btn);
                        loading_1.dismiss();
                    })
                        .catch(function (err) {
                        console.log('err token', err);
                        btn.next_data = {
                            step: _this.step,
                            error: err
                        };
                        _this.next(btn);
                        loading_1.dismiss();
                    });
                }
                else if (keyResults) {
                    var loading_2 = this.loadingCtrl.create({
                        content: 'Đang xử lý dữ liệu từ máy chủ ....'
                    });
                    loading_2.present();
                    this.pubService.postDynamicForm(btn.url, keyResults)
                        .then(function (data) {
                        console.log('data --> next', data, btn.next);
                        btn.next_data = {
                            step: _this.step,
                            data: data
                        };
                        _this.next(btn);
                        loading_2.dismiss();
                    })
                        .catch(function (err) {
                        console.log('err', err);
                        btn.next_data = {
                            step: _this.step,
                            error: err
                        };
                        _this.next(btn);
                        loading_2.dismiss();
                    });
                }
            }
            else {
                btn.next_data = {
                    step: this.step,
                    data: keyResults
                };
                this.next(btn);
            }
        }
        else {
            //console.log('Form Invalid!');
        }
    };
    DynamicFormMobilePage.prototype.next = function (btn) {
        var _this = this;
        if (btn) {
            if (btn.next == 'EXIT') {
                this.platform.exitApp();
            }
            else if (btn.next == 'RESET') {
                this.resetForm();
            }
            else if (btn.next == 'CLOSE') {
                try {
                    this.viewCtrl.dismiss(btn.next_data);
                }
                catch (e) { }
            }
            else if (btn.next == 'BACK') {
                try {
                    this.navCtrl.pop();
                }
                catch (e) { }
            }
            else if (btn.next == 'CALLBACK') {
                //console.log(btn,this.callback);
                if (this.callback) {
                    this.callback(this.parent, btn.next_data)
                        .then(function (nextStep) { return _this.next(nextStep); });
                }
                else {
                    try {
                        this.navCtrl.pop();
                    }
                    catch (e) { }
                }
            }
            else if (btn.next == 'NEXT' && btn.next_data && btn.next_data.data) {
                btn.next_data.callback = this.callback; //gan lai cac function object
                btn.next_data.parent = this.parent; //gan lai cac function object
                btn.next_data.form = btn.next_data.data; //gan du lieu tra ve tu server
                this.navCtrl.push(DynamicFormMobilePage_1, btn.next_data);
            }
        }
    };
    DynamicFormMobilePage = DynamicFormMobilePage_1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-dynamic-form-mobile',template:/*ion-inline-start:"D:\IONIC\node-server-api\src\pages\dynamic-form-mobile\dynamic-form-mobile.html"*/'<ion-header *ngIf="dynamicForm.title">\n\n	<ion-navbar>\n\n		<ion-title>{{dynamicForm.title}}</ion-title>\n\n	</ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content padding class="background-page gradient">\n\n\n\n	<ion-list *ngFor="let it of dynamicForm.items">\n\n\n\n		<!-- title -->\n\n		<ion-item class="background-page" *ngIf="it.type == \'title\'">\n\n			<ion-label class="title-item">{{it.name}}</ion-label>\n\n		</ion-item>\n\n\n\n		<!-- form chi tiet -->\n\n		<ion-list class="input-item" *ngIf="it.type == \'details\'">\n\n			<ion-item *ngFor="let dt of it.details">\n\n				<strong item-start>\n\n					{{dt.name}}\n\n				</strong>\n\n				<ion-label text-wrap item-end>\n\n						{{dt.value}}\n\n				</ion-label>\n\n			</ion-item>\n\n		</ion-list>\n\n\n\n		<!-- title with avatar -->\n\n		<ion-item class="background-page" *ngIf="it.type == \'avatar\'">\n\n			<ion-avatar item-start *ngIf="it.url"><img [src]="it.url"></ion-avatar>\n\n			<h1 item-left class="title-item">{{it.name}}</h1>\n\n		</ion-item>\n\n\n\n		<!-- image -->\n\n		<ion-grid *ngIf="it.type == \'image\'">\n\n			<ion-row>\n\n				<ion-col style="text-align: center;">\n\n					<img *ngIf="!it.width||!it.height" [src]="it.url">\n\n					<img *ngIf="it.width&&it.height" [width]="it.width" [height]="it.height" [src]="it.url">\n\n				</ion-col>\n\n			</ion-row>\n\n		</ion-grid>\n\n\n\n		<!-- input text -->\n\n		<ion-item class="input-item" *ngIf="it.type == \'text\'">\n\n			<ion-label floating color="danger" *ngIf="it.invalid">{{it.hint}}(*)</ion-label>\n\n			<ion-icon item-left name="{{it.icon}}" *ngIf="it.icon"></ion-icon>\n\n			<ion-input type="{{it.input_type}}" placeholder={{it.name?it.name:it.hint}} [(ngModel)]="it.value"></ion-input>\n\n		</ion-item>\n\n\n\n		<!-- input text-area -->\n\n		<ion-item class="input-item" *ngIf="it.type == \'text_area\'">\n\n			<ion-label floating color="danger" *ngIf="it.invalid">{{it.hint}}(*)</ion-label>\n\n			<ion-icon item-left name="{{it.icon}}" *ngIf="it.icon"></ion-icon>\n\n			<ion-textarea rows="6" cols="20" placeholder={{it.name?it.name:it.hint}} [(ngModel)]="it.value"></ion-textarea>\n\n		</ion-item>\n\n\n\n		<!-- input password -->\n\n		<ion-item class="input-item" *ngIf="it.type == \'password\'">\n\n			<ion-label floating color="danger" *ngIf="it.invalid">{{it.hint}}</ion-label>\n\n			<ion-icon item-left name="{{it.icon}}" *ngIf="it.icon"></ion-icon>\n\n			<ion-input [type]="password_type" placeholder={{it.name?it.name:it.hint}} [(ngModel)]="it.value"></ion-input>\n\n			<button ion-button clear color="dark" type="button" item-right (click)="togglePasswordMode()">\n\n				<ion-icon name="{{eye}}"> </ion-icon>\n\n			</button>\n\n		</ion-item>\n\n\n\n		<!-- check box -->\n\n		<ion-item class="input-item" *ngIf="it.type == \'check\'">\n\n			<ion-label color="primary">{{it.name?it.name:it.hint}}</ion-label>\n\n			<ion-checkbox color="primary" [(ngModel)]="it.value"></ion-checkbox>\n\n		</ion-item>\n\n\n\n		<!-- radio select -->\n\n		<ion-list *ngIf="it.type == \'radio\'" radio-group [(ngModel)]="it.value">\n\n			<ion-list-header>\n\n				<ion-icon item-start name="{{it.icon}}"></ion-icon>\n\n				<ion-label color="dark">{{it.name?it.name:it.hint}}</ion-label>\n\n			</ion-list-header>\n\n			<ion-item *ngFor="let myRad of it.options">\n\n				<ion-label color="secondary">{{myRad.name}}</ion-label>\n\n				<ion-radio value="{{myRad.value}}"></ion-radio>\n\n			</ion-item>\n\n		</ion-list>\n\n\n\n		<!-- single select -->\n\n		<ion-item class="input-item" *ngIf="it.type == \'select\'">\n\n			<ion-label color="primary">{{it.name?it.name:it.hint}}</ion-label>\n\n			<ion-select [(ngModel)]="it.value">\n\n				<ion-option *ngFor="let mySet of it.options" value="{{mySet.value}}">{{mySet.name}}</ion-option>\n\n			</ion-select>\n\n		</ion-item>\n\n\n\n		<!-- multiple select -->\n\n		<ion-item class="input-item" *ngIf="it.type == \'select_multiple\'">\n\n			<ion-label color="primary">{{it.name?it.name:it.hint}}</ion-label>\n\n			<ion-select [(ngModel)]="it.value" multiple="true">\n\n				<ion-option *ngFor="let mySet of it.options" value="{{mySet.value}}">{{mySet.name}}</ion-option>\n\n			</ion-select>\n\n		</ion-item>\n\n\n\n		<!-- toggle check -->\n\n		<ion-item class="input-item" *ngIf="it.type == \'toggle\'">\n\n			<ion-icon name="{{it.icon}}" item-start color="primary"></ion-icon>\n\n			<ion-label color="primary">{{it.name?it.name:it.hint}}</ion-label>\n\n			<ion-toggle color="secondary" [(ngModel)]="it.value"></ion-toggle>\n\n		</ion-item>\n\n\n\n		<!-- range adjust -->\n\n		<ion-item class="input-item" *ngIf="it.type == \'range\'">\n\n			<ion-range min="{{it.min}}" max="{{it.max}}" pin="true" [(ngModel)]="it.value" color="primary">\n\n				<ion-icon range-left small name="contrast"></ion-icon>\n\n				<ion-icon range-right name="contrast"></ion-icon>\n\n			</ion-range>\n\n		</ion-item>\n\n\n\n		<!-- date time-->\n\n		<ion-item class="input-item" *ngIf="it.type == \'datetime\'">\n\n			<ion-label color="danger" *ngIf="it.invalid">{{it.hint}}(*)</ion-label>\n\n			<ion-label *ngIf="!it.invalid">{{it.name}}</ion-label>\n\n			<ion-datetime displayFormat="{{it.display}}" pickerFormat="{{it.picker}}" [(ngModel)]="it.value"></ion-datetime>\n\n		</ion-item>\n\n\n\n		<!-- button action -->\n\n		<ion-grid *ngIf="it.type == \'button\'">\n\n			<ion-row>\n\n				<ion-col *ngFor="let myBtn of it.options" style="text-align: center;">\n\n					<button class="button-item" [(ngStyle)]="pageContent" ion-button round (click)="onClick(myBtn)">\n\n						{{myBtn.name}}\n\n					</button>\n\n				</ion-col>\n\n			</ion-row>\n\n		</ion-grid>\n\n\n\n	</ion-list>\n\n\n\n</ion-content>'/*ion-inline-end:"D:\IONIC\node-server-api\src\pages\dynamic-form-mobile\dynamic-form-mobile.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["l" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_4__services_apiAuthService__["a" /* ApiAuthService */],
            __WEBPACK_IMPORTED_MODULE_3__services_apiHttpPublicServices__["a" /* ApiHttpPublicService */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["m" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["j" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["f" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["k" /* NavParams */]])
    ], DynamicFormMobilePage);
    return DynamicFormMobilePage;
    var DynamicFormMobilePage_1;
}());

//# sourceMappingURL=dynamic-form-mobile.js.map

/***/ }),

/***/ 155:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DynamicFormWebPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_apiHttpPublicServices__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_apiAuthService__ = __webpack_require__(37);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var DynamicFormWebPage = /** @class */ (function () {
    function DynamicFormWebPage(platform, authService, pubService, viewCtrl, navCtrl, loadingCtrl, navParams) {
        this.platform = platform;
        this.authService = authService;
        this.pubService = pubService;
        this.viewCtrl = viewCtrl;
        this.navCtrl = navCtrl;
        this.loadingCtrl = loadingCtrl;
        this.navParams = navParams;
        this.initValues = [];
        this.password_type = 'password';
        this.eye = "eye";
    }
    DynamicFormWebPage_1 = DynamicFormWebPage;
    DynamicFormWebPage.prototype.ngOnInit = function () {
        var _this = this;
        this.dynamicForm = this.navParams.get("form") ? this.navParams.get("form") : this.pubService.getDemoForm();
        if (this.dynamicForm.items) {
            this.dynamicForm.items.forEach(function (el, idx) {
                _this.initValues.push({
                    idx: idx,
                    value: el.value
                });
            });
        }
        this.callback = this.navParams.get("callback");
        this.step = this.navParams.get("step");
        this.parent = this.navParams.get("parent");
    };
    DynamicFormWebPage.prototype.resetForm = function () {
        var _this = this;
        if (this.dynamicForm.items) {
            this.dynamicForm.items.forEach(function (el, idx) {
                if (el.value !== undefined) {
                    if (_this.initValues.find(function (x) { return x.idx == idx; }).value === undefined) {
                        el.value = '';
                    }
                    else {
                        el.value = _this.initValues.find(function (x) { return x.idx == idx; }).value;
                    }
                }
            });
        }
    };
    // btn ẩn hiện mật khẩu
    DynamicFormWebPage.prototype.togglePasswordMode = function () {
        this.eye = this.eye === 'eye' ? 'eye-off' : 'eye';
        this.password_type = this.password_type === 'text' ? 'password' : 'text';
    };
    // Xử lý sự kiện click button theo id
    DynamicFormWebPage.prototype.onClick = function (btn) {
        //console.log('command', btn.url, btn.command);
        var _this = this;
        var valid = false;
        var results = []; //id,value
        var keyResults = {}; //{key:value}
        //chi nhung action xu ly du lieu form moi check
        if (btn.next === 'CALLBACK'
            || btn.next === 'NEXT') {
            this.dynamicForm.items.some(function (el) {
                var validatorFns = [];
                if (el.validators) {
                    el.validators.forEach(function (req) {
                        if (req.required)
                            validatorFns.push(__WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].required);
                        if (req.min)
                            validatorFns.push(__WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].minLength(req.min));
                        if (req.max)
                            validatorFns.push(__WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].maxLength(req.max));
                        if (req.pattern)
                            validatorFns.push(__WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].pattern(req.pattern));
                    });
                }
                var control = new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["a" /* FormControl */](el.value, validatorFns);
                el.invalid = control.invalid;
                valid = !el.invalid;
                if (valid
                    && el.key
                    && el.value) {
                    Object.defineProperty(keyResults, el.key, { value: el.value, writable: false, enumerable: true });
                }
                else if (valid
                    && el.id
                    && el.value
                    && el.type !== "title"
                    && el.type !== "image"
                    && el.type !== "avatar"
                    && el.type !== "button") {
                    results.push({
                        id: el.id,
                        value: el.value
                    });
                }
                //console.log(el.name, el.id, el.value, 'control:', control.invalid, control.valid);
                return el.invalid;
            });
        }
        else {
            this.next(btn);
            return;
        }
        if (valid) {
            if (btn.url) {
                if (btn.token && keyResults) {
                    var loading_1 = this.loadingCtrl.create({
                        content: 'Đang xử lý dữ liệu từ máy chủ ....'
                    });
                    loading_1.present();
                    this.authService.postDynamicForm(btn.url, keyResults, btn.token)
                        .then(function (data) {
                        //console.log('data --> next', data, btn.next);
                        btn.next_data = {
                            step: _this.step,
                            data: data
                        };
                        _this.next(btn);
                        loading_1.dismiss();
                    })
                        .catch(function (err) {
                        //console.log('err', err);
                        btn.next_data = {
                            step: _this.step,
                            error: err
                        };
                        _this.next(btn);
                        loading_1.dismiss();
                    });
                }
                else if (keyResults) {
                    var loading_2 = this.loadingCtrl.create({
                        content: 'Đang xử lý dữ liệu từ máy chủ ....'
                    });
                    loading_2.present();
                    this.pubService.postDynamicForm(btn.url, keyResults)
                        .then(function (data) {
                        //console.log('data --> next', data, btn.next);
                        btn.next_data = {
                            step: _this.step,
                            data: data
                        };
                        _this.next(btn);
                        loading_2.dismiss();
                    })
                        .catch(function (err) {
                        //console.log('err', err);
                        btn.next_data = {
                            step: _this.step,
                            error: err
                        };
                        _this.next(btn);
                        loading_2.dismiss();
                    });
                }
            }
            else {
                btn.next_data = {
                    step: this.step,
                    data: keyResults
                };
                this.next(btn);
            }
        }
        else {
            //console.log('Form Invalid!');
        }
    };
    DynamicFormWebPage.prototype.next = function (btn) {
        var _this = this;
        if (btn) {
            if (btn.next == 'EXIT') {
                this.platform.exitApp();
            }
            else if (btn.next == 'RESET') {
                this.resetForm();
            }
            else if (btn.next == 'CLOSE') {
                try {
                    this.viewCtrl.dismiss(btn.next_data);
                }
                catch (e) { }
            }
            else if (btn.next == 'BACK') {
                try {
                    this.navCtrl.pop();
                }
                catch (e) { }
                //if (this.navCtrl.length() > 1) this.navCtrl.pop();      //goback 1 step
            }
            else if (btn.next == 'CALLBACK') {
                if (this.callback) {
                    this.callback(this.parent, btn.next_data)
                        .then(function (nextStep) { return _this.next(nextStep); });
                }
                else {
                    try {
                        this.navCtrl.pop();
                    }
                    catch (e) { }
                }
            }
            else if (btn.next == 'NEXT' && btn.next_data && btn.next_data.data) {
                btn.next_data.callback = this.callback; //gan lai cac function object
                btn.next_data.parent = this.parent; //gan lai cac function object
                btn.next_data.form = btn.next_data.data; //gan du lieu tra ve tu server
                this.navCtrl.push(DynamicFormWebPage_1, btn.next_data);
            }
        }
    };
    DynamicFormWebPage = DynamicFormWebPage_1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-dynamic-form-web',template:/*ion-inline-start:"D:\IONIC\node-server-api\src\pages\dynamic-form-web\dynamic-form-web.html"*/'<ion-header *ngIf="dynamicForm.title">\n\n	<ion-navbar>\n\n		<ion-title>{{dynamicForm.title}}</ion-title>\n\n	</ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content padding class="background-page gradient">\n\n\n\n	<ion-grid>\n\n		<ion-row>\n\n			<ion-col class="background-card gradient grid-border" text-center col-12 offset-xl-3 col-xl-6 offset-lg-3 col-lg-6\n\n			 offset-md-2 col-md-8 col-sm-12>\n\n\n\n				<ion-list *ngFor="let it of dynamicForm.items">\n\n\n\n					<!-- title -->\n\n					<ion-item class="background-card" *ngIf="it.type == \'title\'">\n\n						<ion-label class="title-item">{{it.name}}</ion-label>\n\n					</ion-item>\n\n\n\n					<!-- form chi tiet -->\n\n					<ion-list class="input-item" *ngIf="it.type == \'details\'">\n\n						<ion-item *ngFor="let dt of it.details">\n\n							<strong item-start>\n\n								{{dt.name}}\n\n							</strong>\n\n							<ion-label text-wrap item-end>\n\n									{{dt.value}}\n\n							</ion-label>\n\n						</ion-item>\n\n					</ion-list>\n\n\n\n					<!-- title with avatar -->\n\n					<ion-item class="background-card" *ngIf="it.type == \'avatar\'">\n\n						<ion-avatar item-start><img [src]="it.url"></ion-avatar>\n\n						<h1 item-left class="title-item">{{it.name}}</h1>\n\n					</ion-item>\n\n\n\n					<!-- image -->\n\n					<ion-grid *ngIf="it.type == \'image\'">\n\n						<ion-row>\n\n							<ion-col style="text-align: center;">\n\n								<img *ngIf="!it.width||!it.height" [src]="it.url">\n\n								<img *ngIf="it.width&&it.height" [width]="it.width" [height]="it.height" [src]="it.url">\n\n							</ion-col>\n\n						</ion-row>\n\n					</ion-grid>\n\n\n\n					<!-- input text -->\n\n					<ion-item class="input-item" *ngIf="it.type == \'text\'">\n\n						<ion-label floating color="danger" *ngIf="it.invalid">{{it.hint}}(*)</ion-label>\n\n						<ion-icon item-left name="{{it.icon}}" *ngIf="it.icon"></ion-icon>\n\n						<ion-input type="{{it.input_type}}" placeholder={{it.name?it.name:it.hint}} [(ngModel)]="it.value"></ion-input>\n\n					</ion-item>\n\n\n\n					<!-- input text-area -->\n\n					<ion-item class="input-item" *ngIf="it.type == \'text_area\'">\n\n						<ion-label floating color="danger" *ngIf="it.invalid">{{it.hint}}(*)</ion-label>\n\n						<ion-icon item-left name="{{it.icon}}" *ngIf="it.icon"></ion-icon>\n\n						<ion-textarea rows="6" cols="20" placeholder={{it.name?it.name:it.hint}} [(ngModel)]="it.value"></ion-textarea>\n\n					</ion-item>\n\n\n\n					<!-- input password -->\n\n					<ion-item class="input-item" *ngIf="it.type == \'password\'">\n\n						<ion-label floating color="danger" *ngIf="it.invalid">{{it.hint}}(*)</ion-label>\n\n						<ion-icon item-left name="{{it.icon}}" *ngIf="it.icon"></ion-icon>\n\n						<ion-input [type]="password_type" placeholder={{it.name?it.name:it.hint}} [(ngModel)]="it.value"></ion-input>\n\n						<button ion-button clear color="dark" type="button" item-right (click)="togglePasswordMode()">\n\n							<ion-icon name="{{eye}}"> </ion-icon>\n\n						</button>\n\n					</ion-item>\n\n\n\n					<!-- check box -->\n\n					<ion-item class="input-item" *ngIf="it.type == \'check\'">\n\n						<ion-label color="primary">{{it.name?it.name:it.hint}}</ion-label>\n\n						<ion-checkbox color="primary" [(ngModel)]="it.value"></ion-checkbox>\n\n					</ion-item>\n\n\n\n					<!-- radio select -->\n\n					<ion-list *ngIf="it.type == \'radio\'" radio-group [(ngModel)]="it.value">\n\n						<ion-list-header>\n\n							<ion-icon item-start name="{{it.icon}}"></ion-icon>\n\n							<ion-label color="dark">{{it.name?it.name:it.hint}}</ion-label>\n\n						</ion-list-header>\n\n						<ion-item *ngFor="let myRad of it.options">\n\n							<ion-label color="secondary">{{myRad.name}}</ion-label>\n\n							<ion-radio value="{{myRad.value}}"></ion-radio>\n\n						</ion-item>\n\n					</ion-list>\n\n\n\n					<!-- single select -->\n\n					<ion-item class="input-item" *ngIf="it.type == \'select\'">\n\n						<ion-label color="primary">{{it.name?it.name:it.hint}}</ion-label>\n\n						<ion-select [(ngModel)]="it.value">\n\n							<ion-option *ngFor="let mySet of it.options" value="{{mySet.value}}">{{mySet.name}}</ion-option>\n\n						</ion-select>\n\n					</ion-item>\n\n\n\n					<!-- multiple select -->\n\n					<ion-item class="input-item" *ngIf="it.type == \'select_multiple\'">\n\n						<ion-label color="primary">{{it.name?it.name:it.hint}}</ion-label>\n\n						<ion-select [(ngModel)]="it.value" multiple="true">\n\n							<ion-option *ngFor="let mySet of it.options" value="{{mySet.value}}">{{mySet.name}}</ion-option>\n\n						</ion-select>\n\n					</ion-item>\n\n\n\n					<!-- toggle check -->\n\n					<ion-item class="input-item" *ngIf="it.type == \'toggle\'">\n\n						<ion-icon name="{{it.icon}}" item-start color="primary"></ion-icon>\n\n						<ion-label color="primary">{{it.name?it.name:it.hint}}</ion-label>\n\n						<ion-toggle color="secondary" [(ngModel)]="it.value"></ion-toggle>\n\n					</ion-item>\n\n\n\n					<!-- range adjust -->\n\n					<ion-item class="input-item" *ngIf="it.type == \'range\'">\n\n						<ion-range min="{{it.min}}" max="{{it.max}}" pin="true" [(ngModel)]="it.value" color="primary">\n\n							<ion-icon range-left small name="contrast"></ion-icon>\n\n							<ion-icon range-right name="contrast"></ion-icon>\n\n						</ion-range>\n\n					</ion-item>\n\n\n\n					<!-- date time-->\n\n					<ion-item class="input-item" *ngIf="it.type == \'datetime\'">\n\n						<ion-label color="danger" *ngIf="it.invalid">{{it.hint}}(*)</ion-label>\n\n						<ion-label *ngIf="!it.invalid">{{it.name}}</ion-label>\n\n						<ion-datetime displayFormat="{{it.display}}" pickerFormat="{{it.picker}}" [(ngModel)]="it.value"></ion-datetime>\n\n					</ion-item>\n\n\n\n					<!-- button action -->\n\n					<ion-grid *ngIf="it.type == \'button\'">\n\n						<ion-row>\n\n							<ion-col *ngFor="let myBtn of it.options" style="text-align: center;">\n\n								<button class="button-item" [(ngStyle)]="pageContent" ion-button round (click)="onClick(myBtn)">\n\n									{{myBtn.name}}\n\n								</button>\n\n							</ion-col>\n\n						</ion-row>\n\n					</ion-grid>\n\n\n\n				</ion-list>\n\n			</ion-col>\n\n		</ion-row>\n\n	</ion-grid>\n\n</ion-content>'/*ion-inline-end:"D:\IONIC\node-server-api\src\pages\dynamic-form-web\dynamic-form-web.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["l" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_4__services_apiAuthService__["a" /* ApiAuthService */],
            __WEBPACK_IMPORTED_MODULE_3__services_apiHttpPublicServices__["a" /* ApiHttpPublicService */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["m" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["j" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["f" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["k" /* NavParams */]])
    ], DynamicFormWebPage);
    return DynamicFormWebPage;
    var DynamicFormWebPage_1;
}());

//# sourceMappingURL=dynamic-form-web.js.map

/***/ }),

/***/ 166:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 166;

/***/ }),

/***/ 211:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 211;

/***/ }),

/***/ 296:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ApiImageService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_exif_js__ = __webpack_require__(496);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_exif_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_exif_js__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var orientation_standard = {
    1: 0,
    3: 180,
    6: 90,
    8: 270
};
var ApiImageService = /** @class */ (function () {
    function ApiImageService() {
    }
    //dua vao doi tuong file image
    //tra ve doi tuong file image co kich co nho hon
    ApiImageService.prototype.resizeImage = function (filename, file, newSize) {
        return new Promise(function (resolve, reject) {
            if (file) {
                var allMetaData_1;
                var originOrientation_1;
                __WEBPACK_IMPORTED_MODULE_1_exif_js__["getData"](file, function () {
                    allMetaData_1 = __WEBPACK_IMPORTED_MODULE_1_exif_js__["getAllTags"](this);
                    originOrientation_1 = allMetaData_1.Orientation;
                    //console.log("get Tags Orientation",allMetaData);
                });
                try {
                    var canvas_1 = document.createElement('canvas');
                    var context_1 = canvas_1.getContext('2d');
                    var img_1 = document.createElement('img');
                    var maxW_1 = newSize;
                    var maxH_1 = newSize;
                    img_1.src = URL.createObjectURL(file);
                    img_1.onload = function () {
                        var iw = img_1.width;
                        var ih = img_1.height;
                        var scale = Math.min((maxW_1 / iw), (maxH_1 / ih));
                        var iwScaled = (scale <= 0 || scale > 1) ? iw : iw * scale;
                        var ihScaled = (scale <= 0 || scale > 1) ? ih : ih * scale;
                        //giam kich thuoc
                        canvas_1.width = iwScaled;
                        canvas_1.height = ihScaled;
                        context_1.drawImage(img_1, 0, 0, iwScaled, ihScaled);
                        //quay
                        var imageNew = document.createElement('img');
                        imageNew.src = canvas_1.toDataURL();
                        imageNew.onload = function () {
                            if (originOrientation_1 > 2 && originOrientation_1 <= 4) {
                                //console.log('rotate 180');
                                canvas_1.width = imageNew.width;
                                canvas_1.height = imageNew.height;
                                context_1.rotate(180 * Math.PI / 180);
                                context_1.drawImage(imageNew, -imageNew.width, -imageNew.height);
                            }
                            else if (originOrientation_1 > 4 && originOrientation_1 <= 7) {
                                //rotate 90
                                //console.log('rotate 90');
                                canvas_1.width = imageNew.height;
                                canvas_1.height = imageNew.width;
                                context_1.rotate(90 * Math.PI / 180);
                                context_1.drawImage(imageNew, 0, -imageNew.height);
                            }
                            else if (originOrientation_1 > 7 && originOrientation_1 <= 9) {
                                //rotate 270
                                //console.log('rotate 270');
                                canvas_1.width = imageNew.height;
                                canvas_1.height = imageNew.width;
                                context_1.rotate(270 * Math.PI / 180);
                                context_1.drawImage(imageNew, -imageNew.width, 0);
                            }
                            canvas_1.toBlob(function (blob) {
                                var reader = new FileReader();
                                reader.readAsArrayBuffer(blob);
                                reader.onload = function () {
                                    var newFile = new Blob([reader.result], { type: 'image/jpeg' });
                                    resolve({
                                        image: canvas_1.toDataURL(),
                                        file: newFile //formData post
                                        ,
                                        filename: filename,
                                        h1: filename,
                                        p: " ***Kích cỡ cũ: " + file.size
                                            + "(" + img_1.width + "x" + img_1.height + ")"
                                            + " * Kiểu file cũ: " + file.type
                                            + " * Hướng ảnh chụp: " + orientation_standard[(originOrientation_1 ? originOrientation_1 : 1)]
                                            + "(" + (originOrientation_1 ? "(" + originOrientation_1 + ")" : "1") + ")"
                                            + " ***Kích cỡ mới: BIN=" + newFile.size
                                            + "(" + canvas_1.width + "x" + canvas_1.height + ") Base64=" + canvas_1.toDataURL().length + ""
                                            + " * Kiểu file mới: " + newFile.type
                                            + " ***Các tham số tạo ảnh: "
                                            + (allMetaData_1 && allMetaData_1.Make ? " * Hãng sx máy ảnh: " + allMetaData_1.Make : "")
                                            + (allMetaData_1 && allMetaData_1.Make ? " * Đời máy ảnh: " + allMetaData_1.Model : "")
                                            + (allMetaData_1 && allMetaData_1.Software ? " * Phần mềm: " + allMetaData_1.Software : "")
                                            + (allMetaData_1 && allMetaData_1.DateTime ? " * Ngày giờ: " + allMetaData_1.DateTime : "")
                                            + (allMetaData_1 && allMetaData_1.DateTimeOriginal ? " * Ngày giờ gốc: " + allMetaData_1.DateTimeOriginal : "")
                                            + (allMetaData_1 && allMetaData_1.DateTimeDigitized ? " * Ngày giờ số hóa: " + allMetaData_1.DateTimeDigitized : "")
                                            + (allMetaData_1 && allMetaData_1.GPSLatitude ? " * Vĩ Độ: " + allMetaData_1.GPSLatitude + allMetaData_1.GPSLatitudeRef : "")
                                            + (allMetaData_1 && allMetaData_1.GPSLongitude ? " * Kinh Độ: " + allMetaData_1.GPSLongitude + allMetaData_1.GPSLongitudeRef : "")
                                            + (allMetaData_1 && allMetaData_1.GPSDateStamp ? " * Ngày giờ tọa độ: " + allMetaData_1.GPSDateStamp + allMetaData_1.GPSTimeStamp : ""),
                                        h3: (file.lastModified ? new Date(file.lastModified).toISOString() : file.lastModifiedDate),
                                        note: JSON.stringify(allMetaData_1),
                                        last_modified: file.lastModified ? file.lastModified : file.lastModifiedDate.getTime(),
                                        subtitle: (file.lastModified ? new Date(file.lastModified).toLocaleDateString() : file.lastModifiedDate) + (originOrientation_1 ? "(" + originOrientation_1 + ")" : ""),
                                        width: canvas_1.width //cho biet anh nam doc hay nam ngang
                                        ,
                                        height: canvas_1.height,
                                        orientation_old: originOrientation_1,
                                        size_old: file.size,
                                        type_old: file.type,
                                        size: newFile.size,
                                        type: newFile.type
                                    });
                                };
                            });
                        };
                    };
                }
                catch (err) {
                    reject(err);
                }
            }
            else {
                reject("No file!");
            }
        });
    };
    ApiImageService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [])
    ], ApiImageService);
    return ApiImageService;
}());

//# sourceMappingURL=apiImageService.js.map

/***/ }),

/***/ 297:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__dynamic_form_mobile_dynamic_form_mobile__ = __webpack_require__(154);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_apiHttpPublicServices__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__dynamic_form_web_dynamic_form_web__ = __webpack_require__(155);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__tabs_tabs__ = __webpack_require__(298);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__services_apiStorageService__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__services_apiResourceServices__ = __webpack_require__(153);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__services_apiAuthService__ = __webpack_require__(37);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var HomePage = /** @class */ (function () {
    function HomePage(navCtrl, pubService, auth, resources, apiStorageService, platform, modalCtrl, loadingCtrl, alertCtrl) {
        this.navCtrl = navCtrl;
        this.pubService = pubService;
        this.auth = auth;
        this.resources = resources;
        this.apiStorageService = apiStorageService;
        this.platform = platform;
        this.modalCtrl = modalCtrl;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
    }
    HomePage.prototype.ngOnInit = function () {
        //console.log('2. ngOnInit Home');
        //hien thi kieu popup info -- dissmiss
        //this.openModal(data);
        var _this = this;
        if (this.apiStorageService.getToken()) {
            var loading_1 = this.loadingCtrl.create({
                content: 'Đang kiểm tra xác thực ....'
            });
            loading_1.present();
            this.auth.authorize(this.apiStorageService.getToken())
                .then(function (status) {
                loading_1.dismiss();
                _this.auth.getServerPublicRSAKey()
                    .then(function (pk) {
                    var userInfo = _this.auth.getUserInfo();
                    console.log('Save token user', userInfo);
                    //kiem tra token chua khai nickname, va image thi phai nhay vao slide khai thong tin
                    if (userInfo)
                        //cho phep truy cap thi gui token kem theo
                        _this.auth.injectToken(); //Tiêm token cho các phiên làm việc lấy số liệu cần xác thực
                    _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_5__tabs_tabs__["a" /* TabsPage */]);
                })
                    .catch(function (err) {
                    console.log('Public key err', err);
                });
            })
                .catch(function (err) {
                loading_1.dismiss();
                //console.log('Token invalid: ', err);
                _this.auth.deleteToken();
            });
        }
    };
    HomePage.prototype.ionViewDidLoad = function () {
        //console.log('3. ionViewDidLoad Home');
        var _this = this;
        this.pubService.getDataForm('form-phone.json')
            .then(function (data) {
            if (_this.platform.platforms()[0] === 'core') {
                setTimeout(function () {
                    _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__dynamic_form_web_dynamic_form_web__["a" /* DynamicFormWebPage */], {
                        that: _this,
                        callback: _this.callbackFunction,
                        step: 'form-phone',
                        form: data
                    });
                }, 1000);
            }
            else {
                _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__dynamic_form_mobile_dynamic_form_mobile__["a" /* DynamicFormMobilePage */], {
                    parent: _this,
                    callback: _this.callbackFunction,
                    step: 'form-phone',
                    form: data
                });
            }
        })
            .catch(function (err) { return console.log("err ngOnInit()", err); });
    };
    /**
     *  ham goi lai gui ket qua new button next
     *
     * @param that chinh la this cua parent callback
     * @param res
     */
    HomePage.prototype.callbackFunction = function (that, res) {
        return new Promise(function (resolve, reject) {
            //console.log('parent:',that);
            //console.log('this:',this);
            if (res && res.error && res.error.error) {
                //console.log('callback error:', res.error.error);
                that.presentAlert('Lỗi:<br>' + JSON.stringify(res.error.error.error));
                resolve();
            }
            else if (res && res.step === 'form-phone' && res.data) {
                console.log('forward data:', res.data.database_out);
                if (res.data.database_out && res.data.database_out.status === 0) {
                    that.presentAlert('Chú ý:<br>' + JSON.stringify(res.data.database_out.message));
                }
                //gui nhu mot button forward
                resolve({
                    next: "NEXT" //mo form tiep theo
                    ,
                    next_data: {
                        step: 'form-key',
                        data: //new form 
                        {
                            items: [
                                { name: "Nhập mã OTP", type: "title" },
                                { key: "key", name: "Mã OTP", hint: "Nhập mã OTP gửi đến điện thoại", type: "text", input_type: "text", validators: [{ required: true, min: 6, max: 6, pattern: "^[0-9A-Z]*$" }] },
                                { type: "button",
                                    options: [
                                        { name: "Trở về", next: "BACK" },
                                        { name: "Xác nhận OTP", next: "CALLBACK", url: "https://c3.mobifone.vn/api/ext-auth/confirm-key", token: res.data.token }
                                    ]
                                }
                            ]
                        }
                    }
                });
            }
            else if (res && res.step === 'form-key' && res.data.token) {
                //lay duoc token
                //ktra token co user, image thi pass new ko thi gui ...
                console.log('token verified:', res.data.token);
                // neu nhu gai quyet xong
                var loading_2 = that.loadingCtrl.create({
                    content: 'Đang xử lý dữ liệu từ máy chủ ....'
                });
                loading_2.present();
                that.resources.authorizeFromResource(res.data.token)
                    .then(function (login) {
                    console.log('data', login);
                    if (login.status
                        && login.user_info
                        && login.token) {
                        that.apiStorageService.saveToken(res.data.token);
                        that.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_5__tabs_tabs__["a" /* TabsPage */]);
                    }
                    else {
                        that.presentAlert('Dữ liệu xác thực không đúng <br>' + JSON.stringify(login));
                    }
                    loading_2.dismiss();
                    resolve();
                })
                    .catch(function (err) {
                    console.log('err', err);
                    that.presentAlert('Lỗi xác thực - authorizeFromResource');
                    loading_2.dismiss();
                    resolve();
                });
            }
            else {
                resolve();
            }
        });
    };
    HomePage.prototype.openModal = function (data) {
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_2__dynamic_form_mobile_dynamic_form_mobile__["a" /* DynamicFormMobilePage */], data);
        modal.present();
    };
    HomePage.prototype.presentAlert = function (msg) {
        var alert = this.alertCtrl.create({
            title: 'For Administrator',
            subTitle: msg,
            buttons: ['Dismiss']
        }).present();
    };
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"D:\IONIC\node-server-api\src\pages\home\home.html"*/'<ion-content padding class="background-page gradient" >\n\n    \n\n</ion-content>'/*ion-inline-end:"D:\IONIC\node-server-api\src\pages\home\home.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_3__services_apiHttpPublicServices__["a" /* ApiHttpPublicService */],
            __WEBPACK_IMPORTED_MODULE_8__services_apiAuthService__["a" /* ApiAuthService */],
            __WEBPACK_IMPORTED_MODULE_7__services_apiResourceServices__["a" /* ApiResourceService */],
            __WEBPACK_IMPORTED_MODULE_6__services_apiStorageService__["a" /* ApiStorageService */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 298:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TabsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__dynamic_form_web_dynamic_form_web__ = __webpack_require__(155);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__dynamic_list_dynamic_list__ = __webpack_require__(299);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_apiResourceServices__ = __webpack_require__(153);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__dynamic_form_mobile_dynamic_form_mobile__ = __webpack_require__(154);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__dynamic_card_social_dynamic_card_social__ = __webpack_require__(300);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__dynamic_medias_dynamic_medias__ = __webpack_require__(301);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var TabsPage = /** @class */ (function () {
    function TabsPage(navCtrl, modalCtrl, platform, alertCtrl, loadingCtrl, resource) {
        this.navCtrl = navCtrl;
        this.modalCtrl = modalCtrl;
        this.platform = platform;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.resource = resource;
        this.tabs = [
            {
                root: __WEBPACK_IMPORTED_MODULE_2__dynamic_form_web_dynamic_form_web__["a" /* DynamicFormWebPage */],
                title: 'Form',
                icon: 'log-in'
            },
            {
                root: __WEBPACK_IMPORTED_MODULE_5__dynamic_form_mobile_dynamic_form_mobile__["a" /* DynamicFormMobilePage */],
                title: 'Mobile',
                icon: 'phone-portrait'
            },
            {
                root: __WEBPACK_IMPORTED_MODULE_7__dynamic_medias_dynamic_medias__["a" /* DynamicMediasPage */],
                title: 'Images',
                icon: 'images'
            },
            {
                root: __WEBPACK_IMPORTED_MODULE_6__dynamic_card_social_dynamic_card_social__["a" /* DynamicCardSocialPage */],
                title: 'Social',
                icon: 'share'
            },
            {
                root: __WEBPACK_IMPORTED_MODULE_3__dynamic_list_dynamic_list__["a" /* DynamicListPage */],
                title: 'List',
                icon: 'paper'
            }
        ];
        //console.log('1. constructor tabs')
    }
    TabsPage.prototype.ngOnInit = function () {
        //console.log('2. ngOnInit tabs')
    };
    TabsPage.prototype.ionViewDidLoad = function () {
        //console.log('3. ionViewDidLoad tabs')
    };
    TabsPage.prototype.ionViewWillEnter = function () {
        //console.log('4. ionViewWillEnter tabs')
    };
    TabsPage.prototype.callback = function () {
    };
    TabsPage.prototype.callWaiting = function () {
    };
    TabsPage.prototype.openModal = function (data) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var formPopup;
            if (_this.platform.is('core')) {
                formPopup = __WEBPACK_IMPORTED_MODULE_2__dynamic_form_web_dynamic_form_web__["a" /* DynamicFormWebPage */];
            }
            else {
                formPopup = __WEBPACK_IMPORTED_MODULE_5__dynamic_form_mobile_dynamic_form_mobile__["a" /* DynamicFormMobilePage */];
            }
            var modal = _this.modalCtrl.create(formPopup, data);
            modal.onDidDismiss(function (data) {
                resolve(data);
            });
            modal.present();
        });
    };
    TabsPage.prototype.presentConfirm = function (jsonConfirm) {
        var alert = this.alertCtrl.create({
            title: jsonConfirm.title,
            message: jsonConfirm.message,
            buttons: [
                {
                    text: jsonConfirm.cancel_text,
                    role: 'cancel',
                    handler: function () {
                        if (jsonConfirm.ok)
                            jsonConfirm.ok(false);
                    }
                },
                {
                    text: jsonConfirm.ok_text,
                    handler: function () {
                        if (jsonConfirm.ok)
                            jsonConfirm.ok(true);
                    }
                }
            ]
        });
        alert.present();
    };
    TabsPage.prototype.presentAlert = function (jsonConfirm) {
        var alert = this.alertCtrl.create({
            title: jsonConfirm.title,
            message: jsonConfirm.message,
            buttons: [
                {
                    text: jsonConfirm.ok_text,
                    handler: function () { }
                }
            ]
        });
        alert.present();
    };
    TabsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"D:\IONIC\node-server-api\src\pages\tabs\tabs.html"*/'<ion-tabs>\n\n  <ion-tab *ngFor="let tab of tabs" [root]="tab.root" [rootParams]="tab.params" tabTitle="{{tab.title}}" tabIcon="{{tab.icon}}"></ion-tab>\n\n</ion-tabs>\n\n'/*ion-inline-end:"D:\IONIC\node-server-api\src\pages\tabs\tabs.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_4__services_apiResourceServices__["a" /* ApiResourceService */]])
    ], TabsPage);
    return TabsPage;
}());

//# sourceMappingURL=tabs.js.map

/***/ }),

/***/ 299:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DynamicListPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_apiAuthService__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_apiHttpPublicServices__ = __webpack_require__(43);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var DynamicListPage = /** @class */ (function () {
    function DynamicListPage(platform, authService, pubService, viewCtrl, navCtrl, loadingCtrl, navParams) {
        this.platform = platform;
        this.authService = authService;
        this.pubService = pubService;
        this.viewCtrl = viewCtrl;
        this.navCtrl = navCtrl;
        this.loadingCtrl = loadingCtrl;
        this.navParams = navParams;
        this.isSearch = false;
        this.searchString = '';
        this.shouldShowCancel = true;
        this.isMobile = false;
    }
    DynamicListPage_1 = DynamicListPage;
    DynamicListPage.prototype.ngOnInit = function () {
        var _this = this;
        this.dynamicListOrigin = this.navParams.get("list") ? this.navParams.get("list") : this.pubService.getDemoList();
        this.refresh();
        this.offset = this.navParams.get("offset") ? this.navParams.get("offset") : 250;
        this.callback = this.navParams.get("callback");
        this.step = this.navParams.get("step");
        this.parent = this.navParams.get("parent");
        var call_waiting_data = this.navParams.get("call_waiting_data");
        if (call_waiting_data) {
            call_waiting_data()
                .then(function (list) {
                _this.refresh(list);
            });
        }
    };
    DynamicListPage.prototype.refresh = function (newList) {
        if (newList)
            this.dynamicListOrigin = newList;
        this.isMobile = (this.platform.platforms()[0] === 'mobile');
        this.dynamicList = this.dynamicListOrigin;
    };
    // Su dung slide Pages
    //--------------------------
    /**
     * Thay đổi kiểu bấm nút mở lệnh trên item sliding
     * @param slidingItem
     * @param item
     */
    DynamicListPage.prototype.openSwipeOptions = function (slidingItem, item, it) {
        var _offset = "translate3d(-" + this.offset + "px, 0px, 0px)";
        it.isSlidingItemOpen = true;
        slidingItem.setElementClass("active-sliding", true);
        slidingItem.setElementClass("active-slide", true);
        slidingItem.setElementClass("active-options-right", true);
        item.setElementStyle("transform", _offset);
    };
    /**
     * Thay đổi cách bấm nút đóng lệnh bằng nút trên item sliding
     * @param slidingItem
     */
    DynamicListPage.prototype.closeSwipeOptions = function (slidingItem, it) {
        slidingItem.close();
        slidingItem.setElementClass("active-sliding", false);
        slidingItem.setElementClass("active-slide", false);
        slidingItem.setElementClass("active-options-right", false);
        it.isSlidingItemOpen = false;
    };
    //----------- end of sliding
    //Su dung search
    //---------------------
    DynamicListPage.prototype.goSearch = function () {
        this.isSearch = true;
    };
    DynamicListPage.prototype.searchEnter = function () {
        this.isSearch = false;
    };
    DynamicListPage.prototype.onInput = function (e) {
        console.log(this.searchString);
    };
    DynamicListPage.prototype.onClick = function (btn) {
        //console.log(btn);
        this.processCommand(btn);
    };
    DynamicListPage.prototype.onClickDetails = function (item, btn, it) {
        this.closeSwipeOptions(item, it);
        btn.item = it;
        console.log(btn);
        this.processCommand(btn);
    };
    DynamicListPage.prototype.processCommand = function (btn) {
        var _this = this;
        if (btn.url) {
            if (btn.method === 'GET') {
                var loading_1 = this.loadingCtrl.create({
                    content: 'Đang xử lý dữ liệu từ máy chủ ....'
                });
                loading_1.present();
                var httpOptions = void 0;
                if (btn.next === 'PDF')
                    httpOptions = { 'responseType': 'blob' };
                this.pubService.getDynamicForm(btn.url, httpOptions)
                    .then(function (data) {
                    //console.log(data);
                    loading_1.dismiss();
                    btn.next_data = {
                        step: _this.step,
                        data: data,
                        next: btn.next,
                        item: btn.item
                    };
                    _this.next(btn);
                })
                    .catch(function (err) {
                    console.log('err getDynamicForm', err);
                    loading_1.dismiss();
                });
            }
            else {
                this.next(btn);
            }
        }
        else {
            this.next(btn);
        }
    };
    DynamicListPage.prototype.next = function (btn) {
        var _this = this;
        if (btn) {
            if (btn.next == 'EXIT') {
                this.platform.exitApp();
            }
            else if (btn.next == 'REFRESH') {
                this.refresh(btn.next_data);
            }
            else if (btn.next == 'CLOSE') {
                try {
                    this.viewCtrl.dismiss(btn.next_data);
                }
                catch (e) { }
            }
            else if (btn.next == 'BACK') {
                try {
                    this.navCtrl.pop();
                }
                catch (e) { }
            }
            else if (btn.next == 'ADD' || btn.next == 'EDIT' || btn.next == 'PDF' || btn.next == 'LIST') {
                if (this.callback) {
                    this.callback(btn.next_data)
                        .then(function (nextStep) { return _this.next(nextStep); });
                }
            }
            else if (btn.next == 'NEXT' && btn.next_data && btn.next_data.data) {
                btn.next_data.callback = this.callback; //gan lai cac function object
                btn.next_data.parent = this.parent; //gan lai cac function object
                btn.next_data.form = btn.next_data.data; //gan du lieu tra ve tu server
                this.navCtrl.push(DynamicListPage_1, btn.next_data);
            }
        }
    };
    DynamicListPage = DynamicListPage_1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-dynamic-list',template:/*ion-inline-start:"D:\IONIC\node-server-api\src\pages\dynamic-list\dynamic-list.html"*/'<ion-header>\n\n    <ion-navbar>\n\n\n\n        <ion-buttons *ngIf="!isSearch && dynamicList?.search_bar" start>\n\n            <button ion-button icon-only color="royal" (click)="goSearch()">\n\n                <ion-icon name="search"></ion-icon>\n\n            </button>\n\n        </ion-buttons>\n\n\n\n        <ion-buttons end *ngFor="let btn of dynamicList?.buttons">\n\n            <button ion-button icon-only color="{{btn.color}}" (click)="onClick(btn)">\n\n                <ion-icon name="{{btn.icon}}"></ion-icon>\n\n            </button>\n\n        </ion-buttons>\n\n\n\n        <ion-searchbar *ngIf="isSearch && dynamicList?.search_bar" placeholder="{{dynamicList?.search_bar.hint}}"\n\n            [(ngModel)]="searchString" [showCancelButton]="shouldShowCancel" (ionInput)="onInput($event)" (keyup.enter)="searchEnter()"\n\n            (keyup.esc)="searchEnter()" start>\n\n        </ion-searchbar>\n\n\n\n        <ion-title *ngIf="!isSearch">{{dynamicList?.title}}</ion-title>\n\n\n\n    </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content padding class="background-page gradient">\n\n    <ion-grid>\n\n        <ion-row>\n\n            <ion-col class="background-card gradient grid-border" text-center col-12 offset-xl-3 col-xl-6 offset-lg-3\n\n                col-lg-6 offset-md-2 col-md-8 col-sm-12>\n\n\n\n                <ion-list>\n\n\n\n                    <ion-item-sliding #slidingItem class="background-card" *ngFor="let it of dynamicList?.items">\n\n                        <ion-item #item class="background-item">\n\n                            <ion-icon item-start *ngIf="!isMobile&&it.icon" name="{{it.icon}}" color="{{it.color}}"></ion-icon>\n\n                            <ion-avatar item-start *ngIf="!isMobile&&it.image">\n\n                                <img [src]="it.image">\n\n                            </ion-avatar>\n\n\n\n                            <h1 *ngIf="it.h1">{{it.h1}}</h1>\n\n                            <h2 *ngIf="it.h2">{{it.h2}}</h2>\n\n                            <p *ngIf="it.p">{{it.p}}</p>\n\n                            <ion-note item-end *ngIf="it.note">{{it.note}}</ion-note>\n\n\n\n                            <button item-end *ngIf="!it.isSlidingItemOpen\n\n                                        &&!isMobile\n\n                                        &&it.options\n\n                                        &&it.options.length>0\n\n                                        &&it.options.length<=3"\n\n                                ion-button icon-only round color="secondary" (click)="openSwipeOptions(slidingItem, item, it)">\n\n                                <ion-icon name="arrow-dropleft-circle"></ion-icon>\n\n                            </button>\n\n\n\n                        </ion-item>\n\n\n\n                        <ion-item-options>\n\n                            <button ion-button *ngFor="let opt of it.options" color="{{opt.color}}" (click)="onClickDetails(slidingItem, opt, it)">\n\n                                <ion-icon name="{{opt.icon}}"></ion-icon>\n\n                                {{opt.name}}\n\n                            </button>\n\n                        </ion-item-options>\n\n\n\n                    </ion-item-sliding>\n\n\n\n                </ion-list>\n\n            </ion-col>\n\n        </ion-row>\n\n    </ion-grid>\n\n</ion-content>'/*ion-inline-end:"D:\IONIC\node-server-api\src\pages\dynamic-list\dynamic-list.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_2__services_apiAuthService__["a" /* ApiAuthService */],
            __WEBPACK_IMPORTED_MODULE_3__services_apiHttpPublicServices__["a" /* ApiHttpPublicService */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */]])
    ], DynamicListPage);
    return DynamicListPage;
    var DynamicListPage_1;
}());

//# sourceMappingURL=dynamic-list.js.map

/***/ }),

/***/ 300:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DynamicCardSocialPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_apiAuthService__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_apiHttpPublicServices__ = __webpack_require__(43);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var DynamicCardSocialPage = /** @class */ (function () {
    function DynamicCardSocialPage(platform, authService, pubService, viewCtrl, navCtrl, loadingCtrl, navParams) {
        this.platform = platform;
        this.authService = authService;
        this.pubService = pubService;
        this.viewCtrl = viewCtrl;
        this.navCtrl = navCtrl;
        this.loadingCtrl = loadingCtrl;
        this.navParams = navParams;
        this.isSearch = false;
        this.searchString = '';
        this.shouldShowCancel = false;
        this.isMobile = false;
    }
    DynamicCardSocialPage_1 = DynamicCardSocialPage;
    DynamicCardSocialPage.prototype.ngOnInit = function () {
        var _this = this;
        this.dynamicCardsOrigin = this.navParams.get("list") ? this.navParams.get("list") : this.pubService.getDemoCard();
        this.refresh();
        this.callback = this.navParams.get("callback");
        this.step = this.navParams.get("step");
        this.parent = this.navParams.get("parent");
        var call_waiting_data = this.navParams.get("call_waiting_data");
        if (call_waiting_data) {
            call_waiting_data()
                .then(function (list) {
                _this.refresh(list);
            });
        }
    };
    DynamicCardSocialPage.prototype.refresh = function (newList) {
        if (newList)
            this.dynamicCardsOrigin = newList;
        this.isMobile = (this.platform.platforms()[0] === 'mobile');
        this.dynamicCards = this.dynamicCardsOrigin;
        console.log('cards', this.dynamicCardsOrigin);
    };
    //Su dung search
    //---------------------
    DynamicCardSocialPage.prototype.goSearch = function () {
        this.isSearch = true;
    };
    DynamicCardSocialPage.prototype.searchEnter = function () {
        this.isSearch = false;
    };
    DynamicCardSocialPage.prototype.onInput = function (e) {
        console.log(this.searchString);
    };
    DynamicCardSocialPage.prototype.onClickMedia = function (idx, item) {
        console.log(idx, item);
        var viewItems = [];
        var itemDetail = {
            short_detail: item.short_detail,
            results: item.results,
            actions: item.actions,
            content: { title: item.title, note: item.note }
        };
        var paragraphs = [];
        item.medias.forEach(function (el) {
            paragraphs.push({
                h1: el.h1,
                h2: el.h2,
                p: el.p,
                medias: [el]
            });
        });
        itemDetail.content.paragraphs = paragraphs;
        viewItems.push(itemDetail);
        var btn = { next: "NEXT",
            next_data: {
                data: {
                    title: "Tin chi tiết",
                    buttons: [
                        { color: "primary", icon: "close", next: "CLOSE" }
                    ],
                    items: viewItems
                }
            }
        };
        this.processCommand(btn);
    };
    DynamicCardSocialPage.prototype.onClickHeader = function (btn) {
        console.log(btn);
        this.processCommand(btn);
    };
    DynamicCardSocialPage.prototype.onClickShortDetails = function (btn, item) {
        console.log(btn, item);
        this.processCommand(btn);
    };
    DynamicCardSocialPage.prototype.onClickActions = function (btn, item) {
        console.log(btn, item);
        this.processCommand(btn);
    };
    DynamicCardSocialPage.prototype.processCommand = function (btn) {
        var _this = this;
        if (btn.url) {
            if (btn.method === 'GET') {
                var loading_1 = this.loadingCtrl.create({
                    content: 'Đang xử lý dữ liệu từ máy chủ ....'
                });
                loading_1.present();
                var httpOptions = void 0;
                if (btn.next === 'FILE')
                    httpOptions = { 'responseType': 'blob' };
                this.pubService.getDynamicForm(btn.url, httpOptions)
                    .then(function (data) {
                    //console.log(data);
                    loading_1.dismiss();
                    btn.next_data = {
                        step: _this.step,
                        data: data,
                        next: btn.next,
                        item: btn.item
                    };
                    _this.next(btn);
                })
                    .catch(function (err) {
                    console.log('err getDynamicForm', err);
                    loading_1.dismiss();
                });
            }
            else {
                this.next(btn);
            }
        }
        else {
            console.log('do nothing', btn);
            this.next(btn);
        }
    };
    DynamicCardSocialPage.prototype.next = function (btn) {
        var _this = this;
        if (btn) {
            if (btn.next == 'EXIT') {
                this.platform.exitApp();
            }
            else if (btn.next == 'REFRESH') {
                this.refresh(btn.next_data);
            }
            else if (btn.next == 'CLOSE') {
                try {
                    this.viewCtrl.dismiss(btn.next_data);
                }
                catch (e) { }
            }
            else if (btn.next == 'BACK') {
                try {
                    this.navCtrl.pop();
                }
                catch (e) { }
            }
            else if (btn.next == 'ADD'
                || btn.next == 'SETTINGS'
                || btn.next == 'FRIENDS'
                || btn.next == 'NOTIFY'
                || btn.next == 'LIKE'
                || btn.next == 'COMMENT'
                || btn.next == 'SHARE'
                || btn.next == 'MORE') {
                if (this.callback) {
                    this.callback(btn.next_data)
                        .then(function (nextStep) { return _this.next(nextStep); });
                }
            }
            else if (btn.next == 'NEXT' && btn.next_data && btn.next_data.data) {
                btn.next_data.callback = this.callback; //gan lai cac function object
                btn.next_data.parent = this.parent; //gan lai cac function object
                btn.next_data.form = btn.next_data.data; //gan du lieu tra ve tu server
                this.navCtrl.push(DynamicCardSocialPage_1, btn.next_data);
            }
        }
    };
    DynamicCardSocialPage = DynamicCardSocialPage_1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-dynamic-card-social',template:/*ion-inline-start:"D:\IONIC\node-server-api\src\pages\dynamic-card-social\dynamic-card-social.html"*/'<ion-header>\n\n    <ion-navbar>\n\n        <ion-buttons start *ngIf="!isSearch && dynamicCards?.search_bar">\n\n            <button ion-button icon-only color="primary" (click)="goSearch()">\n\n                <ion-icon name="search"></ion-icon>\n\n            </button>\n\n        </ion-buttons>\n\n\n\n        <ion-searchbar start *ngIf="isSearch && dynamicCards?.search_bar" placeholder="{{dynamicCards?.search_bar.hint}}" [(ngModel)]="searchString"\n\n        [showCancelButton]="shouldShowCancel" (ionInput)="onInput($event)" (keyup.enter)="searchEnter()"\n\n        (keyup.esc)="searchEnter()">\n\n        </ion-searchbar>\n\n        \n\n        <ion-title *ngIf="!isSearch">{{dynamicCards?.title}}</ion-title>\n\n\n\n        <ion-buttons end *ngFor="let btn of dynamicCards?.buttons">\n\n            <button *ngIf="!isSearch" class="badge-background" ion-button icon-only color="{{btn.color}}" (click)="onClickHeader(btn)">\n\n                <ion-icon name="{{btn.icon}}"></ion-icon>\n\n                <ion-badge class="badge-alert" color="danger" *ngIf="btn.alerts">{{ (btn.alerts?.length>99?\'99+\':btn.alerts?.length) }}</ion-badge>\n\n            </button>\n\n        </ion-buttons>\n\n\n\n    </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content no-padding class="background-page gradient">\n\n\n\n    <ion-grid no-padding>\n\n        <ion-row>\n\n            <ion-col col-12 offset-xl-3 col-xl-6 offset-lg-3 col-lg-6 offset-md-2 col-md-8 col-sm-12\n\n                *ngFor="let it of dynamicCards?.items">\n\n                <!-- Card mạng xã hội cho một chủ đề liên quan item -->\n\n                <ion-card class="background-card gradient grid-border">\n\n                    <!-- Tóm lượt chủ đề theo tác giả -->\n\n                    <ion-item class="background-card gradient grid-border" *ngIf="it.short_detail">\n\n                        <ion-icon *ngIf="!it.short_detail?.avatar" item-start name="contact" color="primary"></ion-icon>\n\n                        <ion-avatar item-start *ngIf="it.short_detail?.avatar"><img [src]="it.short_detail?.avatar"></ion-avatar>\n\n                        <h1 *ngIf="it.short_detail?.h1">{{it.short_detail?.h1}}</h1>\n\n                        <h2 *ngIf="it.short_detail?.h2">{{it.short_detail?.h2}}</h2>\n\n                        <h3 *ngIf="it.short_detail?.h3">{{it.short_detail?.h3}}</h3>\n\n                        <p *ngIf="it.short_detail?.p" text-wrap>{{it.short_detail?.p}}</p>\n\n                        <ion-note item-end *ngIf="it.short_detail?.note">{{it.short_detail?.note}}</ion-note>\n\n                        <button item-end icon-only ion-button clear small *ngIf="it.short_detail?.action" color="{{it.short_detail?.action?.color}}" (click)="onClickShortDetails(it.short_detail?.action, it)">\n\n                            <ion-icon name="{{it.short_detail?.action?.icon}}"></ion-icon>\n\n                        </button>\n\n                    </ion-item>\n\n\n\n                    \n\n                    <!-- 1 pics -->\n\n                    <div class="one-image card-background-page" *ngIf="it.medias && it.medias.length===1" (click)="onClickMedia(0,it)">\n\n                        <img [src]="it.medias[0].image"/>\n\n                        <div class="card-title" *ngIf="it.medias[0].title">{{it.medias[0].title}}</div>\n\n                        <div class="card-subtitle" *ngIf="it.medias[0].subtitle">{{it.medias[0].subtitle}}</div>\n\n                    </div>\n\n                    \n\n                    <!-- 2 pics -->\n\n                    <ion-row *ngIf="it.medias && it.medias.length===2">\n\n                        <ion-col no-padding class="padding-col card-background-page" col-6 (click)="onClickMedia(0,it)">\n\n                            <div class="image-height-2" [style.background-image]="\'url(\'+it.medias[0].image+\')\'"></div>\n\n                            <div class="card-title" *ngIf="it.medias[0].title">{{it.medias[0].title}}</div>\n\n                        </ion-col>\n\n                        <ion-col no-padding class="padding-col card-background-page" col-6 (click)="onClickMedia(1,it)">\n\n                            <div class="image-height-2" [style.background-image]="\'url(\'+it.medias[1].image+\')\'"></div>\n\n                            <div class="card-title" *ngIf="it.medias[1].title">{{it.medias[1].title}}</div>\n\n                        </ion-col>\n\n                    </ion-row>\n\n                    \n\n                    <!-- 3 pics -->\n\n                    <ion-row *ngIf="it.medias && it.medias.length===3">\n\n                        <ion-col no-padding class="padding-col card-background-page" col-12 col-md-4 col-xl-4 (click)="onClickMedia(0,it)">\n\n                            <div class="image-height-1" [style.background-image]="\'url(\'+it.medias[0].image+\')\'"></div>\n\n                            <div class="card-title" *ngIf="it.medias[0].title">{{it.medias[0].title}}</div>\n\n                        </ion-col>\n\n                        <ion-col no-padding class="padding-col card-background-page" col-6 col-md-4 col-xl-4 (click)="onClickMedia(1,it)">\n\n                            <div class="image-height-2" [style.background-image]="\'url(\'+it.medias[1].image+\')\'"></div>\n\n                        </ion-col>\n\n                        <ion-col no-padding class="padding-col card-background-page" col-6 col-md-4 col-xl-4 (click)="onClickMedia(2,it)">\n\n                            <div class="image-height-2" [style.background-image]="\'url(\'+it.medias[2].image+\')\'"></div>\n\n                        </ion-col>\n\n                    </ion-row>\n\n                    \n\n                    <!-- 4 pics -->\n\n                    <ion-row *ngIf="it.medias && it.medias.length===4">\n\n                        <ion-col no-padding class="padding-col card-background-page" col-6 col-md-6 col-xl-3 (click)="onClickMedia(0,it)">\n\n                            <div class="image-height-2" [style.background-image]="\'url(\'+it.medias[0].image+\')\'"></div>\n\n                            <div class="card-title" *ngIf="it.medias[0].title">{{it.medias[0].title}}</div>\n\n                        </ion-col>\n\n                        <ion-col no-padding class="padding-col card-background-page" col-6 col-md-6 col-xl-3 (click)="onClickMedia(1,it)">\n\n                            <div class="image-height-2" [style.background-image]="\'url(\'+it.medias[1].image+\')\'"></div>\n\n                        </ion-col>\n\n                        <ion-col no-padding class="padding-col card-background-page" col-6 col-md-6 col-xl-3 (click)="onClickMedia(2,it)">\n\n                            <div class="image-height-2" [style.background-image]="\'url(\'+it.medias[2].image+\')\'"></div>\n\n                        </ion-col>\n\n                        <ion-col no-padding class="padding-col card-background-page" col-6 col-md-6 col-xl-3 (click)="onClickMedia(3,it)">\n\n                            <div class="image-height-2" [style.background-image]="\'url(\'+it.medias[3].image+\')\'"></div>\n\n                        </ion-col>\n\n                    </ion-row>\n\n                    \n\n                    <!-- 5+ pics -->\n\n                    <ion-row *ngIf="it.medias && it.medias.length>=5">\n\n                        <ion-col no-padding class="padding-col card-background-page" col-6 (click)="onClickMedia(0,it)">\n\n                            <div class="image-height-2" [style.background-image]="\'url(\'+it.medias[0].image+\')\'"></div>\n\n                            <div class="card-title" *ngIf="it.medias[0].title">{{it.medias[0].title}}</div>\n\n                        </ion-col>\n\n                        <ion-col no-padding class="padding-col card-background-page" col-6 (click)="onClickMedia(1,it)">\n\n                            <div class="image-height-2" [style.background-image]="\'url(\'+it.medias[1].image+\')\'"></div>\n\n                            <div class="card-title" *ngIf="it.medias[1].title">{{it.medias[1].title}}</div>\n\n                        </ion-col>\n\n                        <ion-col no-padding class="padding-col card-background-page" col-4 (click)="onClickMedia(2,it)">\n\n                            <div class="image-height-3" [style.background-image]="\'url(\'+it.medias[2].image+\')\'"></div>\n\n                        </ion-col>\n\n                        <ion-col no-padding class="padding-col card-background-page" col-4 (click)="onClickMedia(3,it)">\n\n                            <div class="image-height-3" [style.background-image]="\'url(\'+it.medias[3].image+\')\'"></div>\n\n                        </ion-col>\n\n                        <ion-col no-padding class="padding-col card-background-page" col-4 (click)="onClickMedia(4,it)">\n\n                            <div class="image-height-3" [style.background-image]="\'url(\'+it.medias[4].image+\')\'"></div>\n\n                            <div class="card-title" *ngIf="it.medias.length>5">+{{(it.medias.length-5)}}</div>\n\n                        </ion-col>\n\n                    </ion-row>\n\n                    \n\n                    <ion-card-content *ngIf="it.content">\n\n                        <ion-card-title *ngIf="it.content.title">\n\n                            {{it.content.title}}\n\n                        </ion-card-title>\n\n                        <div *ngFor="let ph of it.content.paragraphs">\n\n                            <h1 *ngIf="ph.h1">{{ph.h1}}</h1>\n\n                            <div *ngFor="let md of ph.medias" class="card-background-page-top">\n\n                                <img class="one-image" [src]="md.image" />\n\n                                <div *ngIf="md.title" class="card-title-top">{{md.title}}</div>\n\n                                <div *ngIf="md.subtitle" class="card-subtitle-top">{{md.subtitle}}</div>\n\n                            </div>\n\n                            <h2 *ngIf="ph.h2">{{ph.h2}}</h2>\n\n                            <h3 *ngIf="ph.h3">{{ph.h3}}</h3>\n\n                            <p *ngIf="ph.p" style="text-align: justify;">{{ph.p}}</p>\n\n                        </div>\n\n                        <ion-note *ngIf="it.content.note">{{it.content.note}}</ion-note>\n\n                    </ion-card-content>\n\n\n\n                    <ion-row no-padding *ngIf="it.results">\n\n                        <ion-col align-self-center text-center>\n\n                            <div *ngIf="it.results.likes">\n\n                                <ion-icon *ngIf="it.results.likes.like" color="primary" icon-start clear small name="thumbs-up"></ion-icon>\n\n                                <ion-icon *ngIf="it.results.likes.love" color="danger" icon-start clear small name="heart"></ion-icon>\n\n                                <ion-icon *ngIf="it.results.likes.unlike" color="dark" icon-start clear small name="thumbs-down"></ion-icon>\n\n                                <ion-icon *ngIf="it.results.likes.sad" color="royal" icon-start clear small name="sad"></ion-icon>\n\n                                <ion-icon *ngIf="it.results.likes.angery" color="angery" icon-start clear small name="ios-sad"></ion-icon>\n\n                                <ion-note>{{(it.results.likes.like?.length\n\n                                            +it.results.likes.love?.length\n\n                                            +it.results.likes.unlike?.length\n\n                                            +it.results.likes.sad?.length\n\n                                            +it.results.likes.angery?.length\n\n                                            )}}</ion-note>\n\n                            </div>\n\n                        </ion-col>\n\n                        <ion-col align-self-center text-center>\n\n                            <ion-note *ngIf="it.results.comments&&it.results.comments.length>0">{{(it.results.comments.length)}} Comments</ion-note>\n\n                        </ion-col>\n\n                        <ion-col align-self-center text-center>\n\n                            <ion-note *ngIf="it.results.shares&&it.results.shares.length>0">{{(it.results.shares.length)}} Shares</ion-note>\n\n                        </ion-col>\n\n                    </ion-row>\n\n                    <ion-row no-padding *ngIf="it.actions">\n\n                        <ion-col text-center>\n\n                            <button *ngIf="it.actions.like" ion-button clear small color="{{it.actions.like.color}}" (click)="onClickActions(it.actions.like, it)" icon-start>\n\n                                <ion-icon name="{{it.actions.like.icon}}"></ion-icon>\n\n                                {{it.actions.like.name}}\n\n                            </button>\n\n                        </ion-col>\n\n                        <ion-col text-center>\n\n                            <button *ngIf="it.actions.comment" ion-button clear small color="{{it.actions.comment.color}}" (click)="onClickActions(it.actions.comment, it)" icon-start>\n\n                                <ion-icon name=\'{{it.actions.comment.icon}}\'></ion-icon>\n\n                                {{it.actions.comment.name}}\n\n                            </button>\n\n                        </ion-col>\n\n                        <ion-col text-center>\n\n                            <button *ngIf="it.actions.share" ion-button clear small color="{{it.actions.share.color}}" (click)="onClickActions(it.actions.share, it)" icon-start>\n\n                                <ion-icon name=\'{{it.actions.share.icon}}\'></ion-icon>\n\n                                {{it.actions.share.name}}\n\n                            </button>\n\n                        </ion-col>\n\n                    </ion-row>\n\n                </ion-card>\n\n            </ion-col>\n\n\n\n        </ion-row>\n\n\n\n    </ion-grid>\n\n\n\n</ion-content>'/*ion-inline-end:"D:\IONIC\node-server-api\src\pages\dynamic-card-social\dynamic-card-social.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_2__services_apiAuthService__["a" /* ApiAuthService */],
            __WEBPACK_IMPORTED_MODULE_3__services_apiHttpPublicServices__["a" /* ApiHttpPublicService */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */]])
    ], DynamicCardSocialPage);
    return DynamicCardSocialPage;
    var DynamicCardSocialPage_1;
}());

//# sourceMappingURL=dynamic-card-social.js.map

/***/ }),

/***/ 301:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DynamicMediasPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_apiAuthService__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_apiHttpPublicServices__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_apiImageService__ = __webpack_require__(296);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var DynamicMediasPage = /** @class */ (function () {
    function DynamicMediasPage(platform, authService, apiImageService, pubService, viewCtrl, navCtrl, loadingCtrl, navParams) {
        this.platform = platform;
        this.authService = authService;
        this.apiImageService = apiImageService;
        this.pubService = pubService;
        this.viewCtrl = viewCtrl;
        this.navCtrl = navCtrl;
        this.loadingCtrl = loadingCtrl;
        this.navParams = navParams;
        this.isSearch = false;
        this.searchString = '';
        this.shouldShowCancel = true;
        this.isMobile = false;
        this.isHide = true;
        this.showButton = { key: "down", link_key: "up", name: "Mở rộng", color: "primary", icon: "arrow-dropdown-circle", next: "DOWN" };
        this.hideButton = { key: "up", link_key: "down", name: "Thu gọn", color: "primary", icon: "arrow-dropup-circle", next: "UP" };
        this.isHideNote = false;
    }
    DynamicMediasPage_1 = DynamicMediasPage;
    DynamicMediasPage.prototype.ngOnInit = function () {
        var _this = this;
        this.dynamicMediasOrigin = this.navParams.get("list") ? this.navParams.get("list") : this.pubService.getDemoMedias();
        this.refresh();
        this.myShow = this.showButton;
        this.callback = this.navParams.get("callback");
        this.step = this.navParams.get("step");
        this.parent = this.navParams.get("parent");
        var call_waiting_data = this.navParams.get("call_waiting_data");
        if (call_waiting_data) {
            call_waiting_data()
                .then(function (list) {
                _this.refresh(list);
                _this.myShow = _this.showButton;
            });
        }
    };
    DynamicMediasPage.prototype.refresh = function (newList) {
        if (newList)
            this.dynamicMediasOrigin = newList;
        this.isMobile = (this.platform.platforms()[0] === 'mobile');
        this.dynamicMedias = this.dynamicMediasOrigin;
        this.showButton = (this.dynamicMedias.actions && this.dynamicMedias.actions.open) ? this.dynamicMedias.actions.open : this.showButton;
        this.hideButton = (this.dynamicMedias.actions && this.dynamicMedias.actions.close) ? this.dynamicMedias.actions.close : this.hideButton;
    };
    DynamicMediasPage.prototype.fileChange = function (event, action) {
        var _this = this;
        if (event.target && event.target.files) {
            var size_1 = (action && action.size !== undefined && action.size !== null) ? action.size : 480; //default site anh
            var files_1 = event.target.files;
            var processImages = new Promise(function (resolve, reject) {
                var fileProcessed = [];
                var countFile = Object.keys(files_1).length, countResize = 0;
                if (files_1.length === 0)
                    resolve();
                for (var key in files_1) {
                    if (!isNaN(parseInt(key))) {
                        _this.apiImageService.resizeImage(files_1[key].name, files_1[key], size_1)
                            .then(function (data) {
                            fileProcessed.push(data);
                            if (++countResize >= countFile) {
                                resolve(fileProcessed);
                            }
                        })
                            .catch(function (err) {
                            reject(err);
                        });
                    }
                }
            });
            var loading_1 = this.loadingCtrl.create({
                content: 'Đang xử lý các ảnh theo định dạng lưu trữ tiết kiệm ....'
            });
            loading_1.present();
            processImages.then(function (data) {
                if (data) {
                    _this.dynamicMediasOrigin.medias = data;
                    _this.refresh();
                }
                loading_1.dismiss();
            })
                .catch(function (err) {
                loading_1.dismiss();
            });
            setTimeout(function () {
                //1 phut ma ko x ly duoc thi thoat ra cho cai khac thuc hien
                loading_1.dismiss();
            }, 60000);
        }
    };
    DynamicMediasPage.prototype.onClickShowNote = function () {
        this.isHideNote = !this.isHideNote;
    };
    DynamicMediasPage.prototype.onClickShowHide = function (btn) {
        this.isHide = !this.isHide;
        this.myShow = this.myShow == this.hideButton ? this.showButton : this.hideButton;
    };
    DynamicMediasPage.prototype.onClickHeader = function (btn) {
        console.log(btn);
        this.processCommand(btn);
    };
    DynamicMediasPage.prototype.onClickMedia = function (idx, item) {
        console.log(idx, item);
        var btn = {};
        this.processCommand(btn);
    };
    DynamicMediasPage.prototype.onClickAction = function (btn) {
        console.log(btn);
        this.processCommand(btn);
    };
    DynamicMediasPage.prototype.processCommand = function (btn) {
        var _this = this;
        if (btn.url) {
            if (btn.method === 'GET') {
                var loading_2 = this.loadingCtrl.create({
                    content: 'Đang xử lý dữ liệu từ máy chủ ....'
                });
                loading_2.present();
                var httpOptions = void 0;
                if (btn.next === 'FILE')
                    httpOptions = { 'responseType': 'blob' };
                this.pubService.getDynamicForm(btn.url, httpOptions)
                    .then(function (data) {
                    //console.log(data);
                    loading_2.dismiss();
                    btn.next_data = {
                        step: _this.step,
                        data: data,
                        next: btn.next,
                        item: btn.item
                    };
                    _this.next(btn);
                })
                    .catch(function (err) {
                    console.log('err getDynamicForm', err);
                    loading_2.dismiss();
                });
            }
            else if (btn.method === 'FORM-DATA'
                && this.dynamicMedias
                && this.dynamicMedias.medias
                && this.dynamicMedias.medias.length > 0) {
                var loading_3 = this.loadingCtrl.create({
                    content: 'Đang xử lý dữ liệu từ máy chủ ....'
                });
                loading_3.present();
                var form_data_1 = new FormData();
                form_data_1.append("count_image", this.dynamicMedias.medias.length);
                this.dynamicMedias.medias.forEach(function (el, idx) {
                    if (el.file && el.filename)
                        form_data_1.append("image" + idx, el.file, el.filename);
                });
                if (btn.token) {
                    this.authService.postDynamicFormData(btn.url, form_data_1)
                        .then(function (data) {
                        console.log('receive form data:', data);
                        loading_3.dismiss();
                        _this.next(btn);
                    })
                        .catch(function (err) {
                        console.log('err postDynamicFormData', err);
                        loading_3.dismiss();
                    });
                }
                else {
                    this.pubService.postDynamicFormData(btn.url, form_data_1)
                        .then(function (data) {
                        console.log('receive form data:', data);
                        loading_3.dismiss();
                        _this.next(btn);
                    })
                        .catch(function (err) {
                        console.log('err postDynamicFormData', err);
                        loading_3.dismiss();
                    });
                }
            }
            else if (btn.method === 'POST'
                && this.dynamicMedias
                && this.dynamicMedias.medias
                && this.dynamicMedias.medias.length > 0) {
                var loading_4 = this.loadingCtrl.create({
                    content: 'Đang xử lý dữ liệu từ máy chủ ....'
                });
                loading_4.present();
                var json_data_1 = { medias: [] };
                this.dynamicMedias.medias.forEach(function (el) {
                    json_data_1.medias.push({ image: el.image });
                });
                if (btn.token) {
                    this.authService.postDynamicForm(btn.url, json_data_1)
                        .then(function (data) {
                        console.log('receive:', data);
                        loading_4.dismiss();
                        _this.next(btn);
                    })
                        .catch(function (err) {
                        console.log('err postDynamicForm', err);
                        loading_4.dismiss();
                    });
                }
                else {
                    this.pubService.postDynamicForm(btn.url, json_data_1)
                        .then(function (data) {
                        console.log('receive:', data);
                        loading_4.dismiss();
                        _this.next(btn);
                    })
                        .catch(function (err) {
                        console.log('err postDynamicForm', err);
                        loading_4.dismiss();
                    });
                }
            }
            else {
                this.next(btn);
            }
        }
        else {
            //console.log('do nothing',btn);
            this.next(btn);
        }
    };
    DynamicMediasPage.prototype.next = function (btn) {
        var _this = this;
        if (btn) {
            if (btn.next == 'EXIT') {
                this.platform.exitApp();
            }
            else if (btn.next == 'REFRESH') {
                this.refresh(btn.next_data);
            }
            else if (btn.next == 'CLOSE') {
                try {
                    this.viewCtrl.dismiss(btn.next_data);
                }
                catch (e) { }
            }
            else if (btn.next == 'BACK') {
                try {
                    this.navCtrl.pop();
                }
                catch (e) { }
            }
            else if (btn.next == 'ADD'
                || btn.next == 'SETTINGS'
                || btn.next == 'FRIENDS'
                || btn.next == 'NOTIFY'
                || btn.next == 'LIKE'
                || btn.next == 'COMMENT'
                || btn.next == 'SHARE'
                || btn.next == 'MORE') {
                if (this.callback) {
                    this.callback(btn.next_data)
                        .then(function (nextStep) { return _this.next(nextStep); });
                }
            }
            else if (btn.next == 'NEXT' && btn.next_data && btn.next_data.data) {
                btn.next_data.callback = this.callback; //gan lai cac function object
                btn.next_data.parent = this.parent; //gan lai cac function object
                btn.next_data.form = btn.next_data.data; //gan du lieu tra ve tu server
                this.navCtrl.push(DynamicMediasPage_1, btn.next_data);
            }
        }
    };
    DynamicMediasPage = DynamicMediasPage_1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-dynamic-medias',template:/*ion-inline-start:"D:\IONIC\node-server-api\src\pages\dynamic-medias\dynamic-medias.html"*/'<ion-header *ngIf="dynamicMedias.title || dynamicMedias.buttons">\n\n    <ion-navbar>\n\n        <ion-title>{{dynamicMedias?.title}}</ion-title>\n\n\n\n        <ion-buttons end *ngFor="let btn of dynamicMedias.buttons">\n\n            <button *ngIf="!btn.invisible" class="badge-background" ion-button icon-only color="{{btn.color}}" (click)="onClickHeader(btn)">\n\n                <ion-icon name="{{btn.icon}}"></ion-icon>\n\n                <ion-badge class="badge-alert" color="danger" *ngIf="btn.alerts">{{ (btn.alerts?.length>99?\'99+\':btn.alerts?.length) }}</ion-badge>\n\n            </button>\n\n        </ion-buttons>\n\n\n\n    </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content no-padding class="background-page gradient">\n\n\n\n    <ion-grid no-padding>\n\n        <ion-row>\n\n            <ion-col col-12 offset-xl-3 col-xl-6 offset-lg-3 col-lg-6 offset-md-2 col-md-8 col-sm-12>\n\n                <ion-card *ngIf="isHide" class="background-card gradient grid-border">\n\n\n\n                    <!-- 1 pics -->\n\n                    <div class="one-image card-background-page" *ngIf="dynamicMedias.medias && dynamicMedias.medias.length===1" (click)="onClickMedia(0,dynamicMedias)">\n\n                        <img [src]="dynamicMedias.medias[0].image" />\n\n                        <div class="card-title" *ngIf="dynamicMedias.medias[0].title">{{dynamicMedias.medias[0].title}}</div>\n\n                        <div class="card-subtitle" *ngIf="dynamicMedias.medias[0].subtitle">{{dynamicMedias.medias[0].subtitle}}</div>\n\n\n\n                    </div>\n\n\n\n                    <!-- 2 pics -->\n\n                    <ion-row *ngIf="dynamicMedias.medias && dynamicMedias.medias.length===2">\n\n                        <ion-col no-padding class="padding-col card-background-page" col-6 (click)="onClickMedia(0,dynamicMedias)">\n\n                            <div class="image-height-2" [style.background-image]="\'url(\'+dynamicMedias.medias[0].image+\')\'"></div>\n\n                            <div class="card-title" *ngIf="dynamicMedias.medias[0].title">{{dynamicMedias.medias[0].title}}</div>\n\n                            <div class="card-subtitle" *ngIf="dynamicMedias.medias[0].subtitle">{{dynamicMedias.medias[0].subtitle}}</div>\n\n                        </ion-col>\n\n                        <ion-col no-padding class="padding-col card-background-page" col-6 (click)="onClickMedia(1,dynamicMedias)">\n\n                            <div class="image-height-2" [style.background-image]="\'url(\'+dynamicMedias.medias[1].image+\')\'"></div>\n\n                            <div class="card-title" *ngIf="dynamicMedias.medias[1].title">{{dynamicMedias.medias[1].title}}</div>\n\n                            <div class="card-subtitle" *ngIf="dynamicMedias.medias[1].subtitle">{{dynamicMedias.medias[1].subtitle}}</div>\n\n                        </ion-col>\n\n                    </ion-row>\n\n                    \n\n                    <!-- 3 pics -->\n\n                    <ion-row *ngIf="dynamicMedias.medias && dynamicMedias.medias.length===3">\n\n                        <ion-col no-padding class="padding-col card-background-page" col-12 col-md-4 col-xl-4 (click)="onClickMedia(0,dynamicMedias)">\n\n                            <div class="image-height-1" [style.background-image]="\'url(\'+dynamicMedias.medias[0].image+\')\'"></div>\n\n                            <div class="card-title" *ngIf="dynamicMedias.medias[0].title">{{dynamicMedias.medias[0].title}}</div>\n\n                            <div class="card-subtitle" *ngIf="dynamicMedias.medias[0].subtitle">{{dynamicMedias.medias[0].subtitle}}</div>\n\n                        </ion-col>\n\n                        <ion-col no-padding class="padding-col card-background-page" col-6 col-md-4 col-xl-4 (click)="onClickMedia(1,dynamicMedias)">\n\n                            <div class="image-height-2" [style.background-image]="\'url(\'+dynamicMedias.medias[1].image+\')\'"></div>\n\n                        </ion-col>\n\n                        <ion-col no-padding class="padding-col card-background-page" col-6 col-md-4 col-xl-4 (click)="onClickMedia(2,dynamicMedias)">\n\n                            <div class="image-height-2" [style.background-image]="\'url(\'+dynamicMedias.medias[2].image+\')\'"></div>\n\n                        </ion-col>\n\n                    </ion-row>\n\n                    \n\n                    <!-- 4 pics -->\n\n                    <ion-row *ngIf="dynamicMedias.medias && dynamicMedias.medias.length===4">\n\n                        <ion-col no-padding class="padding-col card-background-page" col-6 col-md-6 col-xl-3 (click)="onClickMedia(0,dynamicMedias)">\n\n                            <div class="image-height-2" [style.background-image]="\'url(\'+dynamicMedias.medias[0].image+\')\'"></div>\n\n                            <div class="card-title" *ngIf="dynamicMedias.medias[0].title">{{dynamicMedias.medias[0].title}}</div>\n\n                            <div class="card-subtitle" *ngIf="dynamicMedias.medias[0].subtitle">{{dynamicMedias.medias[0].subtitle}}</div>\n\n                        </ion-col>\n\n                        <ion-col no-padding class="padding-col card-background-page" col-6 col-md-6 col-xl-3 (click)="onClickMedia(1,dynamicMedias)">\n\n                            <div class="image-height-2" [style.background-image]="\'url(\'+dynamicMedias.medias[1].image+\')\'"></div>\n\n                            <div class="card-title" *ngIf="dynamicMedias.medias[1].title">{{dynamicMedias.medias[1].title}}</div>\n\n                            <div class="card-subtitle" *ngIf="dynamicMedias.medias[1].subtitle">{{dynamicMedias.medias[1].subtitle}}</div>\n\n                        </ion-col>\n\n                        <ion-col no-padding class="padding-col card-background-page" col-6 col-md-6 col-xl-3 (click)="onClickMedia(2,dynamicMedias)">\n\n                            <div class="image-height-2" [style.background-image]="\'url(\'+dynamicMedias.medias[2].image+\')\'"></div>\n\n                        </ion-col>\n\n                        <ion-col no-padding class="padding-col card-background-page" col-6 col-md-6 col-xl-3 (click)="onClickMedia(3,dynamicMedias)">\n\n                            <div class="image-height-2" [style.background-image]="\'url(\'+dynamicMedias.medias[3].image+\')\'"></div>\n\n                        </ion-col>\n\n                    </ion-row>\n\n                    \n\n                    <!-- 5+ pics -->\n\n                    <ion-row *ngIf="dynamicMedias.medias && dynamicMedias.medias.length>=5">\n\n                        <ion-col no-padding class="padding-col card-background-page" col-6 (click)="onClickMedia(0,dynamicMedias)">\n\n                            <div class="image-height-2" [style.background-image]="\'url(\'+dynamicMedias.medias[0].image+\')\'"></div>\n\n                            <div class="card-title" *ngIf="dynamicMedias.medias[0].title">{{dynamicMedias.medias[0].title}}</div>\n\n                            <div class="card-subtitle" *ngIf="dynamicMedias.medias[0].subtitle">{{dynamicMedias.medias[0].subtitle}}</div>\n\n                        </ion-col>\n\n                        <ion-col no-padding class="padding-col card-background-page" col-6 (click)="onClickMedia(1,dynamicMedias)">\n\n                            <div class="image-height-2" [style.background-image]="\'url(\'+dynamicMedias.medias[1].image+\')\'"></div>\n\n                            <div class="card-title" *ngIf="dynamicMedias.medias[1].title">{{dynamicMedias.medias[1].title}}</div>\n\n                            <div class="card-subtitle" *ngIf="dynamicMedias.medias[1].subtitle">{{dynamicMedias.medias[1].subtitle}}</div>\n\n                        </ion-col>\n\n                        <ion-col no-padding class="padding-col card-background-page" col-4 (click)="onClickMedia(2,dynamicMedias)">\n\n                            <div class="image-height-3" [style.background-image]="\'url(\'+dynamicMedias.medias[2].image+\')\'"></div>\n\n                        </ion-col>\n\n                        <ion-col no-padding class="padding-col card-background-page" col-4 (click)="onClickMedia(3,dynamicMedias)">\n\n                            <div class="image-height-3" [style.background-image]="\'url(\'+dynamicMedias.medias[3].image+\')\'"></div>\n\n                        </ion-col>\n\n                        <ion-col no-padding class="padding-col card-background-page" col-4 (click)="onClickMedia(4,dynamicMedias)">\n\n                            <div class="image-height-3" [style.background-image]="\'url(\'+dynamicMedias.medias[4].image+\')\'"></div>\n\n                            <div class="card-title" *ngIf="dynamicMedias.medias.length>5">+{{(dynamicMedias.medias.length-5)}}</div>\n\n                        </ion-col>\n\n                    </ion-row>\n\n                </ion-card>\n\n\n\n                <ion-card *ngIf="!isHide" class="background-card gradient grid-border">\n\n                    <ion-card-content>\n\n                        <div *ngFor="let md of dynamicMedias.medias">\n\n                                <h1 *ngIf="md.h1">{{md.h1}}</h1>\n\n                                <img class="one-image" [src]="md.image" />\n\n                                <div *ngIf="md.title">{{md.title}}</div>\n\n                                <div *ngIf="md.subtitle">{{md.subtitle}}</div>\n\n                            <h2 *ngIf="md.h2">{{md.h2}}</h2>\n\n                            <h3 *ngIf="md.h3">{{md.h3}}</h3>\n\n                            <p *ngIf="md.p" style="text-align: justify;">{{md.p}}</p>\n\n                            <button *ngIf="!isHideNote&&md.note" ion-button icon-only round color="royal" (click)="onClickShowNote()">\n\n                                <ion-icon name="arrow-dropdown"></ion-icon>\n\n                            </button>\n\n                            <ion-note *ngIf="isHideNote&&md.note">{{md.note}}</ion-note>\n\n                            <button *ngIf="isHideNote&&md.note" ion-button icon-only round color="royal" (click)="onClickShowNote()">\n\n                                <ion-icon name="arrow-dropup"></ion-icon>\n\n                            </button>\n\n                        </div>\n\n                    </ion-card-content>\n\n                </ion-card>\n\n\n\n                <ion-row *ngIf="dynamicMedias.actions" no-padding >\n\n\n\n                    <ion-col *ngFor="let myBtn of dynamicMedias.actions.buttons" text-center>\n\n                        <button icon-start class="file-background" ion-button round color="{{myBtn.color}}" (click)="onClickAction(myBtn)">\n\n                            <ion-icon name="{{myBtn.icon}}"></ion-icon>\n\n                            {{myBtn.name}}\n\n                        </button>\n\n                    </ion-col>\n\n\n\n                    <ion-col *ngIf="dynamicMedias.actions.files" text-center>\n\n                        <button icon-start class="file-background" ion-button round color="{{dynamicMedias.actions.files.color}}">\n\n                            <input class="file-over" type="file" multiple accept="image/*" (change)="fileChange($event,dynamicMedias.actions.files)">\n\n                            <ion-icon name="{{dynamicMedias.actions.files.icon}}"></ion-icon>\n\n                            {{dynamicMedias.actions.files.name}}\n\n                        </button>\n\n                    </ion-col>\n\n                    <ion-col *ngIf="dynamicMedias.actions.file" text-center>\n\n                        <button icon-start class="file-background" ion-button round color="{{dynamicMedias.actions.file.color}}">\n\n                            <input class="file-over" type="file" expandable accept="image/*" (change)="fileChange($event,dynamicMedias.actions.file)">\n\n                            <ion-icon name="{{dynamicMedias.actions.file.icon}}"></ion-icon>\n\n                            {{dynamicMedias.actions.file.name}}\n\n                        </button>\n\n                    </ion-col>\n\n                    <ion-col  *ngIf="dynamicMedias.actions.open" text-center>\n\n                        <button icon-start class="file-background" ion-button round color="{{myShow.color}}" (click)="onClickShowHide(myShow)">\n\n                            <ion-icon name="{{myShow.icon}}"></ion-icon>\n\n                            {{myShow.name}}\n\n                        </button>\n\n                    </ion-col>\n\n                </ion-row>\n\n\n\n            </ion-col>\n\n\n\n        </ion-row>\n\n\n\n    </ion-grid>\n\n\n\n</ion-content>'/*ion-inline-end:"D:\IONIC\node-server-api\src\pages\dynamic-medias\dynamic-medias.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_2__services_apiAuthService__["a" /* ApiAuthService */],
            __WEBPACK_IMPORTED_MODULE_4__services_apiImageService__["a" /* ApiImageService */],
            __WEBPACK_IMPORTED_MODULE_3__services_apiHttpPublicServices__["a" /* ApiHttpPublicService */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */]])
    ], DynamicMediasPage);
    return DynamicMediasPage;
    var DynamicMediasPage_1;
}());

//# sourceMappingURL=dynamic-medias.js.map

/***/ }),

/***/ 302:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(303);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(323);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 323:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ionic_native_splash_screen__ = __webpack_require__(167);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_native_status_bar__ = __webpack_require__(170);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_forms__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ionic_angular__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_common_http__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_angular_webstorage_service__ = __webpack_require__(251);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__services_apiStorageService__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__services_apiAuthService__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__services_apiImageService__ = __webpack_require__(296);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__services_apiResourceServices__ = __webpack_require__(153);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__interceptors_requestInterceptor__ = __webpack_require__(136);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__interceptors_responseInterceptor__ = __webpack_require__(497);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__app_component__ = __webpack_require__(501);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__pages_home_home__ = __webpack_require__(297);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__pages_tabs_tabs__ = __webpack_require__(298);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__pages_dynamic_form_web_dynamic_form_web__ = __webpack_require__(155);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__pages_dynamic_list_dynamic_list__ = __webpack_require__(299);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__pages_dynamic_form_mobile_dynamic_form_mobile__ = __webpack_require__(154);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__pages_dynamic_card_social_dynamic_card_social__ = __webpack_require__(300);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__pages_dynamic_medias_dynamic_medias__ = __webpack_require__(301);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__services_apiHttpPublicServices__ = __webpack_require__(43);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
























var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_3__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_14__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_15__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_16__pages_tabs_tabs__["a" /* TabsPage */],
                __WEBPACK_IMPORTED_MODULE_17__pages_dynamic_form_web_dynamic_form_web__["a" /* DynamicFormWebPage */],
                __WEBPACK_IMPORTED_MODULE_18__pages_dynamic_list_dynamic_list__["a" /* DynamicListPage */],
                __WEBPACK_IMPORTED_MODULE_19__pages_dynamic_form_mobile_dynamic_form_mobile__["a" /* DynamicFormMobilePage */],
                __WEBPACK_IMPORTED_MODULE_20__pages_dynamic_card_social_dynamic_card_social__["a" /* DynamicCardSocialPage */],
                __WEBPACK_IMPORTED_MODULE_21__pages_dynamic_medias_dynamic_medias__["a" /* DynamicMediasPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_4__angular_forms__["b" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_4__angular_forms__["e" /* ReactiveFormsModule */],
                __WEBPACK_IMPORTED_MODULE_6__angular_common_http__["c" /* HttpClientModule */],
                __WEBPACK_IMPORTED_MODULE_7_angular_webstorage_service__["b" /* StorageServiceModule */],
                __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["e" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_14__app_component__["a" /* MyApp */], {}, {
                    links: []
                })
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_5_ionic_angular__["c" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_14__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_15__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_16__pages_tabs_tabs__["a" /* TabsPage */],
                __WEBPACK_IMPORTED_MODULE_17__pages_dynamic_form_web_dynamic_form_web__["a" /* DynamicFormWebPage */],
                __WEBPACK_IMPORTED_MODULE_18__pages_dynamic_list_dynamic_list__["a" /* DynamicListPage */],
                __WEBPACK_IMPORTED_MODULE_19__pages_dynamic_form_mobile_dynamic_form_mobile__["a" /* DynamicFormMobilePage */],
                __WEBPACK_IMPORTED_MODULE_20__pages_dynamic_card_social_dynamic_card_social__["a" /* DynamicCardSocialPage */],
                __WEBPACK_IMPORTED_MODULE_21__pages_dynamic_medias_dynamic_medias__["a" /* DynamicMediasPage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_1__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_0__ionic_native_splash_screen__["a" /* SplashScreen */],
                __WEBPACK_IMPORTED_MODULE_12__interceptors_requestInterceptor__["a" /* RequestInterceptor */],
                __WEBPACK_IMPORTED_MODULE_9__services_apiAuthService__["a" /* ApiAuthService */],
                __WEBPACK_IMPORTED_MODULE_10__services_apiImageService__["a" /* ApiImageService */],
                __WEBPACK_IMPORTED_MODULE_8__services_apiStorageService__["a" /* ApiStorageService */],
                __WEBPACK_IMPORTED_MODULE_11__services_apiResourceServices__["a" /* ApiResourceService */],
                __WEBPACK_IMPORTED_MODULE_22__services_apiHttpPublicServices__["a" /* ApiHttpPublicService */],
                {
                    provide: __WEBPACK_IMPORTED_MODULE_6__angular_common_http__["a" /* HTTP_INTERCEPTORS */],
                    useClass: __WEBPACK_IMPORTED_MODULE_12__interceptors_requestInterceptor__["a" /* RequestInterceptor */],
                    multi: true
                },
                {
                    provide: __WEBPACK_IMPORTED_MODULE_6__angular_common_http__["a" /* HTTP_INTERCEPTORS */],
                    useClass: __WEBPACK_IMPORTED_MODULE_13__interceptors_responseInterceptor__["a" /* ResponseInterceptor */],
                    multi: true
                },
                {
                    provide: __WEBPACK_IMPORTED_MODULE_3__angular_core__["u" /* ErrorHandler */],
                    useClass: __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["d" /* IonicErrorHandler */]
                }
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 37:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ApiAuthService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__apiStorageService__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__interceptors_requestInterceptor__ = __webpack_require__(136);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__ = __webpack_require__(377);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_node_rsa__ = __webpack_require__(378);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_node_rsa___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_node_rsa__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_jsonwebtoken__ = __webpack_require__(480);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_jsonwebtoken___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_jsonwebtoken__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var ApiAuthService = /** @class */ (function () {
    function ApiAuthService(httpClient, apiStorageService, reqInterceptor) {
        this.httpClient = httpClient;
        this.apiStorageService = apiStorageService;
        this.reqInterceptor = reqInterceptor;
        this.authenticationServer = __WEBPACK_IMPORTED_MODULE_2__apiStorageService__["a" /* ApiStorageService */].authenticationServer;
        this.clientKey = new __WEBPACK_IMPORTED_MODULE_5_node_rsa___default.a({ b: 512 }, { signingScheme: 'pkcs1-sha256' }); //for decrypte
        this.midleKey = new __WEBPACK_IMPORTED_MODULE_5_node_rsa___default.a(null, { signingScheme: 'pkcs1-sha256' }); //for test
        this.serverKey = new __WEBPACK_IMPORTED_MODULE_5_node_rsa___default.a(null, { signingScheme: 'pkcs1-sha256' }); //for crypte
        //key nay de test thu noi bo
        this.midleKey.importKey(this.clientKey.exportKey('public'));
    }
    /**
     * ham nay phai lay sau khi xac thuc token OTP bang dien thoai
     * tranh viec hacker ma hoa du lieu lung tung gui len server
     */
    ApiAuthService.prototype.getServerPublicRSAKey = function () {
        var _this = this;
        //console.log('get Public key');
        if (this.publicKey && this.publicKey.public_key) {
            //console.log('Public key from in session');
            return (new Promise(function (resolve, reject) {
                try {
                    _this.serverKey.importKey(_this.publicKey.public_key);
                }
                catch (err) {
                    reject(err); //bao loi khong import key duoc
                }
                resolve(_this.serverKey);
            }));
        }
        else {
            //console.log('get Public key from server');
            return this.httpClient.get(this.authenticationServer + '/key-json')
                .toPromise()
                .then(function (jsonData) {
                _this.publicKey = jsonData;
                console.log('Public key: ', jsonData);
                if (_this.publicKey && _this.publicKey.public_key) {
                    try {
                        _this.serverKey.importKey(_this.publicKey.public_key);
                    }
                    catch (err) {
                        throw err;
                    }
                    return _this.serverKey;
                }
                else {
                    throw new Error('No public_key exists!');
                }
            });
        }
    };
    ApiAuthService.prototype.login = function (formData) {
        var _this = this;
        this.reqInterceptor.setRequestToken(null); //login nguoi khac
        return this.httpClient.post(this.authenticationServer + '/login', formData)
            .toPromise()
            .then(function (data) {
            _this.userToken = data;
            _this.reqInterceptor.setRequestToken(_this.userToken.token); //login nguoi khac
            return _this.userToken.token;
        });
    };
    ApiAuthService.prototype.logout = function () {
        var _this = this;
        //xoa bo token luu tru
        this.apiStorageService.deleteToken();
        if (this.userToken && this.userToken.token) {
            //truong hop user co luu tren session thi xoa session di
            this.reqInterceptor.setRequestToken(this.userToken.token); //login nguoi khac
            return this.httpClient.get(this.authenticationServer + '/logout')
                .toPromise()
                .then(function (data) {
                //console.log(data);
                _this.userToken = null; //reset token nay
                _this.reqInterceptor.setRequestToken(null);
                return true; //tra ve nguyen mau data cho noi goi logout xu ly
            })
                .catch(function (err) {
                //xem nhu da logout khong cap luu tru
                //console.log(err);
                _this.reqInterceptor.setRequestToken(null);
                _this.userToken = null; //reset token nay
                return true; //tra ve nguyen mau data cho noi goi logout xu ly
            });
        }
        else {
            return (new Promise(function (resolve, reject) {
                resolve(true);
            }));
        }
    };
    ApiAuthService.prototype.register = function (formData) {
        return this.httpClient.post(this.authenticationServer + '/register', formData)
            .toPromise()
            .then(function (data) {
            console.log(data);
            return true;
        })
            .catch(function (err) {
            console.log(err);
            return false;
        });
    };
    ApiAuthService.prototype.editUser = function (formData) {
        //them token vao truoc khi edit
        this.reqInterceptor.setRequestToken(this.userToken.token);
        return this.httpClient.post(this.authenticationServer + '/edit', formData)
            .toPromise()
            .then(function (data) {
            console.log(data);
            return true;
        })
            .catch(function (err) {
            console.log(err);
            return false;
        });
    };
    //lay thong tin nguoi dung de edit
    ApiAuthService.prototype.getEdit = function () {
        var _this = this;
        if (this.userToken && this.userToken.token) {
            //them token vao truoc khi edit
            this.reqInterceptor.setRequestToken(this.userToken.token);
            return this.httpClient.get(this.authenticationServer + '/get-user')
                .toPromise()
                .then(function (jsonData) {
                _this.userSetting = jsonData;
                return jsonData;
            });
        }
        else {
            return (new Promise(function (resolve, reject) {
                _this.userSetting = null;
                reject({ error: 'No token, please login first' }); //bao loi khong import key duoc
            }));
        }
    };
    //get userInfo from token
    ApiAuthService.prototype.getUserInfo = function () {
        //this.userInfo=null;
        try {
            this.userInfo = __WEBPACK_IMPORTED_MODULE_6_jsonwebtoken___default.a.decode(this.userToken.token);
            //console.log(this.userInfo);
            //chuyen doi duong dan image de truy cap anh dai dien
            if (this.userInfo.image
                &&
                    this.userInfo.image.toLowerCase()
                &&
                    this.userInfo.image.toLowerCase().indexOf('http://') < 0
                &&
                    this.userInfo.image.toLowerCase().indexOf('https://') < 0) {
                //chuyen doi duong dan lay tai nguyen tai he thong
                this.userInfo.image = this.authenticationServer
                    + '/get-avatar/'
                    + this.userInfo.image
                    + '?token=' + this.userToken.token;
                //console.log(this.userInfo.image);
            }
        }
        catch (err) {
            this.userInfo = null;
        }
        return this.userInfo;
    };
    ApiAuthService.prototype.getUserInfoSetting = function () {
        if (this.userSetting.URL_IMAGE
            &&
                this.userSetting.URL_IMAGE.toLowerCase()
            &&
                this.userSetting.URL_IMAGE.toLowerCase().indexOf('http://') < 0
            &&
                this.userSetting.URL_IMAGE.toLowerCase().indexOf('https://') < 0) {
            //chuyen doi duong dan lay tai nguyen tai he thong
            this.userSetting.URL_IMAGE = this.authenticationServer
                + '/get-avatar/'
                + this.userSetting.URL_IMAGE
                + '?token=' + this.userToken.token;
            //console.log(this.userSetting.URL_IMAGE);
        }
        return this.userSetting;
    };
    /**
     * Thiet lap token tu local xem nhu da login
     * @param token
     */
    /* pushToken(token){
        //gan token cho user de xem nhu da login
        this.userToken={token:token};
    } */
    /**
     * Ham nay luu lai token cho phien lam viec sau do
     * dong thoi luu xuong dia token da login thanh cong
     * @param token
     */
    ApiAuthService.prototype.saveToken = function (token) {
        this.apiStorageService.saveToken(token);
        this.userToken = { token: token };
    };
    /**
     * truong hop logout hoac
     * token da het hieu luc,
     * ta se xoa khoi de khong tu dong login duoc nua
     */
    ApiAuthService.prototype.deleteToken = function () {
        this.apiStorageService.deleteToken();
        this.userToken = null;
    };
    /**
     * Gui len server kiem tra token co verify thi tra ve token, khong thi khong ghi
     * @param token
     */
    ApiAuthService.prototype.authorize = function (token) {
        var _this = this;
        return this.httpClient.post(this.authenticationServer + '/authorize-token', JSON.stringify({
            token: token
        }))
            .toPromise()
            .then(function (data) {
            _this.userToken = { token: token };
            return true;
        });
    };
    //send sms
    ApiAuthService.prototype.sendSMS = function (isdn, sms) {
        return this.httpClient.post(this.authenticationServer + '/send-sms', JSON.stringify({
            isdn: isdn,
            sms: sms
        }))
            .toPromise()
            .then(function (data) {
            return data;
        });
    };
    /**
     * yeu cau mot OTP tu phone
     * @param jsonString
     */
    ApiAuthService.prototype.requestIsdn = function (jsonString) {
        //chuyen len bang form co ma hoa
        return this.httpClient.post(this.authenticationServer + '/request-isdn', jsonString)
            .toPromise()
            .then(function (data) {
            return data;
        });
    };
    /**
     * confirm OTP key
     * @param jsonString
     */
    ApiAuthService.prototype.confirmKey = function (jsonString) {
        var _this = this;
        //chuyen di bang form co ma hoa
        return this.httpClient.post(this.authenticationServer + '/confirm-key', jsonString)
            .toPromise()
            .then(function (data) {
            _this.userToken = data;
            if (_this.userToken && _this.userToken.token) {
                _this.reqInterceptor.setRequestToken(_this.userToken.token); //gan token ap dung cho cac phien tiep theo
                return _this.userToken.token;
            }
            else {
                //neu ho nhap so dien thoai nhieu lan sai so spam thi ??
                throw 'Không đúng máy chủ<br>';
            }
        });
    };
    ApiAuthService.prototype.sendUserInfo = function (jsonString) {
        //gui token + userInfo (pass encrypted) --ghi vao csdl
        //tra ket qua cho user
        return true;
    };
    ApiAuthService.prototype.sendImageBase64 = function (jsonString) {
        //gui token + userInfo (pass encrypted) --ghi vao csdl
        //tra ket qua cho user
        return true;
    };
    ApiAuthService.prototype.injectToken = function () {
        this.reqInterceptor.setRequestToken(this.userToken.token);
    };
    ApiAuthService.prototype.postDynamicForm = function (url, json_data, token) {
        //lay token cua phien xac thuc
        this.reqInterceptor.setRequestToken(token ? token : this.userToken ? this.userToken.token : '');
        return this.httpClient.post(url, JSON.stringify(json_data))
            .toPromise()
            .then(function (data) {
            var rtn;
            rtn = data;
            return rtn;
        });
    };
    ApiAuthService.prototype.postDynamicFormData = function (url, form_data, token) {
        //lay token cua phien xac thuc
        this.reqInterceptor.setRequestToken(token ? token : this.userToken ? this.userToken.token : '');
        return this.httpClient.post(url, form_data)
            .toPromise()
            .then(function (data) {
            var rtn;
            rtn = data;
            return rtn;
        });
    };
    ApiAuthService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_common_http__["b" /* HttpClient */],
            __WEBPACK_IMPORTED_MODULE_2__apiStorageService__["a" /* ApiStorageService */],
            __WEBPACK_IMPORTED_MODULE_3__interceptors_requestInterceptor__["a" /* RequestInterceptor */]])
    ], ApiAuthService);
    return ApiAuthService;
}());

//# sourceMappingURL=apiAuthService.js.map

/***/ }),

/***/ 382:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 384:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 419:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 420:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 43:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ApiHttpPublicService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ApiHttpPublicService = /** @class */ (function () {
    function ApiHttpPublicService(httpClient) {
        this.httpClient = httpClient;
        this.sampleMediasDynamic = {
            title: "Đa phương tiện"
            /* ,buttons: [
                {color:"primary", icon:"arrow-dropdown-circle",  next:"DOWN"}
                , {color:"primary", icon:"arrow-dropup-circle", next:"UP"}
              ] */
            ,
            medias: [
                { image: "assets/imgs/img_forest.jpg",
                    title: "Miền quê yêu dấu",
                    h1: "Chốn yên bình",
                    p: "Là nơi bình yên nhất. Bạn có thể dạo bước trên con đường rợp bóng mát thanh bình đến lạ" },
                { image: "assets/imgs/anh_vua.png",
                    h1: "Nội dung bài viết vể cao tốc",
                    p: "Một bài viết về cao tốc đây nhé" },
                { image: "assets/imgs/ca_nau.jpg",
                    h2: "Cá Nâu ở Quê Mỹ lợi",
                    p: "Cá ngày mồng 3 tết ở quê" },
                { image: "assets/imgs/ca_the.jpg",
                    h1: "Cá Thệ ở Quê Mỹ lợi",
                    p: "Cá ngày mồng 3 tết ở quê, Cá thệ kho dưa rất tuyệt vời" },
                { image: "assets/imgs/img_forest.jpg" },
                { image: "assets/imgs/anh_nho.png",
                    h1: "Mùa trái cây chín đỏ",
                    p: "Trái cây vựa, miền quê nhiều cá lắm đó" }
            ],
            actions: {
                //file: {name:"Open file", size: 480, color:"primary", icon: "image", next:"FILE"}
                // ,
                files: { name: "Open files", color: "primary", icon: "images", next: "FILES" },
                open: { key: "down", link_key: "up", name: "Expand", color: "primary", icon: "arrow-dropdown", next: "DOWN" },
                close: { key: "up", link_key: "down", name: "Collapse", color: "primary", icon: "arrow-dropup", next: "UP" },
                buttons: [
                    { name: "Save", icon: "share-alt", color: "primary", url: "https://c3.mobifone.vn/api/ext-auth/save-user-avatar", method: "FORM-DATA", token: true, next: "SAVE" }
                ]
            }
        };
        this.sampleFormDynamic = {
            title: "Đăng ký",
            items: [
                { name: "Thông tin cá nhân avatar", hint: "Avatar", type: "avatar", url: "https://www.w3schools.com/howto/img_forest.jpg" },
                { id: 1, name: "Check hay không chọn?", type: "check", value: true },
                { id: 2, name: "Thanh Trượt", type: "range", value: 50, min: 0, max: 100 },
                { id: 3, name: "Chọn hay không chọn Toggle?", icon: "plane", type: "toggle" },
                { id: 4, name: "Chọn radio cái nào", type: "radio", icon: "plane", value: 2, options: [{ name: "Tùy chọn 1", value: 1 }, { name: "Tùy chọn 2", value: 2 }] },
                { id: 5, name: "Chọn 1 cái nào", type: "select", value: 2, options: [{ name: "Tùy chọn 1", value: 1 }, { name: "Tùy chọn 2", value: 2 }] },
                { id: 6, name: "Chọn nhiều cái nào", type: "select_multiple", value: 2, options: [{ name: "Tùy chọn 1", value: 1 }, { name: "Tùy chọn 2", value: 2 }] },
                { name: "Ảnh cá nhân", hint: "image viewer", type: "image", url: "https://www.w3schools.com/howto/img_forest.jpg" },
                { id: 8, key: "username", name: "username", hint: "Số điện thoại di động 9 số bỏ số 0 ở đầu", type: "text", input_type: "userName", icon: "information-circle", validators: [{ required: true, min: 9, max: 9, pattern: "^[0-9]*$" }] },
                { id: 9, key: "password", name: "password", hint: "Mật khẩu phải có chữ hoa, chữ thường, ký tự đặc biệt, số", type: "password", input_type: "password", icon: "information-circle", validators: [{ required: true, min: 6, max: 20 }] },
                { id: 10, name: "Họ và tên", type: "text", input_type: "text", icon: "person" },
                { id: 11, name: "Điện thoại", hint: "Yêu cầu định dạng số điện thoại nhé", type: "text", input_type: "tel", icon: "call", validators: [{ pattern: "^[0-9]*$" }] },
                { id: 12, name: "email", hint: "Yêu cầu định dạng email nhé", type: "text", input_type: "email", icon: "mail", validators: [{ pattern: "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" }] },
                { id: 13, name: "Ngày bắt đầu", hint: "Chọn ngày", type: "datetime", display: "DD/MM/YYYY", picker: "DD MM YYYY" },
                { id: 14, name: "Thời gian bắt đầu", hint: "Chọn thời gian", type: "datetime", display: "HH:mm:ss", picker: "HH:mm:ss" },
                { id: 15, name: "Nội dung nhập", hint: "Nhập nhiều dòng", type: "text_area" },
                { name: "Thông tin cá nhân", type: "title" },
                { type: "details",
                    details: [
                        {
                            name: "Mã khách hàng",
                            value: "R012234949883"
                        },
                        {
                            name: "Tên khách hàng",
                            value: "Nguyễn Văn B"
                        },
                        {
                            name: "Địa chỉ",
                            value: "263 Nguyễn Văn Linh, Đà nẵng, Việt Nam"
                        },
                        {
                            name: "Hình thức thanh toán",
                            value: "Tiền mặt"
                        },
                    ]
                },
                {
                    type: "button",
                    options: [
                        { name: "Reset", next: "RESET" },
                        { name: "Exit", next: "EXIT" },
                        { name: "Close", next: "CLOSE" },
                        { name: "Back", next: "BACK" },
                        { name: "Continue", next: "CONTINUE" },
                        { name: "Register", next: "BACK", url: "https://chonsoc3.mobifone.vn/ionic/", command: "USER_LOGIN_REDIRECT" },
                        { name: "LOGIN", next: "CONTINUE", url: "https://chonsoc3.mobifone.vn/ionic/", command: "USER_CHECK_EXISTS", token: true }
                    ]
                }
            ]
        };
        this.sampleCardDynamic = {
            title: "Mạng xã hội",
            search_bar: { hint: "Tìm cái gì đó" },
            buttons: [
                { color: "primary", icon: "add", next: "ADD" },
                { color: "primary", icon: "contacts", next: "FRIENDS" },
                { color: "primary", icon: "notifications", next: "NOTIFY",
                    alerts: [
                        "cuong.dq"
                    ]
                },
                { color: "royal", icon: "cog", next: "SETTINGS" }
            ],
            items: [
                { short_detail: {
                        avatar: "assets/imgs/ca_nau.jpg",
                        h1: "Cuong.dq",
                        p: "Cần thiết là nội dung chi tiết đây, có thể viết tóm lượt nhiều thông tin cũng được",
                        note: "1h ago",
                        action: { color: "primary", icon: "more", next: "MORE" }
                    },
                    title: "Chi tiết các ảnh hiển thị",
                    note: "Bài viết chi tiết kết thúc",
                    medias: [
                        { image: "assets/imgs/img_forest.jpg",
                            title: "Miền quê yêu dấu",
                            h1: "Chốn yên bình",
                            p: "Là nơi bình yên nhất. Bạn có thể dạo bước trên con đường rợp bóng mát thanh bình đến lạ" },
                        { image: "assets/imgs/anh_vua.png",
                            h1: "Nội dung bài viết vể cao tốc",
                            p: "Một bài viết về cao tốc đây nhé" },
                        { image: "assets/imgs/ca_nau.jpg",
                            h2: "Cá Nâu ở Quê Mỹ lợi",
                            p: "Cá ngày mồng 3 tết ở quê" },
                        { image: "assets/imgs/ca_the.jpg",
                            h1: "Cá Thệ ở Quê Mỹ lợi",
                            p: "Cá ngày mồng 3 tết ở quê, Cá thệ kho dưa rất tuyệt vời" },
                        { image: "assets/imgs/img_forest.jpg" },
                        { image: "assets/imgs/anh_nho.png",
                            h1: "Mùa trái cây chín đỏ",
                            p: "Trái cây vựa, miền quê nhiều cá lắm đó" }
                    ],
                    content: {
                        title: "Miền quê yêu dấu",
                        paragraphs: [
                            {
                                h2: "Chốn yên bình",
                                p: "Là nơi bình yên nhất. Bạn có thể dạo bước trên con đường rợp bóng mát thanh bình đến lạ",
                                medias: [
                                    { image: "assets/imgs/img_forest.jpg", title: "Cầu Thê Húc xưa", subtitle: "Đoàn Quốc Cường" },
                                    { image: "assets/imgs/anh_vua.png", title: "Cao tốc 34 nghìn tỷ mới khai trương đã hỏng", subtitle: "ảnh Mượn trên mạng " }
                                ]
                            },
                            {
                                h2: "Chốn bóc mẽ",
                                p: "Đây là nơi bóc mẽ thông tin trên mạng. Một sự kiện mà mọi người không thể biết được bằng những phương tiện truyền thông truyền thống",
                                medias: [
                                    { image: "assets/imgs/anh_vua.png", title: "Cao tốc 34 nghìn tỷ mới khai trương đã hỏng", subtitle: "ảnh Mượn trên mạng " }
                                ]
                            }
                        ],
                        note: "Đoàn Quốc Cường 2019"
                    },
                    results: {
                        likes: {
                            like: ["Cuong.dq", "abc", "xyz"],
                            love: ["love"],
                            unlike: ["dog"],
                            sad: ["cat"],
                            angery: ["tiger"]
                        },
                        comments: [
                            { name: "cuong.dq",
                                comment: "day la cai gi vay",
                                time: new Date().getTime()
                            },
                            { name: "cu.dq",
                                comment: "la cai nay do nhe",
                                time: new Date().getTime()
                            }
                        ],
                        shares: [
                            { name: "cuong.dq",
                                comment: "day la cai gi vay",
                                time: new Date().getTime()
                            },
                            { name: "cu.dq",
                                comment: "la cai nay do nhe",
                                time: new Date().getTime()
                            }
                        ]
                    },
                    actions: {
                        like: { name: "LIKE", color: "primary", icon: "thumbs-up", next: "LIKE" },
                        comment: { name: "COMMENT", color: "primary", icon: "chatbubbles", next: "COMMENT" },
                        share: { name: "SHARE", color: "primary", icon: "share-alt", next: "SHARE" }
                    }
                },
                { short_details: {},
                    medias: [
                        { image: "assets/imgs/img_forest.jpg", title: "1 Ảnh", subtitle: "Tác giả Đoàn Quốc Cường" }
                    ],
                    results: {
                        likes: {
                            like: ["Cuong.dq", "abc", "xyz"],
                            love: ["love"]
                        },
                        shares: [
                            { name: "cu.dq",
                                comment: "la cai nay do nhe",
                                time: new Date().getTime()
                            }
                        ]
                    },
                    actions: {
                        like: { name: "Thích", color: "primary", icon: "thumbs-up", next: "LIKE" },
                        comment: { name: "Trò chuyện", color: "primary", icon: "chatbubbles", next: "COMMENT" },
                        share: { name: "Chia sẻ", color: "primary", icon: "share-alt", next: "SHARE" }
                    }
                },
                { short_details: {},
                    medias: [
                        { image: "assets/imgs/ca_nau.jpg", title: "Ảnh 1", subtitle: "Tác giả Đoàn Quốc Cường" },
                        { image: "assets/imgs/img_forest.jpg", title: "Ảnh 2", subtitle: "Tác giả Đoàn Quốc Cường" }
                    ],
                    results: {
                        likes: {
                            sad: ["cat"]
                        },
                        comments: [
                            { name: "cu.dq",
                                comment: "la cai nay do nhe",
                                time: new Date().getTime()
                            }
                        ]
                    },
                    actions: {
                        like: { name: "Thích", color: "primary", icon: "thumbs-up", next: "LIKE" },
                        comment: { name: "Trò chuyện", color: "primary", icon: "chatbubbles", next: "COMMENT" },
                        share: { name: "Chia sẻ", color: "primary", icon: "share-alt", next: "SHARE" }
                    }
                },
                { short_details: {},
                    medias: [
                        { image: "assets/imgs/img_forest.jpg", title: "3 Ảnh", subtitle: "Tác giả Đoàn Quốc Cường" },
                        { image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==" },
                        { image: "data:image/gif;base64,R0lGODlhPQBEAPeoAJosM//AwO/AwHVYZ/z595kzAP/s7P+goOXMv8+fhw/v739/f+8PD98fH/8mJl+fn/9ZWb8/PzWlwv///6wWGbImAPgTEMImIN9gUFCEm/gDALULDN8PAD6atYdCTX9gUNKlj8wZAKUsAOzZz+UMAOsJAP/Z2ccMDA8PD/95eX5NWvsJCOVNQPtfX/8zM8+QePLl38MGBr8JCP+zs9myn/8GBqwpAP/GxgwJCPny78lzYLgjAJ8vAP9fX/+MjMUcAN8zM/9wcM8ZGcATEL+QePdZWf/29uc/P9cmJu9MTDImIN+/r7+/vz8/P8VNQGNugV8AAF9fX8swMNgTAFlDOICAgPNSUnNWSMQ5MBAQEJE3QPIGAM9AQMqGcG9vb6MhJsEdGM8vLx8fH98AANIWAMuQeL8fABkTEPPQ0OM5OSYdGFl5jo+Pj/+pqcsTE78wMFNGQLYmID4dGPvd3UBAQJmTkP+8vH9QUK+vr8ZWSHpzcJMmILdwcLOGcHRQUHxwcK9PT9DQ0O/v70w5MLypoG8wKOuwsP/g4P/Q0IcwKEswKMl8aJ9fX2xjdOtGRs/Pz+Dg4GImIP8gIH0sKEAwKKmTiKZ8aB/f39Wsl+LFt8dgUE9PT5x5aHBwcP+AgP+WltdgYMyZfyywz78AAAAAAAD///8AAP9mZv///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAKgALAAAAAA9AEQAAAj/AFEJHEiwoMGDCBMqXMiwocAbBww4nEhxoYkUpzJGrMixogkfGUNqlNixJEIDB0SqHGmyJSojM1bKZOmyop0gM3Oe2liTISKMOoPy7GnwY9CjIYcSRYm0aVKSLmE6nfq05QycVLPuhDrxBlCtYJUqNAq2bNWEBj6ZXRuyxZyDRtqwnXvkhACDV+euTeJm1Ki7A73qNWtFiF+/gA95Gly2CJLDhwEHMOUAAuOpLYDEgBxZ4GRTlC1fDnpkM+fOqD6DDj1aZpITp0dtGCDhr+fVuCu3zlg49ijaokTZTo27uG7Gjn2P+hI8+PDPERoUB318bWbfAJ5sUNFcuGRTYUqV/3ogfXp1rWlMc6awJjiAAd2fm4ogXjz56aypOoIde4OE5u/F9x199dlXnnGiHZWEYbGpsAEA3QXYnHwEFliKAgswgJ8LPeiUXGwedCAKABACCN+EA1pYIIYaFlcDhytd51sGAJbo3onOpajiihlO92KHGaUXGwWjUBChjSPiWJuOO/LYIm4v1tXfE6J4gCSJEZ7YgRYUNrkji9P55sF/ogxw5ZkSqIDaZBV6aSGYq/lGZplndkckZ98xoICbTcIJGQAZcNmdmUc210hs35nCyJ58fgmIKX5RQGOZowxaZwYA+JaoKQwswGijBV4C6SiTUmpphMspJx9unX4KaimjDv9aaXOEBteBqmuuxgEHoLX6Kqx+yXqqBANsgCtit4FWQAEkrNbpq7HSOmtwag5w57GrmlJBASEU18ADjUYb3ADTinIttsgSB1oJFfA63bduimuqKB1keqwUhoCSK374wbujvOSu4QG6UvxBRydcpKsav++Ca6G8A6Pr1x2kVMyHwsVxUALDq/krnrhPSOzXG1lUTIoffqGR7Goi2MAxbv6O2kEG56I7CSlRsEFKFVyovDJoIRTg7sugNRDGqCJzJgcKE0ywc0ELm6KBCCJo8DIPFeCWNGcyqNFE06ToAfV0HBRgxsvLThHn1oddQMrXj5DyAQgjEHSAJMWZwS3HPxT/QMbabI/iBCliMLEJKX2EEkomBAUCxRi42VDADxyTYDVogV+wSChqmKxEKCDAYFDFj4OmwbY7bDGdBhtrnTQYOigeChUmc1K3QTnAUfEgGFgAWt88hKA6aCRIXhxnQ1yg3BCayK44EWdkUQcBByEQChFXfCB776aQsG0BIlQgQgE8qO26X1h8cEUep8ngRBnOy74E9QgRgEAC8SvOfQkh7FDBDmS43PmGoIiKUUEGkMEC/PJHgxw0xH74yx/3XnaYRJgMB8obxQW6kL9QYEJ0FIFgByfIL7/IQAlvQwEpnAC7DtLNJCKUoO/w45c44GwCXiAFB/OXAATQryUxdN4LfFiwgjCNYg+kYMIEFkCKDs6PKAIJouyGWMS1FSKJOMRB/BoIxYJIUXFUxNwoIkEKPAgCBZSQHQ1A2EWDfDEUVLyADj5AChSIQW6gu10bE/JG2VnCZGfo4R4d0sdQoBAHhPjhIB94v/wRoRKQWGRHgrhGSQJxCS+0pCZbEhAAOw==" }
                    ],
                    results: {
                        likes: {
                            like: ["Cuong.dq", "abc", "xyz"]
                        }
                    },
                    actions: {
                        like: { name: "Thích", color: "primary", icon: "thumbs-up", next: "LIKE" },
                        comment: { name: "Trò chuyện", color: "primary", icon: "chatbubbles", next: "COMMENT" },
                        share: { name: "Chia sẻ", color: "primary", icon: "share-alt", next: "SHARE" }
                    }
                },
                { short_details: {},
                    medias: [
                        { image: "assets/imgs/img_forest.jpg", title: "4 Ảnh" },
                        { image: "assets/imgs/ca_the.jpg" },
                        { image: "assets/imgs/anh_vua.png" },
                        { image: "assets/imgs/ca_nau.jpg" }
                    ],
                    actions: {
                        like: { name: "Thích", color: "primary", icon: "thumbs-up", next: "LIKE" },
                        comment: { name: "Trò chuyện", color: "primary", icon: "chatbubbles", next: "COMMENT" },
                        share: { name: "Chia sẻ", color: "primary", icon: "share-alt", next: "SHARE" }
                    }
                }
            ]
        };
        this.sampleListDynamic = {
            title: "Mạng xã hội",
            search_bar: { hint: "Tìm cái gì đó" },
            buttons: [
                { color: "primary", icon: "add", next: "ADD" },
                { color: "primary", icon: "contacts", next: "FRIENDS" },
                { color: "primary", icon: "notifications", next: "NOTIFY",
                    alerts: [
                        "cuong.dq"
                    ]
                },
                { color: "royal", icon: "cog", next: "SETTINGS" }
            ],
            items: [
                {
                    //icon:"contact",
                    image: "assets/imgs/img_forest.jpg",
                    h1: "H1 Tieu de",
                    h2: "H2 Chuong muc",
                    h3: "H3 Muc luc",
                    p: "Sau khi đánh cồng khai trương phiên giao dịch đầu xuân Kỷ Hợi 2019 tại Sở Giao dịch chứng khoán Hà Nội vào sáng 12-2, Thủ tướng Chính phủ Nguyễn Xuân Phúc khẳng định tầm quan trọng của thị trường chứng khoán Việt Nam.",
                    note: "13/02/2019",
                    options: [
                        { name: "Xóa", color: "danger", icon: "trash", next: "EXIT" },
                        { name: "Chỉnh sửa", color: "primary", icon: "create", next: "NEXT" },
                        { name: "Xem chi tiết", color: "secondary", icon: "list", next: "CALLBACK" }
                    ]
                },
                {
                    icon: "contact"
                    //image: "assets/imgs/img_forest.jpg"
                    ,
                    h1: "H1 Tieu de 2",
                    h2: "H2 Chuong muc 2",
                    h3: "H3 Muc luc 2",
                    p: "Trong những ngày đánh bắt đầu năm, 3 ngư dân Quảng Trị đã thu hoạch được mẻ cá bè gần 140 tấn; trong đó một ngư dân trúng mẻ cá siêu khủng nặng hơn 100 tấn.",
                    note: "14/02/2019",
                    options: [
                        { name: "Xóa", color: "danger", icon: "trash", next: "EXIT" },
                        { name: "Chỉnh sửa", color: "primary", icon: "create", next: "NEXT" },
                        { name: "Xem chi tiết", color: "secondary", icon: "list", next: "CALLBACK" }
                    ]
                }
            ]
        };
    }
    /**
     * Lay danh sach cac quoc gia ve Ma so dien thoai, co, ten, ngon ngu, tien...
     */
    ApiHttpPublicService.prototype.getAllCoutries = function () {
        return this.httpClient.get('https://restcountries.eu/rest/v2/all')
            .toPromise() //kieu chuyen ve promise
            .then(function (countries) {
            return countries;
        })
            .catch(function (err) {
            throw err;
        });
    };
    /**
     * Lay danh sach user demo phuc vu so lieu demo
     */
    ApiHttpPublicService.prototype.getRandomUser = function (nRecord) {
        return this.httpClient.get('https://randomuser.me/api/?results=' + nRecord)
            .map(function (res) { return res['results']; }); //kieu chuyen ve observable
    };
    ApiHttpPublicService.prototype.getDataForm = function (form) {
        return this.httpClient.get('assets/data/' + form)
            .toPromise();
    };
    ApiHttpPublicService.prototype.getUserInfoForm = function () {
        return this.httpClient.get('assets/data/form-register.json')
            .toPromise();
    };
    ApiHttpPublicService.prototype.getDemoList = function () {
        return this.sampleListDynamic;
    };
    ApiHttpPublicService.prototype.getDemoForm = function () {
        return this.sampleFormDynamic;
    };
    ApiHttpPublicService.prototype.getDemoCard = function () {
        return this.sampleCardDynamic;
    };
    ApiHttpPublicService.prototype.getDemoMedias = function () {
        return this.sampleMediasDynamic;
    };
    ApiHttpPublicService.prototype.postDynamicForm = function (url, json_data) {
        return this.httpClient.post(url, JSON.stringify(json_data))
            .toPromise()
            .then(function (data) {
            var rtn;
            rtn = data;
            return rtn;
        });
    };
    ApiHttpPublicService.prototype.postDynamicFormData = function (url, form_data) {
        return this.httpClient.post(url, form_data)
            .toPromise()
            .then(function (data) {
            var rtn;
            rtn = data;
            return rtn;
        });
    };
    ApiHttpPublicService.prototype.getDynamicForm = function (url, httpOptions) {
        return this.httpClient.get(url, httpOptions)
            .toPromise()
            .then(function (data) {
            var rtn;
            rtn = data;
            return rtn;
        });
    };
    ApiHttpPublicService.prototype.getDynamicFile = function (url) {
        return this.httpClient.get(url, { 'responseType': 'blob' })
            .toPromise()
            .then(function (data) {
            var rtn;
            rtn = data;
            return rtn;
        });
    };
    ApiHttpPublicService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_common_http__["b" /* HttpClient */]])
    ], ApiHttpPublicService);
    return ApiHttpPublicService;
}());

//# sourceMappingURL=apiHttpPublicServices.js.map

/***/ }),

/***/ 497:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ResponseInterceptor; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_do__ = __webpack_require__(498);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_do___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_do__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common_http___ = __webpack_require__(48);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ResponseInterceptor = /** @class */ (function () {
    function ResponseInterceptor() {
    }
    ResponseInterceptor.prototype.intercept = function (request, next) {
        return next.handle(request).do(function (event) {
            if (event instanceof __WEBPACK_IMPORTED_MODULE_2__angular_common_http___["e" /* HttpResponse */]) {
                //console.log('May chu cho phep va truy cap voi event:');
                //console.log(event);
            }
        }, function (err) {
            if (err instanceof __WEBPACK_IMPORTED_MODULE_2__angular_common_http___["d" /* HttpErrorResponse */]) {
                console.log('May chu Khong cho phep hoac loi:');
                console.log(err);
            }
        });
    };
    ResponseInterceptor = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [])
    ], ResponseInterceptor);
    return ResponseInterceptor;
}());

//# sourceMappingURL=responseInterceptor.js.map

/***/ }),

/***/ 501:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(170);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(167);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_apiAuthService__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_apiStorageService__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_home_home__ = __webpack_require__(297);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var MyApp = /** @class */ (function () {
    //public static token;
    function MyApp(platform, statusBar, events, menuCtrl, apiStorageService, apiService, splashScreen) {
        this.platform = platform;
        this.statusBar = statusBar;
        this.events = events;
        this.menuCtrl = menuCtrl;
        this.apiStorageService = apiStorageService;
        this.apiService = apiService;
        this.splashScreen = splashScreen;
        this.isWeb = false; //cua thiet bi
        this.isLogin = false;
    }
    MyApp.prototype.ngOnInit = function () {
        var _this = this;
        this.platform.ready().then(function () {
            _this.statusBar.styleDefault();
            _this.splashScreen.hide();
            if (_this.platform.is('mobileweb')
                || _this.platform.platforms()[0] == 'core') {
                //version web
                _this.isWeb = true;
            }
            _this.viewDidLoad();
        });
    };
    MyApp.prototype.viewDidLoad = function () {
        this.rootPage = __WEBPACK_IMPORTED_MODULE_6__pages_home_home__["a" /* HomePage */];
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Nav */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Nav */])
    ], MyApp.prototype, "navCtrl", void 0);
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"D:\IONIC\node-server-api\src\app\app.html"*/'\n\n<ion-split-pane when="md">\n\n    <ion-menu [content]="menuContent" no-border *ngIf="isLogin">\n\n      <ion-header no-border>\n\n        <ion-toolbar color="primary">\n\n          \n\n        </ion-toolbar>\n\n      </ion-header>\n\n  \n\n      <ion-content class="menu-container">\n\n\n\n      </ion-content>\n\n    </ion-menu>\n\n   \n\n<ion-nav #menuContent [root]="rootPage" main swipeBackEnabled="false"></ion-nav>\n\n\n\n</ion-split-pane>'/*ion-inline-end:"D:\IONIC\node-server-api\src\app\app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* Events */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* MenuController */],
            __WEBPACK_IMPORTED_MODULE_5__services_apiStorageService__["a" /* ApiStorageService */],
            __WEBPACK_IMPORTED_MODULE_4__services_apiAuthService__["a" /* ApiAuthService */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 61:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ApiStorageService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angular_webstorage_service__ = __webpack_require__(251);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};


var STORAGE_KEY = 'Cng@3500888';
var sessionStorageAvailable = Object(__WEBPACK_IMPORTED_MODULE_1_angular_webstorage_service__["c" /* isStorageAvailable */])(sessionStorage);
var ApiStorageService = /** @class */ (function () {
    function ApiStorageService(storage) {
        this.storage = storage;
    }
    ApiStorageService_1 = ApiStorageService;
    ApiStorageService.prototype.doSomethingAwesome = function () {
        var awesomenessLevel = this.storage.get(STORAGE_KEY) || 1337;
        this.storage.set(STORAGE_KEY, awesomenessLevel + 1);
        return awesomenessLevel;
    };
    ApiStorageService.prototype.save = function (key, value) {
        this.storage.set(key, value);
    };
    ApiStorageService.prototype.read = function (key) {
        return this.storage.get(key);
    };
    ApiStorageService.prototype.delete = function (key) {
        this.storage.remove(key);
    };
    ApiStorageService.prototype.getStatus = function () {
        return "Session storage available: " + sessionStorageAvailable;
    };
    ApiStorageService.prototype.saveToken = function (value) {
        this.save('token', value);
    };
    ApiStorageService.prototype.getToken = function () {
        ApiStorageService_1.token = this.read('token');
        return ApiStorageService_1.token;
    };
    ApiStorageService.prototype.deleteToken = function () {
        ApiStorageService_1.token = null;
        this.delete('token');
    };
    ApiStorageService.prototype.saveUserRooms = function (user, rooms) {
        this.save('#rooms#' + user.username, JSON.stringify(rooms));
    };
    ApiStorageService.prototype.deleteUserRooms = function (user) {
        this.delete('#rooms#' + user.username);
    };
    ApiStorageService.prototype.getUserRooms = function (user) {
        try {
            var rooms = JSON.parse(this.read('#rooms#' + user.username));
            return rooms ? rooms : [];
        }
        catch (e) {
            return [];
        }
    };
    ApiStorageService.prototype.saveUserLastTime = function (user, time) {
        this.save('#last_time#' + user.username, time.toString());
    };
    ApiStorageService.prototype.deleteUserLastTime = function (user) {
        this.delete('#last_time#' + user.username);
    };
    ApiStorageService.prototype.getUserLastTime = function (user) {
        try {
            var time = parseInt(this.read('#last_time#' + user.username));
            return time;
        }
        catch (e) {
            return 0;
        }
    };
    ApiStorageService.prototype.saveUserRoomMessages = function (user, room) {
        this.save('#message' + room.name + '#' + user.username, JSON.stringify(room.messages));
        this.saveUserLastTime(user, new Date().getTime());
    };
    ApiStorageService.prototype.getUserRoomMessages = function (user, room) {
        try {
            var messages = JSON.parse(this.read('#message' + room.name + '#' + user.username));
            return messages ? messages : [];
        }
        catch (e) {
            return [];
        }
    };
    /**
     * Chuyển đổi một mảng có cấu trúc thành cấu trúc cây (như oracle)
     * Phục vụ quản lý theo tiêu chí hình cây
     * @param arrIn
     * @param option
     * @param level
     */
    ApiStorageService.prototype.createTree = function (arrIn, option, level) {
        var _this = this;
        var myLevl = level ? level : 0;
        var myOption = option ? option : { id: 'id', parentId: 'parentId', startWith: null };
        var roots = arrIn.filter(function (x) { return x[option.parentId] != x[option.id] && x[option.parentId] == option.startWith; });
        //console.log('roots',roots);
        if (roots.length > 0) {
            myLevl++;
            roots.forEach(function (el) {
                //console.log('myId',el[option.id], myLevl);
                el.$level = myLevl;
                el.$children = arrIn.filter(function (x) { return x[option.parentId] != x[option.id] && x[option.parentId] == el[option.id]; });
                if (el.$children.length > 0) {
                    el.$children.forEach(function (ch) {
                        ch.$level = myLevl + 1;
                        //console.log('myId child',ch[option.id], ch.$level);
                        myOption.startWith = ch[option.id];
                        ch.$children = _this.createTree(arrIn, myOption, ch.$level);
                    });
                }
                else {
                    el.$isleaf = 1;
                    el.$children = undefined;
                }
            });
            return roots;
        }
        else {
            arrIn.forEach(function (el) {
                el.$level = myLevl;
                el.$isleaf = 1;
            });
            return arrIn; //khong tao duoc cay vi khong tim thay
        }
    };
    //public static resourceServer = ''; 
    ApiStorageService.resourceServer = 'https://qld-invoices.herokuapp.com';
    //public static resourceServer = 'http://localhost:8080'; 
    //public static resourceServer = 'https://c3.mobifone.vn';
    ApiStorageService.authenticationServer = 'https://c3.mobifone.vn/api/ext-auth';
    ApiStorageService = ApiStorageService_1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __param(0, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["z" /* Inject */])(__WEBPACK_IMPORTED_MODULE_1_angular_webstorage_service__["a" /* LOCAL_STORAGE */])),
        __metadata("design:paramtypes", [Object])
    ], ApiStorageService);
    return ApiStorageService;
    var ApiStorageService_1;
}());

//# sourceMappingURL=apiStorageService.js.map

/***/ })

},[302]);
//# sourceMappingURL=main.js.map