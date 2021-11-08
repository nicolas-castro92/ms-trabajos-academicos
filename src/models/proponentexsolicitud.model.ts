import {Entity, model, property} from '@loopback/repository';

@model()
export class Proponentexsolicitud extends Entity {
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
  id_solicitud: number;

  @property({
    type: 'number',
    required: true,
  })
  id_proponente: number;


  constructor(data?: Partial<Proponentexsolicitud>) {
    super(data);
  }
}

export interface ProponentexsolicitudRelations {
  // describe navigational properties here
}

export type ProponentexsolicitudWithRelations = Proponentexsolicitud & ProponentexsolicitudRelations;
