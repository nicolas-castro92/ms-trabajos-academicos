import {Entity, model, property} from '@loopback/repository';

@model()
export class Juradoxareainvestigacion extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'number',
    required: true,
  })
  id_areainvestigacion: number;

  @property({
    type: 'number',
    required: true,
  })
  id_jurado: number;


  constructor(data?: Partial<Juradoxareainvestigacion>) {
    super(data);
  }
}

export interface JuradoxareainvestigacionRelations {
  // describe navigational properties here
}

export type JuradoxareainvestigacionWithRelations = Juradoxareainvestigacion & JuradoxareainvestigacionRelations;
