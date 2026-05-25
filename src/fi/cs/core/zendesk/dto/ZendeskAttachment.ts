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
  explainProperty,
} from '../../types/explain';
import {
  explainStringOrNullOrUndefined,
  explainStringOrNumberOrNullOrUndefined,
  isStringOrNullOrUndefined,
  isStringOrNumberOrNullOrUndefined,
} from '../../types/String';
import {
  explainBooleanOrNullOrUndefined,
  isBooleanOrNullOrUndefined,
} from '../../types/Boolean';
import {
  explainNumber,
  explainNumberOrNullOrUndefined,
  isNumber,
  isNumberOrNullOrUndefined,
} from '../../types/Number';
import {
  explainArrayOfOrUndefined,
  isArrayOfOrUndefined,
} from '../../types/Array';
import {isUndefined} from '../../types/undefined';
import {isNull} from '../../types/Null';

export interface ZendeskAttachment {
  readonly content_type?: string | null | undefined;
  readonly content_url?: string | null | undefined;
  readonly deleted?: boolean | null | undefined;
  readonly file_name?: string | null | undefined;
  readonly height?: string | null | undefined;
  readonly id: number;
  readonly inline?: boolean | null | undefined;
  readonly malware_access_override?: boolean | null | undefined;
  readonly malware_scan_result?: string | null | undefined;
  readonly mapped_content_url?: string | null | undefined;
  readonly size?: number | null | undefined;
  readonly thumbnails?: readonly ZendeskAttachment[];
  readonly url?: string | null | undefined;
  readonly width?: string | null | undefined;
}

export function createZendeskAttachment(
  id: number,
  content_type?: string | null | undefined,
  content_url?: string | null | undefined,
  deleted?: boolean | null | undefined,
  file_name?: string | null | undefined,
  height?: string | null | undefined,
  inline?: boolean | null | undefined,
  malware_access_override?: boolean | null | undefined,
  malware_scan_result?: string | null | undefined,
  mapped_content_url?: string | null | undefined,
  size?: number | null | undefined,
  thumbnails?: readonly ZendeskAttachment[],
  url?: string | null | undefined,
  width?: string | null | undefined,
): ZendeskAttachment {
  return {
    content_type,
    content_url,
    deleted,
    file_name,
    height,
    id,
    inline,
    malware_access_override,
    malware_scan_result,
    mapped_content_url,
    size,
    thumbnails,
    url,
    width,
  };
}

export function isZendeskAttachment(
  value: unknown,
): value is ZendeskAttachment {
  return (
    isRegularObject(value) &&
    hasNoOtherKeysInDevelopment(value, [
      'content_type',
      'content_url',
      'deleted',
      'file_name',
      'height',
      'id',
      'inline',
      'malware_access_override',
      'malware_scan_result',
      'mapped_content_url',
      'size',
      'thumbnails',
      'url',
      'width',
    ]) &&
    isStringOrNullOrUndefined(objectKey(value, 'content_type')) &&
    isStringOrNullOrUndefined(objectKey(value, 'content_url')) &&
    isBooleanOrNullOrUndefined(objectKey(value, 'deleted')) &&
    isStringOrNullOrUndefined(objectKey(value, 'file_name')) &&
    isStringOrNumberOrNullOrUndefined(objectKey(value, 'height')) &&
    isNumber(objectKey(value, 'id')) &&
    isBooleanOrNullOrUndefined(objectKey(value, 'inline')) &&
    isBooleanOrNullOrUndefined(objectKey(value, 'malware_access_override')) &&
    isStringOrNullOrUndefined(objectKey(value, 'malware_scan_result')) &&
    isStringOrNullOrUndefined(objectKey(value, 'mapped_content_url')) &&
    isNumberOrNullOrUndefined(objectKey(value, 'size')) &&
    isArrayOfOrUndefined<ZendeskAttachment>(
      objectKey(value, 'thumbnails'),
      isZendeskAttachment,
    ) &&
    isStringOrNullOrUndefined(objectKey(value, 'url')) &&
    isStringOrNumberOrNullOrUndefined(objectKey(value, 'width'))
  );
}

