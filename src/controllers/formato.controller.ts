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
import {Formato} from '../models';
import {FormatoRepository} from '../repositories';

export class FormatoController {
  constructor(
    @repository(FormatoRepository)
    public formatoRepository : FormatoRepository,
  ) {}

  @post('/formatos')
  @response(200, {
    description: 'Formato model instance',
    content: {'application/json': {schema: getModelSchemaRef(Formato)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Formato, {
            title: 'NewFormato',
            exclude: ['id'],
          }),
        },
      },
    })
    formato: Omit<Formato, 'id'>,
  ): Promise<Formato> {
    return this.formatoRepository.create(formato);
  }

  @get('/formatos/count')
  @response(200, {
    description: 'Formato model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Formato) where?: Where<Formato>,
  ): Promise<Count> {
    return this.formatoRepository.count(where);
  }

  @get('/formatos')
  @response(200, {
    description: 'Array of Formato model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Formato, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Formato) filter?: Filter<Formato>,
  ): Promise<Formato[]> {
    return this.formatoRepository.find(filter);
  }

  @patch('/formatos')
  @response(200, {
    description: 'Formato PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Formato, {partial: true}),
        },
      },
    })
    formato: Formato,
    @param.where(Formato) where?: Where<Formato>,
  ): Promise<Count> {
    return this.formatoRepository.updateAll(formato, where);
  }

  @get('/formatos/{id}')
  @response(200, {
    description: 'Formato model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Formato, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Formato, {exclude: 'where'}) filter?: FilterExcludingWhere<Formato>
  ): Promise<Formato> {
    return this.formatoRepository.findById(id, filter);
  }

  @patch('/formatos/{id}')
  @response(204, {
    description: 'Formato PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Formato, {partial: true}),
        },
      },
    })
    formato: Formato,
  ): Promise<void> {
    await this.formatoRepository.updateById(id, formato);
  }

  @put('/formatos/{id}')
  @response(204, {
    description: 'Formato PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() formato: Formato,
  ): Promise<void> {
    await this.formatoRepository.replaceById(id, formato);
  }

  @del('/formatos/{id}')
  @response(204, {
    description: 'Formato DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.formatoRepository.deleteById(id);
  }
}
