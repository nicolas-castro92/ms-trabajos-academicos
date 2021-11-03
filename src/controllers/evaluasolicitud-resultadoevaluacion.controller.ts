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
  Evaluasolicitud,
  Resultadoevaluacion,
} from '../models';
import {EvaluasolicitudRepository} from '../repositories';

export class EvaluasolicitudResultadoevaluacionController {
  constructor(
    @repository(EvaluasolicitudRepository) protected evaluasolicitudRepository: EvaluasolicitudRepository,
  ) { }

  @get('/evaluasolicituds/{id}/resultadoevaluacion', {
    responses: {
      '200': {
        description: 'Evaluasolicitud has one Resultadoevaluacion',
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
    return this.evaluasolicitudRepository.resultadoevaluacion(id).get(filter);
  }

  @post('/evaluasolicituds/{id}/resultadoevaluacion', {
    responses: {
      '200': {
        description: 'Evaluasolicitud model instance',
        content: {'application/json': {schema: getModelSchemaRef(Resultadoevaluacion)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Evaluasolicitud.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Resultadoevaluacion, {
            title: 'NewResultadoevaluacionInEvaluasolicitud',
            exclude: ['id'],
            optional: ['id_evaluasolicitud']
          }),
        },
      },
    }) resultadoevaluacion: Omit<Resultadoevaluacion, 'id'>,
  ): Promise<Resultadoevaluacion> {
    return this.evaluasolicitudRepository.resultadoevaluacion(id).create(resultadoevaluacion);
  }

  @patch('/evaluasolicituds/{id}/resultadoevaluacion', {
    responses: {
      '200': {
        description: 'Evaluasolicitud.Resultadoevaluacion PATCH success count',
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
    return this.evaluasolicitudRepository.resultadoevaluacion(id).patch(resultadoevaluacion, where);
  }

  @del('/evaluasolicituds/{id}/resultadoevaluacion', {
    responses: {
      '200': {
        description: 'Evaluasolicitud.Resultadoevaluacion DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Resultadoevaluacion)) where?: Where<Resultadoevaluacion>,
  ): Promise<Count> {
    return this.evaluasolicitudRepository.resultadoevaluacion(id).delete(where);
  }
}
