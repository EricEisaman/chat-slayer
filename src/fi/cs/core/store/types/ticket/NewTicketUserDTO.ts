import {
  explainNoOtherKeysInDevelopment,
  hasNoOtherKeysInDevelopment,
} from '../../../types/OtherKeys';
import {
  explainRegularObject,
  isRegularObject,
  objectKey,
} from '../../../types/RegularObject';
import {explain, explainProperty} from '../../../types/explain';
import {
  explainStringOrUndefined,
  isStringOrUndefined,
} from '../../../types/String';
import {
  explainBooleanOrUndefined,
  isBooleanOrUndefined,
} from '../../../types/Boolean';

export interface NewTicketUserDTO {
  readonly name?: string;
  readonly email?: string;
  readonly tel?: string;
  readonly onHold?: boolean;
  readonly dataJson?: string;
  readonly isTerminated?: boolean;
}

export function createNewTicketUserDTO(
  name?: string | undefined,
  email?: string | undefined,
  tel?: string | undefined,
  onHold?: boolean | undefined,
  dataJson?: string | undefined,
  isTerminated?: boolean | undefined,
): NewTicketUserDTO {
  return {
    name,
    email,
    tel,
    onHold,
    dataJson,
    isTerminated,
  };
}

export function isNewTicketUserDTO(value: unknown): value is NewTicketUserDTO {
  return (
    isRegularObject(value) &&
    hasNoOtherKeysInDevelopment(value, [
      'name',
      'email',
      'tel',
      'onHold',
      'dataJson',
      'isTerminated',
    ]) &&
    isStringOrUndefined(objectKey(value, 'name')) &&
    isStringOrUndefined(objectKey(value, 'email')) &&
    isStringOrUndefined(objectKey(value, 'tel')) &&
    isBooleanOrUndefined(objectKey(value, 'onHold')) &&
    isStringOrUndefined(objectKey(value, 'dataJson')) &&
    isBooleanOrUndefined(objectKey(value, 'isTerminated'))
  );
}

export function explainNewTicketUserDTO(value: unknown): string {
  return explain([
    explainRegularObject(value),
    explainNoOtherKeysInDevelopment(value, [
      'name',
      'email',
      'tel',
      'onHold',
      'dataJson',
      'isTerminated',
    ]),
    explainProperty('name', explainStringOrUndefined(objectKey(value, 'name'))),
    explainProperty(
      'email',
      explainStringOrUndefined(objectKey(value, 'email')),
    ),
    explainProperty('tel', explainStringOrUndefined(objectKey(value, 'tel'))),
    explainProperty(
      'onHold',
      explainBooleanOrUndefined(objectKey(value, 'onHold')),
    ),
    explainProperty(
      'dataJson',
      explainStringOrUndefined(objectKey(value, 'dataJson')),
    ),
    explainProperty(
      'isTerminated',
      explainBooleanOrUndefined(objectKey(value, 'isTerminated')),
    ),
  ]);
}

export function stringifyNewTicketUserDTO(value: NewTicketUserDTO): string {
  return `NewTicketUserDTO(${value})`;
}

export function parseNewTicketUserDTO(
  value: unknown,
): NewTicketUserDTO | undefined {
  if (isNewTicketUserDTO(value)) return value;
  return undefined;
}
