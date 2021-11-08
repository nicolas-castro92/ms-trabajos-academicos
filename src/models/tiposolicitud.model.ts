import {Entity, model, property, hasMany} from '@loopback/repository';
import {Solicitud} from './solicitud.model';

@model()
export class Tiposolicitud extends Entity {
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

  @property({
    type: 'number',
  })
  id_formato?: number;

  @hasMany(() => Solicitud, {keyTo: 'id_tiposolicitud'})
  solicituds: Solicitud[];

  constructor(data?: Partial<Tiposolicitud>) {
    super(data);
  }
}

export interface TiposolicitudRelations {
  // describe navigational properties here
}

export type TiposolicitudWithRelations = Tiposolicitud & TiposolicitudRelations;
