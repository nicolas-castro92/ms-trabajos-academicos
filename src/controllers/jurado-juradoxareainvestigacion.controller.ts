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
  Juradoxareainvestigacion,
} from '../models';
import {JuradoRepository} from '../repositories';

export class JuradoJuradoxareainvestigacionController {
  constructor(
    @repository(JuradoRepository) protected juradoRepository: JuradoRepository,
  ) { }

  @get('/jurados/{id}/juradoxareainvestigacions', {
    responses: {
      '200': {
        description: 'Array of Jurado has many Juradoxareainvestigacion',
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
    return this.juradoRepository.juradoxareainvestigacions(id).find(filter);
  }

  @post('/jurados/{id}/juradoxareainvestigacions', {
    responses: {
      '200': {
        description: 'Jurado model instance',
        content: {'application/json': {schema: getModelSchemaRef(Juradoxareainvestigacion)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Jurado.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Juradoxareainvestigacion, {
            title: 'NewJuradoxareainvestigacionInJurado',
            exclude: ['id'],
            optional: ['id_jurado']
          }),
        },
      },
    }) juradoxareainvestigacion: Omit<Juradoxareainvestigacion, 'id'>,
  ): Promise<Juradoxareainvestigacion> {
    return this.juradoRepository.juradoxareainvestigacions(id).create(juradoxareainvestigacion);
  }

  @patch('/jurados/{id}/juradoxareainvestigacions', {
    responses: {
      '200': {
        description: 'Jurado.Juradoxareainvestigacion PATCH success count',
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
    return this.juradoRepository.juradoxareainvestigacions(id).patch(juradoxareainvestigacion, where);
  }

  @del('/jurados/{id}/juradoxareainvestigacions', {
    responses: {
      '200': {
        description: 'Jurado.Juradoxareainvestigacion DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Juradoxareainvestigacion)) where?: Where<Juradoxareainvestigacion>,
  ): Promise<Count> {
    return this.juradoRepository.juradoxareainvestigacions(id).delete(where);
  }
}
