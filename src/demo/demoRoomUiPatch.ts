import {
  renderInboxHtml,
  renderRoomListHtml,
  renderRoomPickerOptionsHtml,
  ROOM_PICKER_SELECTOR,
  type MessageLine,
  type RoomListEntry,
} from './demoHtml';

export interface DemoElementPatchOptions {
  readonly selector?: string;
  readonly mode?:
    | 'outer'
    | 'inner'
    | 'append'
    | 'prepend'
    | 'remove'
    | 'replace'
    | 'before'
    | 'after';
}

export type DemoElementPatcher = (
  html: string,
  options?: DemoElementPatchOptions,
) => void;

/** Update room list + picker options without replacing the static `<select>`. */
export function patchDemoRoomUi(
  patch: DemoElementPatcher,
  rooms: readonly RoomListEntry[],
  selectedRoomId = '',
): void {
  patch(renderRoomListHtml(rooms));
  patch(renderRoomPickerOptionsHtml(rooms, selectedRoomId), {
    selector: ROOM_PICKER_SELECTOR,
    mode: 'inner',
  });
}

export function patchDemoInboxUi(
  patch: DemoElementPatcher,
  inbox: readonly MessageLine[],
): void {
  patch(renderInboxHtml(inbox));
}
