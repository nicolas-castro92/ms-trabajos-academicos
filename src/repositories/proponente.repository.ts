import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Proponente, ProponenteRelations, Departamentoxproponente, Proponentexsolicitud} from '../models';
import {DepartamentoxproponenteRepository} from './departamentoxproponente.repository';
import {ProponentexsolicitudRepository} from './proponentexsolicitud.repository';

export class ProponenteRepository extends DefaultCrudRepository<
  Proponente,
  typeof Proponente.prototype.id,
  ProponenteRelations
> {

  public readonly departamentoxproponentes: HasManyRepositoryFactory<Departamentoxproponente, typeof Proponente.prototype.id>;

  public readonly proponentexsolicituds: HasManyRepositoryFactory<Proponentexsolicitud, typeof Proponente.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('DepartamentoxproponenteRepository') protected departamentoxproponenteRepositoryGetter: Getter<DepartamentoxproponenteRepository>, @repository.getter('ProponentexsolicitudRepository') protected proponentexsolicitudRepositoryGetter: Getter<ProponentexsolicitudRepository>,
  ) {
    super(Proponente, dataSource);
    this.proponentexsolicituds = this.createHasManyRepositoryFactoryFor('proponentexsolicituds', proponentexsolicitudRepositoryGetter,);
    this.registerInclusionResolver('proponentexsolicituds', this.proponentexsolicituds.inclusionResolver);
    this.departamentoxproponentes = this.createHasManyRepositoryFactoryFor('departamentoxproponentes', departamentoxproponenteRepositoryGetter,);
    this.registerInclusionResolver('departamentoxproponentes', this.departamentoxproponentes.inclusionResolver);
  }
}
