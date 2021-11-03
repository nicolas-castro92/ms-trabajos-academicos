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
import {Juradoxareainvestigacion} from '../models';
import {JuradoxareainvestigacionRepository} from '../repositories';

export class JuradoxareainvestigacionController {
  constructor(
    @repository(JuradoxareainvestigacionRepository)
    public juradoxareainvestigacionRepository : JuradoxareainvestigacionRepository,
  ) {}

  @post('/juradoxareainvestigaciones')
  @response(200, {
    description: 'Juradoxareainvestigacion model instance',
    content: {'application/json': {schema: getModelSchemaRef(Juradoxareainvestigacion)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Juradoxareainvestigacion, {
            title: 'NewJuradoxareainvestigacion',
            exclude: ['id'],
          }),
        },
      },
    })
    juradoxareainvestigacion: Omit<Juradoxareainvestigacion, 'id'>,
  ): Promise<Juradoxareainvestigacion> {
    return this.juradoxareainvestigacionRepository.create(juradoxareainvestigacion);
  }

  @get('/juradoxareainvestigaciones/count')
  @response(200, {
    description: 'Juradoxareainvestigacion model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Juradoxareainvestigacion) where?: Where<Juradoxareainvestigacion>,
  ): Promise<Count> {
    return this.juradoxareainvestigacionRepository.count(where);
  }

  @get('/juradoxareainvestigaciones')
  @response(200, {
    description: 'Array of Juradoxareainvestigacion model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Juradoxareainvestigacion, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Juradoxareainvestigacion) filter?: Filter<Juradoxareainvestigacion>,
  ): Promise<Juradoxareainvestigacion[]> {
    return this.juradoxareainvestigacionRepository.find(filter);
  }

  @patch('/juradoxareainvestigaciones')
  @response(200, {
    description: 'Juradoxareainvestigacion PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Juradoxareainvestigacion, {partial: true}),
        },
      },
    })
    juradoxareainvestigacion: Juradoxareainvestigacion,
    @param.where(Juradoxareainvestigacion) where?: Where<Juradoxareainvestigacion>,
  ): Promise<Count> {
    return this.juradoxareainvestigacionRepository.updateAll(juradoxareainvestigacion, where);
  }

  @get('/juradoxareainvestigaciones/{id}')
  @response(200, {
    description: 'Juradoxareainvestigacion model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Juradoxareainvestigacion, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Juradoxareainvestigacion, {exclude: 'where'}) filter?: FilterExcludingWhere<Juradoxareainvestigacion>
  ): Promise<Juradoxareainvestigacion> {
    return this.juradoxareainvestigacionRepository.findById(id, filter);
  }

  @patch('/juradoxareainvestigaciones/{id}')
  @response(204, {
    description: 'Juradoxareainvestigacion PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Juradoxareainvestigacion, {partial: true}),
        },
      },
    })
    juradoxareainvestigacion: Juradoxareainvestigacion,
  ): Promise<void> {
    await this.juradoxareainvestigacionRepository.updateById(id, juradoxareainvestigacion);
  }

  @put('/juradoxareainvestigaciones/{id}')
  @response(204, {
    description: 'Juradoxareainvestigacion PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() juradoxareainvestigacion: Juradoxareainvestigacion,
  ): Promise<void> {
    await this.juradoxareainvestigacionRepository.replaceById(id, juradoxareainvestigacion);
  }

  @del('/juradoxareainvestigaciones/{id}')
  @response(204, {
    description: 'Juradoxareainvestigacion DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.juradoxareainvestigacionRepository.deleteById(id);
  }
}
