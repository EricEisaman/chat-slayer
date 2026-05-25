import {
  isMatrixEventContentDTO,
  MatrixEventContentDTO,
} from './MatrixEventContentDTO';
import {isString} from '../../../core/types/String';
import {isNumber} from '../../../core/types/Number';
import {isRegularObject, objectKey} from '../../../core/types/RegularObject';
import {hasNoOtherKeysInDevelopment} from '../../../core/types/OtherKeys';

export interface MatrixEventDTO {
  readonly content: MatrixEventContentDTO;
  readonly room_id: string;
  readonly event_id: string;
  readonly origin_server_ts: number;
  readonly sender: string;
  readonly type: string;
}

export function isMatrixEventDTO(value: unknown): value is MatrixEventDTO {
  return (
    isRegularObject(value) &&
    hasNoOtherKeysInDevelopment(value, [
      'content',
      'room_id',
      'event_id',
      'origin_server_ts',
      'sender',
      'type',
    ]) &&
    isMatrixEventContentDTO(objectKey(value, 'content')) &&
    isString(objectKey(value, 'room_id')) &&
    isString(objectKey(value, 'event_id')) &&
    isNumber(objectKey(value, 'origin_server_ts')) &&
    isString(objectKey(value, 'sender')) &&
    isString(objectKey(value, 'type'))
  );
}

export function stringifyMatrixEventDTO(value: MatrixEventDTO): string {
  return `MatrixEventDTO(${value})`;
}

export function parseMatrixEventDTO(
  value: unknown,
): MatrixEventDTO | undefined {
  if (isMatrixEventDTO(value)) return value;
  return undefined;
}
