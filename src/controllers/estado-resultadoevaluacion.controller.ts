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
  Resultadoevaluacion,
} from '../models';
import {EstadoRepository} from '../repositories';

export class EstadoResultadoevaluacionController {
  constructor(
    @repository(EstadoRepository) protected estadoRepository: EstadoRepository,
  ) { }

  @get('/estados/{id}/resultadoevaluacion', {
    responses: {
      '200': {
        description: 'Estado has one Resultadoevaluacion',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Resultadoevaluacion),
          },
        },
      },
    },
  })
  async get(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Resultadoevaluacion>,
  ): Promise<Resultadoevaluacion> {
    return this.estadoRepository.resultadoevaluacion(id).get(filter);
  }

  @post('/estados/{id}/resultadoevaluacion', {
    responses: {
      '200': {
        description: 'Estado model instance',
        content: {'application/json': {schema: getModelSchemaRef(Resultadoevaluacion)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Estado.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Resultadoevaluacion, {
            title: 'NewResultadoevaluacionInEstado',
            exclude: ['id'],
            optional: ['id_estado']
          }),
        },
      },
    }) resultadoevaluacion: Omit<Resultadoevaluacion, 'id'>,
  ): Promise<Resultadoevaluacion> {
    return this.estadoRepository.resultadoevaluacion(id).create(resultadoevaluacion);
  }

  @patch('/estados/{id}/resultadoevaluacion', {
    responses: {
      '200': {
        description: 'Estado.Resultadoevaluacion PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Resultadoevaluacion, {partial: true}),
        },
      },
    })
    resultadoevaluacion: Partial<Resultadoevaluacion>,
    @param.query.object('where', getWhereSchemaFor(Resultadoevaluacion)) where?: Where<Resultadoevaluacion>,
  ): Promise<Count> {
    return this.estadoRepository.resultadoevaluacion(id).patch(resultadoevaluacion, where);
  }

  @del('/estados/{id}/resultadoevaluacion', {
    responses: {
      '200': {
        description: 'Estado.Resultadoevaluacion DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Resultadoevaluacion)) where?: Where<Resultadoevaluacion>,
  ): Promise<Count> {
    return this.estadoRepository.resultadoevaluacion(id).delete(where);
  }
}
