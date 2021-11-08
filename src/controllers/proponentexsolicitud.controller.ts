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
import {Proponentexsolicitud} from '../models';
import {ProponentexsolicitudRepository} from '../repositories';

export class ProponentexsolicitudController {
  constructor(
    @repository(ProponentexsolicitudRepository)
    public proponentexsolicitudRepository : ProponentexsolicitudRepository,
  ) {}

  @post('/proponentexsolicitudes')
  @response(200, {
    description: 'Proponentexsolicitud model instance',
    content: {'application/json': {schema: getModelSchemaRef(Proponentexsolicitud)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Proponentexsolicitud, {
            title: 'NewProponentexsolicitud',
            exclude: ['id'],
          }),
        },
      },
    })
    proponentexsolicitud: Omit<Proponentexsolicitud, 'id'>,
  ): Promise<Proponentexsolicitud> {
    return this.proponentexsolicitudRepository.create(proponentexsolicitud);
  }

  @get('/proponentexsolicitudes/count')
  @response(200, {
    description: 'Proponentexsolicitud model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Proponentexsolicitud) where?: Where<Proponentexsolicitud>,
  ): Promise<Count> {
    return this.proponentexsolicitudRepository.count(where);
  }

  @get('/proponentexsolicitudes')
  @response(200, {
    description: 'Array of Proponentexsolicitud model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Proponentexsolicitud, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Proponentexsolicitud) filter?: Filter<Proponentexsolicitud>,
  ): Promise<Proponentexsolicitud[]> {
    return this.proponentexsolicitudRepository.find(filter);
  }

  @patch('/proponentexsolicitudes')
  @response(200, {
    description: 'Proponentexsolicitud PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Proponentexsolicitud, {partial: true}),
        },
      },
    })
    proponentexsolicitud: Proponentexsolicitud,
    @param.where(Proponentexsolicitud) where?: Where<Proponentexsolicitud>,
  ): Promise<Count> {
    return this.proponentexsolicitudRepository.updateAll(proponentexsolicitud, where);
  }

  @get('/proponentexsolicitudes/{id}')
  @response(200, {
    description: 'Proponentexsolicitud model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Proponentexsolicitud, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Proponentexsolicitud, {exclude: 'where'}) filter?: FilterExcludingWhere<Proponentexsolicitud>
  ): Promise<Proponentexsolicitud> {
    return this.proponentexsolicitudRepository.findById(id, filter);
  }

  @patch('/proponentexsolicitudes/{id}')
  @response(204, {
    description: 'Proponentexsolicitud PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Proponentexsolicitud, {partial: true}),
        },
      },
    })
    proponentexsolicitud: Proponentexsolicitud,
  ): Promise<void> {
    await this.proponentexsolicitudRepository.updateById(id, proponentexsolicitud);
  }

  @put('/proponentexsolicitudes/{id}')
  @response(204, {
    description: 'Proponentexsolicitud PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() proponentexsolicitud: Proponentexsolicitud,
  ): Promise<void> {
    await this.proponentexsolicitudRepository.replaceById(id, proponentexsolicitud);
  }

  @del('/proponentexsolicitudes/{id}')
  @response(204, {
    description: 'Proponentexsolicitud DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.proponentexsolicitudRepository.deleteById(id);
  }
}
