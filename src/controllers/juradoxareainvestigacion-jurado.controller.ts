import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Juradoxareainvestigacion,
  Jurado,
} from '../models';
import {JuradoxareainvestigacionRepository} from '../repositories';

export class JuradoxareainvestigacionJuradoController {
  constructor(
    @repository(JuradoxareainvestigacionRepository)
    public juradoxareainvestigacionRepository: JuradoxareainvestigacionRepository,
  ) { }

  @get('/juradoxareainvestigacions/{id}/jurado', {
    responses: {
      '200': {
        description: 'Jurado belonging to Juradoxareainvestigacion',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Jurado)},
          },
        },
      },
    },
  })
  async getJurado(
    @param.path.number('id') id: typeof Juradoxareainvestigacion.prototype.id,
  ): Promise<Jurado> {
    return this.juradoxareainvestigacionRepository.idjurado(id);
  }
}
