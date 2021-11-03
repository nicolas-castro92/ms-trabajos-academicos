import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, HasOneRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Jurado, JuradoRelations, Juradoxareainvestigacion, Usuariojurado, Evaluasolicitud} from '../models';
import {JuradoxareainvestigacionRepository} from './juradoxareainvestigacion.repository';
import {UsuariojuradoRepository} from './usuariojurado.repository';
import {EvaluasolicitudRepository} from './evaluasolicitud.repository';

export class JuradoRepository extends DefaultCrudRepository<
  Jurado,
  typeof Jurado.prototype.id,
  JuradoRelations
> {

  public readonly juradoxareainvestigacions: HasManyRepositoryFactory<Juradoxareainvestigacion, typeof Jurado.prototype.id>;

  public readonly usuariojurado: HasOneRepositoryFactory<Usuariojurado, typeof Jurado.prototype.id>;

  public readonly evaluasolicituds: HasManyRepositoryFactory<Evaluasolicitud, typeof Jurado.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('JuradoxareainvestigacionRepository') protected juradoxareainvestigacionRepositoryGetter: Getter<JuradoxareainvestigacionRepository>, @repository.getter('UsuariojuradoRepository') protected usuariojuradoRepositoryGetter: Getter<UsuariojuradoRepository>, @repository.getter('EvaluasolicitudRepository') protected evaluasolicitudRepositoryGetter: Getter<EvaluasolicitudRepository>,
  ) {
    super(Jurado, dataSource);
    this.evaluasolicituds = this.createHasManyRepositoryFactoryFor('evaluasolicituds', evaluasolicitudRepositoryGetter,);
    this.registerInclusionResolver('evaluasolicituds', this.evaluasolicituds.inclusionResolver);
    this.usuariojurado = this.createHasOneRepositoryFactoryFor('usuariojurado', usuariojuradoRepositoryGetter);
    this.registerInclusionResolver('usuariojurado', this.usuariojurado.inclusionResolver);
    this.juradoxareainvestigacions = this.createHasManyRepositoryFactoryFor('juradoxareainvestigacions', juradoxareainvestigacionRepositoryGetter,);
    this.registerInclusionResolver('juradoxareainvestigacions', this.juradoxareainvestigacions.inclusionResolver);
  }
}
