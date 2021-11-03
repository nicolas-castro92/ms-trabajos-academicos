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
  Comitexsolicitud,
} from '../models';
import {SolicitudRepository} from '../repositories';

export class SolicitudComitexsolicitudController {
  constructor(
    @repository(SolicitudRepository) protected solicitudRepository: SolicitudRepository,
  ) { }

  @get('/solicituds/{id}/comitexsolicituds', {
    responses: {
      '200': {
        description: 'Array of Solicitud has many Comitexsolicitud',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Comitexsolicitud)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Comitexsolicitud>,
  ): Promise<Comitexsolicitud[]> {
    return this.solicitudRepository.comitexsolicituds(id).find(filter);
  }

  @post('/solicituds/{id}/comitexsolicituds', {
    responses: {
      '200': {
        description: 'Solicitud model instance',
        content: {'application/json': {schema: getModelSchemaRef(Comitexsolicitud)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Solicitud.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Comitexsolicitud, {
            title: 'NewComitexsolicitudInSolicitud',
            exclude: ['id'],
            optional: ['id_solicitud']
          }),
        },
      },
    }) comitexsolicitud: Omit<Comitexsolicitud, 'id'>,
  ): Promise<Comitexsolicitud> {
    return this.solicitudRepository.comitexsolicituds(id).create(comitexsolicitud);
  }

  @patch('/solicituds/{id}/comitexsolicituds', {
    responses: {
      '200': {
        description: 'Solicitud.Comitexsolicitud PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Comitexsolicitud, {partial: true}),
        },
      },
    })
    comitexsolicitud: Partial<Comitexsolicitud>,
    @param.query.object('where', getWhereSchemaFor(Comitexsolicitud)) where?: Where<Comitexsolicitud>,
  ): Promise<Count> {
    return this.solicitudRepository.comitexsolicituds(id).patch(comitexsolicitud, where);
  }

  @del('/solicituds/{id}/comitexsolicituds', {
    responses: {
      '200': {
        description: 'Solicitud.Comitexsolicitud DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Comitexsolicitud)) where?: Where<Comitexsolicitud>,
  ): Promise<Count> {
    return this.solicitudRepository.comitexsolicituds(id).delete(where);
  }
}
