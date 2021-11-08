import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Proponentexsolicitud, ProponentexsolicitudRelations} from '../models';

export class ProponentexsolicitudRepository extends DefaultCrudRepository<
  Proponentexsolicitud,
  typeof Proponentexsolicitud.prototype.id,
  ProponentexsolicitudRelations
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(Proponentexsolicitud, dataSource);
  }
}
