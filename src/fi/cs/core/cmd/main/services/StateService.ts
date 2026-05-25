import {ObserverCallback, ObserverDestructor} from '../../../Observer';
import {ReadonlyJsonObject} from '../../../Json';
import {Disposable} from '../../../types/Disposable';

export enum StateServiceEvent {
  CHANGED = 'changed',
}

export type StateServiceDestructor = ObserverDestructor;

export interface StateService<DTO = ReadonlyJsonObject> extends Disposable {
  destroy(): void;
  on(
    name: StateServiceEvent,
    callback: ObserverCallback<StateServiceEvent>,
  ): StateServiceDestructor;

  setDTO(dto: DTO): void;
  getDTO(): DTO;

  setStateFileName(value: string | undefined): void;
  getStateFileName(): string | undefined;
}