export function explainZendeskAttachment(value: unknown): string {
  return explain([
    explainRegularObject(value),
    explainNoOtherKeysInDevelopment(value, [
      'content_type',
      'content_url',
      'deleted',
      'file_name',
      'height',
      'id',
      'inline',
      'malware_access_override',
      'malware_scan_result',
      'mapped_content_url',
      'size',
      'thumbnails',
      'url',
      'width',
    ]),
    explainProperty(
      'content_type',
      explainStringOrNullOrUndefined(objectKey(value, 'content_type')),
    ),
    explainProperty(
      'content_url',
      explainStringOrNullOrUndefined(objectKey(value, 'content_url')),
    ),
    explainProperty(
      'deleted',
      explainBooleanOrNullOrUndefined(objectKey(value, 'deleted')),
    ),
    explainProperty(
      'file_name',
      explainStringOrNullOrUndefined(objectKey(value, 'file_name')),
    ),
    explainProperty(
      'height',
      explainStringOrNumberOrNullOrUndefined(objectKey(value, 'height')),
    ),
    explainProperty('id', explainNumber(objectKey(value, 'id'))),
    explainProperty(
      'inline',
      explainBooleanOrNullOrUndefined(objectKey(value, 'inline')),
    ),
    explainProperty(
      'malware_access_override',
      explainBooleanOrNullOrUndefined(
        objectKey(value, 'malware_access_override'),
      ),
    ),
    explainProperty(
      'malware_scan_result',
      explainStringOrNullOrUndefined(objectKey(value, 'malware_scan_result')),
    ),
    explainProperty(
      'mapped_content_url',
      explainStringOrNullOrUndefined(objectKey(value, 'mapped_content_url')),
    ),
    explainProperty(
      'size',
      explainNumberOrNullOrUndefined(objectKey(value, 'size')),
    ),
    explainProperty(
      'thumbnails',
      explainArrayOfOrUndefined<ZendeskAttachment>(
        'ZendeskAttachment',
        explainZendeskAttachment,
        objectKey(value, 'thumbnails'),
        isZendeskAttachment,
      ),
    ),
    explainProperty(
      'url',
      explainStringOrNullOrUndefined(objectKey(value, 'url')),
    ),
    explainProperty(
      'width',
      explainStringOrNumberOrNullOrUndefined(objectKey(value, 'width')),
    ),
  ]);
}

export function stringifyZendeskAttachment(value: ZendeskAttachment): string {
  return `ZendeskAttachment(${value})`;
}

export function parseZendeskAttachment(
  value: unknown,
): ZendeskAttachment | undefined {
  if (isZendeskAttachment(value)) return value;
  return undefined;
}

/**
 *
 * @param value
 * @__PURE__
 * @nosideeffects
 */
export function isZendeskAttachmentOrUndefined(
  value: unknown,
): value is ZendeskAttachment | undefined {
  return isZendeskAttachment(value) || isUndefined(value);
}

/**
 *
 * @param value
 * @__PURE__
 * @nosideeffects
 */
export function explainZendeskAttachmentOrUndefined(value: unknown): string {
  return isZendeskAttachmentOrUndefined(value)
    ? explainOk()
    : explainNot('ZendeskAttachment or undefined');
}

/**
 *
 * @param value
 * @__PURE__
 * @nosideeffects
 */
export function isZendeskAttachmentOrNullOrUndefined(
  value: unknown,
): value is ZendeskAttachment | undefined | null {
  return isZendeskAttachment(value) || isUndefined(value) || isNull(value);
}

/**
 *
 * @param value
 * @__PURE__
 * @nosideeffects
 */
export function explainZendeskAttachmentOrNullOrUndefined(
  value: unknown,
): string {
  return isZendeskAttachmentOrNullOrUndefined(value)
    ? explainOk()
    : explainNot('ZendeskAttachment or undefined or null');
}
