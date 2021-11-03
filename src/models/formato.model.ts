import {Entity, model, property, hasMany} from '@loopback/repository';
import {Tiposolicitud} from './tiposolicitud.model';

@model()
export class Formato extends Entity {
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

  @hasMany(() => Tiposolicitud, {keyTo: 'id_formato'})
  tiposolicituds: Tiposolicitud[];

  constructor(data?: Partial<Formato>) {
    super(data);
  }
}

export interface FormatoRelations {
  // describe navigational properties here
}

export type FormatoWithRelations = Formato & FormatoRelations;
