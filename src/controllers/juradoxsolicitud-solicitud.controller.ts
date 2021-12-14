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
  Solicitud,
} from '../models';
import {JuradoxsolicitudRepository} from '../repositories';

export class JuradoxsolicitudSolicitudController {
  constructor(
    @repository(JuradoxsolicitudRepository)
    public juradoxsolicitudRepository: JuradoxsolicitudRepository,
  ) { }

  @get('/juradoxsolicituds/{id}/solicitud', {
    responses: {
      '200': {
        description: 'Solicitud belonging to Juradoxsolicitud',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Solicitud)},
          },
        },
      },
    },
  })
  async getSolicitud(
    @param.path.number('id') id: typeof Juradoxsolicitud.prototype.id,
  ): Promise<Solicitud> {
    return this.juradoxsolicitudRepository.idsolicitud(id);
  }
}
