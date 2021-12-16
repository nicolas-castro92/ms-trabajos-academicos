import {belongsTo, Entity, hasMany, hasOne, model, property} from '@loopback/repository';
import {Areainvestigacion} from './areainvestigacion.model';
import {Comitexsolicitud} from './comitexsolicitud.model';
import {Estado} from './estado.model';
import {Juradoxsolicitud} from './juradoxsolicitud.model';
import {Modalidad} from './modalidad.model';
import {Proponentexsolicitud} from './proponentexsolicitud.model';
import {Recordatorio} from './recordatorio.model';
import {Tiposolicitud} from './tiposolicitud.model';

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
    type: 'string',
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

  @property({
    type: 'string',
    required: true,
  })
  trabajo: string;

  @hasMany(() => Proponentexsolicitud, {keyTo: 'id_proponente'})
  proponentexsolicituds: Proponentexsolicitud[];
  @hasOne(() => Recordatorio, {keyTo: 'id_solicitud'})
  recordatorio: Recordatorio;

  @hasMany(() => Comitexsolicitud, {keyTo: 'id_solicitud'})
  comitexsolicituds: Comitexsolicitud[];
  @hasMany(() => Juradoxsolicitud, {keyTo: 'id_solicitud'})
  juradoxsolicituds: Juradoxsolicitud[];

  @belongsTo(() => Tiposolicitud, {name: 'idtiposolicitud'})
  id_tiposolicitud: number;

  @belongsTo(() => Modalidad, {name: 'idmodalidad'})
  id_modalidad: number;

  @belongsTo(() => Areainvestigacion, {name: 'idareainvestigacion'})
  id_areainvestigacion: number;

  @belongsTo(() => Estado, {name: 'idestado'})
  id_estado: number;

  constructor(data?: Partial<Solicitud>) {
    super(data);
  }
}

export interface SolicitudRelations {
  // describe navigational properties here
}

export type SolicitudWithRelations = Solicitud & SolicitudRelations;
