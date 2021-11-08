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
import {Tipocomite} from '../models';
import {TipocomiteRepository} from '../repositories';

export class TipocomiteController {
  constructor(
    @repository(TipocomiteRepository)
    public tipocomiteRepository : TipocomiteRepository,
  ) {}

  @post('/tipocomites')
  @response(200, {
    description: 'Tipocomite model instance',
    content: {'application/json': {schema: getModelSchemaRef(Tipocomite)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Tipocomite, {
            title: 'NewTipocomite',
            exclude: ['id'],
          }),
        },
      },
    })
    tipocomite: Omit<Tipocomite, 'id'>,
  ): Promise<Tipocomite> {
    return this.tipocomiteRepository.create(tipocomite);
  }

  @get('/tipocomites/count')
  @response(200, {
    description: 'Tipocomite model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Tipocomite) where?: Where<Tipocomite>,
  ): Promise<Count> {
    return this.tipocomiteRepository.count(where);
  }

  @get('/tipocomites')
  @response(200, {
    description: 'Array of Tipocomite model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Tipocomite, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Tipocomite) filter?: Filter<Tipocomite>,
  ): Promise<Tipocomite[]> {
    return this.tipocomiteRepository.find(filter);
  }

  @patch('/tipocomites')
  @response(200, {
    description: 'Tipocomite PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Tipocomite, {partial: true}),
        },
      },
    })
    tipocomite: Tipocomite,
    @param.where(Tipocomite) where?: Where<Tipocomite>,
  ): Promise<Count> {
    return this.tipocomiteRepository.updateAll(tipocomite, where);
  }

  @get('/tipocomites/{id}')
  @response(200, {
    description: 'Tipocomite model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Tipocomite, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Tipocomite, {exclude: 'where'}) filter?: FilterExcludingWhere<Tipocomite>
  ): Promise<Tipocomite> {
    return this.tipocomiteRepository.findById(id, filter);
  }

  @patch('/tipocomites/{id}')
  @response(204, {
    description: 'Tipocomite PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Tipocomite, {partial: true}),
        },
      },
    })
    tipocomite: Tipocomite,
  ): Promise<void> {
    await this.tipocomiteRepository.updateById(id, tipocomite);
  }

  @put('/tipocomites/{id}')
  @response(204, {
    description: 'Tipocomite PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() tipocomite: Tipocomite,
  ): Promise<void> {
    await this.tipocomiteRepository.replaceById(id, tipocomite);
  }

  @del('/tipocomites/{id}')
  @response(204, {
    description: 'Tipocomite DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.tipocomiteRepository.deleteById(id);
  }
}
