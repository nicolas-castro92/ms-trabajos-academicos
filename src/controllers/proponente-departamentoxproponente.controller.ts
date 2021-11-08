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
  Proponente,
  Departamentoxproponente,
} from '../models';
import {ProponenteRepository} from '../repositories';

export class ProponenteDepartamentoxproponenteController {
  constructor(
    @repository(ProponenteRepository) protected proponenteRepository: ProponenteRepository,
  ) { }

  @get('/proponentes/{id}/departamentoxproponentes', {
    responses: {
      '200': {
        description: 'Array of Proponente has many Departamentoxproponente',
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
    return this.proponenteRepository.departamentoxproponentes(id).find(filter);
  }

  @post('/proponentes/{id}/departamentoxproponentes', {
    responses: {
      '200': {
        description: 'Proponente model instance',
        content: {'application/json': {schema: getModelSchemaRef(Departamentoxproponente)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Proponente.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Departamentoxproponente, {
            title: 'NewDepartamentoxproponenteInProponente',
            exclude: ['id'],
            optional: ['id_proponente']
          }),
        },
      },
    }) departamentoxproponente: Omit<Departamentoxproponente, 'id'>,
  ): Promise<Departamentoxproponente> {
    return this.proponenteRepository.departamentoxproponentes(id).create(departamentoxproponente);
  }

  @patch('/proponentes/{id}/departamentoxproponentes', {
    responses: {
      '200': {
        description: 'Proponente.Departamentoxproponente PATCH success count',
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
    return this.proponenteRepository.departamentoxproponentes(id).patch(departamentoxproponente, where);
  }

  @del('/proponentes/{id}/departamentoxproponentes', {
    responses: {
      '200': {
        description: 'Proponente.Departamentoxproponente DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Departamentoxproponente)) where?: Where<Departamentoxproponente>,
  ): Promise<Count> {
    return this.proponenteRepository.departamentoxproponentes(id).delete(where);
  }
}
