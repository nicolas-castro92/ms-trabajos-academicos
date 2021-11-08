import {Entity, model, property} from '@loopback/repository';

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

  @property({
    type: 'number',
    required: true,
  })
  id_departamento: number;

  @property({
    type: 'number',
    required: true,
  })
  id_proponente: number;


  constructor(data?: Partial<Departamentoxproponente>) {
    super(data);
  }
}

export interface DepartamentoxproponenteRelations {
  // describe navigational properties here
}

export type DepartamentoxproponenteWithRelations = Departamentoxproponente & DepartamentoxproponenteRelations;
