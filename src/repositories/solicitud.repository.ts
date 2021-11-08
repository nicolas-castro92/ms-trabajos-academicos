import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, HasOneRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Solicitud, SolicitudRelations, Proponentexsolicitud, Recordatorio, Comitexsolicitud, Juradoxsolicitud} from '../models';
import {ProponentexsolicitudRepository} from './proponentexsolicitud.repository';
import {RecordatorioRepository} from './recordatorio.repository';
import {ComitexsolicitudRepository} from './comitexsolicitud.repository';
import {JuradoxsolicitudRepository} from './juradoxsolicitud.repository';

export class SolicitudRepository extends DefaultCrudRepository<
  Solicitud,
  typeof Solicitud.prototype.id,
  SolicitudRelations
> {

  public readonly proponentexsolicituds: HasManyRepositoryFactory<Proponentexsolicitud, typeof Solicitud.prototype.id>;

  public readonly recordatorio: HasOneRepositoryFactory<Recordatorio, typeof Solicitud.prototype.id>;

  public readonly comitexsolicituds: HasManyRepositoryFactory<Comitexsolicitud, typeof Solicitud.prototype.id>;

  public readonly juradoxsolicituds: HasManyRepositoryFactory<Juradoxsolicitud, typeof Solicitud.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('ProponentexsolicitudRepository') protected proponentexsolicitudRepositoryGetter: Getter<ProponentexsolicitudRepository>, @repository.getter('RecordatorioRepository') protected recordatorioRepositoryGetter: Getter<RecordatorioRepository>, @repository.getter('ComitexsolicitudRepository') protected comitexsolicitudRepositoryGetter: Getter<ComitexsolicitudRepository>, @repository.getter('JuradoxsolicitudRepository') protected juradoxsolicitudRepositoryGetter: Getter<JuradoxsolicitudRepository>,
  ) {
    super(Solicitud, dataSource);
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
