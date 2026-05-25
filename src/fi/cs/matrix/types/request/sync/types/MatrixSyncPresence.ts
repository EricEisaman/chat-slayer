export enum MatrixSyncPresence {
  OFFLINE = 'offline',
  ONLINE = 'online',
  UNAVAILABLE = 'unavailable',
}

export function isMatrixSyncPresence(
  value: unknown,
): value is MatrixSyncPresence {
  switch (value) {
    case MatrixSyncPresence.OFFLINE:
    case MatrixSyncPresence.ONLINE:
    case MatrixSyncPresence.UNAVAILABLE:
      return true;

    default:
      return false;
  }
}

export function stringifyMatrixSyncPresence(value: MatrixSyncPresence): string {
  switch (value) {
    case MatrixSyncPresence.OFFLINE:
      return 'offline';
    case MatrixSyncPresence.ONLINE:
      return 'online';
    case MatrixSyncPresence.UNAVAILABLE:
      return 'unavailable';
  }
  throw new TypeError(`Unsupported MatrixSyncPresence value: ${value}`);
}

export function parseMatrixSyncPresence(
  value: unknown,
): MatrixSyncPresence | undefined {
  switch (value) {
    case 'OFFLINE':
      return MatrixSyncPresence.OFFLINE;
    case 'ONLINE':
      return MatrixSyncPresence.ONLINE;
    case 'UNAVAILABLE':
      return MatrixSyncPresence.UNAVAILABLE;

    default:
      return undefined;
  }
}
