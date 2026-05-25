import {isMailHogMessageDTO, MailHogMessageDTO} from './MailHogMessageDTO';
import {isArrayOf} from '../../types/Array';

export type MailHogMessageListDTO = MailHogMessageDTO[];

export function isMailHogMessagesDTO(
  value: unknown,
): value is MailHogMessageListDTO {
  return isArrayOf(value, isMailHogMessageDTO);
}

export function stringifyMailHogMessagesDTO(
  value: MailHogMessageListDTO,
): string {
  return `MailHogMessagesDTO(${value})`;
}

export function parseMailHogMessagesDTO(
  value: unknown,
): MailHogMessageListDTO | undefined {
  if (isMailHogMessagesDTO(value)) return value;
  return undefined;
}
