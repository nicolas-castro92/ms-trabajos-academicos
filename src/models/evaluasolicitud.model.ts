import {belongsTo, Entity, hasOne, model, property} from '@loopback/repository';
import {Jurado} from './jurado.model';
import {Resultadoevaluacion} from './resultadoevaluacion.model';

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
export class Evaluasolicitud extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'date',
    required: false,
  })
  fecha_invitacion: string;

  @property({
    type: 'date',
    required: false,
  })
  fecha_respuesta: string;

  @property({
    type: 'string',
    required: false,
  })
  respuesta: string;

  @property({
    type: 'string',
    required: false,
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
