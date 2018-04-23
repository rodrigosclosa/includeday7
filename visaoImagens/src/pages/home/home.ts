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
  // Variáveis Globais do Componente
  imagePath: String;
  description: any;
  loader: any;
  accuracy: String;

  // Opções de configuração da Câmera
  options: CameraOptions = {
    quality: 50,
    targetWidth: 800,
    targetHeight: 600,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  }

  // Construtor padrão do Componente
  constructor(
    public navCtrl: NavController, // Aqui declaramos que vamos utilizar o navegador de rotas do Ionic
    public alertController: AlertController, // Aqui declaramos que vamos utilizar o exibidor de mensagens do Ionic
    public loadingController: LoadingController, // Aqui declaramos que vamos utilizar o loader do Ionic
    public congnitiveProvider: CognitiveApiProvider, // Aqui declaramos que vamos utilizar nosso provider para processar as imagens
    private camera: Camera, // Aqui declaramos que vamos usar o plugin da camera
    private tts: TextToSpeech // Aqui delcaramos que vamos usar o plugin do text-to-speech
  ) {
    camera = this.camera;
    this.imagePath = 'assets/imgs/no-image.jpg';
  }

  // Função para exibir uma mansagem enquanto carrega ou processa algo na tela
  showLoader() {
    this.loader = this.loadingController.create({
      content: "????"
    });
    this.loader.present();
  }

  // Função para fazer falar o texto
  textToSpeech() {
    // Aqui fazemos a chamada para o plugin de Text-To-Speech do Cordova
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

  // Função para exibir uma mensagem de erro na tela para o usuário
  showAlert(message) {
    let alert = this.alertController.create({
      title: 'Erro ao processar imagem',
      subTitle: message,
      buttons: ['Ok']
    });
    alert.present();
  }

  // Função para enviar a imagem para análise no serviço
  getPicture() {
    this.camera.getPicture( ??????? ).then((imageData) => {
      this.imagePath = 'data:image/jpeg;base64,' + ?????????;

      // Enviar para analise a imagem

    }, (err) => {

      // Fazer exibir no console o erro
      // Fazer sumir a mensagem de carregando na tela (loader)

    });
  }

  // Função que envia a imagem em base64 para o serviço de visão computacional do azure
  analyseImageTest(base64Image) {
    this.description = '';
    this.accuracy = `NA`;

    // Montar o Body para enviar ao serviço
    let body = {
      ????????
    }

    this.congnitiveProvider.?????( <?????> ).then(
      (result) => {

        // Exibir no console o retorno do serviço
        // Com o resultado do retorno, preciso verificar se retornou o texto da imagem
        // Preciso também exibir o valor da confiança de 0 a 100% na tela pro usuário
        // Preciso também traduzir o texto de inglês para português para exibir na tela
        // Se não identificar nenhum dado na imagem ou SE a confiança for menor que 40% exibir uma mensagem ao usuário na tela

      },
      (err) => {

        // Exibir no console caso ocorra algum erro
        // Fazer sumir a mensagem de carregando na tela  (loader)
        // Fazer exibir a mensagem na tela para o usuário

      });
  }

  // Função que traduz para português um texto
  translateTextToBr(text) {
    
    let body = {
      ???????
    };

    // Fazer a chamada da função que traduz o texto e retorna o resultado
    this.????????.???????( <?????> ).then(
      (result) => {

        // Exibir no console o retorno do serviço
        // Com o resultado do retorno, verificar se tem dados e se retornou o texto traduzido
        // Depois, preciso guardar o texto TRADUZIDO em uma variável global no formato: "#PraCegoVer: Meu texto "
        // Se não for retornado nenhum dado ou texto, exibir na tela para o usuario uma mensagem informando
        // Depois, preciso fazer o aplicativo falar o texto completo incluindo #PraCegoVer
        // Por último, mas não menos importante, preciso esconder a mensagem de processando da tela

      },
      (err) => {

        // Exibir no console caso ocorra algum erro
        // Fazer sumir a mensagem de carregando na tela  (loader)
        // Fazer exibir a mensagem na tela para o usuário

      }
    );
  }

  // Função que abre a página de sobre do aplicativo
  openAbout() {
    
    //Fazer abrir a tela de sobre do aplicativo utilizando o NavController

  }
}
