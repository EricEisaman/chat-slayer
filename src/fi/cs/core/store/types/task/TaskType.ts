import {explainNot, explainOk, explainOr} from '../../../types/explain';
import {
  explainEnum,
  isEnum,
  parseEnum,
  stringifyEnum,
} from '../../../types/Enum';
import {isUndefined} from '../../../types/undefined';

export enum TaskType {
  PING = 'fi.cs.ping',
  VPS_RESTART = 'fi.cs.vps.restart',
  VPS_START = 'fi.cs.vps.start',
  VPS_STOP = 'fi.cs.vps.stop',
  VPS_DELETE = 'fi.cs.vps.delete',
  VPS_CREATE = 'fi.cs.vps.create',
}

export function isTaskType(value: unknown): value is TaskType {
  return isEnum(TaskType, value);
}

export function explainTaskType(value: unknown): string {
  return explainEnum('TaskType', TaskType, isTaskType, value);
}

export function stringifyTaskType(value: TaskType): string {
  return stringifyEnum(TaskType, value);
}

export function parseTaskType(value: unknown): TaskType | undefined {
  return parseEnum(TaskType, value) as TaskType | undefined;
}

export function isTaskTypeOrUndefined(
  value: unknown,
): value is TaskType | undefined {
  return isUndefined(value) || isTaskType(value);
}

export function explainTaskTypeOrUndefined(value: unknown): string {
  return isTaskTypeOrUndefined(value)
    ? explainOk()
    : explainNot(explainOr(['TaskType', 'undefined']));
}
