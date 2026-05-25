import {map} from '../../../functions/map';
import {objectKey} from '../../../types/RegularObject';

import {TaskDTO, isTaskDTO} from './TaskDTO';
import {isArrayOf} from '../../../types/Array';

/**
 * The client object used in the REST API communication
 */
export interface TaskListDTO {
  readonly payload: readonly TaskDTO[];
}

export function createTaskListDTO(items: TaskDTO[]): TaskListDTO {
  return {
    payload: map(items, (item: TaskDTO): TaskDTO => item),
  };
}

export function isTaskListDTO(value: unknown): value is TaskListDTO {
  return !!value && isArrayOf<TaskDTO>(objectKey(value, 'payload'), isTaskDTO);
}

export function parseTaskListDTO(value: unknown): TaskListDTO | undefined {
  if (isTaskListDTO(value)) return value;
  return undefined;
}
