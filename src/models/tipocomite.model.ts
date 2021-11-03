import {Entity, model, property, hasMany} from '@loopback/repository';
import {Comitexsolicitud} from './comitexsolicitud.model';

@model()
export class Tipocomite extends Entity {
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

  @hasMany(() => Comitexsolicitud, {keyTo: 'id_comite'})
  comitexsolicituds: Comitexsolicitud[];

  constructor(data?: Partial<Tipocomite>) {
    super(data);
  }
}

export interface TipocomiteRelations {
  // describe navigational properties here
}

export type TipocomiteWithRelations = Tipocomite & TipocomiteRelations;
