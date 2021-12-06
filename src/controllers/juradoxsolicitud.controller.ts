import {service} from '@loopback/core';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where
} from '@loopback/repository';
import {
  del, get,
  getModelSchemaRef, param, patch, post, put, requestBody,
  response
} from '@loopback/rest';
import {Configuracion} from '../keys/configuracion';
import {Juradoxsolicitud} from '../models';
import {Modelocorreo} from '../models/modelocorreo.model';
import {Modelorespuesta} from '../models/modelorespuesta.model';
import {JuradoxsolicitudRepository, SolicitudRepository} from '../repositories';
import {JuradoRepository} from '../repositories/jurado.repository';
import {UsuariojuradoRepository} from '../repositories/usuariojurado.repository';
import {NotificacionesService, RespuestasService, UserPassService} from '../services';

export class JuradoxsolicitudController {
  constructor(
    @repository(JuradoxsolicitudRepository)
    public juradoxsolicitudRepository: JuradoxsolicitudRepository,
    @repository(JuradoRepository)
    public juradoRepository: JuradoRepository,
    @service(NotificacionesService)
    public notiService: NotificacionesService,
    @service(RespuestasService)
    public respService: RespuestasService,
    @service(UserPassService)
    public userPassService: UserPassService,
    @repository(SolicitudRepository)
    public solicitudRepository: SolicitudRepository,
    @repository(UsuariojuradoRepository)
    public usuarioJuradoRepository: UsuariojuradoRepository

  ) { }

