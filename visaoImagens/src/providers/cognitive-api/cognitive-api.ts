import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the CognitiveApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CognitiveApiProvider {

  azureBaseUrl = 'https://westcentralus.api.cognitive.microsoft.com/vision/v1.0';
  azureApiKey = '0f71920e332b484284fd59fd421bca1c';
  translateBaseUrl = '';
  translateApiKey = '';

  constructor(public http: HttpClient) {
    console.log('Hello CognitiveApiProvider Provider');
  }

  analyseImage(body) {
    // let headersObj = new HttpHeaders().set('Ocp-Apim-Subscription-Key', this.azureApiKey).set('Content-Type', 'application/octet-stream');
    let headersObj = new HttpHeaders().set('Ocp-Apim-Subscription-Key', this.azureApiKey).set('Content-Type', 'application/json');

    return new Promise((resolve, reject) => {
      this.http.post(this.azureBaseUrl + '/analyze?visualFeatures=Categories,Description',
        JSON.stringify(body),
        { headers: headersObj }
      )
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        })
    });
  }

  translateUsToBr() {

  }

}
