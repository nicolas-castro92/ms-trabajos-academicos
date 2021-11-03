import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Proponente} from './proponente.model';
import {Solicitud} from './solicitud.model';

@model()
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
