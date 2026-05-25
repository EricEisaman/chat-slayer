import {
  explainRegularObject,
  isRegularObject,
  objectKey,
} from '../../types/RegularObject';
import {
  explainNoOtherKeysInDevelopment,
  hasNoOtherKeysInDevelopment,
} from '../../types/OtherKeys';
import {explainNumber, isNumber} from '../../types/Number';
import {explainString, isString} from '../../types/String';
import {
  explain,
  explainNot,
  explainOk,
  explainProperty,
} from '../../types/explain';
import {isUndefined} from '../../types/undefined';

export interface ZendeskCustomField {
  readonly id: number;
  readonly value: string;
}

export function createZendeskCustomField(
  id: number,
  value: string,
): ZendeskCustomField {
  return {
    id,
    value,
  };
}

export function isZendeskCustomField(
  value: unknown,
): value is ZendeskCustomField {
  return (
    isRegularObject(value) &&
    hasNoOtherKeysInDevelopment(value, ['id', 'value']) &&
    isNumber(objectKey(value, 'id')) &&
    isString(objectKey(value, 'value'))
  );
}

export function explainZendeskCustomField(value: unknown): string {
  return explain([
    explainRegularObject(value),
    explainNoOtherKeysInDevelopment(value, ['id', 'value']),
    explainProperty('id', explainNumber(objectKey(value, 'id'))),
    explainProperty('value', explainString(objectKey(value, 'value'))),
  ]);
}

export function stringifyZendeskCustomField(value: ZendeskCustomField): string {
  return `ZendeskCustomField(${value})`;
}

export function parseZendeskCustomField(
  value: unknown,
): ZendeskCustomField | undefined {
  if (isZendeskCustomField(value)) return value;
  return undefined;
}

/**
 *
 * @param value
 * @__PURE__
 * @nosideeffects
 */
export function isZendeskCustomFieldOrUndefined(
  value: unknown,
): value is ZendeskCustomField | undefined {
  return isZendeskCustomField(value) || isUndefined(value);
}

/**
 *
 * @param value
 * @__PURE__
 * @nosideeffects
 */
export function explainZendeskCustomFieldOrUndefined(value: unknown): string {
  return isZendeskCustomFieldOrUndefined(value)
    ? explainOk()
    : explainNot('ZendeskCustomField or undefined');
}
