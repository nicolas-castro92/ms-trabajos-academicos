import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Departamento, DepartamentoRelations, Facultad, Departamentoxproponente} from '../models';
import {FacultadRepository} from './facultad.repository';
import {DepartamentoxproponenteRepository} from './departamentoxproponente.repository';

export class DepartamentoRepository extends DefaultCrudRepository<
  Departamento,
  typeof Departamento.prototype.id,
  DepartamentoRelations
> {

  public readonly idfacultad: BelongsToAccessor<Facultad, typeof Departamento.prototype.id>;

  public readonly departamentoxproponentes: HasManyRepositoryFactory<Departamentoxproponente, typeof Departamento.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('FacultadRepository') protected facultadRepositoryGetter: Getter<FacultadRepository>, @repository.getter('DepartamentoxproponenteRepository') protected departamentoxproponenteRepositoryGetter: Getter<DepartamentoxproponenteRepository>,
  ) {
    super(Departamento, dataSource);
    this.departamentoxproponentes = this.createHasManyRepositoryFactoryFor('departamentoxproponentes', departamentoxproponenteRepositoryGetter,);
    this.registerInclusionResolver('departamentoxproponentes', this.departamentoxproponentes.inclusionResolver);
    this.idfacultad = this.createBelongsToAccessorFor('idfacultad', facultadRepositoryGetter,);
    this.registerInclusionResolver('idfacultad', this.idfacultad.inclusionResolver);
  }
}
