import type {MatrixServerService} from '../fi/cs/matrix/server/MatrixServerService';
import type {RoomListEntry} from './demoHtml';

export function listDemoRoomsForUser(
  server: MatrixServerService,
  internalUserId: string,
): readonly RoomListEntry[] {
  return server.listRoomsForUser(internalUserId);
}
