import { /* inject, */ BindingScope, injectable} from '@loopback/core';
import {correoAdmin} from '../interfaces/modelo-correo-admin.interface';
import {Configuracion} from '../keys/configuracion';
import {Usuariojurado} from '../models';
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


  async notificacionAdmin(): Promise<correoAdmin | void> {
    fetch(Configuracion.urlcorreosAdministrativos)
      .then((resp: any) => resp.json())
      .then((datos: any) => {
        console.log('desde service', datos);
        return datos;
      })
  }
  async crearUsuario(datos: Usuariojurado){

  }

}
