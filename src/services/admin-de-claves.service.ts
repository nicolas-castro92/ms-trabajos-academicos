import { /* inject, */ BindingScope, injectable, service} from '@loopback/core';
import {repository} from '@loopback/repository';
import {Configuracion} from '../keys/configuracion';
import {CambioClave, CredencialesRecuperarClave} from '../models';
import {NotificacionSms} from '../models/notificacion-sms.model';
import {JuradoRepository} from '../repositories';
import {NotificacionesService} from './notificaciones.service';
const generator = require('generate-password');
const cryptoJS = require("crypto-js");

@injectable({scope: BindingScope.TRANSIENT})
export class AdminDeClavesService {
  constructor(
    @repository(JuradoRepository)
    public juradoRepository: JuradoRepository,
    @service(NotificacionesService)
    public notiService: NotificacionesService
  ) { }

  async cambiarClave(credencialesClave: CambioClave) {
    let usuario = await this.juradoRepository.findOne({
      where: {
        id: credencialesClave.id_usuario,
        clave: credencialesClave.clave_actual
      }
    });
    if (usuario) {
      usuario.clave = credencialesClave.clave_nueva;
      await this.juradoRepository.updateById(credencialesClave.id_usuario, usuario);

      return usuario;
    } else {
      return null;
    }
  }

  async recuperarClave(credenciales: CredencialesRecuperarClave) {
    let usuario = await this.juradoRepository.findOne({
      where: {
        correo: credenciales.correo
      }
    });
    if (usuario) {
      let claveRecuperada = this.crearClaveAleatoria();
      //console.log(claveRecuperada);
      usuario.clave = this.cifrarTexto(claveRecuperada);
      await this.juradoRepository.updateById(usuario.id, usuario);
      //notificar la nueva contraseña por correo;
      let datos = new NotificacionSms();
      datos.destino = usuario.celular;
      datos.mensaje = `${Configuracion.saludo} ${usuario.nombre} ${Configuracion.mensajeRecuperarClave} ${claveRecuperada} `
      this.notiService.NotificacionSms(datos);
      return usuario
    }
  }


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
