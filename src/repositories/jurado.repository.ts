import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, HasOneRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Jurado, JuradoRelations, Juradoxareainvestigacion, Usuariojurado, Juradoxsolicitud} from '../models';
import {JuradoxareainvestigacionRepository} from './juradoxareainvestigacion.repository';
import {UsuariojuradoRepository} from './usuariojurado.repository';
import {JuradoxsolicitudRepository} from './juradoxsolicitud.repository';

export class JuradoRepository extends DefaultCrudRepository<
  Jurado,
  typeof Jurado.prototype.id,
  JuradoRelations
> {

  public readonly juradoxareainvestigacions: HasManyRepositoryFactory<Juradoxareainvestigacion, typeof Jurado.prototype.id>;

  public readonly usuariojurado: HasOneRepositoryFactory<Usuariojurado, typeof Jurado.prototype.id>;

  public readonly juradoxsolicituds: HasManyRepositoryFactory<Juradoxsolicitud, typeof Jurado.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('JuradoxareainvestigacionRepository') protected juradoxareainvestigacionRepositoryGetter: Getter<JuradoxareainvestigacionRepository>, @repository.getter('UsuariojuradoRepository') protected usuariojuradoRepositoryGetter: Getter<UsuariojuradoRepository>, @repository.getter('JuradoxsolicitudRepository') protected juradoxsolicitudRepositoryGetter: Getter<JuradoxsolicitudRepository>,
  ) {
    super(Jurado, dataSource);
    this.juradoxsolicituds = this.createHasManyRepositoryFactoryFor('juradoxsolicituds', juradoxsolicitudRepositoryGetter,);
    this.registerInclusionResolver('juradoxsolicituds', this.juradoxsolicituds.inclusionResolver);
    this.usuariojurado = this.createHasOneRepositoryFactoryFor('usuariojurado', usuariojuradoRepositoryGetter);
    this.registerInclusionResolver('usuariojurado', this.usuariojurado.inclusionResolver);
    this.juradoxareainvestigacions = this.createHasManyRepositoryFactoryFor('juradoxareainvestigacions', juradoxareainvestigacionRepositoryGetter,);
    this.registerInclusionResolver('juradoxareainvestigacions', this.juradoxareainvestigacions.inclusionResolver);
  }
}