  @post('/juradoxsolicitudes')
  @response(200, {
    description: 'Juradoxsolicitud model instance',
    content: {'application/json': {schema: getModelSchemaRef(Juradoxsolicitud)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Juradoxsolicitud, {
            title: 'NewJuradoxsolicitud',
            exclude: ['id'],
          }),
        },
      },
    })
    juradoxsolicitud: Omit<Juradoxsolicitud, 'id'>,
  ): Promise<Juradoxsolicitud | boolean | string> {
    let peticion = await this.juradoxsolicitudRepository.create(juradoxsolicitud);
    if (peticion) {
      let juradoInvitado = await this.juradoRepository.findOne({
        where: {
          id: peticion.id_jurado
        }
      })
      if (juradoInvitado) {
        let solicitud = await this.solicitudRepository.findOne({
          where: {
            id: peticion.id_solicitud
          }
        })
        if (solicitud) {
          let datos = new Modelocorreo();
          datos.destino = juradoInvitado.correo;
          datos.asunto = Configuracion.asuntoJurado;
          datos.mensaje = `${Configuracion.saludo}${juradoInvitado.nombre}<br>
                           ${Configuracion.informacionJurado}
                           ${solicitud.nombre_trabajo}<br>
                           ${Configuracion.codigoJurado}${peticion.id}<br>
                           ${Configuracion.urlRespuestaJurado}`
          this.notiService.enviarCorreo(datos);
          return 'OK';
        }
        return 'solicitud';
      }
      return 'jurado invitado';
    }
    return peticion;
  }


  @post('/solicitud-respuesta')
  @response(200, {
    description: 'respuesta de la solicitud',
    content: {'application/json': {schema: getModelSchemaRef(Modelorespuesta)}},
  })
  async actualizarRespuesta(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Modelorespuesta, {
            title: 'actualizacion de la respuesta'
          }),
        },
      },
    })
    respuesta: Modelorespuesta,
  ): Promise<boolean | string | object> {

    let carga = await this.respService.recibirRespuesta(respuesta);
    let adminCorreo = await this.notiService.notificarAdmin();
    if (carga) {
      if (carga.respuesta == "ACEPTO") {
        //await this.notiService.notificarAdmin().then((resp: any) => {console.log('que viene', resp);});
        console.log('admin correos', adminCorreo);
        adminCorreo.map(correo => {
          console.log("map", `1+${correo.correo}`);
          let datos = new Modelocorreo();
          datos.destino = correo.correo;
          datos.asunto = Configuracion.asuntoNoti;
          datos.mensaje = `${Configuracion.saludo}<br>
                           ${Configuracion.mensajeNoti}
                           ${correo.correo}
                           ${Configuracion.mensajeNoti2}`
          this.notiService.enviarCorreo(datos);
        })
        //notificarle a los administradores
        //crear usuarioJurado
        let buscarJurado = await this.juradoRepository.findOne({
          where: {
            id: carga.id_jurado
          }
        })
        //console.log('carga', carga);
        if (buscarJurado) {
          if (buscarJurado.clave) {
            // notificar que ya tiene el material disponible
            let datos = new Modelocorreo();
            datos.destino = buscarJurado.correo;
            datos.asunto = Configuracion.asuntoUsuarioJurado;
            datos.mensaje = `${Configuracion.saludo}
                            ${buscarJurado.nombre}<br>
                            ${Configuracion.mensajeUsuarioJuradoOld}`
            this.notiService.enviarCorreo(datos);

            return {
              ok: false,
              buscarJurado
            };
          }
          else {
            // crear la clave
            let clave = this.userPassService.crearClaveAleatoria();
            let cifrar = this.userPassService.cifrarTexto(clave);
            console.log('antes', buscarJurado);
            buscarJurado.clave = cifrar;
            await this.juradoRepository.updateById(buscarJurado.id, buscarJurado);
            let datos = new Modelocorreo();
            datos.destino = buscarJurado.correo;
            datos.asunto = Configuracion.asuntoUsuarioJurado;
            datos.mensaje = `${Configuracion.saludo}
                       ${buscarJurado.nombre} <br>
                       ${Configuracion.mensajeUsuarioJurado}
                       ${Configuracion.mensajeUsuarioJuradoCreadoClave}
                       ${clave}`
            this.notiService.enviarCorreo(datos);
            console.log('despues', buscarJurado);
            //console.log('toca crear contraseña');
            //console.log('la clave', buscarJurado.clave);
            //console.log(clave);
            //console.log(cifrar);
          }
        }

        return "OK"
      } else if (carga.respuesta == "RECHAZO") {
        return 'gracias por responder';
      } else {
        return 'no ha ingresado una palabra valida';
      }
    }
    return carga != null;
  }









  @patch('/juradoxsolicitudes/{id}')
  @response(204, {
    description: 'Juradoxsolicitud PATCH success',
  })
  async updateRespusta(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Juradoxsolicitud, {partial: true}),
        },
      },
    })
    juradoxsolicitud: Juradoxsolicitud,
  ): Promise<void> {
    await this.juradoxsolicitudRepository.updateById(id, juradoxsolicitud);
  }






  @get('/juradoxsolicitudes/count')
  @response(200, {
    description: 'Juradoxsolicitud model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Juradoxsolicitud) where?: Where<Juradoxsolicitud>,
  ): Promise<Count> {
    return this.juradoxsolicitudRepository.count(where);
  }

  @get('/juradoxsolicitudes')
  @response(200, {
    description: 'Array of Juradoxsolicitud model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Juradoxsolicitud, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Juradoxsolicitud) filter?: Filter<Juradoxsolicitud>,
  ): Promise<Juradoxsolicitud[]> {
    return this.juradoxsolicitudRepository.find(filter);
  }

  @patch('/juradoxsolicitudes')
  @response(200, {
    description: 'Juradoxsolicitud PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Juradoxsolicitud, {partial: true}),
        },
      },
    })
    juradoxsolicitud: Juradoxsolicitud,
    @param.where(Juradoxsolicitud) where?: Where<Juradoxsolicitud>,
  ): Promise<Count> {
    return this.juradoxsolicitudRepository.updateAll(juradoxsolicitud, where);
  }

  @get('/juradoxsolicitudes/{id}')
  @response(200, {
    description: 'Juradoxsolicitud model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Juradoxsolicitud, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Juradoxsolicitud, {exclude: 'where'}) filter?: FilterExcludingWhere<Juradoxsolicitud>
  ): Promise<Juradoxsolicitud> {
    return this.juradoxsolicitudRepository.findById(id, filter);
  }

  @patch('/juradoxsolicitudes/{id}')
  @response(204, {
    description: 'Juradoxsolicitud PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Juradoxsolicitud, {partial: true}),
        },
      },
    })
    juradoxsolicitud: Juradoxsolicitud,
  ): Promise<void> {
    await this.juradoxsolicitudRepository.updateById(id, juradoxsolicitud);
  }

  @put('/juradoxsolicitudes/{id}')
  @response(204, {
    description: 'Juradoxsolicitud PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() juradoxsolicitud: Juradoxsolicitud,
  ): Promise<void> {
    await this.juradoxsolicitudRepository.replaceById(id, juradoxsolicitud);
  }

  @del('/juradoxsolicitudes/{id}')
  @response(204, {
    description: 'Juradoxsolicitud DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.juradoxsolicitudRepository.deleteById(id);
  }
}
