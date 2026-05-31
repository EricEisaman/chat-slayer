import {isValidSha256Hex, normalizeSha256Hex} from '../config/serverFingerprint';

/**
 * Compare an observed TLS SPKI SHA-256 pin against expected primary and backup pins.
 */
export function fingerprintMatchesExpected(
  observed: string,
  expected: string | undefined,
  expectedBackup: string | undefined,
): boolean {
  let obs: string;
  try {
    obs = normalizeSha256Hex(observed) ?? '';
  } catch {
    return false;
  }
  if (!obs) {
    return false;
  }
  if (expected) {
    try {
      if (normalizeSha256Hex(expected) === obs) {
        return true;
      }
    } catch {
      /* ignore invalid expected */
    }
  }
  if (expectedBackup) {
    try {
      if (normalizeSha256Hex(expectedBackup) === obs) {
        return true;
      }
    } catch {
      /* ignore invalid backup */
    }
  }
  return false;
}

export {isValidSha256Hex, normalizeSha256Hex};
