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
  Evaluasolicitud,
} from '../models';
import {JuradoRepository} from '../repositories';

export class JuradoEvaluasolicitudController {
  constructor(
    @repository(JuradoRepository) protected juradoRepository: JuradoRepository,
  ) { }

  @get('/jurados/{id}/evaluasolicituds', {
    responses: {
      '200': {
        description: 'Array of Jurado has many Evaluasolicitud',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Evaluasolicitud)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Evaluasolicitud>,
  ): Promise<Evaluasolicitud[]> {
    return this.juradoRepository.evaluasolicituds(id).find(filter);
  }

  @post('/jurados/{id}/evaluasolicituds', {
    responses: {
      '200': {
        description: 'Jurado model instance',
        content: {'application/json': {schema: getModelSchemaRef(Evaluasolicitud)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Jurado.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Evaluasolicitud, {
            title: 'NewEvaluasolicitudInJurado',
            exclude: ['id'],
            optional: ['id_jurado']
          }),
        },
      },
    }) evaluasolicitud: Omit<Evaluasolicitud, 'id'>,
  ): Promise<Evaluasolicitud> {
    return this.juradoRepository.evaluasolicituds(id).create(evaluasolicitud);
  }

  @patch('/jurados/{id}/evaluasolicituds', {
    responses: {
      '200': {
        description: 'Jurado.Evaluasolicitud PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Evaluasolicitud, {partial: true}),
        },
      },
    })
    evaluasolicitud: Partial<Evaluasolicitud>,
    @param.query.object('where', getWhereSchemaFor(Evaluasolicitud)) where?: Where<Evaluasolicitud>,
  ): Promise<Count> {
    return this.juradoRepository.evaluasolicituds(id).patch(evaluasolicitud, where);
  }

  @del('/jurados/{id}/evaluasolicituds', {
    responses: {
      '200': {
        description: 'Jurado.Evaluasolicitud DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Evaluasolicitud)) where?: Where<Evaluasolicitud>,
  ): Promise<Count> {
    return this.juradoRepository.evaluasolicituds(id).delete(where);
  }
}
