import type {ServerResponse} from 'http';
import {BACKEND_PUBLIC_URL} from '../constants/runtime';
import {TLS_FINGERPRINT_HEADER} from '../config/serverFingerprint';
import {getCachedLiveTlsFingerprint} from './tlsFingerprintProbe';

export function applySecurityResponseHeaders(res: ServerResponse): void {
  const fingerprint = getCachedLiveTlsFingerprint();
  if (fingerprint) {
    res.setHeader(TLS_FINGERPRINT_HEADER, fingerprint);
  }
  if (BACKEND_PUBLIC_URL.trim().toLowerCase().startsWith('https://')) {
    res.setHeader(
      'Strict-Transport-Security',
      'max-age=31536000; includeSubDomains',
    );
  }
}
