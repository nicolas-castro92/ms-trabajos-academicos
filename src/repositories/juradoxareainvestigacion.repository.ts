import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Juradoxareainvestigacion, JuradoxareainvestigacionRelations} from '../models';

export class JuradoxareainvestigacionRepository extends DefaultCrudRepository<
  Juradoxareainvestigacion,
  typeof Juradoxareainvestigacion.prototype.id,
  JuradoxareainvestigacionRelations
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(Juradoxareainvestigacion, dataSource);
  }
}
