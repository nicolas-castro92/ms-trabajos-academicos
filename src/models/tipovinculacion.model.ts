import {Entity, model, property, hasMany} from '@loopback/repository';
import {Proponente} from './proponente.model';

@model()
export class Tipovinculacion extends Entity {
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

  @hasMany(() => Proponente, {keyTo: 'id_vinculacion'})
  proponentes: Proponente[];

  constructor(data?: Partial<Tipovinculacion>) {
    super(data);
  }
}

export interface TipovinculacionRelations {
  // describe navigational properties here
}

export type TipovinculacionWithRelations = Tipovinculacion & TipovinculacionRelations;
