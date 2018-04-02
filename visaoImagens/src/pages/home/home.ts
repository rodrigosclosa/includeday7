import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { TextToSpeech } from '@ionic-native/text-to-speech';
import { CognitiveApiProvider } from '../../providers/cognitive-api/cognitive-api';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  imagePath: String;
  description: any;
  loader: any;

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
    // this.imagePath = 'http://images.equipboard.com/uploads/user/image/8602/big_layne-staley.jpg';
    // this.imagePath = 'https://media-cdn.tripadvisor.com/media/photo-s/0c/13/af/b0/torre-eiffel.jpg';
    // this.imagePath = 'https://www.otvfoco.com.br/wp-content/uploads/2018/01/silvio-risonho.jpg';
    this.imagePath = 'http://www.gardensbythebay.com.sg/etc/designs/gbb/clientlibs/images/common/not_found.jpg';
  }

  showLoader() {
    this.loader = this.loadingController.create({
      content: "Processando ..."
    });

    this.loader.present();
  }

  textToSpeech() {
    this.tts.speak({
      text: this.description,
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
      title: 'Erro ao processar imagem',
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

    let body = {
      base64Image: base64Image
    }

    this.congnitiveProvider.analyseImage(body).then(
      (result) => {
        console.log(result);

        if (result && result['description'] && result['description']['captions']) {
          this.translateTextToBr(result['description']['captions'][0]['text']);
        } else {
          this.description = 'Nenhum texto identificado';
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

}
