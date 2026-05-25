import {
  explainNoOtherKeysInDevelopment,
  hasNoOtherKeysInDevelopment,
} from '../../types/OtherKeys';
import {
  explainRegularObject,
  isRegularObject,
  objectKey,
} from '../../types/RegularObject';
import {
  explain,
  explainNot,
  explainOk,
  explainProperty,
} from '../../types/explain';
import {isString} from '../../types/String';
import {isUndefined} from '../../types/undefined';
import {isNumber} from '../../types/Number';
import {
  explainReadonlyJsonObjectOrUndefined,
  isReadonlyJsonObjectOrUndefined,
  ReadonlyJsonObject,
} from '../../Json';
import {isNull} from '../../types/Null';

export interface ZendeskVia {
  readonly channel: string | number;
  readonly source?: ReadonlyJsonObject;
}

export function createZendeskVia(
  channel: string | number,
  source?: ReadonlyJsonObject,
): ZendeskVia {
  return {
    channel,
    source,
  };
}

export function isZendeskVia(value: unknown): value is ZendeskVia {
  return (
    isRegularObject(value) &&
    hasNoOtherKeysInDevelopment(value, ['channel', 'source']) &&
    (isString(objectKey(value, 'channel')) ||
      isNumber(objectKey(value, 'channel'))) &&
    isReadonlyJsonObjectOrUndefined(objectKey(value, 'source'))
  );
}

export function explainZendeskVia(value: unknown): string {
  return explain([
    explainRegularObject(value),
    explainNoOtherKeysInDevelopment(value, ['channel', 'source']),
    explainProperty(
      'channel',
      isString(objectKey(value, 'channel')) ||
        isNumber(objectKey(value, 'channel'))
        ? explainOk()
        : explainNot('string or number'),
    ),
    explainProperty(
      'source',
      explainReadonlyJsonObjectOrUndefined(objectKey(value, 'source')),
    ),
  ]);
}

export function stringifyZendeskVia(value: ZendeskVia): string {
  return `ZendeskVia(${value})`;
}

export function parseZendeskVia(value: unknown): ZendeskVia | undefined {
  if (isZendeskVia(value)) return value;
  return undefined;
}

/**
 *
 * @param value
 * @__PURE__
 * @nosideeffects
 */
export function isZendeskViaOrUndefined(
  value: unknown,
): value is ZendeskVia | undefined {
  return isZendeskVia(value) || isUndefined(value);
}

/**
 *
 * @param value
 * @__PURE__
 * @nosideeffects
 */
export function explainZendeskViaOrUndefined(value: unknown): string {
  return isZendeskViaOrUndefined(value)
    ? explainOk()
    : explainNot('ZendeskVia or undefined');
}

/**
 *
 * @param value
 * @__PURE__
 * @nosideeffects
 */
export function isZendeskViaOrNullOrUndefined(
  value: unknown,
): value is ZendeskVia | undefined | null {
  return isZendeskVia(value) || isUndefined(value) || isNull(value);
}

/**
 *
 * @param value
 * @__PURE__
 * @nosideeffects
 */
export function explainZendeskViaOrNullOrUndefined(value: unknown): string {
  return isZendeskViaOrNullOrUndefined(value)
    ? explainOk()
    : explainNot('ZendeskVia or undefined or null');
}
