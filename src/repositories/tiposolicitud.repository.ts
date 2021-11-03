import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Tiposolicitud, TiposolicitudRelations, Formato, Solicitud} from '../models';
import {FormatoRepository} from './formato.repository';
import {SolicitudRepository} from './solicitud.repository';

export class TiposolicitudRepository extends DefaultCrudRepository<
  Tiposolicitud,
  typeof Tiposolicitud.prototype.id,
  TiposolicitudRelations
> {

  public readonly idformato: BelongsToAccessor<Formato, typeof Tiposolicitud.prototype.id>;

  public readonly solicituds: HasManyRepositoryFactory<Solicitud, typeof Tiposolicitud.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('FormatoRepository') protected formatoRepositoryGetter: Getter<FormatoRepository>, @repository.getter('SolicitudRepository') protected solicitudRepositoryGetter: Getter<SolicitudRepository>,
  ) {
    super(Tiposolicitud, dataSource);
    this.solicituds = this.createHasManyRepositoryFactoryFor('solicituds', solicitudRepositoryGetter,);
    this.registerInclusionResolver('solicituds', this.solicituds.inclusionResolver);
    this.idformato = this.createBelongsToAccessorFor('idformato', formatoRepositoryGetter,);
    this.registerInclusionResolver('idformato', this.idformato.inclusionResolver);
  }
}
