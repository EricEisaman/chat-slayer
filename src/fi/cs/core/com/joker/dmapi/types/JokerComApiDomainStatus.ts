import {explainEnum} from '../../../../types/Enum';

export enum JokerComApiDomainStatus {
  UNAVAILABLE = 'unavailable',
  PREMIUM = 'premium',
  AVAILABLE = 'available',
}

export function isJokerComApiDomainStatus(
  value: unknown,
): value is JokerComApiDomainStatus {
  switch (value) {
    case JokerComApiDomainStatus.UNAVAILABLE:
    case JokerComApiDomainStatus.PREMIUM:
    case JokerComApiDomainStatus.AVAILABLE:
      return true;
    default:
      return false;
  }
}

export function explainJokerComApiDomainStatus(value: unknown): string {
  return explainEnum(
    'JokerComApiDomainStatus',
    JokerComApiDomainStatus,
    isJokerComApiDomainStatus,
    value,
  );
}

export function stringifyJokerComApiDomainStatus(
  value: JokerComApiDomainStatus,
): string {
  switch (value) {
    case JokerComApiDomainStatus.UNAVAILABLE:
      return 'unavailable';
    case JokerComApiDomainStatus.PREMIUM:
      return 'premium';
    case JokerComApiDomainStatus.AVAILABLE:
      return 'available';
  }
  throw new TypeError(`Unsupported JokerComApiDomainStatus value: ${value}`);
}

export function parseJokerComApiDomainStatus(
  value: unknown,
): JokerComApiDomainStatus | undefined {
  if (value === undefined) return undefined;
  switch (`${value}`.toLowerCase()) {
    case 'unavailable':
      return JokerComApiDomainStatus.UNAVAILABLE;
    case 'premium':
      return JokerComApiDomainStatus.PREMIUM;
    case 'available':
      return JokerComApiDomainStatus.AVAILABLE;
    default:
      return undefined;
  }
}
