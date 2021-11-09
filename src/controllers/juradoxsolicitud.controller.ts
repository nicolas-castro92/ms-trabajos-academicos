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
import {JuradoxsolicitudRepository, SolicitudRepository} from '../repositories';
import {JuradoRepository} from '../repositories/jurado.repository';
import {NotificacionesService} from '../services';

export class JuradoxsolicitudController {
  constructor(
    @repository(JuradoxsolicitudRepository)
    public juradoxsolicitudRepository: JuradoxsolicitudRepository,
    @repository(JuradoRepository)
    public juradoRepository: JuradoRepository,
    @service(NotificacionesService)
    public notiService: NotificacionesService,
    @repository(SolicitudRepository)
    public solicitudRepository: SolicitudRepository
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
                           ${Configuracion.urlRespuestaJurado}?filter={%22where%22:{%22id%22:}${solicitud.id}}`
          //http://localhost:3000/juradoxsolicitudes?filter={%22where%22:{%22id%22:1}}
          this.notiService.enviarCorreo(datos);
          return 'OK'
        }
        return 'solicitud'
      }
      return 'jurado invitado';
    }
    return peticion;
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
