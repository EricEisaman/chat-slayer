import {
  explainOpPaymentRequestDTO,
  isOpPaymentRequestDTO,
  OpPaymentRequestDTO,
} from './OpPaymentRequestDTO';
import {
  explainOpPaymentResponseDTOOrUndefined,
  isOpPaymentResponseDTOOrUndefined,
  OpPaymentResponseDTO,
} from './OpPaymentResponseDTO';
import {
  explainRegularObject,
  isRegularObject,
  objectKey,
} from '../../types/RegularObject';
import {
  explainNoOtherKeysInDevelopment,
  hasNoOtherKeysInDevelopment,
} from '../../types/OtherKeys';
import {
  explain,
  explainNot,
  explainOk,
  explainOr,
  explainProperty,
} from '../../types/explain';
import {isUndefined} from '../../types/undefined';

export interface OpPaymentDTO {
  readonly request: OpPaymentRequestDTO;
  readonly response?: OpPaymentResponseDTO;
}

export function createOpPaymentDTO(
  request: OpPaymentRequestDTO,
  response?: OpPaymentResponseDTO,
): OpPaymentDTO {
  return {
    request,
    response,
  };
}

export function isOpPaymentDTO(value: unknown): value is OpPaymentDTO {
  return (
    isRegularObject(value) &&
    hasNoOtherKeysInDevelopment(value, ['request', 'response']) &&
    isOpPaymentRequestDTO(objectKey(value, 'request')) &&
    isOpPaymentResponseDTOOrUndefined(objectKey(value, 'response'))
  );
}

export function explainOpPaymentDTO(value: unknown): string {
  return explain([
    explainRegularObject(value),
    explainNoOtherKeysInDevelopment(value, ['request', 'response']),
    explainProperty(
      'request',
      explainOpPaymentRequestDTO(objectKey(value, 'request')),
    ),
    explainProperty(
      'response',
      explainOpPaymentResponseDTOOrUndefined(objectKey(value, 'response')),
    ),
  ]);
}

export function parseOpPaymentDTO(value: unknown): OpPaymentDTO | undefined {
  if (isOpPaymentDTO(value)) return value;
  return undefined;
}

export function isOpPaymentDTOOrUndefined(
  value: unknown,
): value is OpPaymentDTO | undefined {
  return isUndefined(value) || isOpPaymentDTO(value);
}

export function explainOpPaymentDTOOrUndefined(value: unknown): string {
  return isOpPaymentDTOOrUndefined(value)
    ? explainOk()
    : explainNot(explainOr(['OpPaymentDTO', 'undefined']));
}
