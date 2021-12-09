import {Getter, inject} from '@loopback/core';
import {BelongsToAccessor, DefaultCrudRepository, HasManyRepositoryFactory, repository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Departamentoxproponente, Proponente, ProponenteRelations, Proponentexsolicitud, Tipovinculacion} from '../models';
import {DepartamentoxproponenteRepository} from './departamentoxproponente.repository';
import {EstadoRepository} from './estado.repository';
import {ProponentexsolicitudRepository} from './proponentexsolicitud.repository';
import {TipovinculacionRepository} from './tipovinculacion.repository';

export class ProponenteRepository extends DefaultCrudRepository<
  Proponente,
  typeof Proponente.prototype.id,
  ProponenteRelations
> {

  public readonly departamentoxproponentes: HasManyRepositoryFactory<Departamentoxproponente, typeof Proponente.prototype.id>;

  public readonly proponentexsolicituds: HasManyRepositoryFactory<Proponentexsolicitud, typeof Proponente.prototype.id>;

  public readonly idtipovinculacion: BelongsToAccessor<Tipovinculacion, typeof Proponente.prototype.id>;


  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('DepartamentoxproponenteRepository') protected departamentoxproponenteRepositoryGetter: Getter<DepartamentoxproponenteRepository>, @repository.getter('ProponentexsolicitudRepository') protected proponentexsolicitudRepositoryGetter: Getter<ProponentexsolicitudRepository>, @repository.getter('TipovinculacionRepository') protected tipovinculacionRepositoryGetter: Getter<TipovinculacionRepository>, @repository.getter('EstadoRepository') protected estadoRepositoryGetter: Getter<EstadoRepository>,
  ) {
    super(Proponente, dataSource);
    this.idtipovinculacion = this.createBelongsToAccessorFor('idtipovinculacion', tipovinculacionRepositoryGetter,);
    this.registerInclusionResolver('idtipovinculacion', this.idtipovinculacion.inclusionResolver);
    this.proponentexsolicituds = this.createHasManyRepositoryFactoryFor('proponentexsolicituds', proponentexsolicitudRepositoryGetter,);
    this.registerInclusionResolver('proponentexsolicituds', this.proponentexsolicituds.inclusionResolver);
    this.departamentoxproponentes = this.createHasManyRepositoryFactoryFor('departamentoxproponentes', departamentoxproponenteRepositoryGetter,);
    this.registerInclusionResolver('departamentoxproponentes', this.departamentoxproponentes.inclusionResolver);
  }
}
