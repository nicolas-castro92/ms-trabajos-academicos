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
  Areainvestigacion,
  Solicitud,
} from '../models';
import {AreainvestigacionRepository} from '../repositories';

export class AreainvestigacionSolicitudController {
  constructor(
    @repository(AreainvestigacionRepository) protected areainvestigacionRepository: AreainvestigacionRepository,
  ) { }

  @get('/areainvestigacions/{id}/solicituds', {
    responses: {
      '200': {
        description: 'Array of Areainvestigacion has many Solicitud',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Solicitud)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Solicitud>,
  ): Promise<Solicitud[]> {
    return this.areainvestigacionRepository.solicituds(id).find(filter);
  }

  @post('/areainvestigacions/{id}/solicituds', {
    responses: {
      '200': {
        description: 'Areainvestigacion model instance',
        content: {'application/json': {schema: getModelSchemaRef(Solicitud)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Areainvestigacion.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Solicitud, {
            title: 'NewSolicitudInAreainvestigacion',
            exclude: ['id'],
            optional: ['id_areainvestigacion']
          }),
        },
      },
    }) solicitud: Omit<Solicitud, 'id'>,
  ): Promise<Solicitud> {
    return this.areainvestigacionRepository.solicituds(id).create(solicitud);
  }

  @patch('/areainvestigacions/{id}/solicituds', {
    responses: {
      '200': {
        description: 'Areainvestigacion.Solicitud PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Solicitud, {partial: true}),
        },
      },
    })
    solicitud: Partial<Solicitud>,
    @param.query.object('where', getWhereSchemaFor(Solicitud)) where?: Where<Solicitud>,
  ): Promise<Count> {
    return this.areainvestigacionRepository.solicituds(id).patch(solicitud, where);
  }

  @del('/areainvestigacions/{id}/solicituds', {
    responses: {
      '200': {
        description: 'Areainvestigacion.Solicitud DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Solicitud)) where?: Where<Solicitud>,
  ): Promise<Count> {
    return this.areainvestigacionRepository.solicituds(id).delete(where);
  }
}
