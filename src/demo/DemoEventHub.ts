import type {MatrixServerService} from '../fi/cs/matrix/server/MatrixServerService';
import type {StoredTimelineEvent} from '../fi/cs/matrix/server/roomTimeline';
import {BACKEND_ROOM_HISTORY_LIMIT} from '../constants/runtime';
import {
  buildLiveSnapshotSignalPatch,
  buildRoomDirectorySignalPatch,
  buildRoomMessageInboxSignalPatch,
} from './demoLiveSignals';
import type {MessageLine} from './demoHtml';
import {messageLineFromTimelineEvent} from './demoMessageLine';
import {
  patchDemoInboxUi,
  patchDemoRoomUi,
} from './demoRoomUiPatch';
import {listDemoRoomsForUser} from './demoRooms';

export interface DemoSseWriter {
  readonly patchSignals: (json: string) => void;
  readonly patchElements: (
    html: string,
    options?: import('./demoRoomUiPatch').DemoElementPatchOptions,
  ) => void;
}

export interface DemoSseSubscriber {
  readonly id: string;
  readonly accessToken: string;
  readonly internalUserId: string;
  readonly matrixUserId: string;
  readonly writer: DemoSseWriter;
  lastActivityAt: number;
  lastStreamPos: number;
  /** Full timeline for all joined rooms (not filtered by active room). */
  inboxLines: MessageLine[];
  /** Active room from picker; drives filtered inbox UI. */
  selectedRoomId: string;
}

export class DemoEventHub {
  private readonly _subscribers = new Map<string, DemoSseSubscriber>();
  private _matrixServer: MatrixServerService | undefined;
  private readonly _roomHistoryLimit: number;

  public constructor(roomHistoryLimit = BACKEND_ROOM_HISTORY_LIMIT) {
    this._roomHistoryLimit = roomHistoryLimit;
  }

  public setMatrixServer(server: MatrixServerService): void {
    this._matrixServer = server;
  }

  public subscribe(subscriber: DemoSseSubscriber): void {
    this._subscribers.set(subscriber.id, subscriber);
  }

  public unsubscribe(subscriberId: string): void {
    this._subscribers.delete(subscriberId);
  }

  public touchByAccessToken(accessToken: string): void {
    const now = Date.now();
    for (const sub of this._subscribers.values()) {
      if (sub.accessToken === accessToken) {
        sub.lastActivityAt = now;
      }
    }
  }

  public getSubscriberByAccessToken(
    accessToken: string,
  ): DemoSseSubscriber | undefined {
    for (const sub of this._subscribers.values()) {
      if (sub.accessToken === accessToken) {
        return sub;
      }
    }
    return undefined;
  }

  public publishRoomDirectory(): void {
    const server = this._matrixServer;
    if (!server) {
      return;
    }
    for (const sub of this._subscribers.values()) {
      this.syncSubscriberRooms(sub);
      sub.lastActivityAt = Date.now();
    }
  }

  public publishMessage(event: StoredTimelineEvent): void {
    const line = messageLineFromTimelineEvent(event);
    for (const sub of this._subscribers.values()) {
      const server = this._matrixServer;
      if (!server) {
        continue;
      }
      if (!server.isRoomMember(event.roomId, sub.matrixUserId)) {
        continue;
      }
      this.appendInboxLine(sub, line);
      if (event.streamPos > sub.lastStreamPos) {
        sub.lastStreamPos = event.streamPos;
      }
      if (event.roomId === sub.selectedRoomId) {
        sub.writer.patchSignals(
          buildRoomMessageInboxSignalPatch(
            line,
            sub.inboxLines,
            sub.selectedRoomId,
            this._roomHistoryLimit,
          ),
        );
        this.patchSubscriberInboxElement(sub);
      }
      sub.lastActivityAt = Date.now();
    }
  }

  /** Load up to N recent server messages for a room into the subscriber cache. */
  public hydrateRoomHistory(
    subscriber: DemoSseSubscriber,
    roomId: string,
  ): void {
    const server = this._matrixServer;
    const trimmed = roomId.trim();
    if (!server || !trimmed) {
      return;
    }
    const events = server.getTimelineEventsForRoom(
      subscriber.internalUserId,
      trimmed,
      this._roomHistoryLimit,
    );
    for (const event of events) {
      this.appendInboxLine(subscriber, messageLineFromTimelineEvent(event));
    }
  }

