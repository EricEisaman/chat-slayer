import type {StoredTimelineEvent} from '../fi/cs/matrix/server/roomTimeline';
import type {MessageLine} from './demoHtml';

function isEncryptedTimelineContent(
  content: Record<string, unknown>,
): boolean {
  return (
    typeof content.ciphertext === 'string' ||
    content.algorithm === 'm.megolm.v1.aes-sha2'
  );
}

export function messageLineFromTimelineEvent(
  event: StoredTimelineEvent,
): MessageLine {
  const content = event.content as Record<string, unknown>;
  if (isEncryptedTimelineContent(content)) {
    return {
      room_id: event.roomId,
      sender: event.sender,
      body: '',
      event_id: event.eventId,
      event_payload: JSON.stringify({
        type: event.type,
        event_id: event.eventId,
        sender: event.sender,
        content,
      }),
    };
  }
  return {
    room_id: event.roomId,
    sender: event.sender,
    body: String(content.body ?? ''),
    event_id: event.eventId,
  };
}
