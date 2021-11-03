import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Tipocomite, TipocomiteRelations, Comitexsolicitud} from '../models';
import {ComitexsolicitudRepository} from './comitexsolicitud.repository';

export class TipocomiteRepository extends DefaultCrudRepository<
  Tipocomite,
  typeof Tipocomite.prototype.id,
  TipocomiteRelations
> {

  public readonly comitexsolicituds: HasManyRepositoryFactory<Comitexsolicitud, typeof Tipocomite.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('ComitexsolicitudRepository') protected comitexsolicitudRepositoryGetter: Getter<ComitexsolicitudRepository>,
  ) {
    super(Tipocomite, dataSource);
    this.comitexsolicituds = this.createHasManyRepositoryFactoryFor('comitexsolicituds', comitexsolicitudRepositoryGetter,);
    this.registerInclusionResolver('comitexsolicituds', this.comitexsolicituds.inclusionResolver);
  }
}
