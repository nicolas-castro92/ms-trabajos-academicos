import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, HasOneRepositoryFactory, BelongsToAccessor} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Solicitud, SolicitudRelations, Proponentexsolicitud, Recordatorio, Comitexsolicitud, Juradoxsolicitud, Tiposolicitud, Modalidad, Areainvestigacion, Estado} from '../models';
import {ProponentexsolicitudRepository} from './proponentexsolicitud.repository';
import {RecordatorioRepository} from './recordatorio.repository';
import {ComitexsolicitudRepository} from './comitexsolicitud.repository';
import {JuradoxsolicitudRepository} from './juradoxsolicitud.repository';
import {TiposolicitudRepository} from './tiposolicitud.repository';
import {ModalidadRepository} from './modalidad.repository';
import {AreainvestigacionRepository} from './areainvestigacion.repository';
import {EstadoRepository} from './estado.repository';

export class SolicitudRepository extends DefaultCrudRepository<
  Solicitud,
  typeof Solicitud.prototype.id,
  SolicitudRelations
> {

  public readonly proponentexsolicituds: HasManyRepositoryFactory<Proponentexsolicitud, typeof Solicitud.prototype.id>;

  public readonly recordatorio: HasOneRepositoryFactory<Recordatorio, typeof Solicitud.prototype.id>;

  public readonly comitexsolicituds: HasManyRepositoryFactory<Comitexsolicitud, typeof Solicitud.prototype.id>;

  public readonly juradoxsolicituds: HasManyRepositoryFactory<Juradoxsolicitud, typeof Solicitud.prototype.id>;

  public readonly idtiposolicitud: BelongsToAccessor<Tiposolicitud, typeof Solicitud.prototype.id>;

  public readonly idmodalidad: BelongsToAccessor<Modalidad, typeof Solicitud.prototype.id>;

  public readonly idareainvestigacion: BelongsToAccessor<Areainvestigacion, typeof Solicitud.prototype.id>;

  public readonly idestado: BelongsToAccessor<Estado, typeof Solicitud.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('ProponentexsolicitudRepository') protected proponentexsolicitudRepositoryGetter: Getter<ProponentexsolicitudRepository>, @repository.getter('RecordatorioRepository') protected recordatorioRepositoryGetter: Getter<RecordatorioRepository>, @repository.getter('ComitexsolicitudRepository') protected comitexsolicitudRepositoryGetter: Getter<ComitexsolicitudRepository>, @repository.getter('JuradoxsolicitudRepository') protected juradoxsolicitudRepositoryGetter: Getter<JuradoxsolicitudRepository>, @repository.getter('TiposolicitudRepository') protected tiposolicitudRepositoryGetter: Getter<TiposolicitudRepository>, @repository.getter('ModalidadRepository') protected modalidadRepositoryGetter: Getter<ModalidadRepository>, @repository.getter('AreainvestigacionRepository') protected areainvestigacionRepositoryGetter: Getter<AreainvestigacionRepository>, @repository.getter('EstadoRepository') protected estadoRepositoryGetter: Getter<EstadoRepository>,
  ) {
    super(Solicitud, dataSource);
    this.idestado = this.createBelongsToAccessorFor('idestado', estadoRepositoryGetter,);
    this.registerInclusionResolver('idestado', this.idestado.inclusionResolver);
    this.idareainvestigacion = this.createBelongsToAccessorFor('idareainvestigacion', areainvestigacionRepositoryGetter,);
    this.registerInclusionResolver('idareainvestigacion', this.idareainvestigacion.inclusionResolver);
    this.idmodalidad = this.createBelongsToAccessorFor('idmodalidad', modalidadRepositoryGetter,);
    this.registerInclusionResolver('idmodalidad', this.idmodalidad.inclusionResolver);
    this.idtiposolicitud = this.createBelongsToAccessorFor('idtiposolicitud', tiposolicitudRepositoryGetter,);
    this.registerInclusionResolver('idtiposolicitud', this.idtiposolicitud.inclusionResolver);
    this.juradoxsolicituds = this.createHasManyRepositoryFactoryFor('juradoxsolicituds', juradoxsolicitudRepositoryGetter,);
    this.registerInclusionResolver('juradoxsolicituds', this.juradoxsolicituds.inclusionResolver);
    this.comitexsolicituds = this.createHasManyRepositoryFactoryFor('comitexsolicituds', comitexsolicitudRepositoryGetter,);
    this.registerInclusionResolver('comitexsolicituds', this.comitexsolicituds.inclusionResolver);
    this.recordatorio = this.createHasOneRepositoryFactoryFor('recordatorio', recordatorioRepositoryGetter);
    this.registerInclusionResolver('recordatorio', this.recordatorio.inclusionResolver);
    this.proponentexsolicituds = this.createHasManyRepositoryFactoryFor('proponentexsolicituds', proponentexsolicitudRepositoryGetter,);
    this.registerInclusionResolver('proponentexsolicituds', this.proponentexsolicituds.inclusionResolver);
  }
}
