import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasOneRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Juradoxsolicitud, JuradoxsolicitudRelations, Resultadosolicitud} from '../models';
import {ResultadosolicitudRepository} from './resultadosolicitud.repository';

export class JuradoxsolicitudRepository extends DefaultCrudRepository<
  Juradoxsolicitud,
  typeof Juradoxsolicitud.prototype.id,
  JuradoxsolicitudRelations
> {

  public readonly resultadosolicitud: HasOneRepositoryFactory<Resultadosolicitud, typeof Juradoxsolicitud.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('ResultadosolicitudRepository') protected resultadosolicitudRepositoryGetter: Getter<ResultadosolicitudRepository>,
  ) {
    super(Juradoxsolicitud, dataSource);
    this.resultadosolicitud = this.createHasOneRepositoryFactoryFor('resultadosolicitud', resultadosolicitudRepositoryGetter);
    this.registerInclusionResolver('resultadosolicitud', this.resultadosolicitud.inclusionResolver);
  }
}
