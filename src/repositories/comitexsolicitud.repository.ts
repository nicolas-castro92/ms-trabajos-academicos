import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Comitexsolicitud, ComitexsolicitudRelations, Solicitud, Tipocomite} from '../models';
import {SolicitudRepository} from './solicitud.repository';
import {TipocomiteRepository} from './tipocomite.repository';

export class ComitexsolicitudRepository extends DefaultCrudRepository<
  Comitexsolicitud,
  typeof Comitexsolicitud.prototype.id,
  ComitexsolicitudRelations
> {

  public readonly idsolicitud: BelongsToAccessor<Solicitud, typeof Comitexsolicitud.prototype.id>;

  public readonly idcomite: BelongsToAccessor<Tipocomite, typeof Comitexsolicitud.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('SolicitudRepository') protected solicitudRepositoryGetter: Getter<SolicitudRepository>, @repository.getter('TipocomiteRepository') protected tipocomiteRepositoryGetter: Getter<TipocomiteRepository>,
  ) {
    super(Comitexsolicitud, dataSource);
    this.idcomite = this.createBelongsToAccessorFor('idcomite', tipocomiteRepositoryGetter,);
    this.registerInclusionResolver('idcomite', this.idcomite.inclusionResolver);
    this.idsolicitud = this.createBelongsToAccessorFor('idsolicitud', solicitudRepositoryGetter,);
    this.registerInclusionResolver('idsolicitud', this.idsolicitud.inclusionResolver);
  }
}
