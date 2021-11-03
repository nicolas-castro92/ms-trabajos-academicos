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
  Areainvestigacion,
} from '../models';
import {JuradoxareainvestigacionRepository} from '../repositories';

export class JuradoxareainvestigacionAreainvestigacionController {
  constructor(
    @repository(JuradoxareainvestigacionRepository)
    public juradoxareainvestigacionRepository: JuradoxareainvestigacionRepository,
  ) { }

  @get('/juradoxareainvestigacions/{id}/areainvestigacion', {
    responses: {
      '200': {
        description: 'Areainvestigacion belonging to Juradoxareainvestigacion',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Areainvestigacion)},
          },
        },
      },
    },
  })
  async getAreainvestigacion(
    @param.path.number('id') id: typeof Juradoxareainvestigacion.prototype.id,
  ): Promise<Areainvestigacion> {
    return this.juradoxareainvestigacionRepository.idareainvestigacion(id);
  }
}
