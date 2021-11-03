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
  Solicitud,
} from '../models';
import {ProponentexsolicitudRepository} from '../repositories';

export class ProponentexsolicitudSolicitudController {
  constructor(
    @repository(ProponentexsolicitudRepository)
    public proponentexsolicitudRepository: ProponentexsolicitudRepository,
  ) { }

  @get('/proponentexsolicituds/{id}/solicitud', {
    responses: {
      '200': {
        description: 'Solicitud belonging to Proponentexsolicitud',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Solicitud)},
          },
        },
      },
    },
  })
  async getSolicitud(
    @param.path.number('id') id: typeof Proponentexsolicitud.prototype.id,
  ): Promise<Solicitud> {
    return this.proponentexsolicitudRepository.idsolicitud(id);
  }
}
