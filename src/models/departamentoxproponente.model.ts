import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Departamento} from './departamento.model';
import {Proponente} from './proponente.model';

@model({
  settings: {
    foreignKeys: {
      departamento_fk: {
        name: 'fk_departamento',
        entity: 'Departamento',
        entityKey: 'id',
        foreignKey: 'id_departamento'
      },
      proponente_fk: {
        name: 'fk_proponente',
        entity: 'Proponente',
        entityKey: 'id',
        foreignKey: 'id_proponente'
      }
    }
  }
})
export class Departamentoxproponente extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;
  @belongsTo(() => Departamento, {name: 'iddepartamento'})
  id_departamento: number;

  @belongsTo(() => Proponente, {name: 'idproponente'})
  id_proponente: number;

  constructor(data?: Partial<Departamentoxproponente>) {
    super(data);
  }
}

export interface DepartamentoxproponenteRelations {
  // describe navigational properties here
}

export type DepartamentoxproponenteWithRelations = Departamentoxproponente & DepartamentoxproponenteRelations;
