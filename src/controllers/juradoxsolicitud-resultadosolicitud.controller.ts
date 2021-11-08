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
  Juradoxsolicitud,
  Resultadosolicitud,
} from '../models';
import {JuradoxsolicitudRepository} from '../repositories';

export class JuradoxsolicitudResultadosolicitudController {
  constructor(
    @repository(JuradoxsolicitudRepository) protected juradoxsolicitudRepository: JuradoxsolicitudRepository,
  ) { }

  @get('/juradoxsolicituds/{id}/resultadosolicitud', {
    responses: {
      '200': {
        description: 'Juradoxsolicitud has one Resultadosolicitud',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Resultadosolicitud),
          },
        },
      },
    },
  })
  async get(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Resultadosolicitud>,
  ): Promise<Resultadosolicitud> {
    return this.juradoxsolicitudRepository.resultadosolicitud(id).get(filter);
  }

  @post('/juradoxsolicituds/{id}/resultadosolicitud', {
    responses: {
      '200': {
        description: 'Juradoxsolicitud model instance',
        content: {'application/json': {schema: getModelSchemaRef(Resultadosolicitud)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Juradoxsolicitud.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Resultadosolicitud, {
            title: 'NewResultadosolicitudInJuradoxsolicitud',
            exclude: ['id'],
            optional: ['id_juradoxsolicitud']
          }),
        },
      },
    }) resultadosolicitud: Omit<Resultadosolicitud, 'id'>,
  ): Promise<Resultadosolicitud> {
    return this.juradoxsolicitudRepository.resultadosolicitud(id).create(resultadosolicitud);
  }

  @patch('/juradoxsolicituds/{id}/resultadosolicitud', {
    responses: {
      '200': {
        description: 'Juradoxsolicitud.Resultadosolicitud PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Resultadosolicitud, {partial: true}),
        },
      },
    })
    resultadosolicitud: Partial<Resultadosolicitud>,
    @param.query.object('where', getWhereSchemaFor(Resultadosolicitud)) where?: Where<Resultadosolicitud>,
  ): Promise<Count> {
    return this.juradoxsolicitudRepository.resultadosolicitud(id).patch(resultadosolicitud, where);
  }

  @del('/juradoxsolicituds/{id}/resultadosolicitud', {
    responses: {
      '200': {
        description: 'Juradoxsolicitud.Resultadosolicitud DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Resultadosolicitud)) where?: Where<Resultadosolicitud>,
  ): Promise<Count> {
    return this.juradoxsolicitudRepository.resultadosolicitud(id).delete(where);
  }
}
