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
  Juradoxsolicitud,
} from '../models';
import {SolicitudRepository} from '../repositories';

export class SolicitudJuradoxsolicitudController {
  constructor(
    @repository(SolicitudRepository) protected solicitudRepository: SolicitudRepository,
  ) { }

  @get('/solicituds/{id}/juradoxsolicituds', {
    responses: {
      '200': {
        description: 'Array of Solicitud has many Juradoxsolicitud',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Juradoxsolicitud)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Juradoxsolicitud>,
  ): Promise<Juradoxsolicitud[]> {
    return this.solicitudRepository.juradoxsolicituds(id).find(filter);
  }

  @post('/solicituds/{id}/juradoxsolicituds', {
    responses: {
      '200': {
        description: 'Solicitud model instance',
        content: {'application/json': {schema: getModelSchemaRef(Juradoxsolicitud)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Solicitud.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Juradoxsolicitud, {
            title: 'NewJuradoxsolicitudInSolicitud',
            exclude: ['id'],
            optional: ['id_solicitud']
          }),
        },
      },
    }) juradoxsolicitud: Omit<Juradoxsolicitud, 'id'>,
  ): Promise<Juradoxsolicitud> {
    return this.solicitudRepository.juradoxsolicituds(id).create(juradoxsolicitud);
  }

  @patch('/solicituds/{id}/juradoxsolicituds', {
    responses: {
      '200': {
        description: 'Solicitud.Juradoxsolicitud PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Juradoxsolicitud, {partial: true}),
        },
      },
    })
    juradoxsolicitud: Partial<Juradoxsolicitud>,
    @param.query.object('where', getWhereSchemaFor(Juradoxsolicitud)) where?: Where<Juradoxsolicitud>,
  ): Promise<Count> {
    return this.solicitudRepository.juradoxsolicituds(id).patch(juradoxsolicitud, where);
  }

  @del('/solicituds/{id}/juradoxsolicituds', {
    responses: {
      '200': {
        description: 'Solicitud.Juradoxsolicitud DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Juradoxsolicitud)) where?: Where<Juradoxsolicitud>,
  ): Promise<Count> {
    return this.solicitudRepository.juradoxsolicituds(id).delete(where);
  }
}
