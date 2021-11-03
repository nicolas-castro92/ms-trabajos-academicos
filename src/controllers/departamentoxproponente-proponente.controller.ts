import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Departamentoxproponente,
  Proponente,
} from '../models';
import {DepartamentoxproponenteRepository} from '../repositories';

export class DepartamentoxproponenteProponenteController {
  constructor(
    @repository(DepartamentoxproponenteRepository)
    public departamentoxproponenteRepository: DepartamentoxproponenteRepository,
  ) { }

  @get('/departamentoxproponentes/{id}/proponente', {
    responses: {
      '200': {
        description: 'Proponente belonging to Departamentoxproponente',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Proponente)},
          },
        },
      },
    },
  })
  async getProponente(
    @param.path.number('id') id: typeof Departamentoxproponente.prototype.id,
  ): Promise<Proponente> {
    return this.departamentoxproponenteRepository.idproponente(id);
  }
}
