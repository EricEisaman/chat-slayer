import {isMailHogContentDTO, MailHogContentDTO} from './MailHogContentDTO';
import {isMailHogAddressDTO, MailHogAddressDTO} from './MailHogAddressDTO';
import {isMailHogMimeDTO, MailHogMimeDTO} from './MailHogMimeDTO';
import {isString} from '../../types/String';
import {isRegularObject, objectKey} from '../../types/RegularObject';
import {hasNoOtherKeysInDevelopment} from '../../types/OtherKeys';
import {isArrayOf} from '../../types/Array';

export interface MailHogMessageDTO {
  readonly ID: string;
  readonly Created: string;
  readonly From: MailHogAddressDTO;
  readonly To: MailHogAddressDTO[];
  readonly Content: MailHogContentDTO;
  readonly MIME: MailHogMimeDTO;
}

export function isMailHogMessageDTO(
  value: unknown,
): value is MailHogMessageDTO {
  return (
    isRegularObject(value) &&
    hasNoOtherKeysInDevelopment(value, [
      'ID',
      'Created',
      'From',
      'MIME',
      'Raw',
      'To',
      'Content',
    ]) &&
    isString(objectKey(value, 'ID')) &&
    isString(objectKey(value, 'Created')) &&
    isMailHogAddressDTO(objectKey(value, 'From')) &&
    isMailHogMimeDTO(objectKey(value, 'MIME')) &&
    isMailHogContentDTO(objectKey(value, 'Content')) &&
    isArrayOf(objectKey(value, 'To'), isMailHogAddressDTO)
  );
}

export function stringifyMailHogMessageDTO(value: MailHogMessageDTO): string {
  return `MailHogMessageDTO(${value})`;
}

export function parseMailHogMessageDTO(
  value: unknown,
): MailHogMessageDTO | undefined {
  if (isMailHogMessageDTO(value)) return value;
  return undefined;
}
