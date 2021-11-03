import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Proponente} from './proponente.model';
import {Solicitud} from './solicitud.model';

@model({
  settings: {
    foreignKeys: {
      proponente_fk: {
        name: 'fk_proponente_',
        entity: 'Proponente',
        entityKey: 'id',
        foreignKey: 'id_proponente'
      },
      solicitud: {
        name: 'fk_solicitud_',
        entity: 'Solicitud',
        entityKey: 'id',
        foreignKey: 'id_solicitud'
      }
    }

  }
})
export class Proponentexsolicitud extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;
  @belongsTo(() => Proponente, {name: 'idproponente'})
  id_proponente: number;

  @belongsTo(() => Solicitud, {name: 'idsolicitud'})
  id_solicitud: number;

  constructor(data?: Partial<Proponentexsolicitud>) {
    super(data);
  }
}

export interface ProponentexsolicitudRelations {
  // describe navigational properties here
}

export type ProponentexsolicitudWithRelations = Proponentexsolicitud & ProponentexsolicitudRelations;
