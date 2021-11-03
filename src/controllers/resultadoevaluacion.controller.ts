import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Resultadoevaluacion} from '../models';
import {ResultadoevaluacionRepository} from '../repositories';

export class ResultadoevaluacionController {
  constructor(
    @repository(ResultadoevaluacionRepository)
    public resultadoevaluacionRepository : ResultadoevaluacionRepository,
  ) {}

  @post('/resultadoevaluaciones')
  @response(200, {
    description: 'Resultadoevaluacion model instance',
    content: {'application/json': {schema: getModelSchemaRef(Resultadoevaluacion)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Resultadoevaluacion, {
            title: 'NewResultadoevaluacion',
            exclude: ['id'],
          }),
        },
      },
    })
    resultadoevaluacion: Omit<Resultadoevaluacion, 'id'>,
  ): Promise<Resultadoevaluacion> {
    return this.resultadoevaluacionRepository.create(resultadoevaluacion);
  }

  @get('/resultadoevaluaciones/count')
  @response(200, {
    description: 'Resultadoevaluacion model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Resultadoevaluacion) where?: Where<Resultadoevaluacion>,
  ): Promise<Count> {
    return this.resultadoevaluacionRepository.count(where);
  }

  @get('/resultadoevaluaciones')
  @response(200, {
    description: 'Array of Resultadoevaluacion model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Resultadoevaluacion, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Resultadoevaluacion) filter?: Filter<Resultadoevaluacion>,
  ): Promise<Resultadoevaluacion[]> {
    return this.resultadoevaluacionRepository.find(filter);
  }

  @patch('/resultadoevaluaciones')
  @response(200, {
    description: 'Resultadoevaluacion PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Resultadoevaluacion, {partial: true}),
        },
      },
    })
    resultadoevaluacion: Resultadoevaluacion,
    @param.where(Resultadoevaluacion) where?: Where<Resultadoevaluacion>,
  ): Promise<Count> {
    return this.resultadoevaluacionRepository.updateAll(resultadoevaluacion, where);
  }

  @get('/resultadoevaluaciones/{id}')
  @response(200, {
    description: 'Resultadoevaluacion model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Resultadoevaluacion, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Resultadoevaluacion, {exclude: 'where'}) filter?: FilterExcludingWhere<Resultadoevaluacion>
  ): Promise<Resultadoevaluacion> {
    return this.resultadoevaluacionRepository.findById(id, filter);
  }

  @patch('/resultadoevaluaciones/{id}')
  @response(204, {
    description: 'Resultadoevaluacion PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Resultadoevaluacion, {partial: true}),
        },
      },
    })
    resultadoevaluacion: Resultadoevaluacion,
  ): Promise<void> {
    await this.resultadoevaluacionRepository.updateById(id, resultadoevaluacion);
  }

  @put('/resultadoevaluaciones/{id}')
  @response(204, {
    description: 'Resultadoevaluacion PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() resultadoevaluacion: Resultadoevaluacion,
  ): Promise<void> {
    await this.resultadoevaluacionRepository.replaceById(id, resultadoevaluacion);
  }

  @del('/resultadoevaluaciones/{id}')
  @response(204, {
    description: 'Resultadoevaluacion DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.resultadoevaluacionRepository.deleteById(id);
  }
}
