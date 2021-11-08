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
import {Juradoxsolicitud} from '../models';
import {JuradoxsolicitudRepository} from '../repositories';

export class JuradoxsolicitudController {
  constructor(
    @repository(JuradoxsolicitudRepository)
    public juradoxsolicitudRepository : JuradoxsolicitudRepository,
  ) {}

  @post('/juradoxsolicitudes')
  @response(200, {
    description: 'Juradoxsolicitud model instance',
    content: {'application/json': {schema: getModelSchemaRef(Juradoxsolicitud)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Juradoxsolicitud, {
            title: 'NewJuradoxsolicitud',
            exclude: ['id'],
          }),
        },
      },
    })
    juradoxsolicitud: Omit<Juradoxsolicitud, 'id'>,
  ): Promise<Juradoxsolicitud> {
    return this.juradoxsolicitudRepository.create(juradoxsolicitud);
  }

  @get('/juradoxsolicitudes/count')
  @response(200, {
    description: 'Juradoxsolicitud model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Juradoxsolicitud) where?: Where<Juradoxsolicitud>,
  ): Promise<Count> {
    return this.juradoxsolicitudRepository.count(where);
  }

  @get('/juradoxsolicitudes')
  @response(200, {
    description: 'Array of Juradoxsolicitud model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Juradoxsolicitud, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Juradoxsolicitud) filter?: Filter<Juradoxsolicitud>,
  ): Promise<Juradoxsolicitud[]> {
    return this.juradoxsolicitudRepository.find(filter);
  }

  @patch('/juradoxsolicitudes')
  @response(200, {
    description: 'Juradoxsolicitud PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Juradoxsolicitud, {partial: true}),
        },
      },
    })
    juradoxsolicitud: Juradoxsolicitud,
    @param.where(Juradoxsolicitud) where?: Where<Juradoxsolicitud>,
  ): Promise<Count> {
    return this.juradoxsolicitudRepository.updateAll(juradoxsolicitud, where);
  }

  @get('/juradoxsolicitudes/{id}')
  @response(200, {
    description: 'Juradoxsolicitud model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Juradoxsolicitud, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Juradoxsolicitud, {exclude: 'where'}) filter?: FilterExcludingWhere<Juradoxsolicitud>
  ): Promise<Juradoxsolicitud> {
    return this.juradoxsolicitudRepository.findById(id, filter);
  }

  @patch('/juradoxsolicitudes/{id}')
  @response(204, {
    description: 'Juradoxsolicitud PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Juradoxsolicitud, {partial: true}),
        },
      },
    })
    juradoxsolicitud: Juradoxsolicitud,
  ): Promise<void> {
    await this.juradoxsolicitudRepository.updateById(id, juradoxsolicitud);
  }

  @put('/juradoxsolicitudes/{id}')
  @response(204, {
    description: 'Juradoxsolicitud PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() juradoxsolicitud: Juradoxsolicitud,
  ): Promise<void> {
    await this.juradoxsolicitudRepository.replaceById(id, juradoxsolicitud);
  }

  @del('/juradoxsolicitudes/{id}')
  @response(204, {
    description: 'Juradoxsolicitud DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.juradoxsolicitudRepository.deleteById(id);
  }
}
