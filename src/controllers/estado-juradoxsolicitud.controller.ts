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
  Juradoxsolicitud,
} from '../models';
import {EstadoRepository} from '../repositories';

export class EstadoJuradoxsolicitudController {
  constructor(
    @repository(EstadoRepository) protected estadoRepository: EstadoRepository,
  ) { }

  @get('/estados/{id}/juradoxsolicitud', {
    responses: {
      '200': {
        description: 'Estado has one Juradoxsolicitud',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Juradoxsolicitud),
          },
        },
      },
    },
  })
  async get(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Juradoxsolicitud>,
  ): Promise<Juradoxsolicitud> {
    return this.estadoRepository.juradoxsolicitud(id).get(filter);
  }

  @post('/estados/{id}/juradoxsolicitud', {
    responses: {
      '200': {
        description: 'Estado model instance',
        content: {'application/json': {schema: getModelSchemaRef(Juradoxsolicitud)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Estado.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Juradoxsolicitud, {
            title: 'NewJuradoxsolicitudInEstado',
            exclude: ['id'],
            optional: ['id_estado']
          }),
        },
      },
    }) juradoxsolicitud: Omit<Juradoxsolicitud, 'id'>,
  ): Promise<Juradoxsolicitud> {
    return this.estadoRepository.juradoxsolicitud(id).create(juradoxsolicitud);
  }

  @patch('/estados/{id}/juradoxsolicitud', {
    responses: {
      '200': {
        description: 'Estado.Juradoxsolicitud PATCH success count',
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
    return this.estadoRepository.juradoxsolicitud(id).patch(juradoxsolicitud, where);
  }

  @del('/estados/{id}/juradoxsolicitud', {
    responses: {
      '200': {
        description: 'Estado.Juradoxsolicitud DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Juradoxsolicitud)) where?: Where<Juradoxsolicitud>,
  ): Promise<Count> {
    return this.estadoRepository.juradoxsolicitud(id).delete(where);
  }
}
