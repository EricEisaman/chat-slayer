import {
  explain,
  explainNot,
  explainOk,
  explainOr,
  explainProperty,
} from '../../../types/explain';
import {
  explainRegularObject,
  isRegularObject,
  objectKey,
} from '../../../types/RegularObject';
import {explainString, isString} from '../../../types/String';
import {isUndefined} from '../../../types/undefined';

/**
 * @Example
 *   {"From": "+15557122661"}
 */
export interface TwilioCreateMessageFrom {
  readonly From: string;
}

export function createTwilioCreateMessageFrom(
  From: string,
): TwilioCreateMessageFrom {
  return {
    From,
  };
}

export function isTwilioCreateMessageFrom(
  value: unknown,
): value is TwilioCreateMessageFrom {
  return isRegularObject(value) && isString(objectKey(value, 'From'));
}

export function explainTwilioCreateMessageFrom(value: unknown): string {
  return explain([
    explainRegularObject(value),
    explainProperty('From', explainString(objectKey(value, 'From'))),
  ]);
}

export function parseTwilioCreateMessageFrom(
  value: unknown,
): TwilioCreateMessageFrom | undefined {
  if (isTwilioCreateMessageFrom(value)) return value;
  return undefined;
}

export function isTwilioCreateMessageFromOrUndefined(
  value: unknown,
): value is TwilioCreateMessageFrom | undefined {
  return isUndefined(value) || isTwilioCreateMessageFrom(value);
}

export function explainTwilioCreateMessageFromOrUndefined(
  value: unknown,
): string {
  return isTwilioCreateMessageFromOrUndefined(value)
    ? explainOk()
    : explainNot(explainOr(['TwilioCreateMessageFrom', 'undefined']));
}
