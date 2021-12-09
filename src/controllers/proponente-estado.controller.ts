import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Proponente,
  Estado,
} from '../models';
import {ProponenteRepository} from '../repositories';

export class ProponenteEstadoController {
  constructor(
    @repository(ProponenteRepository)
    public proponenteRepository: ProponenteRepository,
  ) { }

  @get('/proponentes/{id}/estado', {
    responses: {
      '200': {
        description: 'Estado belonging to Proponente',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Estado)},
          },
        },
      },
    },
  })
  async getEstado(
    @param.path.number('id') id: typeof Proponente.prototype.id,
  ): Promise<Estado> {
    return this.proponenteRepository.idestado(id);
  }
}
