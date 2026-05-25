import {isArray} from '../../types/Array';
import {isString} from '../../types/String';
import {isObject} from '../../types/Object';
import {keys} from '../../functions/keys';
import {every} from '../../functions/every';

export interface HeadersObject {
  readonly [key: string]: string | readonly string[] | undefined;
}

export interface ChangeableHeadersObject {
  [key: string]: string | readonly string[] | undefined;
}

export function isHeadersObject(value: unknown): value is HeadersObject {
  if (!value) return false;
  if (!isObject(value)) return false;
  if (isArray(value)) return false;

  const propertyKeys: Array<string> = keys(value);

  return every(propertyKeys, (key: string) => {
    // @ts-ignore
    const propertyValue: any = value[key];

    return (
      propertyValue === undefined ||
      isString(propertyValue) ||
      (isArray(propertyValue) && every(propertyValue, isString))
    );
  });
}
