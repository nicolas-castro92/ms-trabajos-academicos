import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Comitexsolicitud,
  Solicitud,
} from '../models';
import {ComitexsolicitudRepository} from '../repositories';

export class ComitexsolicitudSolicitudController {
  constructor(
    @repository(ComitexsolicitudRepository)
    public comitexsolicitudRepository: ComitexsolicitudRepository,
  ) { }

  @get('/comitexsolicituds/{id}/solicitud', {
    responses: {
      '200': {
        description: 'Solicitud belonging to Comitexsolicitud',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Solicitud)},
          },
        },
      },
    },
  })
  async getSolicitud(
    @param.path.number('id') id: typeof Comitexsolicitud.prototype.id,
  ): Promise<Solicitud> {
    return this.comitexsolicitudRepository.idsolicitud(id);
  }
}
