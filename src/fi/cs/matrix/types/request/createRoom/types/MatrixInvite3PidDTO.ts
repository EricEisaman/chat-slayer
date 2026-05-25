import {explain, explainProperty} from '../../../../../core/types/explain';
import {explainString, isString} from '../../../../../core/types/String';
import {
  explainRegularObject,
  isRegularObject,
  objectKey,
} from '../../../../../core/types/RegularObject';
import {
  explainNoOtherKeys,
  hasNoOtherKeysInDevelopment,
} from '../../../../../core/types/OtherKeys';

export interface MatrixInvite3PidDTO {
  readonly id_server: string;
  readonly id_access_token: string;
  readonly medium: string;
  readonly address: string;
}

export function isMatrixInvite3PidDTO(
  value: unknown,
): value is MatrixInvite3PidDTO {
  return (
    isRegularObject(value) &&
    hasNoOtherKeysInDevelopment(value, [
      'id_server',
      'id_access_token',
      'medium',
      'address',
    ]) &&
    isString(objectKey(value, 'id_server')) &&
    isString(objectKey(value, 'id_access_token')) &&
    isString(objectKey(value, 'medium')) &&
    isString(objectKey(value, 'address'))
  );
}

export function explainMatrixInvite3PidDTO(value: unknown): string {
  return explain([
    explainRegularObject(value),
    explainNoOtherKeys(value, [
      'id_server',
      'id_access_token',
      'medium',
      'address',
    ]),
    explainProperty('id_server', explainString(objectKey(value, 'id_server'))),
    explainProperty(
      'id_access_token',
      explainString(objectKey(value, 'id_access_token')),
    ),
    explainProperty('medium', explainString(objectKey(value, 'medium'))),
    explainProperty('address', explainString(objectKey(value, 'address'))),
  ]);
}

export function stringifyMatrixInvite3PidDTO(
  value: MatrixInvite3PidDTO,
): string {
  return `MatrixInvite3PidDTO(${value})`;
}

export function parseMatrixInvite3PidDTO(
  value: unknown,
): MatrixInvite3PidDTO | undefined {
  if (isMatrixInvite3PidDTO(value)) return value;
  return undefined;
}
