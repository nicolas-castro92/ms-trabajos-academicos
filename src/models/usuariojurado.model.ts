import {Entity, model, property} from '@loopback/repository';

@model()
export class Usuariojurado extends Entity {
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
  clave: string;


  constructor(data?: Partial<Usuariojurado>) {
    super(data);
  }
}

export interface UsuariojuradoRelations {
  // describe navigational properties here
}

export type UsuariojuradoWithRelations = Usuariojurado & UsuariojuradoRelations;
