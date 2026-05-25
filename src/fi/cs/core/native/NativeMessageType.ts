import {explainEnum} from '../types/Enum';

export enum NativeMessageType {
  SEND_SMS = 'fi.cs.native.SEND_SMS',
}

export function isNativeMessageType(
  value: unknown,
): value is NativeMessageType {
  switch (value) {
    case NativeMessageType.SEND_SMS:
      return true;
    default:
      return false;
  }
}

export function explainNativeMessageType(value: unknown): string {
  return explainEnum(
    'NativeMessageType',
    NativeMessageType,
    isNativeMessageType,
    value,
  );
}

export function stringifyNativeMessageType(value: NativeMessageType): string {
  switch (value) {
    case NativeMessageType.SEND_SMS:
      return 'SEND_SMS';
  }
  throw new TypeError(`Unsupported NativeMessageType value: ${value}`);
}

export function parseNativeMessageType(
  value: unknown,
): NativeMessageType | undefined {
  if (value === undefined) return undefined;
  switch (`${value}`.toUpperCase()) {
    case 'SEND_SMS':
      return NativeMessageType.SEND_SMS;
    default:
      return undefined;
  }
}
