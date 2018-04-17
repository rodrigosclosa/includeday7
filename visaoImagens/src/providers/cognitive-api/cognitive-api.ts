import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the CognitiveApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CognitiveApiProvider {

  computerVisionBaseUrl = 'https://includeday-7.appspot.com/_ah/api/computervisionazure/v1/analyzeimage';
  computerVisionApiKey = 'AIzaSyB1rQAu-rmtvVFU_vZ4xSVvLrRZ9QMeAX0';
  googleTranslateBaseUrl = 'https://translation.googleapis.com/language/translate/v2';
  googleTranslateApiKey = 'AIzaSyCXXwba2dmNfF824qgKzGzsE21Hr1R0V1M';

  constructor(public http: HttpClient) {
    console.log('Hello CognitiveApiProvider Provider');
  }

  analyseImage(body) {
    return new Promise((resolve, reject) => {
      this.http.post(`${this.computerVisionBaseUrl}?key=${this.computerVisionApiKey}`,
      JSON.stringify(body)
      )
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        })
    });
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
