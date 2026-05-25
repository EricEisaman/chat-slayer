import {isString} from '../../../../core/types/String';
import {isRegularObject, objectKey} from '../../../../core/types/RegularObject';
import {hasNoOtherKeysInDevelopment} from '../../../../core/types/OtherKeys';

export interface SendEventToRoomWithTnxIdResponseDTO {
  readonly event_id: string;
}

export function createSendEventToRoomWithTnxIdResponseDTO(
  event_id: string,
): SendEventToRoomWithTnxIdResponseDTO {
  return {
    event_id,
  };
}

export function isSendEventToRoomWithTnxIdResponseDTO(
  value: unknown,
): value is SendEventToRoomWithTnxIdResponseDTO {
  return (
    isRegularObject(value) &&
    hasNoOtherKeysInDevelopment(value, ['event_id']) &&
    isString(objectKey(value, 'event_id'))
  );
}

export function stringifySendEventToRoomWithTnxIdResponseDTO(
  value: SendEventToRoomWithTnxIdResponseDTO,
): string {
  return `SendEventToRoomWithTnxIdResponseDTO(${value})`;
}

export function parseSendEventToRoomWithTnxIdResponseDTO(
  value: unknown,
): SendEventToRoomWithTnxIdResponseDTO | undefined {
  if (isSendEventToRoomWithTnxIdResponseDTO(value)) return value;
  return undefined;
}
