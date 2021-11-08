import {Entity, hasOne, model, property} from '@loopback/repository';
import {Resultadosolicitud} from './resultadosolicitud.model';

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
    type: 'date',
  })
  fecha_invitacion?: string;

  @property({
    type: 'date',
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

  @property({
    type: 'number',
    required: true,
  })
  id_jurado: number;

  @property({
    type: 'number',
    required: true,
  })
  id_solicitud: number;

  @hasOne(() => Resultadosolicitud, {keyTo: 'id_juradoxsolicitud'})
  resultadosolicitud: Resultadosolicitud;

  @property({
    type: 'number',
  })
  id_estado?: number;

  constructor(data?: Partial<Juradoxsolicitud>) {
    super(data);
  }
}

export interface JuradoxsolicitudRelations {
  // describe navigational properties here
}

export type JuradoxsolicitudWithRelations = Juradoxsolicitud & JuradoxsolicitudRelations;
