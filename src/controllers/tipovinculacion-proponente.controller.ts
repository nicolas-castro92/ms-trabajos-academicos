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
  Tipovinculacion,
  Proponente,
} from '../models';
import {TipovinculacionRepository} from '../repositories';

export class TipovinculacionProponenteController {
  constructor(
    @repository(TipovinculacionRepository) protected tipovinculacionRepository: TipovinculacionRepository,
  ) { }

  @get('/tipovinculacions/{id}/proponentes', {
    responses: {
      '200': {
        description: 'Array of Tipovinculacion has many Proponente',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Proponente)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Proponente>,
  ): Promise<Proponente[]> {
    return this.tipovinculacionRepository.proponentes(id).find(filter);
  }

  @post('/tipovinculacions/{id}/proponentes', {
    responses: {
      '200': {
        description: 'Tipovinculacion model instance',
        content: {'application/json': {schema: getModelSchemaRef(Proponente)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Tipovinculacion.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Proponente, {
            title: 'NewProponenteInTipovinculacion',
            exclude: ['id'],
            optional: ['id_vinculacion']
          }),
        },
      },
    }) proponente: Omit<Proponente, 'id'>,
  ): Promise<Proponente> {
    return this.tipovinculacionRepository.proponentes(id).create(proponente);
  }

  @patch('/tipovinculacions/{id}/proponentes', {
    responses: {
      '200': {
        description: 'Tipovinculacion.Proponente PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Proponente, {partial: true}),
        },
      },
    })
    proponente: Partial<Proponente>,
    @param.query.object('where', getWhereSchemaFor(Proponente)) where?: Where<Proponente>,
  ): Promise<Count> {
    return this.tipovinculacionRepository.proponentes(id).patch(proponente, where);
  }

  @del('/tipovinculacions/{id}/proponentes', {
    responses: {
      '200': {
        description: 'Tipovinculacion.Proponente DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Proponente)) where?: Where<Proponente>,
  ): Promise<Count> {
    return this.tipovinculacionRepository.proponentes(id).delete(where);
  }
}
