import {
  explainString,
  explainStringOrUndefined,
  isString,
  isStringOrUndefined,
} from '../../../types/String';
import {
  explainRegularObject,
  isRegularObject,
  objectKey,
} from '../../../types/RegularObject';
import {
  explainNoOtherKeysInDevelopment,
  hasNoOtherKeysInDevelopment,
} from '../../../types/OtherKeys';
import {explain, explainProperty} from '../../../types/explain';
import {explainTaskType, isTaskType, TaskType} from './TaskType';
import {explainTaskState, isTaskState, TaskState} from './TaskState';
import {
  explainReadonlyJsonObject,
  isReadonlyJsonObject,
  ReadonlyJsonObject,
} from '../../../Json';
import {explainBoolean, isBoolean} from '../../../types/Boolean';

export interface TaskDTO {
  readonly taskId: string;
  readonly parentId?: string | undefined;
  readonly clientId?: string | undefined;
  readonly invoiceId?: string | undefined;
  readonly created: string;
  readonly updated: string;
  readonly startDate: string;
  readonly finishedDate: string;
  readonly deadline: string;
  readonly assignee: string;
  readonly type: TaskType;
  readonly state: TaskState;
  readonly options: ReadonlyJsonObject;
  readonly onHold: boolean;
}

export function createTaskDTO(
  taskId: string,
  parentId: string | undefined,
  clientId: string | undefined,
  invoiceId: string | undefined,
  created: string,
  updated: string,
  startDate: string,
  finishedDate: string,
  deadline: string,
  assignee: string,
  type: TaskType,
  state: TaskState,
  options: ReadonlyJsonObject,
  onHold: boolean,
): TaskDTO {
  return {
    taskId,
    parentId,
    clientId,
    invoiceId,
    created,
    updated,
    startDate,
    finishedDate,
    deadline,
    assignee,
    type,
    state,
    options,
    onHold,
  };
}

export function isTaskDTO(value: unknown): value is TaskDTO {
  return (
    isRegularObject(value) &&
    hasNoOtherKeysInDevelopment(value, [
      'taskId',
      'parentId',
      'clientId',
      'invoiceId',
      'created',
      'updated',
      'startDate',
      'finishedDate',
      'deadline',
      'assignee',
      'type',
      'state',
      'options',
      'onHold',
    ]) &&
    isString(objectKey(value, 'taskId')) &&
    isStringOrUndefined(objectKey(value, 'parentId')) &&
    isStringOrUndefined(objectKey(value, 'clientId')) &&
    isStringOrUndefined(objectKey(value, 'invoiceId')) &&
    isString(objectKey(value, 'created')) &&
    isString(objectKey(value, 'updated')) &&
    isString(objectKey(value, 'startDate')) &&
    isString(objectKey(value, 'finishedDate')) &&
    isString(objectKey(value, 'deadline')) &&
    isString(objectKey(value, 'assignee')) &&
    isTaskType(objectKey(value, 'type')) &&
    isTaskState(objectKey(value, 'state')) &&
    isReadonlyJsonObject(objectKey(value, 'options')) &&
    isBoolean(objectKey(value, 'onHold'))
  );
}

export function explainTaskDTO(value: unknown): string {
  return explain([
    explainRegularObject(value),
    explainNoOtherKeysInDevelopment(value, [
      'taskId',
      'parentId',
      'clientId',
      'invoiceId',
      'created',
      'updated',
      'startDate',
      'finishedDate',
      'deadline',
      'assignee',
      'type',
      'state',
      'options',
      'onHold',
    ]),
    explainProperty('taskId', explainString(objectKey(value, 'taskId'))),
    explainProperty(
      'parentId',
      explainStringOrUndefined(objectKey(value, 'parentId')),
    ),
    explainProperty(
      'clientId',
      explainStringOrUndefined(objectKey(value, 'clientId')),
    ),
    explainProperty(
      'invoiceId',
      explainStringOrUndefined(objectKey(value, 'invoiceId')),
    ),
    explainProperty('created', explainString(objectKey(value, 'created'))),
    explainProperty('updated', explainString(objectKey(value, 'updated'))),
    explainProperty('startDate', explainString(objectKey(value, 'startDate'))),
    explainProperty(
      'finishedDate',
      explainString(objectKey(value, 'finishedDate')),
    ),
    explainProperty('deadline', explainString(objectKey(value, 'deadline'))),
    explainProperty('assignee', explainString(objectKey(value, 'assignee'))),
    explainProperty('type', explainTaskType(objectKey(value, 'type'))),
    explainProperty('state', explainTaskState(objectKey(value, 'state'))),
    explainProperty(
      'options',
      explainReadonlyJsonObject(objectKey(value, 'options')),
    ),
    explainProperty('onHold', explainBoolean(objectKey(value, 'onHold'))),
  ]);
}

export function parseTaskDTO(value: unknown): TaskDTO | undefined {
  if (isTaskDTO(value)) return value;
  return undefined;
}
