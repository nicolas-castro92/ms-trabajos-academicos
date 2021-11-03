import {belongsTo, Entity, model, property, hasMany} from '@loopback/repository';
import {Facultad} from './facultad.model';
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

  @belongsTo(() => Facultad, {name: 'idfacultad'})
  id_facultad: number;

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
