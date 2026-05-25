import {isNull} from '../../types/Null';
import {
  HeadersObject,
  isHeadersObject,
} from '../../request/types/HeadersObject';
import {isString} from '../../types/String';
import {isNumber} from '../../types/Number';
import {isRegularObject, objectKey} from '../../types/RegularObject';
import {hasNoOtherKeysInDevelopment} from '../../types/OtherKeys';

export interface MailHogContentDTO {
  readonly Body: string;
  readonly Headers: HeadersObject;
  readonly MIME: null;
  readonly Size: number;
}

export function isMailHogContentDTO(
  value: unknown,
): value is MailHogContentDTO {
  return (
    isRegularObject(value) &&
    hasNoOtherKeysInDevelopment(value, ['Body', 'Headers', 'MIME', 'Size']) &&
    isString(objectKey(value, 'Body')) &&
    isHeadersObject(objectKey(value, 'Headers')) &&
    isNull(objectKey(value, 'MIME')) &&
    isNumber(objectKey(value, 'Size'))
  );
}

export function stringifyMailHogContentDTO(value: MailHogContentDTO): string {
  return `MailHogContentDTO(${value})`;
}

export function parseMailHogContentDTO(
  value: unknown,
): MailHogContentDTO | undefined {
  if (isMailHogContentDTO(value)) return value;
  return undefined;
}
