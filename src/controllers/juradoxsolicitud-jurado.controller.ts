import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Juradoxsolicitud,
  Jurado,
} from '../models';
import {JuradoxsolicitudRepository} from '../repositories';

export class JuradoxsolicitudJuradoController {
  constructor(
    @repository(JuradoxsolicitudRepository)
    public juradoxsolicitudRepository: JuradoxsolicitudRepository,
  ) { }

  @get('/juradoxsolicituds/{id}/jurado', {
    responses: {
      '200': {
        description: 'Jurado belonging to Juradoxsolicitud',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Jurado)},
          },
        },
      },
    },
  })
  async getJurado(
    @param.path.number('id') id: typeof Juradoxsolicitud.prototype.id,
  ): Promise<Jurado> {
    return this.juradoxsolicitudRepository.idjurado(id);
  }
}
