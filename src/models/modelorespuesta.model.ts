import {Model, model, property} from '@loopback/repository';

@model()
export class Modelorespuesta extends Model {
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

  @property({
    type: 'number',
    required: true,
  })
  codigo_solicitud: number;

  @property({
    type: 'date',
  })
  fecha_respuesta?: string;


  constructor(data?: Partial<Modelorespuesta>) {
    super(data);
  }
}

export interface ModelorespuestaRelations {
  // describe navigational properties here
}

export type ModelorespuestaWithRelations = Modelorespuesta & ModelorespuestaRelations;
