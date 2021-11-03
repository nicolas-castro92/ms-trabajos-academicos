import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Resultadoevaluacion, ResultadoevaluacionRelations} from '../models';

export class ResultadoevaluacionRepository extends DefaultCrudRepository<
  Resultadoevaluacion,
  typeof Resultadoevaluacion.prototype.id,
  ResultadoevaluacionRelations
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(Resultadoevaluacion, dataSource);
  }
}
