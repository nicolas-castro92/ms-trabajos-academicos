import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Tipovinculacion, TipovinculacionRelations, Proponente} from '../models';
import {ProponenteRepository} from './proponente.repository';

export class TipovinculacionRepository extends DefaultCrudRepository<
  Tipovinculacion,
  typeof Tipovinculacion.prototype.id,
  TipovinculacionRelations
> {

  public readonly proponentes: HasManyRepositoryFactory<Proponente, typeof Tipovinculacion.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('ProponenteRepository') protected proponenteRepositoryGetter: Getter<ProponenteRepository>,
  ) {
    super(Tipovinculacion, dataSource);
    this.proponentes = this.createHasManyRepositoryFactoryFor('proponentes', proponenteRepositoryGetter,);
    this.registerInclusionResolver('proponentes', this.proponentes.inclusionResolver);
  }
}
