import {Entity, model, property, hasMany} from '@loopback/repository';
import {Solicitud} from './solicitud.model';
import {Juradoxareainvestigacion} from './juradoxareainvestigacion.model';

@model()
export class Areainvestigacion extends Entity {
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

  @hasMany(() => Solicitud, {keyTo: 'id_areainvestigacion'})
  solicituds: Solicitud[];

  @hasMany(() => Juradoxareainvestigacion, {keyTo: 'id_areainvestigacion'})
  juradoxareainvestigacions: Juradoxareainvestigacion[];

  constructor(data?: Partial<Areainvestigacion>) {
    super(data);
  }
}

export interface AreainvestigacionRelations {
  // describe navigational properties here
}

export type AreainvestigacionWithRelations = Areainvestigacion & AreainvestigacionRelations;
