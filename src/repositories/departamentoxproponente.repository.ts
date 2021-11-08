import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Departamentoxproponente, DepartamentoxproponenteRelations} from '../models';

export class DepartamentoxproponenteRepository extends DefaultCrudRepository<
  Departamentoxproponente,
  typeof Departamentoxproponente.prototype.id,
  DepartamentoxproponenteRelations
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(Departamentoxproponente, dataSource);
  }
}
