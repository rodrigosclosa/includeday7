webpackJsonp([0],{

/***/ 112:
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
webpackEmptyAsyncContext.id = 112;

/***/ }),

/***/ 154:
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
webpackEmptyAsyncContext.id = 154;

/***/ }),

/***/ 197:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_camera__ = __webpack_require__(198);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_text_to_speech__ = __webpack_require__(199);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_cognitive_api_cognitive_api__ = __webpack_require__(200);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var HomePage = (function () {
    function HomePage(navCtrl, alertController, loadingController, congnitiveProvider, camera, tts) {
        this.navCtrl = navCtrl;
        this.alertController = alertController;
        this.loadingController = loadingController;
        this.congnitiveProvider = congnitiveProvider;
        this.camera = camera;
        this.tts = tts;
        this.options = {
            quality: 50,
            targetWidth: 800,
            targetHeight: 600,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE
        };
        camera = this.camera;
        this.imagePath = 'http://images.equipboard.com/uploads/user/image/8602/big_layne-staley.jpg';
        // this.imagePath = 'https://media-cdn.tripadvisor.com/media/photo-s/0c/13/af/b0/torre-eiffel.jpg';
        // this.imagePath = 'https://www.otvfoco.com.br/wp-content/uploads/2018/01/silvio-risonho.jpg';
        this.buildLoader();
        this.analyseImageTest(null);
    }
    HomePage.prototype.buildLoader = function () {
        this.loader = this.loadingController.create({
            content: "Processando ..."
        });
    };
    HomePage.prototype.textToSpeech = function () {
        this.tts.speak({
            text: this.description,
            locale: 'pt-BR',
            rate: 0.75
        })
            .then(function () {
            console.log('Speech success');
        })
            .catch(function (reason) {
            console.log(reason);
        });
    };
    ;
    HomePage.prototype.showAlert = function (message) {
        var alert = this.alertController.create({
            title: 'Erro ao processar imagem',
            subTitle: message,
            buttons: ['Ok']
        });
        alert.present();
    };
    HomePage.prototype.getPicture = function () {
        var _this = this;
        this.loader.present();
        this.camera.getPicture(this.options).then(function (imageData) {
            _this.imagePath = 'data:image/jpeg;base64,' + imageData;
            _this.analyseImageTest(imageData);
            console.log('sucesso');
        }, function (err) {
            _this.loader.dismiss();
            console.log(err);
        });
    };
    HomePage.prototype.base64ToByteArray = function (base64Image) {
        var byteCharacters = atob(base64Image), byteNumbers = new Array(byteCharacters.length), byteArray;
        for (var i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        return new Uint8Array(byteNumbers);
    };
    ;
    HomePage.prototype.analyseImageTest = function (imageBase64) {
        var _this = this;
        this.loader.present();
        var body = {
            url: this.imagePath
        };
        // let body = this.base64ToByteArray(imageBase64);
        // let body = imageBase64;
        this.congnitiveProvider.analyseImage(body).then(function (result) {
            console.log(result);
            if (result && result['description'] && result['description']['captions']) {
                _this.translateTextToBr(result['description']['captions'][0]['text']);
            }
            else {
                _this.description = 'Nenhum texto identificado';
            }
        }, function (err) {
            console.log(err);
            _this.loader.dismiss();
            _this.showAlert(err.message);
        });
    };
    HomePage.prototype.translateTextToBr = function (text) {
        var _this = this;
        var body = {
            q: text,
            target: 'pt',
            source: 'en'
        };
        this.congnitiveProvider.translateEnToBr(body).then(function (result) {
            console.log(result);
            if (result && result['data'] && result['data']['translations'] && result['data']['translations'].length > 0) {
                _this.description = result['data']['translations'][0]['translatedText'];
            }
            else {
                _this.description = 'Nenhum texto identificado';
            }
            _this.loader.dismiss();
        }, function (err) {
            console.log(err);
            _this.loader.dismiss();
            _this.showAlert(err.message);
        });
    };
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"/Users/fprado/Documents/includeday7/visaoImagens/src/pages/home/home.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>Image Analysis</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <img [src]="imagePath" class="home-image image-analysis" id="imagem-teste">\n  <p>{{description}}</p>\n\n  <button ion-button color="secondary" (click)="getPicture()">\n    <ion-icon name="camera"></ion-icon>\n  </button>\n  \n  <button ion-button (click)="textToSpeech()">\n    <ion-icon name="play"></ion-icon>\n  </button>\n\n</ion-content>\n'/*ion-inline-end:"/Users/fprado/Documents/includeday7/visaoImagens/src/pages/home/home.html"*/
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* LoadingController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* LoadingController */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_4__providers_cognitive_api_cognitive_api__["a" /* CognitiveApiProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__providers_cognitive_api_cognitive_api__["a" /* CognitiveApiProvider */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_2__ionic_native_camera__["a" /* Camera */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__ionic_native_camera__["a" /* Camera */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_3__ionic_native_text_to_speech__["a" /* TextToSpeech */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__ionic_native_text_to_speech__["a" /* TextToSpeech */]) === "function" && _f || Object])
    ], HomePage);
    return HomePage;
    var _a, _b, _c, _d, _e, _f;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 200:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CognitiveApiProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(201);
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


/*
  Generated class for the CognitiveApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var CognitiveApiProvider = (function () {
    function CognitiveApiProvider(http) {
        this.http = http;
        this.azureBaseUrl = 'https://brazilsouth.api.cognitive.microsoft.com/vision/v1.0';
        this.azureApiKey = '911dad9c187d48509e1763b87aa29698';
        this.googleTranslateBaseUrl = 'https://translation.googleapis.com/language/translate/v2';
        this.googleTranslateApiKey = 'AIzaSyCXXwba2dmNfF824qgKzGzsE21Hr1R0V1M';
        console.log('Hello CognitiveApiProvider Provider');
    }
    CognitiveApiProvider.prototype.makeBlob = function (dataURL) {
        var BASE64_MARKER = ';base64,';
        if (dataURL.indexOf(BASE64_MARKER) == -1) {
            var parts = dataURL.split(',');
            var contentType = parts[0].split(':')[1];
            var raw = decodeURIComponent(parts[1]);
            return new Blob([raw], { type: contentType });
        }
        var parts = dataURL.split(BASE64_MARKER);
        var contentType = parts[0].split(':')[1];
        var raw = window.atob(parts[1]);
        var rawLength = raw.length;
        var uInt8Array = new Uint8Array(rawLength);
        for (var i = 0; i < rawLength; ++i) {
            uInt8Array[i] = raw.charCodeAt(i);
        }
        return new Blob([uInt8Array], { type: contentType });
    };
    CognitiveApiProvider.prototype.analyseImage = function (body) {
        var _this = this;
        // let headersObj = new HttpHeaders();
        // headersObj = headersObj.set('Ocp-Apim-Subscription-Key', this.azureApiKey);
        // headersObj = headersObj.set('Content-Type', 'application/octet-stream');
        var headersObj = new __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["c" /* HttpHeaders */]().set('Ocp-Apim-Subscription-Key', this.azureApiKey).set('Content-Type', 'application/json');
        // console.log('HEADERS');
        // console.log(headersObj);
        return new Promise(function (resolve, reject) {
            _this.http.post(_this.azureBaseUrl + "/analyze?visualFeatures=Categories,Description", 
            // body,
            JSON.stringify(body), { headers: headersObj })
                .subscribe(function (res) {
                resolve(res);
            }, function (err) {
                reject(err);
            });
        });
        // return new Promise((resolve, reject) => {
        //   this.http.post(`${this.azureBaseUrl}/analyze?visualFeatures=Categories,Description`,
        //     this.makeBlob(body),
        //   // JSON.stringify(body),
        //     { headers: headersObj }
        //   )
        //     .subscribe(res => {
        //       resolve(res);
        //     }, (err) => {
        //       reject(err);
        //     })
        // });
    };
    CognitiveApiProvider.prototype.translateEnToBr = function (body) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http.post(_this.googleTranslateBaseUrl + "?key=" + _this.googleTranslateApiKey, JSON.stringify(body))
                .subscribe(function (res) {
                resolve(res);
            }, function (err) {
                reject(err);
            });
        });
    };
    CognitiveApiProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */]])
    ], CognitiveApiProvider);
    return CognitiveApiProvider;
}());

