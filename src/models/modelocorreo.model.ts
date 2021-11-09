import {Model, model, property} from '@loopback/repository';

@model()
export class Modelocorreo extends Model {
  @property({
    type: 'string',
    required: true,
  })
  destino: string;

  @property({
    type: 'string',
    required: true,
  })
  asunto: string;

  @property({
    type: 'string',
    required: true,
  })
  mensaje: string;


  constructor(data?: Partial<Modelocorreo>) {
    super(data);
  }
}

export interface ModelocorreoRelations {
  // describe navigational properties here
}

export type ModelocorreoWithRelations = Modelocorreo & ModelocorreoRelations;
