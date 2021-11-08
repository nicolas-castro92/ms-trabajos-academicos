import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasOneRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Estado, EstadoRelations, Solicitud, Juradoxsolicitud, Resultadosolicitud} from '../models';
import {SolicitudRepository} from './solicitud.repository';
import {JuradoxsolicitudRepository} from './juradoxsolicitud.repository';
import {ResultadosolicitudRepository} from './resultadosolicitud.repository';

export class EstadoRepository extends DefaultCrudRepository<
  Estado,
  typeof Estado.prototype.id,
  EstadoRelations
> {

  public readonly solicitud: HasOneRepositoryFactory<Solicitud, typeof Estado.prototype.id>;

  public readonly juradoxsolicitud: HasOneRepositoryFactory<Juradoxsolicitud, typeof Estado.prototype.id>;

  public readonly resultadosolicitud: HasOneRepositoryFactory<Resultadosolicitud, typeof Estado.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('SolicitudRepository') protected solicitudRepositoryGetter: Getter<SolicitudRepository>, @repository.getter('JuradoxsolicitudRepository') protected juradoxsolicitudRepositoryGetter: Getter<JuradoxsolicitudRepository>, @repository.getter('ResultadosolicitudRepository') protected resultadosolicitudRepositoryGetter: Getter<ResultadosolicitudRepository>,
  ) {
    super(Estado, dataSource);
    this.resultadosolicitud = this.createHasOneRepositoryFactoryFor('resultadosolicitud', resultadosolicitudRepositoryGetter);
    this.registerInclusionResolver('resultadosolicitud', this.resultadosolicitud.inclusionResolver);
    this.juradoxsolicitud = this.createHasOneRepositoryFactoryFor('juradoxsolicitud', juradoxsolicitudRepositoryGetter);
    this.registerInclusionResolver('juradoxsolicitud', this.juradoxsolicitud.inclusionResolver);
    this.solicitud = this.createHasOneRepositoryFactoryFor('solicitud', solicitudRepositoryGetter);
    this.registerInclusionResolver('solicitud', this.solicitud.inclusionResolver);
  }
}
