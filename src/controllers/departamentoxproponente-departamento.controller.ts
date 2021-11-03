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
  Departamento,
} from '../models';
import {DepartamentoxproponenteRepository} from '../repositories';

export class DepartamentoxproponenteDepartamentoController {
  constructor(
    @repository(DepartamentoxproponenteRepository)
    public departamentoxproponenteRepository: DepartamentoxproponenteRepository,
  ) { }

  @get('/departamentoxproponentes/{id}/departamento', {
    responses: {
      '200': {
        description: 'Departamento belonging to Departamentoxproponente',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Departamento)},
          },
        },
      },
    },
  })
  async getDepartamento(
    @param.path.number('id') id: typeof Departamentoxproponente.prototype.id,
  ): Promise<Departamento> {
    return this.departamentoxproponenteRepository.iddepartamento(id);
  }
}
