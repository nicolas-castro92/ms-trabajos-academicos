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
  Estado,
  Resultadosolicitud,
} from '../models';
import {EstadoRepository} from '../repositories';

export class EstadoResultadosolicitudController {
  constructor(
    @repository(EstadoRepository) protected estadoRepository: EstadoRepository,
  ) { }

  @get('/estados/{id}/resultadosolicitud', {
    responses: {
      '200': {
        description: 'Estado has one Resultadosolicitud',
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
    return this.estadoRepository.resultadosolicitud(id).get(filter);
  }

  @post('/estados/{id}/resultadosolicitud', {
    responses: {
      '200': {
        description: 'Estado model instance',
        content: {'application/json': {schema: getModelSchemaRef(Resultadosolicitud)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Estado.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Resultadosolicitud, {
            title: 'NewResultadosolicitudInEstado',
            exclude: ['id'],
            optional: ['id_estado']
          }),
        },
      },
    }) resultadosolicitud: Omit<Resultadosolicitud, 'id'>,
  ): Promise<Resultadosolicitud> {
    return this.estadoRepository.resultadosolicitud(id).create(resultadosolicitud);
  }

  @patch('/estados/{id}/resultadosolicitud', {
    responses: {
      '200': {
        description: 'Estado.Resultadosolicitud PATCH success count',
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
    return this.estadoRepository.resultadosolicitud(id).patch(resultadosolicitud, where);
  }

  @del('/estados/{id}/resultadosolicitud', {
    responses: {
      '200': {
        description: 'Estado.Resultadosolicitud DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Resultadosolicitud)) where?: Where<Resultadosolicitud>,
  ): Promise<Count> {
    return this.estadoRepository.resultadosolicitud(id).delete(where);
  }
}
