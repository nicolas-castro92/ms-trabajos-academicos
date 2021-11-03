import {Entity, model, property} from '@loopback/repository';

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


  constructor(data?: Partial<Formato>) {
    super(data);
  }
}

export interface FormatoRelations {
  // describe navigational properties here
}

export type FormatoWithRelations = Formato & FormatoRelations;
