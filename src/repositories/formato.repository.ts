import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Formato, FormatoRelations} from '../models';

export class FormatoRepository extends DefaultCrudRepository<
  Formato,
  typeof Formato.prototype.id,
  FormatoRelations
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(Formato, dataSource);
  }
}
