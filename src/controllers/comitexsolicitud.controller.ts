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
import {Comitexsolicitud} from '../models';
import {ComitexsolicitudRepository} from '../repositories';

export class ComitexsolicitudController {
  constructor(
    @repository(ComitexsolicitudRepository)
    public comitexsolicitudRepository : ComitexsolicitudRepository,
  ) {}

  @post('/comitexsolicitudes')
  @response(200, {
    description: 'Comitexsolicitud model instance',
    content: {'application/json': {schema: getModelSchemaRef(Comitexsolicitud)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Comitexsolicitud, {
            title: 'NewComitexsolicitud',
            exclude: ['id'],
          }),
        },
      },
    })
    comitexsolicitud: Omit<Comitexsolicitud, 'id'>,
  ): Promise<Comitexsolicitud> {
    return this.comitexsolicitudRepository.create(comitexsolicitud);
  }

  @get('/comitexsolicitudes/count')
  @response(200, {
    description: 'Comitexsolicitud model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Comitexsolicitud) where?: Where<Comitexsolicitud>,
  ): Promise<Count> {
    return this.comitexsolicitudRepository.count(where);
  }

  @get('/comitexsolicitudes')
  @response(200, {
    description: 'Array of Comitexsolicitud model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Comitexsolicitud, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Comitexsolicitud) filter?: Filter<Comitexsolicitud>,
  ): Promise<Comitexsolicitud[]> {
    return this.comitexsolicitudRepository.find(filter);
  }

  @patch('/comitexsolicitudes')
  @response(200, {
    description: 'Comitexsolicitud PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Comitexsolicitud, {partial: true}),
        },
      },
    })
    comitexsolicitud: Comitexsolicitud,
    @param.where(Comitexsolicitud) where?: Where<Comitexsolicitud>,
  ): Promise<Count> {
    return this.comitexsolicitudRepository.updateAll(comitexsolicitud, where);
  }

  @get('/comitexsolicitudes/{id}')
  @response(200, {
    description: 'Comitexsolicitud model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Comitexsolicitud, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Comitexsolicitud, {exclude: 'where'}) filter?: FilterExcludingWhere<Comitexsolicitud>
  ): Promise<Comitexsolicitud> {
    return this.comitexsolicitudRepository.findById(id, filter);
  }

  @patch('/comitexsolicitudes/{id}')
  @response(204, {
    description: 'Comitexsolicitud PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Comitexsolicitud, {partial: true}),
        },
      },
    })
    comitexsolicitud: Comitexsolicitud,
  ): Promise<void> {
    await this.comitexsolicitudRepository.updateById(id, comitexsolicitud);
  }

  @put('/comitexsolicitudes/{id}')
  @response(204, {
    description: 'Comitexsolicitud PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() comitexsolicitud: Comitexsolicitud,
  ): Promise<void> {
    await this.comitexsolicitudRepository.replaceById(id, comitexsolicitud);
  }

  @del('/comitexsolicitudes/{id}')
  @response(204, {
    description: 'Comitexsolicitud DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.comitexsolicitudRepository.deleteById(id);
  }
}
