import {Model, model, property} from '@loopback/repository';

@model()
export class ModeloRespuestaCorreos extends Model {

  constructor(data?: Partial<ModeloRespuestaCorreos>) {
    super(data);
  }
}

export interface ModeloRespuestaCorreosRelations {
  // describe navigational properties here
}

export type ModeloRespuestaCorreosWithRelations = ModeloRespuestaCorreos & ModeloRespuestaCorreosRelations;
