import {Entity, model, property} from '@loopback/repository';

@model()
export class Evaluasolicitud extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'date',
    required: true,
  })
  fecha_invitacion: string;

  @property({
    type: 'date',
    required: true,
  })
  fecha_respuesta: string;

  @property({
    type: 'string',
    required: true,
  })
  respuesta: string;

  @property({
    type: 'string',
    required: true,
  })
  observaciones: string;


  constructor(data?: Partial<Evaluasolicitud>) {
    super(data);
  }
}

export interface EvaluasolicitudRelations {
  // describe navigational properties here
}

export type EvaluasolicitudWithRelations = Evaluasolicitud & EvaluasolicitudRelations;
