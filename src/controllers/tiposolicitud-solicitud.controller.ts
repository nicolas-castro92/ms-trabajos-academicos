import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Tiposolicitud,
  Solicitud,
} from '../models';
import {TiposolicitudRepository} from '../repositories';

export class TiposolicitudSolicitudController {
  constructor(
    @repository(TiposolicitudRepository) protected tiposolicitudRepository: TiposolicitudRepository,
  ) { }

  @get('/tiposolicituds/{id}/solicituds', {
    responses: {
      '200': {
        description: 'Array of Tiposolicitud has many Solicitud',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Solicitud)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Solicitud>,
  ): Promise<Solicitud[]> {
    return this.tiposolicitudRepository.solicituds(id).find(filter);
  }

  @post('/tiposolicituds/{id}/solicituds', {
    responses: {
      '200': {
        description: 'Tiposolicitud model instance',
        content: {'application/json': {schema: getModelSchemaRef(Solicitud)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Tiposolicitud.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Solicitud, {
            title: 'NewSolicitudInTiposolicitud',
            exclude: ['id'],
            optional: ['id_tiposolicitud']
          }),
        },
      },
    }) solicitud: Omit<Solicitud, 'id'>,
  ): Promise<Solicitud> {
    return this.tiposolicitudRepository.solicituds(id).create(solicitud);
  }

  @patch('/tiposolicituds/{id}/solicituds', {
    responses: {
      '200': {
        description: 'Tiposolicitud.Solicitud PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Solicitud, {partial: true}),
        },
      },
    })
    solicitud: Partial<Solicitud>,
    @param.query.object('where', getWhereSchemaFor(Solicitud)) where?: Where<Solicitud>,
  ): Promise<Count> {
    return this.tiposolicitudRepository.solicituds(id).patch(solicitud, where);
  }

  @del('/tiposolicituds/{id}/solicituds', {
    responses: {
      '200': {
        description: 'Tiposolicitud.Solicitud DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Solicitud)) where?: Where<Solicitud>,
  ): Promise<Count> {
    return this.tiposolicitudRepository.solicituds(id).delete(where);
  }
}
