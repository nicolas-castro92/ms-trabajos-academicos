import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Proponentexsolicitud,
  Proponente,
} from '../models';
import {ProponentexsolicitudRepository} from '../repositories';

export class ProponentexsolicitudProponenteController {
  constructor(
    @repository(ProponentexsolicitudRepository)
    public proponentexsolicitudRepository: ProponentexsolicitudRepository,
  ) { }

  @get('/proponentexsolicituds/{id}/proponente', {
    responses: {
      '200': {
        description: 'Proponente belonging to Proponentexsolicitud',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Proponente)},
          },
        },
      },
    },
  })
  async getProponente(
    @param.path.number('id') id: typeof Proponentexsolicitud.prototype.id,
  ): Promise<Proponente> {
    return this.proponentexsolicitudRepository.idproponente(id);
  }
}
