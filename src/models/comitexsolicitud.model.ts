import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Solicitud} from './solicitud.model';
import {Tipocomite} from './tipocomite.model';

@model({
  settings: {
    foreignKeys: {
      solicitud_fk: {
        name: 'fk_solicitud__',
        entity: 'Solicitud',
        entityKey: 'id',
        foreignKey: 'id_solicitud'
      },
      tipocomite_fk: {
        name: 'fk_comite',
        entity: 'Tipocomite',
        entityKey: 'id',
        foreignKey: 'id_comite'
      }
    }

  }
})
export class Comitexsolicitud extends Entity {
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
  respuesta: string;

  @belongsTo(() => Solicitud, {name: 'idsolicitud'})
  id_solicitud: number;

  @belongsTo(() => Tipocomite, {name: 'idcomite'})
  id_comite: number;

  constructor(data?: Partial<Comitexsolicitud>) {
    super(data);
  }
}

export interface ComitexsolicitudRelations {
  // describe navigational properties here
}

export type ComitexsolicitudWithRelations = Comitexsolicitud & ComitexsolicitudRelations;
