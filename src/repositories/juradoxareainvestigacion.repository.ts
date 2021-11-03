import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Juradoxareainvestigacion, JuradoxareainvestigacionRelations, Areainvestigacion, Jurado} from '../models';
import {AreainvestigacionRepository} from './areainvestigacion.repository';
import {JuradoRepository} from './jurado.repository';

export class JuradoxareainvestigacionRepository extends DefaultCrudRepository<
  Juradoxareainvestigacion,
  typeof Juradoxareainvestigacion.prototype.id,
  JuradoxareainvestigacionRelations
> {

  public readonly idareainvestigacion: BelongsToAccessor<Areainvestigacion, typeof Juradoxareainvestigacion.prototype.id>;

  public readonly idjurado: BelongsToAccessor<Jurado, typeof Juradoxareainvestigacion.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('AreainvestigacionRepository') protected areainvestigacionRepositoryGetter: Getter<AreainvestigacionRepository>, @repository.getter('JuradoRepository') protected juradoRepositoryGetter: Getter<JuradoRepository>,
  ) {
    super(Juradoxareainvestigacion, dataSource);
    this.idjurado = this.createBelongsToAccessorFor('idjurado', juradoRepositoryGetter,);
    this.registerInclusionResolver('idjurado', this.idjurado.inclusionResolver);
    this.idareainvestigacion = this.createBelongsToAccessorFor('idareainvestigacion', areainvestigacionRepositoryGetter,);
    this.registerInclusionResolver('idareainvestigacion', this.idareainvestigacion.inclusionResolver);
  }
}
