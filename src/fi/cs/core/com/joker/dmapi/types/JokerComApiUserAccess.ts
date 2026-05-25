import {explainEnum} from '../../../../types/Enum';

export enum JokerComApiUserAccess {
  FULL = '@full',
  READONLY = '@read-only',
}

export function isJokerComApiUserAccess(
  value: unknown,
): value is JokerComApiUserAccess {
  switch (value) {
    case JokerComApiUserAccess.FULL:
    case JokerComApiUserAccess.READONLY:
      return true;
    default:
      return false;
  }
}

export function explainJokerComApiUserAccess(value: unknown): string {
  return explainEnum(
    'JokerComApiAccessLevel',
    JokerComApiUserAccess,
    isJokerComApiUserAccess,
    value,
  );
}

export function stringifyJokerComApiUserAccess(
  value: JokerComApiUserAccess,
): string {
  switch (value) {
    case JokerComApiUserAccess.FULL:
      return '@full';
    case JokerComApiUserAccess.READONLY:
      return '@read-only';
  }
  throw new TypeError(`Unsupported JokerComApiAccessLevel value: ${value}`);
}

export function parseJokerComApiUserAccess(
  value: unknown,
): JokerComApiUserAccess | undefined {
  if (value === undefined) return undefined;
  switch (`${value}`.toLowerCase()) {
    case '@full':
    case 'full':
      return JokerComApiUserAccess.FULL;

    case '@readonly':
    case '@read-only':
    case 'read-only':
    case 'readonly':
      return JokerComApiUserAccess.READONLY;

    default:
      return undefined;
  }
}
