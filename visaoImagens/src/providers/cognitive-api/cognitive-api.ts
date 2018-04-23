import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class CognitiveApiProvider {

  // Declaração das variáveis globais de configuração
  computerVisionBaseUrl = 'https://includeday-7.appspot.com/_ah/api/computervisionazure/v1/analyzeimage';
  computerVisionApiKey = 'AIzaSyB1rQAu-rmtvVFU_vZ4xSVvLrRZ9QMeAX0';
  googleTranslateBaseUrl = 'https://translation.googleapis.com/language/translate/v2';
  googleTranslateApiKey = 'AIzaSyCXXwba2dmNfF824qgKzGzsE21Hr1R0V1M';

  // Construtor padrão do provider
  constructor(public http: HttpClient) {
    console.log('Hello CognitiveApiProvider Provider');
  }

  /*
    Função responsável por enviar a imagem em base64 para o serviço.

    Payload de entrada:
      - body: { "base64Image": "/9j/4AAQSkZJRgABAQAAAQABAA........" }

    Payload de retorno:
      {
        "metadata": {
            "width": 1260,
            "format": "Jpeg",
            "height": 945
        },
        "requestId": "87b93794-40e2-4c61-9dc8-0ccb95708df0",
        "description": {
            "captions": [
                {
                    "confidence": 0.7709766527571873,
                    "text": "a close up of text on a white background"
                }
            ],
            "tags": [
                "text"
            ]
        }
      }
  */
  analyseImage(body) {
    return new Promise((resolve, reject) => {
      this.http.post(`${this.computerVisionBaseUrl}?key=${this.computerVisionApiKey}`,
      JSON.stringify(body))
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        })
    });
  }

  /*
    Função responsável por enviar um texto para ser traduzido pelo serviço do Google.

    Payload de entrada:
      {
        q: 'my english text',
        target: 'pt',
        source: 'en'
      }

    Payload de saída:
      {
        "data": {
            "translations": [
                {
                    "translatedText": "meu texto em ingles"
                }
            ]
        }
      }
  */
  translateEnToBr(body) {
    return new Promise((resolve, reject) => {
      this.http.post(`${this.googleTranslateBaseUrl}?key=${this.googleTranslateApiKey}`,
        JSON.stringify(body))
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        })
    });
  }

}
