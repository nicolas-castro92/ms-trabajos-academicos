import {Entity, hasMany, hasOne, model, property} from '@loopback/repository';
import {Comitexsolicitud} from './comitexsolicitud.model';
import {Juradoxsolicitud} from './juradoxsolicitud.model';
import {Proponentexsolicitud} from './proponentexsolicitud.model';
import {Recordatorio} from './recordatorio.model';

@model({
  settings: {
    foreignKeys: {
      tiposolicitud_fk: {
        name: 'fk_tiposolicitud',
        entity: 'Tiposolicitud',
        entityKey: 'id',
        foreignKey: 'id_tiposolicitud'
      },
      modalidad_fk: {
        name: 'fk_modalidad',
        entity: 'Modalidad',
        entityKey: 'id',
        foreignKey: 'id_modalidad'
      },
      estado_fk: {
        name: 'fk_estado',
        entity: 'Estado',
        entityKey: 'id',
        foreignKey: 'id_estado'
      },
      areainvestigacion_fk: {
        name: 'fk_areainvestigacion',
        entity: 'Areainvestigacion',
        entityKey: 'id',
        foreignKey: 'id_areainvestigacion'
      },
    }
  }
})
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
