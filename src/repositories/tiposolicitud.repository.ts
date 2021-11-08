import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Tiposolicitud, TiposolicitudRelations, Solicitud} from '../models';
import {SolicitudRepository} from './solicitud.repository';

export class TiposolicitudRepository extends DefaultCrudRepository<
  Tiposolicitud,
  typeof Tiposolicitud.prototype.id,
  TiposolicitudRelations
> {

  public readonly solicituds: HasManyRepositoryFactory<Solicitud, typeof Tiposolicitud.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('SolicitudRepository') protected solicitudRepositoryGetter: Getter<SolicitudRepository>,
  ) {
    super(Tiposolicitud, dataSource);
    this.solicituds = this.createHasManyRepositoryFactoryFor('solicituds', solicitudRepositoryGetter,);
    this.registerInclusionResolver('solicituds', this.solicituds.inclusionResolver);
  }
}
