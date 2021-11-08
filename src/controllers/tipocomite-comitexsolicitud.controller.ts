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
  Tipocomite,
  Comitexsolicitud,
} from '../models';
import {TipocomiteRepository} from '../repositories';

export class TipocomiteComitexsolicitudController {
  constructor(
    @repository(TipocomiteRepository) protected tipocomiteRepository: TipocomiteRepository,
  ) { }

  @get('/tipocomites/{id}/comitexsolicituds', {
    responses: {
      '200': {
        description: 'Array of Tipocomite has many Comitexsolicitud',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Comitexsolicitud)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Comitexsolicitud>,
  ): Promise<Comitexsolicitud[]> {
    return this.tipocomiteRepository.comitexsolicituds(id).find(filter);
  }

  @post('/tipocomites/{id}/comitexsolicituds', {
    responses: {
      '200': {
        description: 'Tipocomite model instance',
        content: {'application/json': {schema: getModelSchemaRef(Comitexsolicitud)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Tipocomite.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Comitexsolicitud, {
            title: 'NewComitexsolicitudInTipocomite',
            exclude: ['id'],
            optional: ['id_comite']
          }),
        },
      },
    }) comitexsolicitud: Omit<Comitexsolicitud, 'id'>,
  ): Promise<Comitexsolicitud> {
    return this.tipocomiteRepository.comitexsolicituds(id).create(comitexsolicitud);
  }

  @patch('/tipocomites/{id}/comitexsolicituds', {
    responses: {
      '200': {
        description: 'Tipocomite.Comitexsolicitud PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Comitexsolicitud, {partial: true}),
        },
      },
    })
    comitexsolicitud: Partial<Comitexsolicitud>,
    @param.query.object('where', getWhereSchemaFor(Comitexsolicitud)) where?: Where<Comitexsolicitud>,
  ): Promise<Count> {
    return this.tipocomiteRepository.comitexsolicituds(id).patch(comitexsolicitud, where);
  }

  @del('/tipocomites/{id}/comitexsolicituds', {
    responses: {
      '200': {
        description: 'Tipocomite.Comitexsolicitud DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Comitexsolicitud)) where?: Where<Comitexsolicitud>,
  ): Promise<Count> {
    return this.tipocomiteRepository.comitexsolicituds(id).delete(where);
  }
}
