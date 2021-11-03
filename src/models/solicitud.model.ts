import {Entity, model, property, hasMany, belongsTo, hasOne} from '@loopback/repository';
import {Proponentexsolicitud} from './proponentexsolicitud.model';
import {Tiposolicitud} from './tiposolicitud.model';
import {Modalidad} from './modalidad.model';
import {Recordatorio} from './recordatorio.model';
import {Comitexsolicitud} from './comitexsolicitud.model';
import {Areainvestigacion} from './areainvestigacion.model';
import {Evaluasolicitud} from './evaluasolicitud.model';

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
  archivo_trabajo: string;

  @property({
    type: 'string',
    required: true,
  })
  descripcion: string;

  @hasMany(() => Proponentexsolicitud, {keyTo: 'id_solicitud'})
  proponentexsolicituds: Proponentexsolicitud[];

  @belongsTo(() => Tiposolicitud, {name: 'idtiposolicitud'})
  id_tiposolicitud: number;

  @belongsTo(() => Modalidad, {name: 'idmodalidad'})
  id_modalidad: number;

  @property({
    type: 'number',
  })
  id_estado?: number;

  @hasOne(() => Recordatorio, {keyTo: 'id_solicitud'})
  recordatorio: Recordatorio;

  @hasMany(() => Comitexsolicitud, {keyTo: 'id_solicitud'})
  comitexsolicituds: Comitexsolicitud[];

  @belongsTo(() => Areainvestigacion, {name: 'idareainvestigacion'})
  id_areainvestigacion: number;

  @hasOne(() => Evaluasolicitud, {keyTo: 'id_solicitud'})
  evaluasolicitud: Evaluasolicitud;

  constructor(data?: Partial<Solicitud>) {
    super(data);
  }
}

export interface SolicitudRelations {
  // describe navigational properties here
}

export type SolicitudWithRelations = Solicitud & SolicitudRelations;
