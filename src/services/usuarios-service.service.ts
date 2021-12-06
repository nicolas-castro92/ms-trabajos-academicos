import { /* inject, */ BindingScope, injectable} from '@loopback/core';
import {repository} from '@loopback/repository';
import {HttpErrors} from '@loopback/rest';
import {Configuracion} from '../keys/configuracion';
import {Credenciales} from '../models/credenciales.model';
import {Jurado} from '../models/jurado.model';
import {TokenSession} from '../models/token-session.model';
import {JuradoRepository} from '../repositories';
const fetch = require('node-fetch');

@injectable({scope: BindingScope.TRANSIENT})
export class UsuariosServiceService {
  constructor(
    @repository(JuradoRepository)
    public usuarioJurado: JuradoRepository
  ) { }

  async validarCredenciales(credenciales: Credenciales) {

    let usuario = await this.usuarioJurado.findOne({
      where: {
        correo: credenciales.usuario,
        clave: credenciales.clave
      }
    });
    if (usuario?.correo != credenciales.usuario) {
      throw new HttpErrors[400](`usuario o clave invalida revise nuevamente`);
    }
    return usuario;
  }

  async crearToken(datosUser: Jurado): Promise<string> {
    let urlToken = `${Configuracion.urlCrearToken}?${Configuracion.nombreArg}=${datosUser.nombre}&${Configuracion.idUserArg}=${datosUser.id}&${Configuracion.idRolArg}=${"jurado"}`
    let tk = "";
    //console.log(tk);
    await fetch(urlToken)
      .then(async (res: any) => {
        tk = await res.text();
      })
    //console.log(tk);
    return tk;
  }

  async validarToken(token: TokenSession): Promise<Object> {
    let ok = false;
    //console.log('desde validartoken', token.token);
    try {
      let urlTokenSession = `${Configuracion.urlValidarSession}?${Configuracion.tokenArg}=${token.token}`
      const resp = await fetch(urlTokenSession);
      const data = await resp.json();
      return {
        ok: true,
        data, token
      }

    } catch (err) {
      throw new HttpErrors[401](`unauthorized`);
    }
  }

}
