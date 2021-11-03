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
  Evaluasolicitud,
} from '../models';
import {SolicitudRepository} from '../repositories';

export class SolicitudEvaluasolicitudController {
  constructor(
    @repository(SolicitudRepository) protected solicitudRepository: SolicitudRepository,
  ) { }

  @get('/solicituds/{id}/evaluasolicitud', {
    responses: {
      '200': {
        description: 'Solicitud has one Evaluasolicitud',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Evaluasolicitud),
          },
        },
      },
    },
  })
  async get(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Evaluasolicitud>,
  ): Promise<Evaluasolicitud> {
    return this.solicitudRepository.evaluasolicitud(id).get(filter);
  }

  @post('/solicituds/{id}/evaluasolicitud', {
    responses: {
      '200': {
        description: 'Solicitud model instance',
        content: {'application/json': {schema: getModelSchemaRef(Evaluasolicitud)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Solicitud.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Evaluasolicitud, {
            title: 'NewEvaluasolicitudInSolicitud',
            exclude: ['id'],
            optional: ['id_solicitud']
          }),
        },
      },
    }) evaluasolicitud: Omit<Evaluasolicitud, 'id'>,
  ): Promise<Evaluasolicitud> {
    return this.solicitudRepository.evaluasolicitud(id).create(evaluasolicitud);
  }

  @patch('/solicituds/{id}/evaluasolicitud', {
    responses: {
      '200': {
        description: 'Solicitud.Evaluasolicitud PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Evaluasolicitud, {partial: true}),
        },
      },
    })
    evaluasolicitud: Partial<Evaluasolicitud>,
    @param.query.object('where', getWhereSchemaFor(Evaluasolicitud)) where?: Where<Evaluasolicitud>,
  ): Promise<Count> {
    return this.solicitudRepository.evaluasolicitud(id).patch(evaluasolicitud, where);
  }

  @del('/solicituds/{id}/evaluasolicitud', {
    responses: {
      '200': {
        description: 'Solicitud.Evaluasolicitud DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Evaluasolicitud)) where?: Where<Evaluasolicitud>,
  ): Promise<Count> {
    return this.solicitudRepository.evaluasolicitud(id).delete(where);
  }
}
