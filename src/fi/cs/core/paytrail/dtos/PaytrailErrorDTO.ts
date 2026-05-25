import {
  explain,
  explainNot,
  explainOk,
  explainOr,
  explainProperty,
} from '../../types/explain';
import {isUndefined} from '../../types/undefined';
import {explainString, isString} from '../../types/String';
import {
  explainRegularObject,
  isRegularObject,
  objectKey,
} from '../../types/RegularObject';
import {
  explainNoOtherKeysInDevelopment,
  hasNoOtherKeysInDevelopment,
} from '../../types/OtherKeys';

/**
 * @see https://docs.paytrail.com/#/?id=response-6
 * @see https://docs.paytrail.com/#/?id=response-10
 */
export interface PaytrailErrorDTO {
  /**
   * Always "error"
   */
  readonly status: 'error';

  /**
   * The error message
   */
  readonly message: string;
}

export function createPaytrailErrorDTO(message: string): PaytrailErrorDTO {
  return {
    status: 'error',
    message,
  };
}

export function isPaytrailErrorDTO(value: unknown): value is PaytrailErrorDTO {
  return (
    isRegularObject(value) &&
    hasNoOtherKeysInDevelopment(value, ['status', 'message']) &&
    objectKey(value, 'status') === 'error' &&
    isString(objectKey(value, 'message'))
  );
}

export function explainPaytrailErrorDTO(value: unknown): string {
  return explain([
    explainRegularObject(value),
    explainNoOtherKeysInDevelopment(value, ['status', 'message']),
    explainProperty(
      'status',
      objectKey(value, 'status') === 'error'
        ? explainOk()
        : 'Property "status" is not \'error\'',
    ),
    explainProperty('message', explainString(objectKey(value, 'message'))),
  ]);
}

export function parsePaytrailErrorDTO(
  value: unknown,
): PaytrailErrorDTO | undefined {
  if (isPaytrailErrorDTO(value)) return value;
  return undefined;
}

export function isPaytrailErrorDTOOrUndefined(
  value: unknown,
): value is PaytrailErrorDTO | undefined {
  return isUndefined(value) || isPaytrailErrorDTO(value);
}

export function explainPaytrailErrorDTOOrUndefined(value: unknown): string {
  return isPaytrailErrorDTOOrUndefined(value)
    ? explainOk()
    : explainNot(explainOr(['PaytrailErrorDTO', 'undefined']));
}
