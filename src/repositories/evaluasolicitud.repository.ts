import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Evaluasolicitud, EvaluasolicitudRelations} from '../models';

export class EvaluasolicitudRepository extends DefaultCrudRepository<
  Evaluasolicitud,
  typeof Evaluasolicitud.prototype.id,
  EvaluasolicitudRelations
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(Evaluasolicitud, dataSource);
  }
}
