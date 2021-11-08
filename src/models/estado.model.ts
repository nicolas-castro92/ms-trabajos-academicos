import {Entity, model, property, hasOne} from '@loopback/repository';
import {Solicitud} from './solicitud.model';
import {Juradoxsolicitud} from './juradoxsolicitud.model';
import {Resultadosolicitud} from './resultadosolicitud.model';

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

  @hasOne(() => Juradoxsolicitud, {keyTo: 'id_estado'})
  juradoxsolicitud: Juradoxsolicitud;

  @hasOne(() => Resultadosolicitud, {keyTo: 'id_estado'})
  resultadosolicitud: Resultadosolicitud;

  constructor(data?: Partial<Estado>) {
    super(data);
  }
}

export interface EstadoRelations {
  // describe navigational properties here
}

export type EstadoWithRelations = Estado & EstadoRelations;
