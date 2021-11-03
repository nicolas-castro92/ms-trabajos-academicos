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
  Estado,
  Evaluasolicitud,
} from '../models';
import {EstadoRepository} from '../repositories';

export class EstadoEvaluasolicitudController {
  constructor(
    @repository(EstadoRepository) protected estadoRepository: EstadoRepository,
  ) { }

  @get('/estados/{id}/evaluasolicitud', {
    responses: {
      '200': {
        description: 'Estado has one Evaluasolicitud',
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
    return this.estadoRepository.evaluasolicitud(id).get(filter);
  }

  @post('/estados/{id}/evaluasolicitud', {
    responses: {
      '200': {
        description: 'Estado model instance',
        content: {'application/json': {schema: getModelSchemaRef(Evaluasolicitud)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Estado.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Evaluasolicitud, {
            title: 'NewEvaluasolicitudInEstado',
            exclude: ['id'],
            optional: ['id_estado']
          }),
        },
      },
    }) evaluasolicitud: Omit<Evaluasolicitud, 'id'>,
  ): Promise<Evaluasolicitud> {
    return this.estadoRepository.evaluasolicitud(id).create(evaluasolicitud);
  }

  @patch('/estados/{id}/evaluasolicitud', {
    responses: {
      '200': {
        description: 'Estado.Evaluasolicitud PATCH success count',
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
    return this.estadoRepository.evaluasolicitud(id).patch(evaluasolicitud, where);
  }

  @del('/estados/{id}/evaluasolicitud', {
    responses: {
      '200': {
        description: 'Estado.Evaluasolicitud DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Evaluasolicitud)) where?: Where<Evaluasolicitud>,
  ): Promise<Count> {
    return this.estadoRepository.evaluasolicitud(id).delete(where);
  }
}
