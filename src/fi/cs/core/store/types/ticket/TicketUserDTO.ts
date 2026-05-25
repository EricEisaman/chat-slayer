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
import {explainString, isString} from '../../../types/String';
import {explainBoolean, isBoolean} from '../../../types/Boolean';

export interface TicketUserDTO {
  readonly ticketUserId: string;
  readonly updated: string;
  readonly created: string;
  readonly name: string;
  readonly email: string;
  readonly tel: string;
  readonly onHold: boolean;
  readonly dataJson: string;
  readonly isTerminated: boolean;
}

export function createTicketUserDTO(
  ticketUserId: string,
  updated: string,
  created: string,
  name: string,
  email: string,
  tel: string,
  onHold: boolean,
  dataJson: string,
  isTerminated: boolean,
): TicketUserDTO {
  return {
    ticketUserId,
    updated,
    created,
    name,
    email,
    tel,
    onHold,
    dataJson,
    isTerminated,
  };
}

export function isTicketUserDTO(value: unknown): value is TicketUserDTO {
  return (
    isRegularObject(value) &&
    hasNoOtherKeysInDevelopment(value, [
      'ticketUserId',
      'updated',
      'created',
      'name',
      'email',
      'tel',
      'onHold',
      'dataJson',
      'isTerminated',
    ]) &&
    isString(objectKey(value, 'ticketUserId')) &&
    isString(objectKey(value, 'updated')) &&
    isString(objectKey(value, 'created')) &&
    isString(objectKey(value, 'name')) &&
    isString(objectKey(value, 'email')) &&
    isString(objectKey(value, 'tel')) &&
    isBoolean(objectKey(value, 'onHold')) &&
    isString(objectKey(value, 'dataJson')) &&
    isBoolean(objectKey(value, 'isTerminated'))
  );
}

export function explainTicketUserDTO(value: unknown): string {
  return explain([
    explainRegularObject(value),
    explainNoOtherKeysInDevelopment(value, [
      'ticketUserId',
      'updated',
      'created',
      'name',
      'email',
      'tel',
      'onHold',
      'dataJson',
      'isTerminated',
    ]),
    explainProperty(
      'ticketUserId',
      explainString(objectKey(value, 'ticketUserId')),
    ),
    explainProperty('updated', explainString(objectKey(value, 'updated'))),
    explainProperty('created', explainString(objectKey(value, 'created'))),
    explainProperty('name', explainString(objectKey(value, 'name'))),
    explainProperty('email', explainString(objectKey(value, 'email'))),
    explainProperty('tel', explainString(objectKey(value, 'tel'))),
    explainProperty('onHold', explainBoolean(objectKey(value, 'onHold'))),
    explainProperty('dataJson', explainString(objectKey(value, 'dataJson'))),
    explainProperty(
      'isTerminated',
      explainBoolean(objectKey(value, 'isTerminated')),
    ),
  ]);
}

export function stringifyTicketUserDTO(value: TicketUserDTO): string {
  return `TicketUserDTO(${value})`;
}

export function parseTicketUserDTO(value: unknown): TicketUserDTO | undefined {
  if (isTicketUserDTO(value)) return value;
  return undefined;
}
