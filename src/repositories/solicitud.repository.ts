import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, BelongsToAccessor, HasOneRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Solicitud, SolicitudRelations, Proponentexsolicitud, Tiposolicitud, Modalidad, Recordatorio, Comitexsolicitud, Areainvestigacion, Evaluasolicitud} from '../models';
import {ProponentexsolicitudRepository} from './proponentexsolicitud.repository';
import {TiposolicitudRepository} from './tiposolicitud.repository';
import {ModalidadRepository} from './modalidad.repository';
import {RecordatorioRepository} from './recordatorio.repository';
import {ComitexsolicitudRepository} from './comitexsolicitud.repository';
import {AreainvestigacionRepository} from './areainvestigacion.repository';
import {EvaluasolicitudRepository} from './evaluasolicitud.repository';

export class SolicitudRepository extends DefaultCrudRepository<
  Solicitud,
  typeof Solicitud.prototype.id,
  SolicitudRelations
> {

  public readonly proponentexsolicituds: HasManyRepositoryFactory<Proponentexsolicitud, typeof Solicitud.prototype.id>;

  public readonly idtiposolicitud: BelongsToAccessor<Tiposolicitud, typeof Solicitud.prototype.id>;

  public readonly idmodalidad: BelongsToAccessor<Modalidad, typeof Solicitud.prototype.id>;

  public readonly recordatorio: HasOneRepositoryFactory<Recordatorio, typeof Solicitud.prototype.id>;

  public readonly comitexsolicituds: HasManyRepositoryFactory<Comitexsolicitud, typeof Solicitud.prototype.id>;

  public readonly idareainvestigacion: BelongsToAccessor<Areainvestigacion, typeof Solicitud.prototype.id>;

  public readonly evaluasolicitud: HasOneRepositoryFactory<Evaluasolicitud, typeof Solicitud.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('ProponentexsolicitudRepository') protected proponentexsolicitudRepositoryGetter: Getter<ProponentexsolicitudRepository>, @repository.getter('TiposolicitudRepository') protected tiposolicitudRepositoryGetter: Getter<TiposolicitudRepository>, @repository.getter('ModalidadRepository') protected modalidadRepositoryGetter: Getter<ModalidadRepository>, @repository.getter('RecordatorioRepository') protected recordatorioRepositoryGetter: Getter<RecordatorioRepository>, @repository.getter('ComitexsolicitudRepository') protected comitexsolicitudRepositoryGetter: Getter<ComitexsolicitudRepository>, @repository.getter('AreainvestigacionRepository') protected areainvestigacionRepositoryGetter: Getter<AreainvestigacionRepository>, @repository.getter('EvaluasolicitudRepository') protected evaluasolicitudRepositoryGetter: Getter<EvaluasolicitudRepository>,
  ) {
    super(Solicitud, dataSource);
    this.evaluasolicitud = this.createHasOneRepositoryFactoryFor('evaluasolicitud', evaluasolicitudRepositoryGetter);
    this.registerInclusionResolver('evaluasolicitud', this.evaluasolicitud.inclusionResolver);
    this.idareainvestigacion = this.createBelongsToAccessorFor('idareainvestigacion', areainvestigacionRepositoryGetter,);
    this.registerInclusionResolver('idareainvestigacion', this.idareainvestigacion.inclusionResolver);
    this.comitexsolicituds = this.createHasManyRepositoryFactoryFor('comitexsolicituds', comitexsolicitudRepositoryGetter,);
    this.registerInclusionResolver('comitexsolicituds', this.comitexsolicituds.inclusionResolver);
    this.recordatorio = this.createHasOneRepositoryFactoryFor('recordatorio', recordatorioRepositoryGetter);
    this.registerInclusionResolver('recordatorio', this.recordatorio.inclusionResolver);
    this.idmodalidad = this.createBelongsToAccessorFor('idmodalidad', modalidadRepositoryGetter,);
    this.registerInclusionResolver('idmodalidad', this.idmodalidad.inclusionResolver);
    this.idtiposolicitud = this.createBelongsToAccessorFor('idtiposolicitud', tiposolicitudRepositoryGetter,);
    this.registerInclusionResolver('idtiposolicitud', this.idtiposolicitud.inclusionResolver);
    this.proponentexsolicituds = this.createHasManyRepositoryFactoryFor('proponentexsolicituds', proponentexsolicitudRepositoryGetter,);
    this.registerInclusionResolver('proponentexsolicituds', this.proponentexsolicituds.inclusionResolver);
  }
}
