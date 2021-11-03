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
  Proponentexsolicitud,
} from '../models';
import {ProponenteRepository} from '../repositories';

export class ProponenteProponentexsolicitudController {
  constructor(
    @repository(ProponenteRepository) protected proponenteRepository: ProponenteRepository,
  ) { }

  @get('/proponentes/{id}/proponentexsolicituds', {
    responses: {
      '200': {
        description: 'Array of Proponente has many Proponentexsolicitud',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Proponentexsolicitud)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Proponentexsolicitud>,
  ): Promise<Proponentexsolicitud[]> {
    return this.proponenteRepository.proponentexsolicituds(id).find(filter);
  }

  @post('/proponentes/{id}/proponentexsolicituds', {
    responses: {
      '200': {
        description: 'Proponente model instance',
        content: {'application/json': {schema: getModelSchemaRef(Proponentexsolicitud)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Proponente.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Proponentexsolicitud, {
            title: 'NewProponentexsolicitudInProponente',
            exclude: ['id'],
            optional: ['id_proponente']
          }),
        },
      },
    }) proponentexsolicitud: Omit<Proponentexsolicitud, 'id'>,
  ): Promise<Proponentexsolicitud> {
    return this.proponenteRepository.proponentexsolicituds(id).create(proponentexsolicitud);
  }

  @patch('/proponentes/{id}/proponentexsolicituds', {
    responses: {
      '200': {
        description: 'Proponente.Proponentexsolicitud PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Proponentexsolicitud, {partial: true}),
        },
      },
    })
    proponentexsolicitud: Partial<Proponentexsolicitud>,
    @param.query.object('where', getWhereSchemaFor(Proponentexsolicitud)) where?: Where<Proponentexsolicitud>,
  ): Promise<Count> {
    return this.proponenteRepository.proponentexsolicituds(id).patch(proponentexsolicitud, where);
  }

  @del('/proponentes/{id}/proponentexsolicituds', {
    responses: {
      '200': {
        description: 'Proponente.Proponentexsolicitud DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Proponentexsolicitud)) where?: Where<Proponentexsolicitud>,
  ): Promise<Count> {
    return this.proponenteRepository.proponentexsolicituds(id).delete(where);
  }
}
