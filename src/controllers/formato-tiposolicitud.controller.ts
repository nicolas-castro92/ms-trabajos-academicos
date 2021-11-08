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
  Formato,
  Tiposolicitud,
} from '../models';
import {FormatoRepository} from '../repositories';

export class FormatoTiposolicitudController {
  constructor(
    @repository(FormatoRepository) protected formatoRepository: FormatoRepository,
  ) { }

  @get('/formatoes/{id}/tiposolicituds', {
    responses: {
      '200': {
        description: 'Array of Formato has many Tiposolicitud',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Tiposolicitud)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Tiposolicitud>,
  ): Promise<Tiposolicitud[]> {
    return this.formatoRepository.tiposolicituds(id).find(filter);
  }

  @post('/formatoes/{id}/tiposolicituds', {
    responses: {
      '200': {
        description: 'Formato model instance',
        content: {'application/json': {schema: getModelSchemaRef(Tiposolicitud)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Formato.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Tiposolicitud, {
            title: 'NewTiposolicitudInFormato',
            exclude: ['id'],
            optional: ['id_formato']
          }),
        },
      },
    }) tiposolicitud: Omit<Tiposolicitud, 'id'>,
  ): Promise<Tiposolicitud> {
    return this.formatoRepository.tiposolicituds(id).create(tiposolicitud);
  }

  @patch('/formatoes/{id}/tiposolicituds', {
    responses: {
      '200': {
        description: 'Formato.Tiposolicitud PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Tiposolicitud, {partial: true}),
        },
      },
    })
    tiposolicitud: Partial<Tiposolicitud>,
    @param.query.object('where', getWhereSchemaFor(Tiposolicitud)) where?: Where<Tiposolicitud>,
  ): Promise<Count> {
    return this.formatoRepository.tiposolicituds(id).patch(tiposolicitud, where);
  }

  @del('/formatoes/{id}/tiposolicituds', {
    responses: {
      '200': {
        description: 'Formato.Tiposolicitud DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Tiposolicitud)) where?: Where<Tiposolicitud>,
  ): Promise<Count> {
    return this.formatoRepository.tiposolicituds(id).delete(where);
  }
}
