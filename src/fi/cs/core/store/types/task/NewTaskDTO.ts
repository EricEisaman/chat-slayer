import {explainString, isString} from '../../../types/String';
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

export interface NewTaskDTO {
  readonly parentId: string;
  readonly clientId: string;
  readonly invoiceId: string;
  readonly startDate: string;
  readonly finishedDate: string;
  readonly deadline: string;
  readonly assignee: string;
  readonly type: TaskType;
  readonly state: TaskState;
  readonly options: ReadonlyJsonObject;
  readonly onHold: boolean;
}

export function createNewTaskDTO(
  parentId: string,
  clientId: string,
  invoiceId: string,
  startDate: string,
  finishedDate: string,
  deadline: string,
  assignee: string,
  type: TaskType,
  state: TaskState,
  options: ReadonlyJsonObject,
  onHold: boolean,
): NewTaskDTO {
  return {
    parentId,
    clientId,
    invoiceId,
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

export function isNewTaskDTO(value: unknown): value is NewTaskDTO {
  return (
    isRegularObject(value) &&
    hasNoOtherKeysInDevelopment(value, [
      'parentId',
      'clientId',
      'invoiceId',
      'startDate',
      'finishedDate',
      'deadline',
      'assignee',
      'type',
      'state',
      'options',
      'onHold',
    ]) &&
    isString(objectKey(value, 'parentId')) &&
    isString(objectKey(value, 'clientId')) &&
    isString(objectKey(value, 'invoiceId')) &&
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

export function explainNewTaskDTO(value: unknown): string {
  return explain([
    explainRegularObject(value),
    explainNoOtherKeysInDevelopment(value, [
      'parentId',
      'clientId',
      'invoiceId',
      'startDate',
      'finishedDate',
      'deadline',
      'assignee',
      'type',
      'state',
      'options',
      'onHold',
    ]),
    explainProperty('parentId', explainString(objectKey(value, 'parentId'))),
    explainProperty('clientId', explainString(objectKey(value, 'clientId'))),
    explainProperty('invoiceId', explainString(objectKey(value, 'invoiceId'))),
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

export function parseNewTaskDTO(value: unknown): NewTaskDTO | undefined {
  if (isNewTaskDTO(value)) return value;
  return undefined;
}
