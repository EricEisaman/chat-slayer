import {
  explainJokerComApiDomainPeriod,
  isJokerComApiDomainPeriod,
  JokerComApiDomainPeriod,
} from './JokerComApiDomainPeriod';
import {
  explainJokerComApiCurrency,
  isJokerComApiCurrency,
  JokerComApiCurrency,
} from './JokerComApiCurrency';
import {
  explainJokerComApiPriceAmount,
  isJokerComApiPriceAmount,
  JokerComApiPriceAmount,
} from './JokerComApiPriceAmount';
import {explain, explainProperty} from '../../../../types/explain';
import {
  explainBooleanOrUndefined,
  isBooleanOrUndefined,
} from '../../../../types/Boolean';
import {
  explainStringOrUndefined,
  isStringOrUndefined,
} from '../../../../types/String';
import {
  explainRegularObject,
  isRegularObject,
  objectKey,
} from '../../../../types/RegularObject';
import {explainNoOtherKeys, hasNoOtherKeys} from '../../../../types/OtherKeys';

export interface JokerComApiDomainPrice {
  readonly price: JokerComApiPriceAmount;
  readonly currency: JokerComApiCurrency;
  readonly period: JokerComApiDomainPeriod;
  readonly isPromo?: boolean;
  readonly promoStart?: string;
  readonly promoEnd?: string;
}

export function createJokerComApiDomainPrice(
  price: JokerComApiPriceAmount,
  currency: JokerComApiCurrency,
  period: JokerComApiDomainPeriod,
  isPromo: boolean | undefined,
  promoStart: string | undefined,
  promoEnd: string | undefined,
): JokerComApiDomainPrice {
  return {
    price,
    currency,
    period,
    isPromo,
    promoStart,
    promoEnd,
  };
}

export function isJokerComApiDomainPrice(
  value: unknown,
): value is JokerComApiDomainPrice {
  return (
    isRegularObject(value) &&
    hasNoOtherKeys(value, [
      'price',
      'currency',
      'period',
      'isPromo',
      'promoStart',
      'promoEnd',
    ]) &&
    isJokerComApiPriceAmount(objectKey(value, 'price')) &&
    isJokerComApiCurrency(objectKey(value, 'currency')) &&
    isJokerComApiDomainPeriod(objectKey(value, 'period')) &&
    isBooleanOrUndefined(objectKey(value, 'isPromo')) &&
    isStringOrUndefined(objectKey(value, 'promoStart')) &&
    isStringOrUndefined(objectKey(value, 'promoEnd'))
  );
}

export function explainJokerComApiDomainPrice(value: unknown): string {
  return explain([
    explainRegularObject(value),
    explainNoOtherKeys(value, [
      'price',
      'currency',
      'period',
      'isPromo',
      'promoStart',
      'promoEnd',
    ]),
    explainProperty(
      'price',
      explainJokerComApiPriceAmount(objectKey(value, 'price')),
    ),
    explainProperty(
      'currency',
      explainJokerComApiCurrency(objectKey(value, 'currency')),
    ),
    explainProperty(
      'period',
      explainJokerComApiDomainPeriod(objectKey(value, 'period')),
    ),
    explainProperty(
      'isPromo',
      explainBooleanOrUndefined(objectKey(value, 'isPromo')),
    ),
    explainProperty(
      'promoStart',
      explainStringOrUndefined(objectKey(value, 'promoStart')),
    ),
    explainProperty(
      'promoEnd',
      explainStringOrUndefined(objectKey(value, 'promoEnd')),
    ),
  ]);
}

export function stringifyJokerComApiDomainPrice(
  value: JokerComApiDomainPrice,
): string {
  return `JokerComApiDomainPrice(${value})`;
}

export function parseJokerComApiDomainPrice(
  value: unknown,
): JokerComApiDomainPrice | undefined {
  if (isJokerComApiDomainPrice(value)) return value;
  return undefined;
}
