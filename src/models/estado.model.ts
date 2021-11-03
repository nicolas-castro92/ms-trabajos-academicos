import {Entity, model, property, hasOne} from '@loopback/repository';
import {Solicitud} from './solicitud.model';
import {Evaluasolicitud} from './evaluasolicitud.model';
import {Resultadoevaluacion} from './resultadoevaluacion.model';

@model()
export class Estado extends Entity {
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
  nombre: string;

  @hasOne(() => Solicitud, {keyTo: 'id_estado'})
  solicitud: Solicitud;

  @hasOne(() => Evaluasolicitud, {keyTo: 'id_estado'})
  evaluasolicitud: Evaluasolicitud;

  @hasOne(() => Resultadoevaluacion, {keyTo: 'id_estado'})
  resultadoevaluacion: Resultadoevaluacion;

  constructor(data?: Partial<Estado>) {
    super(data);
  }
}

export interface EstadoRelations {
  // describe navigational properties here
}

export type EstadoWithRelations = Estado & EstadoRelations;