  /** Refresh room list and picker; does not mutate inbox history. */
  public syncSubscriberRooms(
    subscriber: DemoSseSubscriber,
    selectedRoomId?: string,
  ): void {
    if (selectedRoomId !== undefined) {
      subscriber.selectedRoomId = selectedRoomId;
    }
    const server = this._matrixServer;
    if (!server) {
      return;
    }
    const rooms = listDemoRoomsForUser(server, subscriber.internalUserId);
    subscriber.writer.patchSignals(
      buildLiveSnapshotSignalPatch(
        rooms,
        subscriber.inboxLines,
        subscriber.selectedRoomId,
        this._roomHistoryLimit,
      ),
    );
    patchDemoRoomUi(
      subscriber.writer.patchElements.bind(subscriber.writer),
      rooms,
      subscriber.selectedRoomId,
    );
    this.patchSubscriberInboxElement(subscriber);
    subscriber.lastActivityAt = Date.now();
  }

  /** Prepare subscriber for live SSE (history loaded on room select). */
  public rebuildSubscriberInbox(subscriber: DemoSseSubscriber): void {
    const server = this._matrixServer;
    if (!server) {
      return;
    }
    subscriber.inboxLines = [];
    subscriber.lastStreamPos = server.getLatestStreamPos();
    if (subscriber.selectedRoomId) {
      this.hydrateRoomHistory(subscriber, subscriber.selectedRoomId);
    }
    this.patchSubscriberUi(subscriber);
  }

  /** Append timeline events since lastStreamPos (idle resync). */
  public appendSubscriberInbox(subscriber: DemoSseSubscriber): void {
    const server = this._matrixServer;
    if (!server) {
      return;
    }
    const messages = server.getTimelineEventsForUser(
      subscriber.matrixUserId,
      subscriber.lastStreamPos,
    );
    for (const event of messages) {
      const line = messageLineFromTimelineEvent(event);
      this.appendInboxLine(subscriber, line);
      if (event.streamPos > subscriber.lastStreamPos) {
        subscriber.lastStreamPos = event.streamPos;
      }
    }
    if (messages.length > 0) {
      this.patchSubscriberUi(subscriber);
    }
  }

  /** Patch Datastar signals and inbox DOM for current rooms + active room filter. */
  public patchSubscriberUi(subscriber: DemoSseSubscriber): void {
    const server = this._matrixServer;
    if (!server) {
      return;
    }
    const rooms = listDemoRoomsForUser(server, subscriber.internalUserId);
    subscriber.writer.patchSignals(
      buildLiveSnapshotSignalPatch(
        rooms,
        subscriber.inboxLines,
        subscriber.selectedRoomId,
        this._roomHistoryLimit,
      ),
    );
    patchDemoRoomUi(
      subscriber.writer.patchElements.bind(subscriber.writer),
      rooms,
      subscriber.selectedRoomId,
    );
    this.patchSubscriberInboxElement(subscriber);
    subscriber.lastActivityAt = Date.now();
  }

  public setSelectedRoom(
    subscriber: DemoSseSubscriber,
    selectedRoomId: string,
  ): void {
    subscriber.selectedRoomId = selectedRoomId;
    this.hydrateRoomHistory(subscriber, selectedRoomId);
    this.patchSubscriberUi(subscriber);
  }

  public resyncIdleSubscribers(inactiveMs: number): void {
    const now = Date.now();
    for (const sub of this._subscribers.values()) {
      if (now - sub.lastActivityAt >= inactiveMs) {
        this.appendSubscriberInbox(sub);
        this.syncSubscriberRooms(sub);
      }
    }
  }

  private appendInboxLine(
    subscriber: DemoSseSubscriber,
    line: MessageLine,
  ): void {
    if (subscriber.inboxLines.some((existing) => existing.event_id === line.event_id)) {
      return;
    }
    subscriber.inboxLines.push(line);
  }

  private patchSubscriberInboxElement(subscriber: DemoSseSubscriber): void {
    patchDemoInboxUi(
      subscriber.writer.patchElements.bind(subscriber.writer),
      subscriber.inboxLines,
      subscriber.selectedRoomId,
      this._roomHistoryLimit,
    );
  }
}

let globalHub: DemoEventHub | undefined;

export function getDemoEventHub(): DemoEventHub {
  if (!globalHub) {
    globalHub = new DemoEventHub();
  }
  return globalHub;
}

export function resetDemoEventHubForTests(): void {
  globalHub = undefined;
}
