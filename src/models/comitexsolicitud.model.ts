import {Entity, model, property} from '@loopback/repository';

@model()
export class Comitexsolicitud extends Entity {
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
  id_comite: number;

  @property({
    type: 'string',
    required: true,
  })
  respuesta: string;


  constructor(data?: Partial<Comitexsolicitud>) {
    super(data);
  }
}

export interface ComitexsolicitudRelations {
  // describe navigational properties here
}

export type ComitexsolicitudWithRelations = Comitexsolicitud & ComitexsolicitudRelations;
