import {Model, model, property} from '@loopback/repository';

@model()
export class Secretaria extends Model {
  @property({
    type: 'number',
  })
  id?: number;

  @property({
    type: 'string',
  })
  nombre?: string;

  @property({
    type: 'string',
  })
  apellido?: string;

  @property({
    type: 'string',
  })
  correo?: string;

  @property({
    type: 'string',
  })
  celular?: string;

  @property({
    type: 'boolean',
  })
  estado?: boolean;


  constructor(data?: Partial<Secretaria>) {
    super(data);
  }
}

export interface SecretariaRelations {
  // describe navigational properties here
}

export type SecretariaWithRelations = Secretaria & SecretariaRelations;
