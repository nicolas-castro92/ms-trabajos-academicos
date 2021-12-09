import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, BelongsToAccessor} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Proponente, ProponenteRelations, Departamentoxproponente, Proponentexsolicitud, Tipovinculacion, Estado} from '../models';
import {DepartamentoxproponenteRepository} from './departamentoxproponente.repository';
import {ProponentexsolicitudRepository} from './proponentexsolicitud.repository';
import {TipovinculacionRepository} from './tipovinculacion.repository';
import {EstadoRepository} from './estado.repository';

export class ProponenteRepository extends DefaultCrudRepository<
  Proponente,
  typeof Proponente.prototype.id,
  ProponenteRelations
> {

  public readonly departamentoxproponentes: HasManyRepositoryFactory<Departamentoxproponente, typeof Proponente.prototype.id>;

  public readonly proponentexsolicituds: HasManyRepositoryFactory<Proponentexsolicitud, typeof Proponente.prototype.id>;

  public readonly idtipovinculacion: BelongsToAccessor<Tipovinculacion, typeof Proponente.prototype.id>;

  public readonly idestado: BelongsToAccessor<Estado, typeof Proponente.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('DepartamentoxproponenteRepository') protected departamentoxproponenteRepositoryGetter: Getter<DepartamentoxproponenteRepository>, @repository.getter('ProponentexsolicitudRepository') protected proponentexsolicitudRepositoryGetter: Getter<ProponentexsolicitudRepository>, @repository.getter('TipovinculacionRepository') protected tipovinculacionRepositoryGetter: Getter<TipovinculacionRepository>, @repository.getter('EstadoRepository') protected estadoRepositoryGetter: Getter<EstadoRepository>,
  ) {
    super(Proponente, dataSource);
    this.idestado = this.createBelongsToAccessorFor('idestado', estadoRepositoryGetter,);
    this.registerInclusionResolver('idestado', this.idestado.inclusionResolver);
    this.idtipovinculacion = this.createBelongsToAccessorFor('idtipovinculacion', tipovinculacionRepositoryGetter,);
    this.registerInclusionResolver('idtipovinculacion', this.idtipovinculacion.inclusionResolver);
    this.proponentexsolicituds = this.createHasManyRepositoryFactoryFor('proponentexsolicituds', proponentexsolicitudRepositoryGetter,);
    this.registerInclusionResolver('proponentexsolicituds', this.proponentexsolicituds.inclusionResolver);
    this.departamentoxproponentes = this.createHasManyRepositoryFactoryFor('departamentoxproponentes', departamentoxproponenteRepositoryGetter,);
    this.registerInclusionResolver('departamentoxproponentes', this.departamentoxproponentes.inclusionResolver);
  }
}
