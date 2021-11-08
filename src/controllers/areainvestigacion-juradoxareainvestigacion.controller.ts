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
  Juradoxareainvestigacion,
} from '../models';
import {AreainvestigacionRepository} from '../repositories';

export class AreainvestigacionJuradoxareainvestigacionController {
  constructor(
    @repository(AreainvestigacionRepository) protected areainvestigacionRepository: AreainvestigacionRepository,
  ) { }

  @get('/areainvestigacions/{id}/juradoxareainvestigacions', {
    responses: {
      '200': {
        description: 'Array of Areainvestigacion has many Juradoxareainvestigacion',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Juradoxareainvestigacion)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Juradoxareainvestigacion>,
  ): Promise<Juradoxareainvestigacion[]> {
    return this.areainvestigacionRepository.juradoxareainvestigacions(id).find(filter);
  }

  @post('/areainvestigacions/{id}/juradoxareainvestigacions', {
    responses: {
      '200': {
        description: 'Areainvestigacion model instance',
        content: {'application/json': {schema: getModelSchemaRef(Juradoxareainvestigacion)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Areainvestigacion.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Juradoxareainvestigacion, {
            title: 'NewJuradoxareainvestigacionInAreainvestigacion',
            exclude: ['id'],
            optional: ['id_areainvestigacion']
          }),
        },
      },
    }) juradoxareainvestigacion: Omit<Juradoxareainvestigacion, 'id'>,
  ): Promise<Juradoxareainvestigacion> {
    return this.areainvestigacionRepository.juradoxareainvestigacions(id).create(juradoxareainvestigacion);
  }

  @patch('/areainvestigacions/{id}/juradoxareainvestigacions', {
    responses: {
      '200': {
        description: 'Areainvestigacion.Juradoxareainvestigacion PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Juradoxareainvestigacion, {partial: true}),
        },
      },
    })
    juradoxareainvestigacion: Partial<Juradoxareainvestigacion>,
    @param.query.object('where', getWhereSchemaFor(Juradoxareainvestigacion)) where?: Where<Juradoxareainvestigacion>,
  ): Promise<Count> {
    return this.areainvestigacionRepository.juradoxareainvestigacions(id).patch(juradoxareainvestigacion, where);
  }

  @del('/areainvestigacions/{id}/juradoxareainvestigacions', {
    responses: {
      '200': {
        description: 'Areainvestigacion.Juradoxareainvestigacion DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Juradoxareainvestigacion)) where?: Where<Juradoxareainvestigacion>,
  ): Promise<Count> {
    return this.areainvestigacionRepository.juradoxareainvestigacions(id).delete(where);
  }
}
