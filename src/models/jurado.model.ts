import {Entity, model, property, hasMany, hasOne} from '@loopback/repository';
import {Juradoxareainvestigacion} from './juradoxareainvestigacion.model';
import {Usuariojurado} from './usuariojurado.model';
import {Evaluasolicitud} from './evaluasolicitud.model';

@model()
export class Jurado extends Entity {
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
    type: 'string',
    required: true,
  })
  telefono: string;

  @property({
    type: 'string',
    required: true,
  })
  correo: string;

  @property({
    type: 'string',
    required: true,
  })
  entidad: string;

  @hasMany(() => Juradoxareainvestigacion, {keyTo: 'id_jurado'})
  juradoxareainvestigacions: Juradoxareainvestigacion[];

  @hasOne(() => Usuariojurado, {keyTo: 'id_jurado'})
  usuariojurado: Usuariojurado;

  @hasMany(() => Evaluasolicitud, {keyTo: 'id_jurado'})
  evaluasolicituds: Evaluasolicitud[];

  constructor(data?: Partial<Jurado>) {
    super(data);
  }
}

export interface JuradoRelations {
  // describe navigational properties here
}

export type JuradoWithRelations = Jurado & JuradoRelations;
