import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasOneRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Evaluasolicitud, EvaluasolicitudRelations, Jurado, Resultadoevaluacion} from '../models';
import {JuradoRepository} from './jurado.repository';
import {ResultadoevaluacionRepository} from './resultadoevaluacion.repository';

export class EvaluasolicitudRepository extends DefaultCrudRepository<
  Evaluasolicitud,
  typeof Evaluasolicitud.prototype.id,
  EvaluasolicitudRelations
> {

  public readonly idjurado: BelongsToAccessor<Jurado, typeof Evaluasolicitud.prototype.id>;

  public readonly resultadoevaluacion: HasOneRepositoryFactory<Resultadoevaluacion, typeof Evaluasolicitud.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('JuradoRepository') protected juradoRepositoryGetter: Getter<JuradoRepository>, @repository.getter('ResultadoevaluacionRepository') protected resultadoevaluacionRepositoryGetter: Getter<ResultadoevaluacionRepository>,
  ) {
    super(Evaluasolicitud, dataSource);
    this.resultadoevaluacion = this.createHasOneRepositoryFactoryFor('resultadoevaluacion', resultadoevaluacionRepositoryGetter);
    this.registerInclusionResolver('resultadoevaluacion', this.resultadoevaluacion.inclusionResolver);
    this.idjurado = this.createBelongsToAccessorFor('idjurado', juradoRepositoryGetter,);
    this.registerInclusionResolver('idjurado', this.idjurado.inclusionResolver);
  }
}