//# sourceMappingURL=cognitive-api.js.map

/***/ }),

/***/ 202:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(203);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(224);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 224:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_component__ = __webpack_require__(266);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_common_http__ = __webpack_require__(201);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_home_home__ = __webpack_require__(197);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_status_bar__ = __webpack_require__(194);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_splash_screen__ = __webpack_require__(196);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_camera__ = __webpack_require__(198);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_text_to_speech__ = __webpack_require__(199);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__providers_cognitive_api_cognitive_api__ = __webpack_require__(200);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};











var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_5__pages_home_home__["a" /* HomePage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */], {}, {
                    links: []
                }),
                __WEBPACK_IMPORTED_MODULE_4__angular_common_http__["b" /* HttpClientModule */]
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_5__pages_home_home__["a" /* HomePage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_6__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_7__ionic_native_splash_screen__["a" /* SplashScreen */],
                { provide: __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicErrorHandler */] },
                __WEBPACK_IMPORTED_MODULE_10__providers_cognitive_api_cognitive_api__["a" /* CognitiveApiProvider */],
                __WEBPACK_IMPORTED_MODULE_8__ionic_native_camera__["a" /* Camera */],
                __WEBPACK_IMPORTED_MODULE_9__ionic_native_text_to_speech__["a" /* TextToSpeech */]
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 266:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(194);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(196);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(197);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var MyApp = (function () {
    function MyApp(platform, statusBar, splashScreen) {
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */];
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
        });
    }
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/Users/fprado/Documents/includeday7/visaoImagens/src/app/app.html"*/'<ion-nav [root]="rootPage"></ion-nav>\n'/*ion-inline-end:"/Users/fprado/Documents/includeday7/visaoImagens/src/app/app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ })

},[202]);
//# sourceMappingURL=main.js.map