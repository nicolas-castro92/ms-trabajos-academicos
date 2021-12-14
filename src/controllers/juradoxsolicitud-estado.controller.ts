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
  Estado,
} from '../models';
import {JuradoxsolicitudRepository} from '../repositories';

export class JuradoxsolicitudEstadoController {
  constructor(
    @repository(JuradoxsolicitudRepository)
    public juradoxsolicitudRepository: JuradoxsolicitudRepository,
  ) { }

  @get('/juradoxsolicituds/{id}/estado', {
    responses: {
      '200': {
        description: 'Estado belonging to Juradoxsolicitud',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Estado)},
          },
        },
      },
    },
  })
  async getEstado(
    @param.path.number('id') id: typeof Juradoxsolicitud.prototype.id,
  ): Promise<Estado> {
    return this.juradoxsolicitudRepository.idestado(id);
  }
}
