/**
 * GRC-style TLS SPKI SHA-256 fingerprint validation for the browser demo.
 * Runs before login; fail-closed on mismatch.
 */
const CLIENT_HEADER = 'X-Chat-Slayer-Client-Id';
const CLIENT_ID = 'web-demo';
const TLS_HEADER = 'x-chat-slayer-tls-fingerprint-sha256';
const TOFU_KEY = 'chat-slayer-tls-pin-tofu';

function normalizeHex(value) {
  if (!value || typeof value !== 'string') {
    return '';
  }
  return value.trim().toLowerCase().replace(/^sha256\/?\s*/i, '');
}

function pinMatches(observed, expected, backup) {
  const obs = normalizeHex(observed);
  if (!obs) {
    return false;
  }
  if (expected && normalizeHex(expected) === obs) {
    return true;
  }
  if (backup && normalizeHex(backup) === obs) {
    return true;
  }
  return false;
}

function blockUi(message) {
  window.__CS_PIN_FAILED__ = true;
  document.body.setAttribute('data-cs-pin-failed', 'true');
  if (document.getElementById('cs-pin-failure-banner')) {
    return;
  }
  const banner = document.createElement('div');
  banner.id = 'cs-pin-failure-banner';
  banner.setAttribute('role', 'alert');
  banner.textContent = message;
  banner.style.cssText =
    'position:fixed;top:0;left:0;right:0;z-index:99999;padding:1rem 1.25rem;' +
    'background:#3b0d0d;color:#fff;font:600 0.95rem/1.4 system-ui,sans-serif;' +
    'border-bottom:2px solid #f87171;box-shadow:0 4px 12px rgba(0,0,0,0.35);';
  document.body.prepend(banner);
}

async function reportPinFailure(observed, expected, source) {
  try {
    await fetch('/demo/actions/report-tls-pin-failure', {
      method: 'POST',
      headers: {
        [CLIENT_HEADER]: CLIENT_ID,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        observedFingerprint: observed,
        expectedFingerprint: expected,
        source,
      }),
    });
  } catch (err) {
    console.error('Failed to report TLS pin failure', err);
  }
}

function readTofuPin() {
  try {
    return localStorage.getItem(TOFU_KEY) || '';
  } catch {
    return '';
  }
}

function writeTofuPin(pin) {
  try {
    localStorage.setItem(TOFU_KEY, pin);
  } catch {
    /* ignore storage errors */
  }
}

export async function validateServerTlsFingerprint() {
  const config = window.__CS_DEMO_CONFIG__;
  if (!config?.pinEnforced) {
    return true;
  }
  const expected = config.expectedTlsFingerprintSha256;
  const backup = config.expectedTlsFingerprintBackupSha256;
  if (!expected) {
    return true;
  }

  let res;
  try {
    res = await fetch('/.well-known/chat-slayer.json', {
      cache: 'no-store',
      headers: {[CLIENT_HEADER]: CLIENT_ID},
    });
  } catch (err) {
    console.error('TLS fingerprint check failed', err);
    return false;
  }

  const headerPin = res.headers.get(TLS_HEADER) || '';
  let jsonPin = '';
  try {
    const doc = await res.json();
    jsonPin = doc.tlsFingerprintSha256 || '';
  } catch {
    /* ignore */
  }

  const observed = normalizeHex(headerPin || jsonPin);
  if (!observed) {
    return true;
  }

  const tofu = readTofuPin();
  if (tofu && normalizeHex(tofu) !== observed) {
    const msg =
      'TLS certificate fingerprint changed since your last visit. ' +
      'Possible SSL interception or certificate rotation. Connection blocked.';
    alert(msg);
    await reportPinFailure(observed, normalizeHex(tofu), 'tofu');
    blockUi(msg);
    return false;
  }

  if (!pinMatches(observed, expected, backup)) {
    const msg =
      'TLS fingerprint mismatch — possible SSL interception (man-in-the-middle).\n\n' +
      'Verify the server certificate via https://www.grc.com/fingerprints.htm ' +
      'or your operator gold-standard pin. This client has been disabled.';
    alert(msg);
    await reportPinFailure(observed, expected, headerPin ? 'header' : 'well-known');
    blockUi('TLS fingerprint mismatch — connection blocked for security.');
    return false;
  }

  if (!tofu) {
    writeTofuPin(observed);
  }
  return true;
}

validateServerTlsFingerprint();
