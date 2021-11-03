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
  Solicitud,
  Proponentexsolicitud,
} from '../models';
import {SolicitudRepository} from '../repositories';

export class SolicitudProponentexsolicitudController {
  constructor(
    @repository(SolicitudRepository) protected solicitudRepository: SolicitudRepository,
  ) { }

  @get('/solicituds/{id}/proponentexsolicituds', {
    responses: {
      '200': {
        description: 'Array of Solicitud has many Proponentexsolicitud',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Proponentexsolicitud)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Proponentexsolicitud>,
  ): Promise<Proponentexsolicitud[]> {
    return this.solicitudRepository.proponentexsolicituds(id).find(filter);
  }

  @post('/solicituds/{id}/proponentexsolicituds', {
    responses: {
      '200': {
        description: 'Solicitud model instance',
        content: {'application/json': {schema: getModelSchemaRef(Proponentexsolicitud)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Solicitud.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Proponentexsolicitud, {
            title: 'NewProponentexsolicitudInSolicitud',
            exclude: ['id'],
            optional: ['id_solicitud']
          }),
        },
      },
    }) proponentexsolicitud: Omit<Proponentexsolicitud, 'id'>,
  ): Promise<Proponentexsolicitud> {
    return this.solicitudRepository.proponentexsolicituds(id).create(proponentexsolicitud);
  }

  @patch('/solicituds/{id}/proponentexsolicituds', {
    responses: {
      '200': {
        description: 'Solicitud.Proponentexsolicitud PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Proponentexsolicitud, {partial: true}),
        },
      },
    })
    proponentexsolicitud: Partial<Proponentexsolicitud>,
    @param.query.object('where', getWhereSchemaFor(Proponentexsolicitud)) where?: Where<Proponentexsolicitud>,
  ): Promise<Count> {
    return this.solicitudRepository.proponentexsolicituds(id).patch(proponentexsolicitud, where);
  }

  @del('/solicituds/{id}/proponentexsolicituds', {
    responses: {
      '200': {
        description: 'Solicitud.Proponentexsolicitud DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Proponentexsolicitud)) where?: Where<Proponentexsolicitud>,
  ): Promise<Count> {
    return this.solicitudRepository.proponentexsolicituds(id).delete(where);
  }
}
