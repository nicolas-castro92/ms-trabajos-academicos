import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    foreignKeys: {
      jurado_fk: {
        name: 'fk_jurado',
        entity: 'Jurado',
        entityKey: 'id',
        foreignKey: 'id_jurado'
      }
    }
  }
})
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
  usuario: string;

  @property({
    type: 'string',
  })
  clave?: string;

  @property({
    type: 'number',
  })
  id_jurado?: number;

  constructor(data?: Partial<Usuariojurado>) {
    super(data);
  }
}

export interface UsuariojuradoRelations {
  // describe navigational properties here
}

export type UsuariojuradoWithRelations = Usuariojurado & UsuariojuradoRelations;
