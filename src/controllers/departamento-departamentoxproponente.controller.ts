import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Departamento,
  Departamentoxproponente,
} from '../models';
import {DepartamentoRepository} from '../repositories';

export class DepartamentoDepartamentoxproponenteController {
  constructor(
    @repository(DepartamentoRepository) protected departamentoRepository: DepartamentoRepository,
  ) { }

  @get('/departamentos/{id}/departamentoxproponentes', {
    responses: {
      '200': {
        description: 'Array of Departamento has many Departamentoxproponente',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Departamentoxproponente)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Departamentoxproponente>,
  ): Promise<Departamentoxproponente[]> {
    return this.departamentoRepository.departamentoxproponentes(id).find(filter);
  }

  @post('/departamentos/{id}/departamentoxproponentes', {
    responses: {
      '200': {
        description: 'Departamento model instance',
        content: {'application/json': {schema: getModelSchemaRef(Departamentoxproponente)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Departamento.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Departamentoxproponente, {
            title: 'NewDepartamentoxproponenteInDepartamento',
            exclude: ['id'],
            optional: ['id_departamento']
          }),
        },
      },
    }) departamentoxproponente: Omit<Departamentoxproponente, 'id'>,
  ): Promise<Departamentoxproponente> {
    return this.departamentoRepository.departamentoxproponentes(id).create(departamentoxproponente);
  }

  @patch('/departamentos/{id}/departamentoxproponentes', {
    responses: {
      '200': {
        description: 'Departamento.Departamentoxproponente PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Departamentoxproponente, {partial: true}),
        },
      },
    })
    departamentoxproponente: Partial<Departamentoxproponente>,
    @param.query.object('where', getWhereSchemaFor(Departamentoxproponente)) where?: Where<Departamentoxproponente>,
  ): Promise<Count> {
    return this.departamentoRepository.departamentoxproponentes(id).patch(departamentoxproponente, where);
  }

  @del('/departamentos/{id}/departamentoxproponentes', {
    responses: {
      '200': {
        description: 'Departamento.Departamentoxproponente DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Departamentoxproponente)) where?: Where<Departamentoxproponente>,
  ): Promise<Count> {
    return this.departamentoRepository.departamentoxproponentes(id).delete(where);
  }
}
