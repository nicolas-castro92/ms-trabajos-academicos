import {belongsTo, Entity, hasOne, model, property} from '@loopback/repository';
import {Estado} from './estado.model';
import {Jurado} from './jurado.model';
import {Resultadosolicitud} from './resultadosolicitud.model';
import {Solicitud} from './solicitud.model';

@model({
  settings: {
    foreignKeys: {
      solicitud_fk: {
        name: 'fk_solicitudd_',
        entity: 'Solicitud',
        entityKey: 'id',
        foreignKey: 'id_solicitud'
      },
      jurado_fk: {
        name: 'fk_juradoo_',
        entity: 'Jurado',
        entityKey: 'id',
        foreignKey: 'id_jurado'
      },
      estado_fk: {
        name: 'fk_estado_',
        entity: 'Estado',
        entityKey: 'id',
        foreignKey: 'id_estado'
      }
    }

  }
})
export class Juradoxsolicitud extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
  })
  fecha_invitacion?: string;

  @property({
    type: 'string',
  })
  fecha_respuesta?: string;

  @property({
    type: 'string',
  })
  respuesta?: string;

  @property({
    type: 'string',
  })
  observaciones?: string;
  @hasOne(() => Resultadosolicitud, {keyTo: 'id_juradoxsolicitud'})
  resultadosolicitud: Resultadosolicitud;
  @belongsTo(() => Jurado, {name: 'idjurado'})
  id_jurado: number;

  @belongsTo(() => Solicitud, {name: 'idsolicitud'})
  id_solicitud: number;

  @belongsTo(() => Estado, {name: 'idestado'})
  id_estado: number;

  constructor(data?: Partial<Juradoxsolicitud>) {
    super(data);
  }
}

export interface JuradoxsolicitudRelations {
  // describe navigational properties here
}

export type JuradoxsolicitudWithRelations = Juradoxsolicitud & JuradoxsolicitudRelations;
