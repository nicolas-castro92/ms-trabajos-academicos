import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Tipocomite, TipocomiteRelations} from '../models';

export class TipocomiteRepository extends DefaultCrudRepository<
  Tipocomite,
  typeof Tipocomite.prototype.id,
  TipocomiteRelations
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(Tipocomite, dataSource);
  }
}
