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
import {Resultadosolicitud} from '../models';
import {ResultadosolicitudRepository} from '../repositories';

export class ResultadosolicitudController {
  constructor(
    @repository(ResultadosolicitudRepository)
    public resultadosolicitudRepository : ResultadosolicitudRepository,
  ) {}

  @post('/resultadoxsolicitudes')
  @response(200, {
    description: 'Resultadosolicitud model instance',
    content: {'application/json': {schema: getModelSchemaRef(Resultadosolicitud)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Resultadosolicitud, {
            title: 'NewResultadosolicitud',
            exclude: ['id'],
          }),
        },
      },
    })
    resultadosolicitud: Omit<Resultadosolicitud, 'id'>,
  ): Promise<Resultadosolicitud> {
    return this.resultadosolicitudRepository.create(resultadosolicitud);
  }

  @get('/resultadoxsolicitudes/count')
  @response(200, {
    description: 'Resultadosolicitud model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Resultadosolicitud) where?: Where<Resultadosolicitud>,
  ): Promise<Count> {
    return this.resultadosolicitudRepository.count(where);
  }

  @get('/resultadoxsolicitudes')
  @response(200, {
    description: 'Array of Resultadosolicitud model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Resultadosolicitud, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Resultadosolicitud) filter?: Filter<Resultadosolicitud>,
  ): Promise<Resultadosolicitud[]> {
    return this.resultadosolicitudRepository.find(filter);
  }

  @patch('/resultadoxsolicitudes')
  @response(200, {
    description: 'Resultadosolicitud PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Resultadosolicitud, {partial: true}),
        },
      },
    })
    resultadosolicitud: Resultadosolicitud,
    @param.where(Resultadosolicitud) where?: Where<Resultadosolicitud>,
  ): Promise<Count> {
    return this.resultadosolicitudRepository.updateAll(resultadosolicitud, where);
  }

  @get('/resultadoxsolicitudes/{id}')
  @response(200, {
    description: 'Resultadosolicitud model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Resultadosolicitud, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Resultadosolicitud, {exclude: 'where'}) filter?: FilterExcludingWhere<Resultadosolicitud>
  ): Promise<Resultadosolicitud> {
    return this.resultadosolicitudRepository.findById(id, filter);
  }

  @patch('/resultadoxsolicitudes/{id}')
  @response(204, {
    description: 'Resultadosolicitud PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Resultadosolicitud, {partial: true}),
        },
      },
    })
    resultadosolicitud: Resultadosolicitud,
  ): Promise<void> {
    await this.resultadosolicitudRepository.updateById(id, resultadosolicitud);
  }

  @put('/resultadoxsolicitudes/{id}')
  @response(204, {
    description: 'Resultadosolicitud PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() resultadosolicitud: Resultadosolicitud,
  ): Promise<void> {
    await this.resultadosolicitudRepository.replaceById(id, resultadosolicitud);
  }

  @del('/resultadoxsolicitudes/{id}')
  @response(204, {
    description: 'Resultadosolicitud DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.resultadosolicitudRepository.deleteById(id);
  }
}
