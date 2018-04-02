import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the CognitiveApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CognitiveApiProvider {

  azureBaseUrl = 'https://brazilsouth.api.cognitive.microsoft.com/vision/v1.0';
  azureApiKey = '911dad9c187d48509e1763b87aa29698';
  googleTranslateBaseUrl = 'https://translation.googleapis.com/language/translate/v2';
  googleTranslateApiKey = 'AIzaSyCXXwba2dmNfF824qgKzGzsE21Hr1R0V1M';

  constructor(public http: HttpClient) {
    console.log('Hello CognitiveApiProvider Provider');
  }

  makeBlob(dataURL) {
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
  }


  analyseImage(body) {
    // let headersObj = new HttpHeaders();
    // headersObj = headersObj.set('Ocp-Apim-Subscription-Key', this.azureApiKey);
    // headersObj = headersObj.set('Content-Type', 'application/octet-stream');
    let headersObj = new HttpHeaders().set('Ocp-Apim-Subscription-Key', this.azureApiKey).set('Content-Type', 'application/json');

    // console.log('HEADERS');
    // console.log(headersObj);

    return new Promise((resolve, reject) => {
      this.http.post(`${this.azureBaseUrl}/analyze?visualFeatures=Categories,Description`,
        // body,
      JSON.stringify(body),
        { headers: headersObj }
      )
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        })
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

  }

  translateEnToBr(body) {
    return new Promise((resolve, reject) => {
      this.http.post(`${this.googleTranslateBaseUrl}?key=${this.googleTranslateApiKey}`,
        JSON.stringify(body)
      )
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        })
    });

  }

}
