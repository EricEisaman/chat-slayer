import {CountryCode} from '../types/CountryCode';

export function getCountryNameTranslationKey(code: CountryCode): string {
  return `countryCode.${code}.name`;
}
