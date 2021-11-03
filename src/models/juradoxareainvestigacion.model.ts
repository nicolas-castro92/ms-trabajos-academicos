import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Areainvestigacion} from './areainvestigacion.model';
import {Jurado} from './jurado.model';

@model({
  settings: {
    foreignKeys: {
      areainvestigacion_fk: {
        name: 'fk_areainvestigacion_',
        entity: 'Areainvestigacion',
        entityKey: 'id',
        foreignKey: 'id_areainvestigacion'
      },
      jurado_fk: {
        name: 'fk_jurado_',
        entity: 'Jurado',
        entityKey: 'id',
        foreignKey: 'id_jurado'
      }
    }

  }
})
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
