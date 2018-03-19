import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CognitiveApiProvider } from '../../providers/cognitive-api/cognitive-api';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  requestStatus: String;
  imagePath: String;
  description: String;

  constructor(public navCtrl: NavController, public congnitiveProvider: CognitiveApiProvider) {
    this.analyseImageTest();
  }

  analyseImageTest() {
    let body = {
      url: 'http://images.equipboard.com/uploads/user/image/8602/big_layne-staley.jpg'
    }

    this.congnitiveProvider.analyseImage(body).then(
      (result) => {
        console.log(result);

        if (result && result['description'] && result['description']['captions']) {
          this.description = result['description']['captions'][0]['text'];
          this.imagePath = 'http://images.equipboard.com/uploads/user/image/8602/big_layne-staley.jpg';
          this.requestStatus = 'SUCESSO';
        }

      },
      (err) => {
        console.log(err);
      });
  }

}
