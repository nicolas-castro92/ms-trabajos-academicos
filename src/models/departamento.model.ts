import {Entity, hasMany, model, property} from '@loopback/repository';
import {Departamentoxproponente} from './departamentoxproponente.model';

@model({
  settings: {
    foreignKeys: {
      facultad_fk: {
        name: 'fk_facultad',
        entity: 'Facultad',
        entityKey: 'id',
        foreignKey: 'id_facultad'
      }
    }
  }
})
export class Departamento extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'number',
  })
  id_facultad?: number;

  @hasMany(() => Departamentoxproponente, {keyTo: 'id_departamento'})
  departamentoxproponentes: Departamentoxproponente[];

  constructor(data?: Partial<Departamento>) {
    super(data);
  }
}

export interface DepartamentoRelations {
  // describe navigational properties here
}

export type DepartamentoWithRelations = Departamento & DepartamentoRelations;
