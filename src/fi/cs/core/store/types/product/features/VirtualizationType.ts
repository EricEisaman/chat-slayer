import {explainEnum} from '../../../../types/Enum';

export enum VirtualizationType {
  KVM = 'KVM',
  LXC = 'LXC',
}

export function isVirtualizationType(
  value: unknown,
): value is VirtualizationType {
  switch (value) {
    case VirtualizationType.KVM:
    case VirtualizationType.LXC:
      return true;
    default:
      return false;
  }
}

export function explainVirtualizationType(value: unknown): string {
  return explainEnum(
    'VirtualizationType',
    VirtualizationType,
    isVirtualizationType,
    value,
  );
}

export function stringifyVirtualizationType(value: VirtualizationType): string {
  switch (value) {
    case VirtualizationType.KVM:
      return 'KVM';
    case VirtualizationType.LXC:
      return 'LXC';
  }
  throw new TypeError(`Unsupported VirtualizationType value: ${value}`);
}

export function parseVirtualizationType(
  value: unknown,
): VirtualizationType | undefined {
  if (value === undefined) return undefined;
  switch (`${value}`.toUpperCase()) {
    case 'KVM':
      return VirtualizationType.KVM;
    case 'LXC':
      return VirtualizationType.LXC;
    default:
      return undefined;
  }
}
