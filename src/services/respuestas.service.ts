import { /* inject, */ BindingScope, injectable} from '@loopback/core';
import {repository} from '@loopback/repository';
import {Configuracion} from '../keys/configuracion';
import {Modelocorreo} from '../models/modelocorreo.model';
import {Modelorespuesta} from '../models/modelorespuesta.model';
import {JuradoxsolicitudRepository} from '../repositories';

@injectable({scope: BindingScope.TRANSIENT})
export class RespuestasService {
  constructor(
    @repository(JuradoxsolicitudRepository)
    public juradoxsolicitudrepository: JuradoxsolicitudRepository
  ) { }


  async recibirRespuesta(respuesta: Modelorespuesta) {
    let carga = await this.juradoxsolicitudrepository.findOne({
      where: {
        id: respuesta.codigo_solicitud
      }
    })
    if (carga) {
      carga.respuesta = respuesta.respuesta;
      carga.observaciones = respuesta.observaciones;
      carga.fecha_respuesta = respuesta.fecha_respuesta;
      await this.juradoxsolicitudrepository.updateById(respuesta.codigo_solicitud, carga);
      return carga;
    } else {
      return null;
    }
  }

  


}
