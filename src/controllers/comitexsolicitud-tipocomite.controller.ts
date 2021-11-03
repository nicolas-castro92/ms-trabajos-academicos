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
  Tipocomite,
} from '../models';
import {ComitexsolicitudRepository} from '../repositories';

export class ComitexsolicitudTipocomiteController {
  constructor(
    @repository(ComitexsolicitudRepository)
    public comitexsolicitudRepository: ComitexsolicitudRepository,
  ) { }

  @get('/comitexsolicituds/{id}/tipocomite', {
    responses: {
      '200': {
        description: 'Tipocomite belonging to Comitexsolicitud',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Tipocomite)},
          },
        },
      },
    },
  })
  async getTipocomite(
    @param.path.number('id') id: typeof Comitexsolicitud.prototype.id,
  ): Promise<Tipocomite> {
    return this.comitexsolicitudRepository.idcomite(id);
  }
}
