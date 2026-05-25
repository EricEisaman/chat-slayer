import type {MatrixServerService} from '../fi/cs/matrix/server/MatrixServerService';
import type {StoredTimelineEvent} from '../fi/cs/matrix/server/roomTimeline';
import {
  buildLiveSnapshotSignalPatch,
  buildRoomDirectorySignalPatch,
  buildRoomMessageSignalPatch,
} from './demoLiveSignals';
import type {MessageLine} from './demoHtml';
import {messageLineFromTimelineEvent} from './demoMessageLine';
import {
  type DemoElementPatchOptions,
  patchDemoInboxUi,
  patchDemoRoomUi,
} from './demoRoomUiPatch';

export interface DemoSseWriter {
  readonly patchSignals: (json: string) => void;
  readonly patchElements: (
    html: string,
    options?: DemoElementPatchOptions,
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
  inboxLines: MessageLine[];
}

export class DemoEventHub {
  private readonly _subscribers = new Map<string, DemoSseSubscriber>();
  private _matrixServer: MatrixServerService | undefined;

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
    const rooms = server.listRooms();
    for (const sub of this._subscribers.values()) {
      sub.writer.patchSignals(buildRoomDirectorySignalPatch(rooms));
      patchDemoRoomUi(sub.writer.patchElements.bind(sub.writer), rooms);
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
      sub.inboxLines.push(line);
      sub.writer.patchSignals(
        JSON.stringify({
          ...JSON.parse(buildRoomMessageSignalPatch(line)),
          inbox: sub.inboxLines,
        }),
      );
      patchDemoInboxUi(sub.writer.patchElements.bind(sub.writer), sub.inboxLines);
      if (event.streamPos > sub.lastStreamPos) {
        sub.lastStreamPos = event.streamPos;
      }
      sub.lastActivityAt = Date.now();
    }
  }

  public pushSnapshotToSubscriber(
    subscriber: DemoSseSubscriber,
    selectedRoomId = '',
  ): void {
    const server = this._matrixServer;
    if (!server) {
      return;
    }
    const rooms = server.listRooms();
    const messages = server.getTimelineEventsForUser(
      subscriber.matrixUserId,
      subscriber.lastStreamPos,
    );
    subscriber.inboxLines = messages.map(messageLineFromTimelineEvent);
    for (const event of messages) {
      if (event.streamPos > subscriber.lastStreamPos) {
        subscriber.lastStreamPos = event.streamPos;
      }
    }
    subscriber.writer.patchSignals(
      buildLiveSnapshotSignalPatch(rooms, subscriber.inboxLines),
    );
    patchDemoRoomUi(
      subscriber.writer.patchElements.bind(subscriber.writer),
      rooms,
      selectedRoomId,
    );
    patchDemoInboxUi(
      subscriber.writer.patchElements.bind(subscriber.writer),
      subscriber.inboxLines,
    );
    subscriber.lastActivityAt = Date.now();
  }

  public resyncIdleSubscribers(inactiveMs: number): void {
    const now = Date.now();
    for (const sub of this._subscribers.values()) {
      if (now - sub.lastActivityAt >= inactiveMs) {
        this.pushSnapshotToSubscriber(sub);
      }
    }
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
