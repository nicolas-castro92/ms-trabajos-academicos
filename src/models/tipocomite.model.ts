import {Entity, model, property} from '@loopback/repository';

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


  constructor(data?: Partial<Tipocomite>) {
    super(data);
  }
}

export interface TipocomiteRelations {
  // describe navigational properties here
}

export type TipocomiteWithRelations = Tipocomite & TipocomiteRelations;
