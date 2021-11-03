import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Solicitud} from './solicitud.model';
import {Tipocomite} from './tipocomite.model';

@model()
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
