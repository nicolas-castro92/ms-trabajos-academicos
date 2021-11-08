import {Entity, model, property} from '@loopback/repository';

@model()
export class Resultadosolicitud extends Entity {
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
  resultado: string;

  @property({
    type: 'number',
  })
  id_juradoxsolicitud?: number;

  @property({
    type: 'number',
  })
  id_estado?: number;

  constructor(data?: Partial<Resultadosolicitud>) {
    super(data);
  }
}

export interface ResultadosolicitudRelations {
  // describe navigational properties here
}

export type ResultadosolicitudWithRelations = Resultadosolicitud & ResultadosolicitudRelations;
