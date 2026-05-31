import {connect} from 'node:tls';
import {createHash, X509Certificate} from 'node:crypto';
import {
  configuredPinMatches,
  type ServerFingerprintConfig,
} from '../config/serverFingerprint';

export function computeSpkiSha256FromDer(der: Buffer): string {
  return createHash('sha256').update(der).digest('hex');
}

export function computeSpkiSha256FromCert(
  rawCert: string | Buffer | X509Certificate,
): string {
  const cert =
    rawCert instanceof X509Certificate
      ? rawCert
      : new X509Certificate(rawCert);
  const spkiDer = cert.publicKey.export({type: 'spki', format: 'der'});
  return computeSpkiSha256FromDer(spkiDer);
}

export async function probeTlsSpkiSha256(publicUrl: string): Promise<string> {
  const url = new URL(publicUrl);
  if (url.protocol !== 'https:') {
    throw new Error(`Cannot probe TLS for non-HTTPS URL: ${publicUrl}`);
  }
  const host = url.hostname;
  const port = url.port ? parseInt(url.port, 10) : 443;
  return new Promise((resolve, reject) => {
    const socket = connect(
      {host, port, servername: host, rejectUnauthorized: true},
      () => {
        const cert = socket.getPeerCertificate();
        socket.end();
        if (!cert?.raw) {
          reject(new Error('No peer certificate received from TLS probe'));
          return;
        }
        try {
          resolve(computeSpkiSha256FromCert(cert.raw));
        } catch (err) {
          reject(err);
        }
      },
    );
    socket.on('error', reject);
  });
}

let cachedLiveFingerprint: string | undefined;

export function getCachedLiveTlsFingerprint(): string | undefined {
  return cachedLiveFingerprint;
}

export function setCachedLiveTlsFingerprint(
  fingerprint: string | undefined,
): void {
  cachedLiveFingerprint = fingerprint;
}

export function resetCachedLiveTlsFingerprint(): void {
  cachedLiveFingerprint = undefined;
}

export interface TlsFingerprintStartupResult {
  readonly liveFingerprint: string | undefined;
  readonly matched: boolean;
}

/**
 * Probe BACKEND_PUBLIC_URL, cache live SPKI SHA-256, optionally fail fast when
 * configured pins do not match the live certificate.
 */
export async function validateTlsFingerprintAtStartup(
  publicUrl: string,
  config: ServerFingerprintConfig,
  options?: {failFast?: boolean},
): Promise<TlsFingerprintStartupResult> {
  const failFast = options?.failFast ?? false;
  const urlLower = publicUrl.trim().toLowerCase();

  if (!urlLower.startsWith('https://')) {
    setCachedLiveTlsFingerprint(undefined);
    return {liveFingerprint: undefined, matched: true};
  }

  if (!config.primaryPin && !config.pinEnforced) {
    setCachedLiveTlsFingerprint(undefined);
    return {liveFingerprint: undefined, matched: true};
  }

  let live: string;
  try {
    live = await probeTlsSpkiSha256(publicUrl);
  } catch (err) {
    const message =
      err instanceof Error ? err.message : 'TLS fingerprint probe failed';
    if (failFast) {
      console.error(
        `TLS fingerprint probe to ${publicUrl} failed: ${message}\n` +
          'Ensure BACKEND_PUBLIC_URL is reachable over HTTPS from this process.',
      );
      process.exit(1);
    }
    console.warn(`TLS fingerprint probe warning: ${message}`);
    setCachedLiveTlsFingerprint(undefined);
    return {liveFingerprint: undefined, matched: false};
  }

  setCachedLiveTlsFingerprint(live);

  if (!config.primaryPin) {
    return {liveFingerprint: live, matched: true};
  }

  const matched = configuredPinMatches(config, live);
  if (!matched) {
    const msg =
      `Configured BACKEND_TLS_FINGERPRINT_SHA256 does not match live SPKI pin.\n` +
      `  configured primary: ${config.primaryPin}\n` +
      `  configured backup:  ${config.backupPin ?? '(none)'}\n` +
      `  live SPKI SHA-256:  ${live}\n` +
      'Obtain the gold-standard pin via openssl or https://www.grc.com/fingerprints.htm';
    if (failFast) {
      console.error(msg);
      process.exit(1);
    }
    console.warn(msg);
  }

  return {liveFingerprint: live, matched};
}
