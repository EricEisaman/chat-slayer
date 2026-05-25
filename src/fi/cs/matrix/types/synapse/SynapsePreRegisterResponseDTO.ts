import {isString} from '../../../core/types/String';
import {isRegularObject, objectKey} from '../../../core/types/RegularObject';
import {hasNoOtherKeysInDevelopment} from '../../../core/types/OtherKeys';

/**
 */
export interface SynapsePreRegisterResponseDTO {
  readonly nonce: string;
}

export function createSynapsePreRegisterResponseDTO(
  nonce: string,
): SynapsePreRegisterResponseDTO {
  return {nonce};
}

export function isSynapsePreRegisterResponseDTO(
  value: unknown,
): value is SynapsePreRegisterResponseDTO {
  return (
    isRegularObject(value) &&
    hasNoOtherKeysInDevelopment(value, ['nonce']) &&
    isString(objectKey(value, 'nonce'))
  );
}

export function stringifySynapsePreRegisterResponseDTO(
  value: SynapsePreRegisterResponseDTO,
): string {
  return `SynapsePreRegisterResponseDTO(${value})`;
}

export function parseSynapsePreRegisterResponseDTO(
  value: unknown,
): SynapsePreRegisterResponseDTO | undefined {
  if (isSynapsePreRegisterResponseDTO(value)) return value;
  return undefined;
}
