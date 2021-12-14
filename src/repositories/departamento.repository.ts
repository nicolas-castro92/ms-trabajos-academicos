import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, BelongsToAccessor} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Departamento, DepartamentoRelations, Departamentoxproponente, Facultad} from '../models';
import {DepartamentoxproponenteRepository} from './departamentoxproponente.repository';
import {FacultadRepository} from './facultad.repository';

export class DepartamentoRepository extends DefaultCrudRepository<
  Departamento,
  typeof Departamento.prototype.id,
  DepartamentoRelations
> {

  public readonly departamentoxproponentes: HasManyRepositoryFactory<Departamentoxproponente, typeof Departamento.prototype.id>;

  public readonly idfacultad: BelongsToAccessor<Facultad, typeof Departamento.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('DepartamentoxproponenteRepository') protected departamentoxproponenteRepositoryGetter: Getter<DepartamentoxproponenteRepository>, @repository.getter('FacultadRepository') protected facultadRepositoryGetter: Getter<FacultadRepository>,
  ) {
    super(Departamento, dataSource);
    this.idfacultad = this.createBelongsToAccessorFor('idfacultad', facultadRepositoryGetter,);
    this.registerInclusionResolver('idfacultad', this.idfacultad.inclusionResolver);
    this.departamentoxproponentes = this.createHasManyRepositoryFactoryFor('departamentoxproponentes', departamentoxproponenteRepositoryGetter,);
    this.registerInclusionResolver('departamentoxproponentes', this.departamentoxproponentes.inclusionResolver);
  }
}
