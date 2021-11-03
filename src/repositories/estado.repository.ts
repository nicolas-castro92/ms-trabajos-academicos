import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasOneRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Estado, EstadoRelations, Solicitud, Evaluasolicitud, Resultadoevaluacion} from '../models';
import {SolicitudRepository} from './solicitud.repository';
import {EvaluasolicitudRepository} from './evaluasolicitud.repository';
import {ResultadoevaluacionRepository} from './resultadoevaluacion.repository';

export class EstadoRepository extends DefaultCrudRepository<
  Estado,
  typeof Estado.prototype.id,
  EstadoRelations
> {

  public readonly solicitud: HasOneRepositoryFactory<Solicitud, typeof Estado.prototype.id>;

  public readonly evaluasolicitud: HasOneRepositoryFactory<Evaluasolicitud, typeof Estado.prototype.id>;

  public readonly resultadoevaluacion: HasOneRepositoryFactory<Resultadoevaluacion, typeof Estado.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('SolicitudRepository') protected solicitudRepositoryGetter: Getter<SolicitudRepository>, @repository.getter('EvaluasolicitudRepository') protected evaluasolicitudRepositoryGetter: Getter<EvaluasolicitudRepository>, @repository.getter('ResultadoevaluacionRepository') protected resultadoevaluacionRepositoryGetter: Getter<ResultadoevaluacionRepository>,
  ) {
    super(Estado, dataSource);
    this.resultadoevaluacion = this.createHasOneRepositoryFactoryFor('resultadoevaluacion', resultadoevaluacionRepositoryGetter);
    this.registerInclusionResolver('resultadoevaluacion', this.resultadoevaluacion.inclusionResolver);
    this.evaluasolicitud = this.createHasOneRepositoryFactoryFor('evaluasolicitud', evaluasolicitudRepositoryGetter);
    this.registerInclusionResolver('evaluasolicitud', this.evaluasolicitud.inclusionResolver);
    this.solicitud = this.createHasOneRepositoryFactoryFor('solicitud', solicitudRepositoryGetter);
    this.registerInclusionResolver('solicitud', this.solicitud.inclusionResolver);
  }
}
