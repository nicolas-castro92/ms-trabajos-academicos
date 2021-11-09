import { /* inject, */ BindingScope, injectable} from '@loopback/core';
import {Configuracion} from '../keys/configuracion';
import {Modelocorreo} from '../models/modelocorreo.model';
const fetch = require('node-fetch');

@injectable({scope: BindingScope.TRANSIENT})
export class NotificacionesService {
  constructor(/* Add @inject to inject parameters */) { }

  async enviarCorreo(datos: Modelocorreo) {
    let urlCorreo = `${Configuracion.urlCorreo}?${Configuracion.hashArg}=${Configuracion.hashNotificacion}&${Configuracion.destinoArg}=${datos.destino}&${Configuracion.asuntoArg}=${datos.asunto}&${Configuracion.mensajeArg}=${datos.mensaje}`
    await fetch(urlCorreo)
      .then(async (resp: any) => {
        console.log(await resp.text());
      })
  }


}
