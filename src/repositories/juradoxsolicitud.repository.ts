import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Juradoxsolicitud, JuradoxsolicitudRelations} from '../models';

export class JuradoxsolicitudRepository extends DefaultCrudRepository<
  Juradoxsolicitud,
  typeof Juradoxsolicitud.prototype.id,
  JuradoxsolicitudRelations
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(Juradoxsolicitud, dataSource);
  }
}
