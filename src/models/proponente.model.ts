import {Entity, hasMany, model, property} from '@loopback/repository';
import {Departamentoxproponente} from './departamentoxproponente.model';
import {Proponentexsolicitud} from './proponentexsolicitud.model';

@model({
  settings: {
    foreignKeys: {
      tipovinculacion_fk: {
        name: 'fk_tipovinculacion',
        entity: 'Tipovinculacion',
        entityKey: 'id',
        foreignKey: 'id_tipovinculacion'
      }
    }
  }
})
export class Proponente extends Entity {
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
  documento: string;

  @property({
    type: 'string',
    required: true,
  })
  primer_nombre: string;

  @property({
    type: 'string',
  })
  otros_nombres?: string;

  @property({
    type: 'string',
    required: true,
  })
  primer_apellido: string;

  @property({
    type: 'string',
    required: true,
  })
  segundo_apellido: string;

  @property({
    type: 'string',
    required: true,
  })
  correo: string;

  @property({
    type: 'string',
  })
  celular?: string;

  @property({
    type: 'string',
  })
  fotografia?: string;

  @hasMany(() => Departamentoxproponente, {keyTo: 'id_proponente'})
  departamentoxproponentes: Departamentoxproponente[];

  @property({
    type: 'number',
  })
  id_tipovinculacion?: number;

  @hasMany(() => Proponentexsolicitud, {keyTo: 'id_proponente'})
  proponentexsolicituds: Proponentexsolicitud[];

  constructor(data?: Partial<Proponente>) {
    super(data);
  }
}

export interface ProponenteRelations {
  // describe navigational properties here
}

export type ProponenteWithRelations = Proponente & ProponenteRelations;
