import { /* inject, */ BindingScope, injectable} from '@loopback/core';
//const generator = require('generate-password');
const cryptoJS = require("crypto-js");
const generator = require('generate-password');


@injectable({scope: BindingScope.TRANSIENT})
export class UserPassService {
  constructor(/* Add @inject to inject parameters */) { }
  crearClaveAleatoria(): string {
    let password: string = generator.generate({
      length: 10,
      numbers: true
    });
    return password;
  }

  cifrarTexto(texto: string): string {
    let encryptedTexto: string = cryptoJS.MD5(texto).toString();
    return encryptedTexto;
  }

}
