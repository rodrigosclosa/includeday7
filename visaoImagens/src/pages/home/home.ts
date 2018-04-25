import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { TextToSpeech } from '@ionic-native/text-to-speech';
import { CognitiveApiProvider } from '../../providers/cognitive-api/cognitive-api';
import { AboutPage } from '../about/about';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  imagePath: String;
  description: any;
  loader: any;
  accuracy: String;

  options: CameraOptions = {
    quality: 50,
    targetWidth: 800,
    targetHeight: 600,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  }

  constructor(
    public navCtrl: NavController,
    public alertController: AlertController,
    public loadingController: LoadingController,
    public congnitiveProvider: CognitiveApiProvider,
    private camera: Camera,
    private tts: TextToSpeech
  ) {
    camera = this.camera;
    this.imagePath = 'assets/imgs/no-image.jpg';
  }

  showLoader() {
    this.loader = this.loadingController.create({
      content: "Processando..."
    });

    this.loader.present();
  }

  textToSpeech() {
    this.tts.speak({
      text: "testing",
      locale: 'pt-BR',
      rate: 0.75
    })
    .then(() => {
      console.log('Speech success');
    })
    .catch((reason: any) => {
      console.log(reason);
    });
  };

  showAlert(message) {
    let alert = this.alertController.create({
      title: 'Errom ao processar imagem',
      subTitle: message,
      buttons: ['Ok']
    });

    alert.present();
  }

  getPicture() {
    this.showLoader();

    this.camera.getPicture(this.options).then((imageData) => {
      this.imagePath = 'data:image/jpeg;base64,' + imageData;

      this.analyseImageTest(imageData);

      console.log('sucesso');
    }, (err) => {
      this.loader.dismiss();
      console.log(err);
    });
  }

  analyseImageTest(base64Image) {
    this.description = '';
    this.accuracy = `NA`;

    let body = {
      base64Image: base64Image
    }

    this.congnitiveProvider.analyseImage(body).then(
      (result) => {
        console.log(result);

        if (result && result['description'] && result['description']['captions']) {
          let confidence = result['description']['captions'][0]['confidence'] ? result['description']['captions'][0]['confidence'] * 100 : 'NA';
          this.accuracy = `Confiança: ${Number(confidence).toFixed(2)}%`;

          this.translateTextToBr(result['description']['captions'][0]['text']);
        } else {
          this.description = 'Nenhun texto identificado';
        }
      },
      (err) => {
        console.log(err);
        this.loader.dismiss();
        this.showAlert(err.message);
      });
  }

  translateTextToBr(text) {
    let body = {
      q: text,
      target: 'pt',
      source: 'en'
    };

    this.congnitiveProvider.translateEnToBr(body).then(
      (result) => {
        console.log(result);

        if (result && result['data'] && result['data']['translations'] && result['data']['translations'].length > 0) {
          this.description = '#PraCegoVer: ' + result['data']['translations'][0]['translatedText'];
        } else {
          this.description = 'Nenhum texto identificado';
        }

        this.textToSpeech();
        this.loader.dismiss();
      },
      (err) => {
        console.log(err);
        this.loader.dismiss();
        this.showAlert(err.message);
      }
    );
  }

  openAbout() {
    this.navCtrl.push(AboutPage);
  }
}
