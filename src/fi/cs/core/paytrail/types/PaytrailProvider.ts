import {
  explain,
  explainNot,
  explainOk,
  explainOr,
  explainProperty,
} from '../../types/explain';
import {isUndefined} from '../../types/undefined';
import {
  explainString,
  explainStringOrUndefined,
  isString,
  isStringOrUndefined,
} from '../../types/String';
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
  explainPaytrailPaymentMethodGroup,
  isPaytrailPaymentMethodGroup,
  PaytrailPaymentMethodGroup,
} from './PaytrailPaymentMethodGroup';
import {
  explainPaytrailFormField,
  isPaytrailFormField,
  PaytrailFormField,
} from './PaytrailFormField';
import {
  explainArrayOfOrUndefined,
  isArrayOfOrUndefined,
} from '../../types/Array';

/**
 * @see https://docs.paytrail.com/#/?id=provider
 */
export interface PaytrailProvider {
  /**
   * Form target URL. Use POST as method.
   */
  readonly url?: string;

  /**
   * URL to PNG version of the provider icon
   */
  readonly icon: string;

  /**
   * URL to SVG version of the provider icon. Using the SVG icon is preferred.
   */
  readonly svg: string;

  /**
   * Provider group. Provider groups allow presenting same type of providers
   * in separate groups which usually makes it easier for the customer to
   * select a payment method.
   */
  readonly group: PaytrailPaymentMethodGroup;

  /**
   * Display name of the provider.
   */
  readonly name: string;

  /**
   * ID of the provider
   */
  readonly id: string;

  /**
   * Array of form fields
   *
   * May be undefined for `.getMerchantsPaymentProviders()` end-point
   */
  readonly parameters?: readonly PaytrailFormField[];
}

export function createPaytrailProvider(
  icon: string,
  svg: string,
  group: PaytrailPaymentMethodGroup,
  name: string,
  id: string,
  url?: string,
  parameters?: readonly PaytrailFormField[],
): PaytrailProvider {
  return {
    icon,
    svg,
    group,
    name,
    id,
    ...(url !== undefined ? {url} : {}),
    ...(parameters ? {parameters} : {}),
  };
}

export function isPaytrailProvider(value: unknown): value is PaytrailProvider {
  return (
    isRegularObject(value) &&
    hasNoOtherKeysInDevelopment(value, [
      'url',
      'icon',
      'svg',
      'group',
      'name',
      'id',
      'parameters',
    ]) &&
    isStringOrUndefined(objectKey(value, 'url')) &&
    isString(objectKey(value, 'icon')) &&
    isString(objectKey(value, 'svg')) &&
    isPaytrailPaymentMethodGroup(objectKey(value, 'group')) &&
    isString(objectKey(value, 'name')) &&
    isString(objectKey(value, 'id')) &&
    isArrayOfOrUndefined<PaytrailFormField>(
      objectKey(value, 'parameters'),
      isPaytrailFormField,
    )
  );
}

export function explainPaytrailProvider(value: unknown): string {
  return explain([
    explainRegularObject(value),
    explainNoOtherKeysInDevelopment(value, [
      'url',
      'icon',
      'svg',
      'group',
      'name',
      'id',
      'parameters',
    ]),
    explainProperty('url', explainStringOrUndefined(objectKey(value, 'url'))),
    explainProperty('icon', explainString(objectKey(value, 'icon'))),
    explainProperty('svg', explainString(objectKey(value, 'svg'))),
    explainProperty(
      'group',
      explainPaytrailPaymentMethodGroup(objectKey(value, 'group')),
    ),
    explainProperty('name', explainString(objectKey(value, 'name'))),
    explainProperty('id', explainString(objectKey(value, 'id'))),
    explainProperty(
      'parameters',
      explainArrayOfOrUndefined<PaytrailFormField>(
        'PaytrailFormField',
        explainPaytrailFormField,
        objectKey(value, 'parameters'),
        isPaytrailFormField,
      ),
    ),
  ]);
}

export function parsePaytrailProvider(
  value: unknown,
): PaytrailProvider | undefined {
  if (isPaytrailProvider(value)) return value;
  return undefined;
}

export function isPaytrailProviderOrUndefined(
  value: unknown,
): value is PaytrailProvider | undefined {
  return isUndefined(value) || isPaytrailProvider(value);
}

export function explainPaytrailProviderOrUndefined(value: unknown): string {
  return isPaytrailProviderOrUndefined(value)
    ? explainOk()
    : explainNot(explainOr(['PaytrailProvider', 'undefined']));
}
