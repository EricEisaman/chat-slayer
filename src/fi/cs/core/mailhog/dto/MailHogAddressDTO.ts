import {isNull} from '../../types/Null';
import {isString} from '../../types/String';
import {isRegularObject, objectKey} from '../../types/RegularObject';
import {hasNoOtherKeysInDevelopment} from '../../types/OtherKeys';

export interface MailHogAddressDTO {
  readonly Domain: string;
  readonly Mailbox: string;
  readonly Params: string;
  readonly Relays: null;
}

export function isMailHogAddressDTO(
  value: unknown,
): value is MailHogAddressDTO {
  return (
    isRegularObject(value) &&
    hasNoOtherKeysInDevelopment(value, [
      'Domain',
      'Mailbox',
      'Params',
      'Relays',
    ]) &&
    isString(objectKey(value, 'Domain')) &&
    isString(objectKey(value, 'Mailbox')) &&
    isString(objectKey(value, 'Params')) &&
    isNull(objectKey(value, 'Relays'))
  );
}

export function stringifyMailHogAddressDTO(value: MailHogAddressDTO): string {
  return `MailHogAddressDTO(${value})`;
}

export function parseMailHogAddressDTO(
  value: unknown,
): MailHogAddressDTO | undefined {
  if (isMailHogAddressDTO(value)) return value;
  return undefined;
}
