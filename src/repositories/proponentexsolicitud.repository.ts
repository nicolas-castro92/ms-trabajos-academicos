import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Proponentexsolicitud, ProponentexsolicitudRelations, Proponente, Solicitud} from '../models';
import {ProponenteRepository} from './proponente.repository';
import {SolicitudRepository} from './solicitud.repository';

export class ProponentexsolicitudRepository extends DefaultCrudRepository<
  Proponentexsolicitud,
  typeof Proponentexsolicitud.prototype.id,
  ProponentexsolicitudRelations
> {

  public readonly idproponente: BelongsToAccessor<Proponente, typeof Proponentexsolicitud.prototype.id>;

  public readonly idsolicitud: BelongsToAccessor<Solicitud, typeof Proponentexsolicitud.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('ProponenteRepository') protected proponenteRepositoryGetter: Getter<ProponenteRepository>, @repository.getter('SolicitudRepository') protected solicitudRepositoryGetter: Getter<SolicitudRepository>,
  ) {
    super(Proponentexsolicitud, dataSource);
    this.idsolicitud = this.createBelongsToAccessorFor('idsolicitud', solicitudRepositoryGetter,);
    this.registerInclusionResolver('idsolicitud', this.idsolicitud.inclusionResolver);
    this.idproponente = this.createBelongsToAccessorFor('idproponente', proponenteRepositoryGetter,);
    this.registerInclusionResolver('idproponente', this.idproponente.inclusionResolver);
  }
}
