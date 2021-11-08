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
import {Departamentoxproponente} from '../models';
import {DepartamentoxproponenteRepository} from '../repositories';

export class DepartamentoxproponenteController {
  constructor(
    @repository(DepartamentoxproponenteRepository)
    public departamentoxproponenteRepository : DepartamentoxproponenteRepository,
  ) {}

  @post('/departamentoxproponentes')
  @response(200, {
    description: 'Departamentoxproponente model instance',
    content: {'application/json': {schema: getModelSchemaRef(Departamentoxproponente)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Departamentoxproponente, {
            title: 'NewDepartamentoxproponente',
            exclude: ['id'],
          }),
        },
      },
    })
    departamentoxproponente: Omit<Departamentoxproponente, 'id'>,
  ): Promise<Departamentoxproponente> {
    return this.departamentoxproponenteRepository.create(departamentoxproponente);
  }

  @get('/departamentoxproponentes/count')
  @response(200, {
    description: 'Departamentoxproponente model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Departamentoxproponente) where?: Where<Departamentoxproponente>,
  ): Promise<Count> {
    return this.departamentoxproponenteRepository.count(where);
  }

  @get('/departamentoxproponentes')
  @response(200, {
    description: 'Array of Departamentoxproponente model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Departamentoxproponente, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Departamentoxproponente) filter?: Filter<Departamentoxproponente>,
  ): Promise<Departamentoxproponente[]> {
    return this.departamentoxproponenteRepository.find(filter);
  }

  @patch('/departamentoxproponentes')
  @response(200, {
    description: 'Departamentoxproponente PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Departamentoxproponente, {partial: true}),
        },
      },
    })
    departamentoxproponente: Departamentoxproponente,
    @param.where(Departamentoxproponente) where?: Where<Departamentoxproponente>,
  ): Promise<Count> {
    return this.departamentoxproponenteRepository.updateAll(departamentoxproponente, where);
  }

  @get('/departamentoxproponentes/{id}')
  @response(200, {
    description: 'Departamentoxproponente model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Departamentoxproponente, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Departamentoxproponente, {exclude: 'where'}) filter?: FilterExcludingWhere<Departamentoxproponente>
  ): Promise<Departamentoxproponente> {
    return this.departamentoxproponenteRepository.findById(id, filter);
  }

  @patch('/departamentoxproponentes/{id}')
  @response(204, {
    description: 'Departamentoxproponente PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Departamentoxproponente, {partial: true}),
        },
      },
    })
    departamentoxproponente: Departamentoxproponente,
  ): Promise<void> {
    await this.departamentoxproponenteRepository.updateById(id, departamentoxproponente);
  }

  @put('/departamentoxproponentes/{id}')
  @response(204, {
    description: 'Departamentoxproponente PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() departamentoxproponente: Departamentoxproponente,
  ): Promise<void> {
    await this.departamentoxproponenteRepository.replaceById(id, departamentoxproponente);
  }

  @del('/departamentoxproponentes/{id}')
  @response(204, {
    description: 'Departamentoxproponente DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.departamentoxproponenteRepository.deleteById(id);
  }
}
