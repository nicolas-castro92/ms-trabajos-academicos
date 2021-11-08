import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Resultadosolicitud, ResultadosolicitudRelations} from '../models';

export class ResultadosolicitudRepository extends DefaultCrudRepository<
  Resultadosolicitud,
  typeof Resultadosolicitud.prototype.id,
  ResultadosolicitudRelations
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(Resultadosolicitud, dataSource);
  }
}
