import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Tiposolicitud,
  Formato,
} from '../models';
import {TiposolicitudRepository} from '../repositories';

export class TiposolicitudFormatoController {
  constructor(
    @repository(TiposolicitudRepository)
    public tiposolicitudRepository: TiposolicitudRepository,
  ) { }

  @get('/tiposolicituds/{id}/formato', {
    responses: {
      '200': {
        description: 'Formato belonging to Tiposolicitud',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Formato)},
          },
        },
      },
    },
  })
  async getFormato(
    @param.path.number('id') id: typeof Tiposolicitud.prototype.id,
  ): Promise<Formato> {
    return this.tiposolicitudRepository.idformato(id);
  }
}
