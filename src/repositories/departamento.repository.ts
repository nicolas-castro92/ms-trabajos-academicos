import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Departamento, DepartamentoRelations, Departamentoxproponente} from '../models';
import {DepartamentoxproponenteRepository} from './departamentoxproponente.repository';

export class DepartamentoRepository extends DefaultCrudRepository<
  Departamento,
  typeof Departamento.prototype.id,
  DepartamentoRelations
> {

  public readonly departamentoxproponentes: HasManyRepositoryFactory<Departamentoxproponente, typeof Departamento.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('DepartamentoxproponenteRepository') protected departamentoxproponenteRepositoryGetter: Getter<DepartamentoxproponenteRepository>,
  ) {
    super(Departamento, dataSource);
    this.departamentoxproponentes = this.createHasManyRepositoryFactoryFor('departamentoxproponentes', departamentoxproponenteRepositoryGetter,);
    this.registerInclusionResolver('departamentoxproponentes', this.departamentoxproponentes.inclusionResolver);
  }
}
