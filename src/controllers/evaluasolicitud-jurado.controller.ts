import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Evaluasolicitud,
  Jurado,
} from '../models';
import {EvaluasolicitudRepository} from '../repositories';

export class EvaluasolicitudJuradoController {
  constructor(
    @repository(EvaluasolicitudRepository)
    public evaluasolicitudRepository: EvaluasolicitudRepository,
  ) { }

  @get('/evaluasolicituds/{id}/jurado', {
    responses: {
      '200': {
        description: 'Jurado belonging to Evaluasolicitud',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Jurado)},
          },
        },
      },
    },
  })
  async getJurado(
    @param.path.number('id') id: typeof Evaluasolicitud.prototype.id,
  ): Promise<Jurado> {
    return this.evaluasolicitudRepository.idjurado(id);
  }
}
