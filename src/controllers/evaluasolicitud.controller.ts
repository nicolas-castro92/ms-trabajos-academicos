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
import {Evaluasolicitud} from '../models';
import {EvaluasolicitudRepository} from '../repositories';

export class EvaluasolicitudController {
  constructor(
    @repository(EvaluasolicitudRepository)
    public evaluasolicitudRepository : EvaluasolicitudRepository,
  ) {}

  @post('/evaluasolicitudes')
  @response(200, {
    description: 'Evaluasolicitud model instance',
    content: {'application/json': {schema: getModelSchemaRef(Evaluasolicitud)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Evaluasolicitud, {
            title: 'NewEvaluasolicitud',
            exclude: ['id'],
          }),
        },
      },
    })
    evaluasolicitud: Omit<Evaluasolicitud, 'id'>,
  ): Promise<Evaluasolicitud> {
    return this.evaluasolicitudRepository.create(evaluasolicitud);
  }

  @get('/evaluasolicitudes/count')
  @response(200, {
    description: 'Evaluasolicitud model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Evaluasolicitud) where?: Where<Evaluasolicitud>,
  ): Promise<Count> {
    return this.evaluasolicitudRepository.count(where);
  }

  @get('/evaluasolicitudes')
  @response(200, {
    description: 'Array of Evaluasolicitud model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Evaluasolicitud, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Evaluasolicitud) filter?: Filter<Evaluasolicitud>,
  ): Promise<Evaluasolicitud[]> {
    return this.evaluasolicitudRepository.find(filter);
  }

  @patch('/evaluasolicitudes')
  @response(200, {
    description: 'Evaluasolicitud PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Evaluasolicitud, {partial: true}),
        },
      },
    })
    evaluasolicitud: Evaluasolicitud,
    @param.where(Evaluasolicitud) where?: Where<Evaluasolicitud>,
  ): Promise<Count> {
    return this.evaluasolicitudRepository.updateAll(evaluasolicitud, where);
  }

  @get('/evaluasolicitudes/{id}')
  @response(200, {
    description: 'Evaluasolicitud model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Evaluasolicitud, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Evaluasolicitud, {exclude: 'where'}) filter?: FilterExcludingWhere<Evaluasolicitud>
  ): Promise<Evaluasolicitud> {
    return this.evaluasolicitudRepository.findById(id, filter);
  }

  @patch('/evaluasolicitudes/{id}')
  @response(204, {
    description: 'Evaluasolicitud PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Evaluasolicitud, {partial: true}),
        },
      },
    })
    evaluasolicitud: Evaluasolicitud,
  ): Promise<void> {
    await this.evaluasolicitudRepository.updateById(id, evaluasolicitud);
  }

  @put('/evaluasolicitudes/{id}')
  @response(204, {
    description: 'Evaluasolicitud PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() evaluasolicitud: Evaluasolicitud,
  ): Promise<void> {
    await this.evaluasolicitudRepository.replaceById(id, evaluasolicitud);
  }

  @del('/evaluasolicitudes/{id}')
  @response(204, {
    description: 'Evaluasolicitud DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.evaluasolicitudRepository.deleteById(id);
  }
}
