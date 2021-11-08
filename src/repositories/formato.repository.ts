import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Formato, FormatoRelations, Tiposolicitud} from '../models';
import {TiposolicitudRepository} from './tiposolicitud.repository';

export class FormatoRepository extends DefaultCrudRepository<
  Formato,
  typeof Formato.prototype.id,
  FormatoRelations
> {

  public readonly tiposolicituds: HasManyRepositoryFactory<Tiposolicitud, typeof Formato.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('TiposolicitudRepository') protected tiposolicitudRepositoryGetter: Getter<TiposolicitudRepository>,
  ) {
    super(Formato, dataSource);
    this.tiposolicituds = this.createHasManyRepositoryFactoryFor('tiposolicituds', tiposolicitudRepositoryGetter,);
    this.registerInclusionResolver('tiposolicituds', this.tiposolicituds.inclusionResolver);
  }
}
