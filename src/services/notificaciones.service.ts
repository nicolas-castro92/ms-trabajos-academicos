import { /* inject, */ BindingScope, injectable} from '@loopback/core';
import {Data} from '../interfaces/secre.interface';
import {Configuracion} from '../keys/configuracion';
import {Modelocorreo} from '../models/modelocorreo.model';
import { NotificacionSms } from '../models/notificacion-sms.model';
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


  /* async notificacionAdmin(): Promise<correoAdmin | void> {
    fetch(Configuracion.urlcorreosAdministrativos)
      .then(async (resp: any) => resp.json())
      .then(async (datos: any) => {
        console.log('desde service', datos);
        return await datos;
      })
  } */

  async notificarAdmin(): Promise<Data[]> {
    let urlCorreo = `${Configuracion.urlcorreosAdministrativos}`
    const respuesta = fetch(urlCorreo)
      .then(async (resp: any) => resp.json())
      .then(async (datos: Data[]) => {
        //console.log('que responde', datos);
        return datos;
      })
    console.log('respuesta del fetch', respuesta);
    return respuesta;
  }

  NotificacionSms(datos: NotificacionSms) {
    let urlSms = `${Configuracion.urlSms}?${Configuracion.hashArg}=${Configuracion.hashNotificacion}&${Configuracion.destinoArg}=${datos.destino}&${Configuracion.mensajeArg}=${datos.mensaje}`
    fetch(urlSms)
      .then((resp: any) => {
        console.log(resp.text());
      })
  }

}
