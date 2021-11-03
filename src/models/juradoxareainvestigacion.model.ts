import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Areainvestigacion} from './areainvestigacion.model';
import {Jurado} from './jurado.model';

@model()
export class Juradoxareainvestigacion extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;
  @belongsTo(() => Areainvestigacion, {name: 'idareainvestigacion'})
  id_areainvestigacion: number;

  @belongsTo(() => Jurado, {name: 'idjurado'})
  id_jurado: number;

  constructor(data?: Partial<Juradoxareainvestigacion>) {
    super(data);
  }
}

export interface JuradoxareainvestigacionRelations {
  // describe navigational properties here
}

export type JuradoxareainvestigacionWithRelations = Juradoxareainvestigacion & JuradoxareainvestigacionRelations;
