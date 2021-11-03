import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Departamentoxproponente, DepartamentoxproponenteRelations, Departamento, Proponente} from '../models';
import {DepartamentoRepository} from './departamento.repository';
import {ProponenteRepository} from './proponente.repository';

export class DepartamentoxproponenteRepository extends DefaultCrudRepository<
  Departamentoxproponente,
  typeof Departamentoxproponente.prototype.id,
  DepartamentoxproponenteRelations
> {

  public readonly iddepartamento: BelongsToAccessor<Departamento, typeof Departamentoxproponente.prototype.id>;

  public readonly idproponente: BelongsToAccessor<Proponente, typeof Departamentoxproponente.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('DepartamentoRepository') protected departamentoRepositoryGetter: Getter<DepartamentoRepository>, @repository.getter('ProponenteRepository') protected proponenteRepositoryGetter: Getter<ProponenteRepository>,
  ) {
    super(Departamentoxproponente, dataSource);
    this.idproponente = this.createBelongsToAccessorFor('idproponente', proponenteRepositoryGetter,);
    this.registerInclusionResolver('idproponente', this.idproponente.inclusionResolver);
    this.iddepartamento = this.createBelongsToAccessorFor('iddepartamento', departamentoRepositoryGetter,);
    this.registerInclusionResolver('iddepartamento', this.iddepartamento.inclusionResolver);
  }
}
