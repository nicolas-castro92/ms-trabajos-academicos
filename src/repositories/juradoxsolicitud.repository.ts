import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasOneRepositoryFactory, BelongsToAccessor} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Juradoxsolicitud, JuradoxsolicitudRelations, Resultadosolicitud, Jurado, Solicitud, Estado} from '../models';
import {ResultadosolicitudRepository} from './resultadosolicitud.repository';
import {JuradoRepository} from './jurado.repository';
import {SolicitudRepository} from './solicitud.repository';
import {EstadoRepository} from './estado.repository';

export class JuradoxsolicitudRepository extends DefaultCrudRepository<
  Juradoxsolicitud,
  typeof Juradoxsolicitud.prototype.id,
  JuradoxsolicitudRelations
> {

  public readonly resultadosolicitud: HasOneRepositoryFactory<Resultadosolicitud, typeof Juradoxsolicitud.prototype.id>;

  public readonly idjurado: BelongsToAccessor<Jurado, typeof Juradoxsolicitud.prototype.id>;

  public readonly idsolicitud: BelongsToAccessor<Solicitud, typeof Juradoxsolicitud.prototype.id>;

  public readonly idestado: BelongsToAccessor<Estado, typeof Juradoxsolicitud.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('ResultadosolicitudRepository') protected resultadosolicitudRepositoryGetter: Getter<ResultadosolicitudRepository>, @repository.getter('JuradoRepository') protected juradoRepositoryGetter: Getter<JuradoRepository>, @repository.getter('SolicitudRepository') protected solicitudRepositoryGetter: Getter<SolicitudRepository>, @repository.getter('EstadoRepository') protected estadoRepositoryGetter: Getter<EstadoRepository>,
  ) {
    super(Juradoxsolicitud, dataSource);
    this.idestado = this.createBelongsToAccessorFor('idestado', estadoRepositoryGetter,);
    this.registerInclusionResolver('idestado', this.idestado.inclusionResolver);
    this.idsolicitud = this.createBelongsToAccessorFor('idsolicitud', solicitudRepositoryGetter,);
    this.registerInclusionResolver('idsolicitud', this.idsolicitud.inclusionResolver);
    this.idjurado = this.createBelongsToAccessorFor('idjurado', juradoRepositoryGetter,);
    this.registerInclusionResolver('idjurado', this.idjurado.inclusionResolver);
    this.resultadosolicitud = this.createHasOneRepositoryFactoryFor('resultadosolicitud', resultadosolicitudRepositoryGetter);
    this.registerInclusionResolver('resultadosolicitud', this.resultadosolicitud.inclusionResolver);
  }
}
