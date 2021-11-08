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
  Jurado,
  Juradoxsolicitud,
} from '../models';
import {JuradoRepository} from '../repositories';

export class JuradoJuradoxsolicitudController {
  constructor(
    @repository(JuradoRepository) protected juradoRepository: JuradoRepository,
  ) { }

  @get('/jurados/{id}/juradoxsolicituds', {
    responses: {
      '200': {
        description: 'Array of Jurado has many Juradoxsolicitud',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Juradoxsolicitud)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Juradoxsolicitud>,
  ): Promise<Juradoxsolicitud[]> {
    return this.juradoRepository.juradoxsolicituds(id).find(filter);
  }

  @post('/jurados/{id}/juradoxsolicituds', {
    responses: {
      '200': {
        description: 'Jurado model instance',
        content: {'application/json': {schema: getModelSchemaRef(Juradoxsolicitud)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Jurado.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Juradoxsolicitud, {
            title: 'NewJuradoxsolicitudInJurado',
            exclude: ['id'],
            optional: ['id_jurado']
          }),
        },
      },
    }) juradoxsolicitud: Omit<Juradoxsolicitud, 'id'>,
  ): Promise<Juradoxsolicitud> {
    return this.juradoRepository.juradoxsolicituds(id).create(juradoxsolicitud);
  }

  @patch('/jurados/{id}/juradoxsolicituds', {
    responses: {
      '200': {
        description: 'Jurado.Juradoxsolicitud PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Juradoxsolicitud, {partial: true}),
        },
      },
    })
    juradoxsolicitud: Partial<Juradoxsolicitud>,
    @param.query.object('where', getWhereSchemaFor(Juradoxsolicitud)) where?: Where<Juradoxsolicitud>,
  ): Promise<Count> {
    return this.juradoRepository.juradoxsolicituds(id).patch(juradoxsolicitud, where);
  }

  @del('/jurados/{id}/juradoxsolicituds', {
    responses: {
      '200': {
        description: 'Jurado.Juradoxsolicitud DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Juradoxsolicitud)) where?: Where<Juradoxsolicitud>,
  ): Promise<Count> {
    return this.juradoRepository.juradoxsolicituds(id).delete(where);
  }
}
