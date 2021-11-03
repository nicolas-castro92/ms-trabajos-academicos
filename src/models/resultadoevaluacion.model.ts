import {Entity, model, property} from '@loopback/repository';

@model()
export class Resultadoevaluacion extends Entity {
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
    type: 'string',
    required: true,
  })
  formato_diligenciado: string;

  @property({
    type: 'number',
  })
  id_evaluasolicitud?: number;

  @property({
    type: 'number',
  })
  id_estado?: number;

  constructor(data?: Partial<Resultadoevaluacion>) {
    super(data);
  }
}

export interface ResultadoevaluacionRelations {
  // describe navigational properties here
}

export type ResultadoevaluacionWithRelations = Resultadoevaluacion & ResultadoevaluacionRelations;
