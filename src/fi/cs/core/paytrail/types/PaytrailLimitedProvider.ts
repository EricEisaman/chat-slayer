import {
  explain,
  explainNot,
  explainOk,
  explainOr,
  explainProperty,
} from '../../types/explain';
import {isUndefined} from '../../types/undefined';
import {explainString, isString} from '../../types/String';
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

/**
 * @example
 *       {
 *         "id": "pivo",
 *         "name": "Pivo",
 *         "icon": "https://resources.paytrail.com/images/payment-method-logos/pivo.png",
 *         "svg": "https://resources.paytrail.com/images/payment-method-logos/pivo.svg",
 *         "group": "mobile"
 *       }
 * @see https://docs.paytrail.com/#/?id=provider
 */
export interface PaytrailLimitedProvider {
  /**
   * ID of the provider
   */
  readonly id: string;

  /**
   * Display name of the provider.
   */
  readonly name: string;

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
}

export function createPaytrailLimitedProvider(
  id: string,
  name: string,
  group: PaytrailPaymentMethodGroup,
  icon: string,
  svg: string,
): PaytrailLimitedProvider {
  return {
    icon,
    svg,
    group,
    name,
    id,
  };
}

export function isPaytrailLimitedProvider(
  value: unknown,
): value is PaytrailLimitedProvider {
  return (
    isRegularObject(value) &&
    hasNoOtherKeysInDevelopment(value, [
      'icon',
      'svg',
      'group',
      'name',
      'id',
    ]) &&
    isString(objectKey(value, 'icon')) &&
    isString(objectKey(value, 'svg')) &&
    isPaytrailPaymentMethodGroup(objectKey(value, 'group')) &&
    isString(objectKey(value, 'name')) &&
    isString(objectKey(value, 'id'))
  );
}

export function explainPaytrailLimitedProvider(value: unknown): string {
  return explain([
    explainRegularObject(value),
    explainNoOtherKeysInDevelopment(value, [
      'icon',
      'svg',
      'group',
      'name',
      'id',
    ]),
    explainProperty('icon', explainString(objectKey(value, 'icon'))),
    explainProperty('svg', explainString(objectKey(value, 'svg'))),
    explainProperty(
      'group',
      explainPaytrailPaymentMethodGroup(objectKey(value, 'group')),
    ),
    explainProperty('name', explainString(objectKey(value, 'name'))),
    explainProperty('id', explainString(objectKey(value, 'id'))),
  ]);
}

export function parsePaytrailLimitedProvider(
  value: unknown,
): PaytrailLimitedProvider | undefined {
  if (isPaytrailLimitedProvider(value)) return value;
  return undefined;
}

export function isPaytrailLimitedProviderOrUndefined(
  value: unknown,
): value is PaytrailLimitedProvider | undefined {
  return isUndefined(value) || isPaytrailLimitedProvider(value);
}

export function explainPaytrailLimitedProviderOrUndefined(
  value: unknown,
): string {
  return isPaytrailLimitedProviderOrUndefined(value)
    ? explainOk()
    : explainNot(explainOr(['PaytrailLimitedProvider', 'undefined']));
}
