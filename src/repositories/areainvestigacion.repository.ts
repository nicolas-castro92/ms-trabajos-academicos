import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Areainvestigacion, AreainvestigacionRelations, Solicitud, Juradoxareainvestigacion} from '../models';
import {SolicitudRepository} from './solicitud.repository';
import {JuradoxareainvestigacionRepository} from './juradoxareainvestigacion.repository';

export class AreainvestigacionRepository extends DefaultCrudRepository<
  Areainvestigacion,
  typeof Areainvestigacion.prototype.id,
  AreainvestigacionRelations
> {

  public readonly solicituds: HasManyRepositoryFactory<Solicitud, typeof Areainvestigacion.prototype.id>;

  public readonly juradoxareainvestigacions: HasManyRepositoryFactory<Juradoxareainvestigacion, typeof Areainvestigacion.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('SolicitudRepository') protected solicitudRepositoryGetter: Getter<SolicitudRepository>, @repository.getter('JuradoxareainvestigacionRepository') protected juradoxareainvestigacionRepositoryGetter: Getter<JuradoxareainvestigacionRepository>,
  ) {
    super(Areainvestigacion, dataSource);
    this.juradoxareainvestigacions = this.createHasManyRepositoryFactoryFor('juradoxareainvestigacions', juradoxareainvestigacionRepositoryGetter,);
    this.registerInclusionResolver('juradoxareainvestigacions', this.juradoxareainvestigacions.inclusionResolver);
    this.solicituds = this.createHasManyRepositoryFactoryFor('solicituds', solicitudRepositoryGetter,);
    this.registerInclusionResolver('solicituds', this.solicituds.inclusionResolver);
  }
}
