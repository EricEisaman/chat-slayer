import {isMailHogContentDTO, MailHogContentDTO} from './MailHogContentDTO';
import {isRegularObject, objectKey} from '../../types/RegularObject';
import {hasNoOtherKeysInDevelopment} from '../../types/OtherKeys';
import {isArrayOf} from '../../types/Array';

export interface MailHogMimeDTO {
  readonly Parts: MailHogContentDTO[];
}

export function isMailHogMimeDTO(value: unknown): value is MailHogMimeDTO {
  return (
    isRegularObject(value) &&
    hasNoOtherKeysInDevelopment(value, ['Parts']) &&
    isArrayOf(objectKey(value, 'Parts'), isMailHogContentDTO)
  );
}

export function stringifyMailHogMimeDTO(value: MailHogMimeDTO): string {
  return `MailHogMimeDTO(${value})`;
}

export function parseMailHogMimeDTO(
  value: unknown,
): MailHogMimeDTO | undefined {
  if (isMailHogMimeDTO(value)) return value;
  return undefined;
}
