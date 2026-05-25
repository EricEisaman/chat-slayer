import {isBoolean} from '../../../core/types/Boolean';
import {isString} from '../../../core/types/String';
import {isRegularObject, objectKey} from '../../../core/types/RegularObject';
import {hasNoOtherKeysInDevelopment} from '../../../core/types/OtherKeys';

/**
 * @see https://matrix-org.github.io/synapse/latest/admin_api/register_api.html
 */
export interface SynapseRegisterRequestDTO {
  readonly nonce: string;
  readonly username: string;
  readonly displayname: string;
  readonly password: string;
  readonly admin: boolean;
  readonly mac: string;
}

export function isSynapseRegisterRequestDTO(
  value: unknown,
): value is SynapseRegisterRequestDTO {
  return (
    isRegularObject(value) &&
    hasNoOtherKeysInDevelopment(value, [
      'nonce',
      'username',
      'displayname',
      'password',
      'admin',
      'mac',
    ]) &&
    isString(objectKey(value, 'nonce')) &&
    isString(objectKey(value, 'username')) &&
    isString(objectKey(value, 'displayname')) &&
    isString(objectKey(value, 'password')) &&
    isBoolean(objectKey(value, 'admin')) &&
    isString(objectKey(value, 'mac'))
  );
}

export function stringifySynapseRegisterRequestDTO(
  value: SynapseRegisterRequestDTO,
): string {
  return `SynapseRegisterRequestDTO(${value})`;
}

export function parseSynapseRegisterRequestDTO(
  value: unknown,
): SynapseRegisterRequestDTO | undefined {
  if (isSynapseRegisterRequestDTO(value)) return value;
  return undefined;
}
