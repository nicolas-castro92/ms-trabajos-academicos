import {Entity, model, property, belongsTo, hasOne} from '@loopback/repository';
import {Jurado} from './jurado.model';
import {Resultadoevaluacion} from './resultadoevaluacion.model';

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

  @belongsTo(() => Jurado, {name: 'idjurado'})
  id_jurado: number;

  @property({
    type: 'number',
  })
  id_solicitud?: number;

  @hasOne(() => Resultadoevaluacion, {keyTo: 'id_evaluasolicitud'})
  resultadoevaluacion: Resultadoevaluacion;

  @property({
    type: 'number',
  })
  id_estado?: number;

  constructor(data?: Partial<Evaluasolicitud>) {
    super(data);
  }
}

export interface EvaluasolicitudRelations {
  // describe navigational properties here
}

export type EvaluasolicitudWithRelations = Evaluasolicitud & EvaluasolicitudRelations;
