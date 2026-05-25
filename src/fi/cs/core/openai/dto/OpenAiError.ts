import {
  explainNoOtherKeysInDevelopment,
  hasNoOtherKeysInDevelopment,
} from '../../types/OtherKeys';
import {
  explainRegularObject,
  isRegularObject,
  objectKey,
} from '../../types/RegularObject';
import {explain, explainOk, explainProperty} from '../../types/explain';
import {explainString, isString} from '../../types/String';
import {startsWith} from '../../functions/startsWith';
import {parseJson} from '../../Json';
import {isUndefined} from '../../types/undefined';

export interface OpenAiError {
  readonly message: string;
  readonly type: string;
}

export function createOpenAiError(message: string, type: string): OpenAiError {
  return {
    message,
    type,
  };
}

export function isOpenAiError(value: unknown): value is OpenAiError {
  return (
    isRegularObject(value) &&
    hasNoOtherKeysInDevelopment(value, ['message', 'type']) &&
    isString(objectKey(value, 'message')) &&
    isString(objectKey(value, 'type'))
  );
}

export function explainOpenAiError(value: unknown): string {
  return explain([
    explainRegularObject(value),
    explainNoOtherKeysInDevelopment(value, ['message', 'type']),
    explainProperty('message', explainString(objectKey(value, 'message'))),
    explainProperty('type', explainString(objectKey(value, 'type'))),
  ]);
}

export function isOpenAiErrorOrUndefined(
  value: unknown,
): value is undefined | OpenAiError {
  return isUndefined(value) || isOpenAiError(value);
}

export function explainOpenAiErrorOrUndefined(value: unknown): string {
  return isOpenAiErrorOrUndefined(value)
    ? explainOk()
    : 'not OpenAiError or undefined';
}

export function stringifyOpenAiError(value: OpenAiError): string {
  return `OpenAiError(${JSON.stringify(value)})`;
}

export function parseOpenAiError(value: unknown): OpenAiError | undefined {
  if (isString(value)) {
    if (startsWith(value, 'OpenAiError(')) {
      value = value.substring('OpenAiError('.length, value.length - 1);
    }
    value = parseJson(value);
  }
  if (isOpenAiError(value)) return value;
  return undefined;
}
