import {Entity, model, property, hasMany, hasOne} from '@loopback/repository';
import {Proponentexsolicitud} from './proponentexsolicitud.model';
import {Recordatorio} from './recordatorio.model';
import {Comitexsolicitud} from './comitexsolicitud.model';
import {Juradoxsolicitud} from './juradoxsolicitud.model';

@model()
export class Solicitud extends Entity {
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
  fecha_radicado: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre_trabajo: string;

  @property({
    type: 'string',
    required: true,
  })
  descripcion: string;

  @hasMany(() => Proponentexsolicitud, {keyTo: 'id_proponente'})
  proponentexsolicituds: Proponentexsolicitud[];

  @property({
    type: 'number',
  })
  id_tiposolicitud?: number;

  @property({
    type: 'number',
  })
  id_modalidad?: number;

  @property({
    type: 'number',
  })
  id_estado?: number;

  @hasOne(() => Recordatorio, {keyTo: 'id_solicitud'})
  recordatorio: Recordatorio;

  @hasMany(() => Comitexsolicitud, {keyTo: 'id_solicitud'})
  comitexsolicituds: Comitexsolicitud[];

  @property({
    type: 'number',
  })
  id_areainvestigacion?: number;

  @hasMany(() => Juradoxsolicitud, {keyTo: 'id_solicitud'})
  juradoxsolicituds: Juradoxsolicitud[];

  constructor(data?: Partial<Solicitud>) {
    super(data);
  }
}

export interface SolicitudRelations {
  // describe navigational properties here
}

export type SolicitudWithRelations = Solicitud & SolicitudRelations;
